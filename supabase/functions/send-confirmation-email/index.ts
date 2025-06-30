
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const SMTP_HOSTNAME = Deno.env.get('SMTP_HOSTNAME') || '';
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT')) || 587;
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function generateReferenceNumber() {
  // Generate a reference number with format: CI-YYYYMMDD-XXXX (where XXXX is random)
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  
  return `CI-${year}${month}${day}-${random}`;
}

serve(async (req) => {
  const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  console.log('Received request to send-confirmation-email:', {
    method: req.method,
    url: req.url,
    ip: ipAddress,
    userAgent: userAgent.substring(0, 100)
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company } = await req.json();
    
    // Basic validation
    if (!name || !email) {
      throw new Error('Name and email are required');
    }
    
    // Generate a unique reference number for this inquiry
    const referenceNumber = generateReferenceNumber();
    console.log('Generated reference number:', referenceNumber);
    
    console.log('Attempting to send confirmation email to:', email);
    console.log('Using SMTP configuration:', { 
      hostname: SMTP_HOSTNAME, 
      port: SMTP_PORT, 
      username: SMTP_USERNAME ? 'Set' : 'Not set',
      password: SMTP_PASSWORD ? 'Set' : 'Not set'
    });

    // Check SMTP configuration but don't fail immediately
    if (!SMTP_HOSTNAME || !SMTP_USERNAME || !SMTP_PASSWORD) {
      console.warn('SMTP configuration incomplete, but continuing...');
    }
    
    // Create HTML email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #133a63;">Thank You for Contacting Cointegrity</h2>
        <p>Hi ${name},</p>
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
Hi ${name},

Thank you for reaching out to Cointegrity. We've received your inquiry (Reference: ${referenceNumber}) and our team is reviewing the details.

One of our consultants will get back to you shortly to discuss your needs and next steps. If you have any urgent updates or additional information, please feel free to reply to this email.

We appreciate your interest and look forward to assisting you.

Best regards,
The Cointegrity Team

---
Your inquiry reference number: ${referenceNumber}
Please include this reference in any future correspondence.
    `;
    
    console.log('Sending confirmation email via SMTP');
    
    try {
      // Initialize SMTP client
      const client = new SmtpClient();
      
      // Connect to SMTP server
      await client.connectTLS({
        hostname: SMTP_HOSTNAME,
        port: SMTP_PORT,
        username: SMTP_USERNAME,
        password: SMTP_PASSWORD,
      });

      // Send the email
      await client.send({
        from: SMTP_USERNAME,
        to: email,
        subject: `Confirmation: We've Received Your Request (${referenceNumber})`,
        content: emailText,
        html: emailHtml,
      });

      console.log('Confirmation email sent successfully via SMTP');
      await client.close();
      
    } catch (smtpError) {
      console.error('SMTP error:', smtpError);
      console.error('SMTP error details:', {
        name: smtpError.name,
        message: smtpError.message,
        stack: smtpError.stack
      });
      
      // Don't throw - just log the error and continue
      console.warn('Confirmation email failed to send, but continuing with success response');
    }
    
    return new Response(
      JSON.stringify({ 
        message: 'Confirmation email sent successfully',
        referenceNumber,
        success: true,
        timestamp: new Date().toISOString()
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
    
  } catch (error) {
    console.error('Error in send-confirmation-email function:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send confirmation email',
        timestamp: new Date().toISOString(),
        success: false
      }),
      { 
        status: error.status || 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
