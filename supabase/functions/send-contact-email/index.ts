
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const SMTP_HOSTNAME = Deno.env.get('SMTP_HOSTNAME') || '';
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT')) || 587;
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';
const RECAPTCHA_SECRET = Deno.env.get('RECAPTCHA_SECRET') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log("Received request:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("Handling OPTIONS request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Processing request body");
    const { name, email, company, message, recaptchaToken } = await req.json();
    
    console.log("Form data received:", { name, email, company, message });
    console.log("reCAPTCHA token present:", !!recaptchaToken);
    
    // Verify reCAPTCHA token - comment this out during testing if needed
    if (RECAPTCHA_SECRET) {
      console.log("Verifying reCAPTCHA token");
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
      });

      const recaptchaResult = await recaptchaResponse.json();
      console.log("reCAPTCHA result:", recaptchaResult);
      
      if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
        console.log("reCAPTCHA verification failed");
        return new Response(
          JSON.stringify({ error: 'reCAPTCHA verification failed' }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
        );
      }
    } else {
      console.log("No reCAPTCHA secret found - skipping verification");
    }

    // Check SMTP configuration
    if (!SMTP_HOSTNAME || !SMTP_USERNAME || !SMTP_PASSWORD) {
      console.log("Missing SMTP configuration");
      return new Response(
        JSON.stringify({ error: 'SMTP configuration is missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    console.log("Connecting to SMTP server");
    // Send email
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: SMTP_HOSTNAME,
      port: SMTP_PORT,
      username: SMTP_USERNAME,
      password: SMTP_PASSWORD,
    });

    console.log("Sending email");
    await client.send({
      from: SMTP_USERNAME,
      to: "requests@cointegrity.io",
      subject: `New Contact Form Submission from ${name}`,
      content: `
Name: ${name}
Email: ${email}
Company: ${company}
Message: ${message}
      `,
    });

    console.log("Closing SMTP connection");
    await client.close();

    console.log("Email sent successfully");
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to send email: ' + error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
});
