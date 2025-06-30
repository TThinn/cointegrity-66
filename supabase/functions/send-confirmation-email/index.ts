
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') || '';

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
  console.log('Received request to send-confirmation-email:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries()),
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company } = await req.json();
    
    // Generate a unique reference number for this inquiry
    const referenceNumber = generateReferenceNumber();
    console.log('Generated reference number:', referenceNumber);
    
    console.log('Attempting to send confirmation email to:', email);
    console.log('Using Resend API key:', RESEND_API_KEY ? 'Found' : 'Not found');

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not found in environment variables');
    }
    
    // Using fetch directly 
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
    
    console.log('Sending email via Resend API');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Cointegrity <hello@cointegrity.io>',
        to: [email],
        subject: `Confirmation: We've Received Your Request (${referenceNumber})`,
        html: emailHtml,
        reply_to: "hello@cointegrity.io"
      })
    });
    
    const responseText = await response.text();
    console.log(`Resend API response status: ${response.status}`);
    console.log(`Resend API response body: ${responseText}`);
    
    if (!response.ok) {
      throw new Error(`Resend API error: ${response.status} ${response.statusText} - ${responseText}`);
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Confirmation email sent successfully:', data);
    } catch (parseError) {
      console.warn('Could not parse response as JSON:', responseText);
      data = { id: 'unknown', message: 'Email sent but response could not be parsed' };
    }
    
    return new Response(
      JSON.stringify({ 
        message: 'Confirmation email sent successfully',
        referenceNumber,
        success: true,
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
    
  } catch (error) {
    console.error('Error in send-confirmation-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to send confirmation email',
        timestamp: new Date().toISOString()
      }),
      { 
        status: error.status || 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
});
