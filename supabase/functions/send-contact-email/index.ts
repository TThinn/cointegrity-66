import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const RECAPTCHA_SECRET = Deno.env.get("RECAPTCHA_SECRET");

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
};

// Enhanced input validation
function validateInput(data: any) {
	const errors: string[] = [];

	// Name validation
	if (!data.name || typeof data.name !== "string") {
		errors.push("Name is required");
	} else if (data.name.trim().length < 2 || data.name.trim().length > 100) {
		errors.push("Name must be between 2 and 100 characters");
	} else if (!/^[a-zA-Z\s\-'\.]+$/.test(data.name.trim())) {
		errors.push("Name contains invalid characters");
	}

	// Email validation
	if (!data.email || typeof data.email !== "string") {
		errors.push("Email is required");
	} else if (
		!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email.trim())
	) {
		errors.push("Invalid email format");
	} else if (data.email.trim().length > 254) {
		errors.push("Email is too long");
	}

	// Message validation
	if (!data.message || typeof data.message !== "string") {
		errors.push("Message is required");
	} else if (
		data.message.trim().length < 10 ||
		data.message.trim().length > 5000
	) {
		errors.push("Message must be between 10 and 5000 characters");
	}

	// Company validation (optional but if provided)
	if (data.company && typeof data.company === "string") {
		if (data.company.trim().length > 200) {
			errors.push("Company name is too long");
		}
	}

	return errors;
}

// Send email using SMTP
async function sendEmail(sanitizedData: any, ipAddress: string): Promise<void> {
	const html = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Company:</strong> ${sanitizedData.company}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedData.message.replace(/\n/g, "<br>")}</p>
    <hr>
    <p style="color: #666; font-size: 12px;">
      IP: ${ipAddress}<br>
      Timestamp: ${new Date().toISOString()}
    </p>
  `;

	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: "notifications@cointegrity.io",
			to: ["hello@cointegrity.io"],
			subject: "Contact Form Submission",
			html,
		}),
	});

	const data = await res.json();
	return data;
}

serve(async (req: Request) => {
	const ipAddress =
		req.headers.get("x-forwarded-for") ||
		req.headers.get("x-real-ip") ||
		"unknown";
	const userAgent = req.headers.get("user-agent") || "unknown";

	console.log("Received request:", {
		method: req.method,
		url: req.url,
		ip: ipAddress,
		userAgent: userAgent.substring(0, 100), // Limit log size
	});

	// Handle CORS preflight requests
	if (req.method === "OPTIONS") {
		return new Response(null, { headers: corsHeaders });
	}

	try {
		const requestData = await req.json();
		const { name, email, company, message, recaptchaToken } = requestData;

		// Enhanced input validation
		const validationErrors = validateInput({ name, email, company, message });
		if (validationErrors.length > 0) {
			logSecurityEvent(
				"VALIDATION_FAILED",
				ipAddress,
				userAgent,
				false,
				validationErrors.join(", "),
				requestData,
			);
			throw new Error(`Validation failed: ${validationErrors.join(", ")}`);
		}

		// Log successful validation
		logSecurityEvent(
			"FORM_SUBMISSION_VALIDATED",
			ipAddress,
			userAgent,
			true,
			"",
			requestData,
		);

		// Enhanced reCAPTCHA validation
		if (!recaptchaToken || recaptchaToken === "recaptcha-not-available") {
			console.warn("No reCAPTCHA token provided");
			logSecurityEvent(
				"RECAPTCHA_MISSING",
				ipAddress,
				userAgent,
				false,
				"No reCAPTCHA token provided",
				undefined,
			);
		} else {
			try {
				console.log("Verifying reCAPTCHA token...");
				const recaptchaResponse = await fetch(
					"https://www.google.com/recaptcha/api/siteverify",
					{
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							...corsHeaders,
						},
						body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${ipAddress}`,
					},
				);

				const recaptchaResult = await recaptchaResponse.json();
				console.log("reCAPTCHA verification result:", {
					success: recaptchaResult.success,
					score: recaptchaResult.score,
					errors: recaptchaResult["error-codes"],
				});

				if (!recaptchaResult.success) {
					logSecurityEvent(
						"RECAPTCHA_FAILED",
						ipAddress,
						userAgent,
						false,
						`reCAPTCHA verification failed: ${recaptchaResult["error-codes"]?.join(", ")}`,
						undefined,
					);

					// Only throw error if it's not a browser-error (development)
					if (
						!(
							recaptchaResult["error-codes"] &&
							recaptchaResult["error-codes"].includes("browser-error")
						)
					) {
						throw new Error("Security verification failed");
					}
				}

				if (
					recaptchaResult.success &&
					recaptchaResult.score &&
					recaptchaResult.score < 0.3
				) {
					logSecurityEvent(
						"RECAPTCHA_LOW_SCORE",
						ipAddress,
						userAgent,
						false,
						`Low reCAPTCHA score: ${recaptchaResult.score}`,
						undefined,
					);
					throw new Error("Security verification score too low");
				}

				logSecurityEvent(
					"RECAPTCHA_VERIFIED",
					ipAddress,
					userAgent,
					true,
					"",
					undefined,
				);
			} catch (recaptchaError: unknown) {
				const recaptchaErr = recaptchaError instanceof Error ? recaptchaError : new Error(String(recaptchaError));
				console.warn("reCAPTCHA verification error:", recaptchaErr);
				logSecurityEvent(
					"RECAPTCHA_ERROR",
					ipAddress,
					userAgent,
					false,
					recaptchaErr.message,
					undefined,
				);

				// Only proceed in development environment
				if (!req.headers.get("origin")?.includes("lovableproject.com")) {
					throw recaptchaErr;
				}
			}
		}

		// Sanitize input data
		const sanitizedData = {
			name: name.trim().substring(0, 100),
			email: email.trim().toLowerCase().substring(0, 254),
			company: company ? company.trim().substring(0, 200) : "Not specified",
			message: message.trim().substring(0, 5000),
		};

		try {
			// Send email using SMTP
			const data = await sendEmail(sanitizedData, ipAddress);
			logSecurityEvent(
				"EMAIL_SENT_SUCCESS",
				ipAddress,
				userAgent,
				true,
				"",
				undefined,
			);
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					"content-type": "application/json",
					...corsHeaders,
				},
			});
		} catch (emailError: unknown) {
			const emailErr = emailError instanceof Error ? emailError : new Error(String(emailError));
			console.error("Email sending error:", emailErr);
			logSecurityEvent(
				"EMAIL_SEND_FAILED",
				ipAddress,
				userAgent,
				false,
				emailErr.message,
				undefined,
			);

			// Fail the request if email sending fails (unlike SMTP which continued)
			throw new Error(`Failed to send email: ${emailErr.message}`);
		}
	} catch (error: unknown) {
		const err = error instanceof Error ? error : new Error(String(error));
		console.error("Error in send-contact-email function:", err);

		logSecurityEvent(
			"FORM_SUBMISSION_ERROR",
			ipAddress,
			userAgent,
			false,
			err.message,
			undefined,
		);

		return new Response(
			JSON.stringify({
				error: err.message || "Failed to send email",
				timestamp: new Date().toISOString(),
			}),
			{
				status: 500,
				headers: { "Content-Type": "application/json", ...corsHeaders },
			},
		);
	}
});
function logSecurityEvent(
	reason: string,
	ipAddress: string,
	userAgent: string,
	arg3: boolean,
	errorMessage: string,
	requestData: any,
) {
	console.log({
		reason,
		ipAddress,
		userAgent,
		errorMessage,
		requestData,
	});
}
