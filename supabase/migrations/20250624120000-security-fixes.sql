
-- Security fixes migration
-- Fix critical RLS policy gaps and enhance security

-- 1. Add proper RLS policies for newsletter_subscriptions table
-- First, enable RLS if not already enabled
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Drop any existing overly permissive policies
DROP POLICY IF EXISTS "Public can read newsletter_subscriptions" ON public.newsletter_subscriptions;

-- Create restrictive policy for newsletter signup (only allow INSERT)
CREATE POLICY "Allow newsletter signup only" 
  ON public.newsletter_subscriptions 
  FOR INSERT 
  WITH CHECK (true);

-- Admin/service accounts can read (for management purposes)
-- This would require authentication to be properly restrictive
CREATE POLICY "Service accounts can read newsletter_subscriptions" 
  ON public.newsletter_subscriptions 
  FOR SELECT 
  USING (false); -- Disabled by default, enable when auth is implemented

-- 2. Enhance waitlist table security
-- Replace overly permissive read policy with more restrictive one
DROP POLICY IF EXISTS "Public can read waitlist" ON public.waitlist;

-- Only allow reading your own waitlist entry (when auth is implemented)
-- For now, disable reading to prevent data exposure
CREATE POLICY "Restrict waitlist reading" 
  ON public.waitlist 
  FOR SELECT 
  USING (false); -- Disabled until proper authentication

-- Keep the insert policy but make it more specific
DROP POLICY IF EXISTS "Anyone can sign up for waitlist" ON public.waitlist;

CREATE POLICY "Allow waitlist signup with validation" 
  ON public.waitlist 
  FOR INSERT 
  WITH CHECK (
    name IS NOT NULL AND 
    email IS NOT NULL AND 
    company IS NOT NULL AND
    length(name) > 0 AND 
    length(email) > 0 AND 
    length(company) > 0 AND
    email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  );

-- 3. Add rate limiting table for basic protection
CREATE TABLE IF NOT EXISTS public.rate_limit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET,
  endpoint TEXT NOT NULL,
  attempts INTEGER DEFAULT 1,
  first_attempt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_attempt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on rate limiting table
ALTER TABLE public.rate_limit_log ENABLE ROW LEVEL SECURITY;

-- Only service functions can manage rate limiting
CREATE POLICY "Service functions only" 
  ON public.rate_limit_log 
  FOR ALL 
  USING (false);

-- 4. Add audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  endpoint TEXT,
  payload JSONB,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Only service functions can write to audit log
CREATE POLICY "Service audit logging only" 
  ON public.security_audit_log 
  FOR INSERT 
  WITH CHECK (false); -- Will be managed by edge functions only

-- 5. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_rate_limit_ip_endpoint ON public.rate_limit_log(ip_address, endpoint);
CREATE INDEX IF NOT EXISTS idx_rate_limit_last_attempt ON public.rate_limit_log(last_attempt);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON public.security_audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_event_type ON public.security_audit_log(event_type);
