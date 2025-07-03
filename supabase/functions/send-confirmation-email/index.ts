
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const SMTP_HOST = Deno.env.get('SMTP_HOST') || '';
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Send email using SMTP
async function sendEmailWithSMTP(sanitizedData: any, referenceNumber: string, emailHtml: string, emailText: string): Promise<void> {
  if (!SMTP_HOST || !SMTP_USERNAME || !SMTP_PASSWORD) {
    throw new Error('SMTP configuration not complete');
  }

  const client = new SMTPClient({
    connection: {
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      tls: true,
      auth: {
        username: SMTP_USERNAME,
        password: SMTP_PASSWORD,
      },
    },
  });

  console.log('Sending confirmation email via SMTP...');
  
  await client.send({
    from: "hello@cointegrity.io",
    to: sanitizedData.email,
    subject: `Confirmation: We've Received Your Request (${referenceNumber})`,
    content: emailText,
    html: emailHtml,
  });

  await client.close();
  console.log('Confirmation email sent successfully via SMTP');
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
      // Send email using SMTP
      await sendEmailWithSMTP(sanitizedData, referenceNumber, emailHtml, emailText);
      console.log(`[${timestamp}] Confirmation email sent successfully via SMTP`);
      
    } catch (emailError) {
      console.error(`[${timestamp}] EMAIL ERROR OCCURRED:`, {
        name: emailError.name,
        message: emailError.message,
        stack: emailError.stack?.substring(0, 500),
        timestamp
      });
      
      // Don't throw - log the error and return success response to avoid breaking user flow
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
