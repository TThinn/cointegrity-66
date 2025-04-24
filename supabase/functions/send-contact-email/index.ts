
import { serve } from 'https://deno.fresh.dev/std@v1.0.0/http/server.ts';
import { SmtpClient } from 'https://deno.land/x/smtp@v0.7.0/mod.ts';

const SMTP_HOSTNAME = Deno.env.get('SMTP_HOSTNAME') || '';
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT')) || 587;
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';
const RECAPTCHA_SECRET = Deno.env.get('RECAPTCHA_SECRET') || '';

serve(async (req) => {
  try {
    const { name, email, company, message, recaptchaToken } = await req.json();

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await recaptchaResponse.json();
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      return new Response(
        JSON.stringify({ error: 'reCAPTCHA verification failed' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email
    const client = new SmtpClient();
    await client.connectTLS({
      hostname: SMTP_HOSTNAME,
      port: SMTP_PORT,
      username: SMTP_USERNAME,
      password: SMTP_PASSWORD,
    });

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

    await client.close();

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
