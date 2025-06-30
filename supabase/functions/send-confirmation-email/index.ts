
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

// SMTP Configuration with validation
const SMTP_HOSTNAME = Deno.env.get('SMTP_HOSTNAME') || '';
const SMTP_PORT = Number(Deno.env.get('SMTP_PORT')) || 587;
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Enhanced configuration validation
function validateSMTPConfiguration() {
  const config = {
    hostname: SMTP_HOSTNAME,
    port: SMTP_PORT,
    username: SMTP_USERNAME,
    password: SMTP_PASSWORD ? '[SET]' : '[NOT SET]'
  };
  
  console.log('SMTP Configuration Check:', config);
  
  if (!SMTP_HOSTNAME || !SMTP_USERNAME || !SMTP_PASSWORD) {
    const missing = [];
    if (!SMTP_HOSTNAME) missing.push('SMTP_HOSTNAME');
    if (!SMTP_USERNAME) missing.push('SMTP_USERNAME');
    if (!SMTP_PASSWORD) missing.push('SMTP_PASSWORD');
    
    console.error('Missing SMTP environment variables:', missing);
    return { valid: false, missing };
  }
  
  return { valid: true, missing: [] };
}

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
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] CONFIRMATION EMAIL REQUEST:`, {
    method: req.method,
    url: req.url,
    ip: ipAddress,
    userAgent: userAgent.substring(0, 100),
    timestamp
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log(`[${timestamp}] Handling CORS preflight request`);
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate SMTP configuration early
    const smtpValidation = validateSMTPConfiguration();
    if (!smtpValidation.valid) {
      console.error(`[${timestamp}] SMTP configuration invalid:`, smtpValidation.missing);
      throw new Error(`SMTP configuration incomplete. Missing: ${smtpValidation.missing.join(', ')}`);
    }

    const requestBody = await req.json();
    const { name, email, company } = requestBody;
    
    console.log(`[${timestamp}] Request payload received:`, {
      name: name ? 'PROVIDED' : 'MISSING',
      email: email ? 'PROVIDED' : 'MISSING',
      company: company ? 'PROVIDED' : 'NOT PROVIDED'
    });
    
    // Enhanced input validation
    if (!name || !email) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      
      console.error(`[${timestamp}] Validation failed - missing fields:`, missingFields);
      throw new Error(`Required fields missing: ${missingFields.join(', ')}`);
    }
    
    if (typeof name !== 'string' || typeof email !== 'string') {
      console.error(`[${timestamp}] Validation failed - invalid field types`);
      throw new Error('Name and email must be strings');
    }
    
    if (name.trim().length < 1 || email.trim().length < 1) {
      console.error(`[${timestamp}] Validation failed - empty fields after trim`);
      throw new Error('Name and email cannot be empty');
    }
    
    // Basic email format validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email.trim())) {
      console.error(`[${timestamp}] Validation failed - invalid email format`);
      throw new Error('Invalid email format');
    }
    
    // Generate a unique reference number for this inquiry
    const referenceNumber = generateReferenceNumber();
    console.log(`[${timestamp}] Generated reference number:`, referenceNumber);
    
    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 254),
      company: company ? company.trim().substring(0, 200) : 'Not specified'
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
    
    console.log(`[${timestamp}] Email content prepared, attempting SMTP send...`);
    
    try {
      // Initialize SMTP client with detailed logging
      console.log(`[${timestamp}] Initializing SMTP client...`);
      const client = new SmtpClient();
      
      // Connect to SMTP server with detailed logging
      console.log(`[${timestamp}] Connecting to SMTP server: ${SMTP_HOSTNAME}:${SMTP_PORT}...`);
      await client.connectTLS({
        hostname: SMTP_HOSTNAME,
        port: SMTP_PORT,
        username: SMTP_USERNAME,
        password: SMTP_PASSWORD,
      });
      console.log(`[${timestamp}] SMTP connection established successfully`);

      // Send the email with detailed logging
      console.log(`[${timestamp}] Sending confirmation email to: ${sanitizedData.email}`);
      await client.send({
        from: SMTP_USERNAME,
        to: sanitizedData.email,
        subject: `Confirmation: We've Received Your Request (${referenceNumber})`,
        content: emailText,
        html: emailHtml,
      });

      console.log(`[${timestamp}] Confirmation email sent successfully via SMTP`);
      
      // Close SMTP connection
      await client.close();
      console.log(`[${timestamp}] SMTP connection closed`);
      
    } catch (smtpError) {
      console.error(`[${timestamp}] SMTP ERROR OCCURRED:`, {
        name: smtpError.name,
        message: smtpError.message,
        stack: smtpError.stack?.substring(0, 500),
        timestamp
      });
      
      // Log specific SMTP error details
      if (smtpError.message) {
        console.error(`[${timestamp}] SMTP Error Message:`, smtpError.message);
      }
      
      // Don't throw - log the error and return success response
      console.warn(`[${timestamp}] Confirmation email failed to send, but returning success response to avoid breaking user flow`);
    }
    
    // Always return success response (non-blocking confirmation email)
    const successResponse = {
      message: 'Confirmation email processing completed',
      referenceNumber,
      success: true,
      timestamp,
      recipient: sanitizedData.email
    };
    
    console.log(`[${timestamp}] Returning success response:`, successResponse);
    
    return new Response(
      JSON.stringify(successResponse),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
    
  } catch (error) {
    const errorTimestamp = new Date().toISOString();
    console.error(`[${errorTimestamp}] FUNCTION ERROR:`, {
      name: error.name,
      message: error.message,
      stack: error.stack?.substring(0, 500),
      timestamp: errorTimestamp
    });
    
    // Return detailed error response
    const errorResponse = {
      error: error.message || 'Failed to process confirmation email',
      timestamp: errorTimestamp,
      success: false,
      type: error.name || 'UnknownError'
    };
    
    console.error(`[${errorTimestamp}] Returning error response:`, errorResponse);
    
    return new Response(
      JSON.stringify(errorResponse),
      { 
        status: error.status || 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
