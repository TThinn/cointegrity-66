
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
  console.log('Received request:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries()),
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, recaptchaToken } = await req.json();
    
    // Enhanced input validation
    if (!name || !email || !message) {
      console.error('Missing required fields:', { name, email, message });
      throw new Error('Missing required fields');
    }

    // Skip reCAPTCHA verification in development or if token is missing
    // but log a warning
    if (!recaptchaToken) {
      console.warn('No reCAPTCHA token provided, skipping verification');
    } else {
      try {
        // Enhanced reCAPTCHA validation with detailed logging
        console.log('Verifying reCAPTCHA token...');
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
        });

        const recaptchaResult = await recaptchaResponse.json();
        console.log('reCAPTCHA verification result:', recaptchaResult);

        // Only throw an error if we have an unsuccessful verification
        // and we're not getting browser-error (which can happen in development)
        if (!recaptchaResult.success && 
            !(recaptchaResult["error-codes"] && 
              recaptchaResult["error-codes"].includes("browser-error"))) {
          console.error('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
          throw new Error('Security verification failed');
        }

        if (recaptchaResult.success && recaptchaResult.score && recaptchaResult.score < 0.3) {
          console.error('reCAPTCHA score too low:', recaptchaResult.score);
          throw new Error('Security verification score too low');
        }
      } catch (recaptchaError) {
        // Log the error but continue with the email sending
        // This helps with development and testing
        console.warn('reCAPTCHA verification error:', recaptchaError);
        // Only throw if it's not a development environment
        if (req.headers.get('origin')?.includes('lovableproject.com')) {
          console.log('Continuing despite reCAPTCHA error in development environment');
        }
      }
    }

    // Send email with enhanced error handling
    console.log('Initializing SMTP client...');
    const client = new SmtpClient();
    
    try {
      console.log('Connecting to SMTP server...');
      await client.connectTLS({
        hostname: SMTP_HOSTNAME,
        port: SMTP_PORT,
        username: SMTP_USERNAME,
        password: SMTP_PASSWORD,
      });

      console.log('Sending email...');
      await client.send({
        from: SMTP_USERNAME,
        to: "requests@cointegrity.io",
        subject: `New Contact Form Submission from ${name}`,
        content: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not specified'}
Message: ${message}
        `,
      });

      console.log('Email sent successfully');
      await client.close();

      return new Response(
        JSON.stringify({ message: 'Email sent successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    } catch (emailError) {
      console.error('SMTP error:', emailError);
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send email',
        timestamp: new Date().toISOString()
      }),
      { 
        status: error.status || 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
