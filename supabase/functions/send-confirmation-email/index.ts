import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
};

// Send email using SMTP
async function sendEmail(
	sanitizedData: any,
	referenceNumber: string,
	emailHtml: string,
	emailText: string,
) {
	const res = await fetch("https://api.resend.com/emails", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${RESEND_API_KEY}`,
		},
		body: JSON.stringify({
			from: "Cointegrity <hello@cointegrity.io>",
			to: [sanitizedData.email],
			subject: `Cointegrity - Request ${referenceNumber}`,
			text: emailText,
			html: emailHtml,
		}),
	});

	const data = await res.json();
	return data;
}

function generateReferenceNumber() {
	// Generate a reference number with format: CI-YYYYMMDD-XXXX (where XXXX is random)
	const date = new Date();
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

	return `CI-${year}${month}${day}-${random}`;
}

serve(async (req) => {
	const ipAddress =
		req.headers.get("x-forwarded-for") ||
		req.headers.get("x-real-ip") ||
		"unknown";
	const userAgent = req.headers.get("user-agent") || "unknown";
	const timestamp = new Date().toISOString();

	console.log(`[${timestamp}] CONFIRMATION EMAIL REQUEST:`, {
		method: req.method,
		url: req.url,
		ip: ipAddress,
		userAgent: userAgent.substring(0, 100),
		timestamp,
	});

	// Handle CORS preflight requests
	if (req.method === "OPTIONS") {
		console.log(`[${timestamp}] Handling CORS preflight request`);
		return new Response(null, { headers: corsHeaders });
	}

	try {
		const requestBody = await req.json();
		const { name, email, company } = requestBody;

		console.log(`[${timestamp}] Request payload received:`, {
			name: name ? "PROVIDED" : "MISSING",
			email: email ? "PROVIDED" : "MISSING",
			company: company ? "PROVIDED" : "NOT PROVIDED",
		});

		// Enhanced input validation
		if (!name || !email) {
			const missingFields = [];
			if (!name) missingFields.push("name");
			if (!email) missingFields.push("email");

			console.error(
				`[${timestamp}] Validation failed - missing fields:`,
				missingFields,
			);
			throw new Error(`Required fields missing: ${missingFields.join(", ")}`);
		}

		if (typeof name !== "string" || typeof email !== "string") {
			console.error(`[${timestamp}] Validation failed - invalid field types`);
			throw new Error("Name and email must be strings");
		}

		if (name.trim().length < 1 || email.trim().length < 1) {
			console.error(
				`[${timestamp}] Validation failed - empty fields after trim`,
			);
			throw new Error("Name and email cannot be empty");
		}

		// Basic email format validation
		const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
		if (!emailRegex.test(email.trim())) {
			console.error(`[${timestamp}] Validation failed - invalid email format`);
			throw new Error("Invalid email format");
		}

		// Generate a unique reference number for this inquiry
		const referenceNumber = generateReferenceNumber();
		console.log(`[${timestamp}] Generated reference number:`, referenceNumber);

		// Sanitize inputs
		const sanitizedData = {
			name: name.trim().substring(0, 100),
			email: email.trim().toLowerCase().substring(0, 254),
			company: company ? company.trim().substring(0, 200) : "Not specified",
		};

		console.log(`[${timestamp}] Sanitized data prepared for email`);

		// Create HTML email content
		const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #133a63;">Thank You for Contacting Cointegrity</h2>
        <p>Hi ${sanitizedData.name},</p>
        <p>Thank you for reaching out to Cointegrity. We've received your inquiry (Reference: <strong>${referenceNumber}</strong>) and our team is reviewing the details.</p>
        <p>One of our consultants will get back to you shortly to discuss your needs and next steps. If you have any urgent updates or additional information, please feel free to reply to this email.</p>
        <p>We appreciate your interest and look forward to assisting you.</p>
        <p>Best regards,<br>The Cointegrity Team</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #666;">
          Your inquiry reference number: ${referenceNumber}<br>
          Please include this reference in any future correspondence.
        </p>
      </div>
    `;

		// Create plain text version as fallback
		const emailText = `
Hi ${sanitizedData.name},

Thank you for reaching out to Cointegrity. We've received your inquiry (Reference: ${referenceNumber}) and our team is reviewing the details.

One of our consultants will get back to you shortly to discuss your needs and next steps. If you have any urgent updates or additional information, please feel free to reply to this email.

We appreciate your interest and look forward to assisting you.

Best regards,
The Cointegrity Team

---
Your inquiry reference number: ${referenceNumber}
Please include this reference in any future correspondence.
    `;

		console.log(
			`[${timestamp}] Email content prepared, attempting SMTP send...`,
		);

		try {
			// Send email using SMTP
			const data = await sendEmail(
				sanitizedData,
				referenceNumber,
				emailHtml,
				emailText,
			);
			console.log(
				`[${timestamp}] Confirmation email sent successfully via SMTP`,
			);
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: {
					"content-type": "application/json",
					...corsHeaders,
				},
			});
		} catch (emailError: unknown) {
			const err = emailError instanceof Error ? emailError : new Error(String(emailError));
			console.error(`[${timestamp}] EMAIL ERROR OCCURRED:`, {
				name: err.name,
				message: err.message,
				stack: err.stack?.substring(0, 500),
				timestamp,
			});

			// Don't throw - log the error and return success response to avoid breaking user flow
			console.warn(
				`[${timestamp}] Confirmation email failed to send, but returning success response to avoid breaking user flow`,
			);
		}

		// Always return success response (non-blocking confirmation email)
		const successResponse = {
			message: "Confirmation email processing completed",
			referenceNumber,
			success: true,
			timestamp,
			recipient: sanitizedData.email,
		};

		console.log(`[${timestamp}] Returning success response:`, successResponse);

		return new Response(JSON.stringify(successResponse), {
			status: 200,
			headers: { "Content-Type": "application/json", ...corsHeaders },
		});
	} catch (error: unknown) {
		const err = error instanceof Error ? error : new Error(String(error));
		const errorTimestamp = new Date().toISOString();
		console.error(`[${errorTimestamp}] FUNCTION ERROR:`, {
			name: err.name,
			message: err.message,
			stack: err.stack?.substring(0, 500),
			timestamp: errorTimestamp,
		});

		// Return detailed error response
		const errorResponse = {
			error: err.message || "Failed to process confirmation email",
			timestamp: errorTimestamp,
			success: false,
			type: err.name || "UnknownError",
		};

		console.error(
			`[${errorTimestamp}] Returning error response:`,
			errorResponse,
		);

		return new Response(JSON.stringify(errorResponse), {
			status: 500,
			headers: { "Content-Type": "application/json", ...corsHeaders },
		});
	}
});
