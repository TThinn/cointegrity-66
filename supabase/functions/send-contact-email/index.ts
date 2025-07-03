
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const SMTP_HOST = Deno.env.get('SMTP_HOST') || '';
const SMTP_PORT = parseInt(Deno.env.get('SMTP_PORT') || '587');
const SMTP_USERNAME = Deno.env.get('SMTP_USERNAME') || '';
const SMTP_PASSWORD = Deno.env.get('SMTP_PASSWORD') || '';
const RECAPTCHA_SECRET = Deno.env.get('RECAPTCHA_SECRET') || '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Supabase client for audit logging
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Enhanced input validation
function validateInput(data: any) {
  const errors = [];
  
  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2 || data.name.trim().length > 100) {
    errors.push('Name must be between 2 and 100 characters');
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(data.name.trim())) {
    errors.push('Name contains invalid characters');
  }
  
  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(data.email.trim())) {
    errors.push('Invalid email format');
  } else if (data.email.trim().length > 254) {
    errors.push('Email is too long');
  }
  
  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10 || data.message.trim().length > 5000) {
    errors.push('Message must be between 10 and 5000 characters');
  }
  
  // Company validation (optional but if provided)
  if (data.company && typeof data.company === 'string') {
    if (data.company.trim().length > 200) {
      errors.push('Company name is too long');
    }
  }
  
  return errors;
}

// Enhanced rate limiting check (optional - won't fail if tables don't exist)
async function checkRateLimit(ipAddress: string): Promise<boolean> {
  try {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    // Check current rate limit for this IP
    const { data: rateLimitData, error } = await supabase
      .from('rate_limit_log')
      .select('attempts, blocked_until')
      .eq('ip_address', ipAddress)
      .eq('endpoint', 'contact-form')
      .gte('last_attempt', oneHourAgo.toISOString())
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.warn('Rate limit check error (tables may not exist):', error);
      return true; // Allow if we can't check
    }
    
    // If blocked, check if block period has expired
    if (rateLimitData?.blocked_until) {
      const blockedUntil = new Date(rateLimitData.blocked_until);
      if (now < blockedUntil) {
        return false; // Still blocked
      }
    }
    
    // Check if too many attempts
    if (rateLimitData?.attempts >= 5) {
      // Block for 1 hour
      const blockUntil = new Date(now.getTime() + 60 * 60 * 1000);
      await supabase
        .from('rate_limit_log')
        .upsert({
          ip_address: ipAddress,
          endpoint: 'contact-form',
          attempts: rateLimitData.attempts + 1,
          last_attempt: now.toISOString(),
          blocked_until: blockUntil.toISOString()
        });
      return false;
    }
    
    // Update attempt count
    await supabase
      .from('rate_limit_log')
      .upsert({
        ip_address: ipAddress,
        endpoint: 'contact-form',
        attempts: (rateLimitData?.attempts || 0) + 1,
        first_attempt: rateLimitData?.first_attempt || now.toISOString(),
        last_attempt: now.toISOString()
      });
    
    return true;
  } catch (error) {
    console.warn('Rate limiting error (optional feature):', error);
    return true; // Allow if rate limiting fails
  }
}

// Security audit logging (optional - won't fail if tables don't exist)
async function logSecurityEvent(eventType: string, ipAddress: string, userAgent: string, success: boolean, errorMessage?: string, payload?: any) {
  try {
    // Remove sensitive data from payload
    const sanitizedPayload = payload ? {
      ...payload,
      recaptchaToken: payload.recaptchaToken ? '[REDACTED]' : undefined,
      email: payload.email ? payload.email.substring(0, 3) + '***' : undefined
    } : undefined;
    
    await supabase
      .from('security_audit_log')
      .insert({
        event_type: eventType,
        ip_address: ipAddress,
        user_agent: userAgent,
        endpoint: 'contact-form',
        payload: sanitizedPayload,
        success,
        error_message: errorMessage
      });
  } catch (error) {
    console.warn('Failed to log security event (optional feature):', error);
  }
}

// Send email using SMTP
async function sendEmailWithSMTP(sanitizedData: any, ipAddress: string, userAgent: string): Promise<void> {
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

  const emailContent = `
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Company: ${sanitizedData.company}
Message: ${sanitizedData.message}

---
IP Address: ${ipAddress}
User Agent: ${userAgent.substring(0, 200)}
Timestamp: ${new Date().toISOString()}
`;

  const htmlContent = `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Company:</strong> ${sanitizedData.company}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
    <hr>
    <p style="color: #666; font-size: 12px;">
      IP: ${ipAddress}<br>
      Timestamp: ${new Date().toISOString()}
    </p>
  `;

  console.log('Sending email via SMTP...');
  
  await client.send({
    from: "hello@cointegrity.io",
    to: "hello@cointegrity.io",
    subject: `New Contact Form Submission from ${sanitizedData.name}`,
    content: emailContent,
    html: htmlContent,
  });

  await client.close();
  console.log('Email sent successfully via SMTP');
}

serve(async (req) => {
  const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  console.log('Received request:', {
    method: req.method,
    url: req.url,
    ip: ipAddress,
    userAgent: userAgent.substring(0, 100) // Limit log size
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const rateLimitPassed = await checkRateLimit(ipAddress);
    if (!rateLimitPassed) {
      await logSecurityEvent('RATE_LIMIT_EXCEEDED', ipAddress, userAgent, false, 'Too many requests');
      throw new Error('Too many requests. Please try again later.');
    }

    const requestData = await req.json();
    const { name, email, company, message, recaptchaToken } = requestData;
    
    // Enhanced input validation
    const validationErrors = validateInput({ name, email, company, message });
    if (validationErrors.length > 0) {
      await logSecurityEvent('VALIDATION_FAILED', ipAddress, userAgent, false, validationErrors.join(', '), requestData);
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
    }
    
    // Log successful validation
    await logSecurityEvent('FORM_SUBMISSION_VALIDATED', ipAddress, userAgent, true, undefined, requestData);
    
    // Enhanced reCAPTCHA validation
    if (!recaptchaToken || recaptchaToken === 'recaptcha-not-available') {
      console.warn('No reCAPTCHA token provided');
      await logSecurityEvent('RECAPTCHA_MISSING', ipAddress, userAgent, false, 'No reCAPTCHA token provided');
    } else {
      try {
        console.log('Verifying reCAPTCHA token...');
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${RECAPTCHA_SECRET}&response=${recaptchaToken}&remoteip=${ipAddress}`,
        });

        const recaptchaResult = await recaptchaResponse.json();
        console.log('reCAPTCHA verification result:', { 
          success: recaptchaResult.success, 
          score: recaptchaResult.score,
          errors: recaptchaResult['error-codes']
        });

        if (!recaptchaResult.success) {
          await logSecurityEvent('RECAPTCHA_FAILED', ipAddress, userAgent, false, `reCAPTCHA verification failed: ${recaptchaResult['error-codes']?.join(', ')}`);
          
          // Only throw error if it's not a browser-error (development)
          if (!(recaptchaResult["error-codes"] && recaptchaResult["error-codes"].includes("browser-error"))) {
            throw new Error('Security verification failed');
          }
        }

        if (recaptchaResult.success && recaptchaResult.score && recaptchaResult.score < 0.3) {
          await logSecurityEvent('RECAPTCHA_LOW_SCORE', ipAddress, userAgent, false, `Low reCAPTCHA score: ${recaptchaResult.score}`);
          throw new Error('Security verification score too low');
        }
        
        await logSecurityEvent('RECAPTCHA_VERIFIED', ipAddress, userAgent, true);
      } catch (recaptchaError) {
        console.warn('reCAPTCHA verification error:', recaptchaError);
        await logSecurityEvent('RECAPTCHA_ERROR', ipAddress, userAgent, false, recaptchaError.message);
        
        // Only proceed in development environment
        if (!req.headers.get('origin')?.includes('lovableproject.com')) {
          throw recaptchaError;
        }
      }
    }

    // Sanitize input data
    const sanitizedData = {
      name: name.trim().substring(0, 100),
      email: email.trim().toLowerCase().substring(0, 254),
      company: company ? company.trim().substring(0, 200) : 'Not specified',
      message: message.trim().substring(0, 5000)
    };
    
    const formattedMessage = `
Name: ${sanitizedData.name}
Email: ${sanitizedData.email}
Company: ${sanitizedData.company}
Message: ${sanitizedData.message}
IP Address: ${ipAddress}
User Agent: ${userAgent.substring(0, 200)}
Timestamp: ${new Date().toISOString()}
    `;
    
    console.log('Attempting to send email...');
    
    try {
      // Send email using SMTP
      await sendEmailWithSMTP(sanitizedData, ipAddress, userAgent);
      await logSecurityEvent('EMAIL_SENT_SUCCESS', ipAddress, userAgent, true);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      await logSecurityEvent('EMAIL_SEND_FAILED', ipAddress, userAgent, false, emailError.message);
      
      // Fail the request if email sending fails (unlike SMTP which continued)
      throw new Error(`Failed to send email: ${emailError.message}`);
    }

    await logSecurityEvent('FORM_SUBMISSION_SUCCESS', ipAddress, userAgent, true);

    return new Response(
      JSON.stringify({ 
        message: 'Thank you for your submission!',
        received: true,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
    
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    
    await logSecurityEvent('FORM_SUBMISSION_ERROR', ipAddress, userAgent, false, error.message);
    
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
