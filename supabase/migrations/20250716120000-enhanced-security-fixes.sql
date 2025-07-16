-- Enhanced security fixes migration
-- Additional security measures beyond basic RLS

-- 1. Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type TEXT,
  ip_address INET DEFAULT NULL,
  user_agent TEXT DEFAULT NULL,
  endpoint TEXT DEFAULT NULL,
  payload JSONB DEFAULT NULL,
  success BOOLEAN DEFAULT true,
  error_message TEXT DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type,
    ip_address,
    user_agent,
    endpoint,
    payload,
    success,
    error_message,
    created_at
  ) VALUES (
    event_type,
    ip_address,
    user_agent,
    endpoint,
    payload,
    success,
    error_message,
    now()
  );
END;
$$;

-- 2. Create enhanced rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  client_ip INET,
  endpoint_name TEXT,
  max_requests INTEGER DEFAULT 30,
  window_minutes INTEGER DEFAULT 1
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  window_start := now() - INTERVAL '1 minute' * window_minutes;
  
  -- Count requests in the current window
  SELECT COUNT(*)
  INTO current_count
  FROM public.rate_limit_log
  WHERE ip_address = client_ip
    AND endpoint = endpoint_name
    AND last_attempt > window_start;
  
  -- If within limit, log the request
  IF current_count < max_requests THEN
    INSERT INTO public.rate_limit_log (
      ip_address,
      endpoint,
      attempts,
      first_attempt,
      last_attempt
    ) VALUES (
      client_ip,
      endpoint_name,
      1,
      now(),
      now()
    )
    ON CONFLICT (ip_address, endpoint)
    DO UPDATE SET
      attempts = rate_limit_log.attempts + 1,
      last_attempt = now();
    
    RETURN true;
  ELSE
    -- Update blocked status
    UPDATE public.rate_limit_log
    SET blocked_until = now() + INTERVAL '5 minutes'
    WHERE ip_address = client_ip AND endpoint = endpoint_name;
    
    RETURN false;
  END IF;
END;
$$;

-- 3. Create input validation function
CREATE OR REPLACE FUNCTION public.validate_form_input(
  input_name TEXT,
  input_email TEXT,
  input_company TEXT,
  input_message TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  errors JSONB := '[]'::JSONB;
BEGIN
  -- Name validation
  IF input_name IS NULL OR LENGTH(TRIM(input_name)) < 2 THEN
    errors := errors || '["Name must be at least 2 characters"]'::JSONB;
  END IF;
  
  IF LENGTH(TRIM(input_name)) > 100 THEN
    errors := errors || '["Name must be less than 100 characters"]'::JSONB;
  END IF;
  
  -- Email validation
  IF input_email IS NULL OR NOT input_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    errors := errors || '["Invalid email format"]'::JSONB;
  END IF;
  
  IF LENGTH(TRIM(input_email)) > 254 THEN
    errors := errors || '["Email address too long"]'::JSONB;
  END IF;
  
  -- Company validation
  IF input_company IS NULL OR LENGTH(TRIM(input_company)) < 2 THEN
    errors := errors || '["Company name must be at least 2 characters"]'::JSONB;
  END IF;
  
  IF LENGTH(TRIM(input_company)) > 200 THEN
    errors := errors || '["Company name too long"]'::JSONB;
  END IF;
  
  -- Message validation (if provided)
  IF input_message IS NOT NULL THEN
    IF LENGTH(TRIM(input_message)) < 10 THEN
      errors := errors || '["Message must be at least 10 characters"]'::JSONB;
    END IF;
    
    IF LENGTH(TRIM(input_message)) > 5000 THEN
      errors := errors || '["Message too long"]'::JSONB;
    END IF;
  END IF;
  
  RETURN jsonb_build_object('valid', jsonb_array_length(errors) = 0, 'errors', errors);
END;
$$;

-- 4. Enhanced policies with validation triggers
CREATE OR REPLACE FUNCTION public.validate_waitlist_insert()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  validation_result JSONB;
BEGIN
  -- Validate input
  validation_result := public.validate_form_input(
    NEW.name,
    NEW.email,
    NEW.company,
    NULL
  );
  
  IF NOT (validation_result->>'valid')::BOOLEAN THEN
    RAISE EXCEPTION 'Validation failed: %', validation_result->'errors';
  END IF;
  
  -- Log the insertion attempt
  PERFORM public.log_security_event(
    'waitlist_signup',
    inet_client_addr(),
    NULL,
    'waitlist',
    jsonb_build_object('email', NEW.email, 'company', NEW.company),
    true,
    NULL
  );
  
  RETURN NEW;
END;
$$;

-- Add trigger for waitlist validation
DROP TRIGGER IF EXISTS validate_waitlist_trigger ON public.waitlist;
CREATE TRIGGER validate_waitlist_trigger
  BEFORE INSERT ON public.waitlist
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_waitlist_insert();

-- 5. Create honeypot table for bot detection
CREATE TABLE IF NOT EXISTS public.honeypot_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address INET,
  user_agent TEXT,
  form_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on honeypot table
ALTER TABLE public.honeypot_submissions ENABLE ROW LEVEL SECURITY;

-- Only service functions can write to honeypot
CREATE POLICY "Service honeypot logging only" 
  ON public.honeypot_submissions 
  FOR INSERT 
  WITH CHECK (false);

-- 6. Add suspicious activity detection
CREATE OR REPLACE FUNCTION public.detect_suspicious_activity(
  client_ip INET,
  user_agent TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  recent_submissions INTEGER;
  bot_patterns TEXT[] := ARRAY['bot', 'crawler', 'spider', 'scraper', 'curl', 'wget', 'python', 'requests'];
  pattern TEXT;
  suspicious_score INTEGER := 0;
  flags TEXT[] := ARRAY[]::TEXT[];
BEGIN
  -- Check submission frequency
  SELECT COUNT(*)
  INTO recent_submissions
  FROM public.security_audit_log
  WHERE ip_address = client_ip
    AND created_at > now() - INTERVAL '1 hour'
    AND event_type IN ('waitlist_signup', 'contact_form');
  
  IF recent_submissions > 5 THEN
    suspicious_score := suspicious_score + 3;
    flags := array_append(flags, 'high_frequency');
  END IF;
  
  -- Check user agent for bot patterns
  IF user_agent IS NOT NULL THEN
    FOREACH pattern IN ARRAY bot_patterns
    LOOP
      IF user_agent ILIKE '%' || pattern || '%' THEN
        suspicious_score := suspicious_score + 5;
        flags := array_append(flags, 'bot_user_agent');
        EXIT;
      END IF;
    END LOOP;
  ELSE
    suspicious_score := suspicious_score + 2;
    flags := array_append(flags, 'missing_user_agent');
  END IF;
  
  -- Log if suspicious
  IF suspicious_score >= 3 THEN
    PERFORM public.log_security_event(
      'suspicious_activity',
      client_ip,
      user_agent,
      'detection',
      jsonb_build_object(
        'score', suspicious_score,
        'flags', flags,
        'recent_submissions', recent_submissions
      ),
      false,
      'Suspicious activity detected'
    );
  END IF;
  
  RETURN jsonb_build_object(
    'suspicious', suspicious_score >= 3,
    'score', suspicious_score,
    'flags', flags
  );
END;
$$;

-- 7. Add cleanup function for old logs
CREATE OR REPLACE FUNCTION public.cleanup_security_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete rate limit logs older than 24 hours
  DELETE FROM public.rate_limit_log
  WHERE last_attempt < now() - INTERVAL '24 hours';
  
  -- Delete audit logs older than 30 days (keep only essential ones)
  DELETE FROM public.security_audit_log
  WHERE created_at < now() - INTERVAL '30 days'
    AND event_type NOT IN ('suspicious_activity', 'security_violation');
  
  -- Delete honeypot submissions older than 7 days
  DELETE FROM public.honeypot_submissions
  WHERE created_at < now() - INTERVAL '7 days';
END;
$$;

-- 8. Grant necessary permissions
GRANT EXECUTE ON FUNCTION public.log_security_event TO anon;
GRANT EXECUTE ON FUNCTION public.check_rate_limit TO anon;
GRANT EXECUTE ON FUNCTION public.validate_form_input TO anon;
GRANT EXECUTE ON FUNCTION public.detect_suspicious_activity TO anon;

-- Only service role can cleanup
GRANT EXECUTE ON FUNCTION public.cleanup_security_logs TO service_role;

-- 9. Add unique constraint for rate limiting
CREATE UNIQUE INDEX IF NOT EXISTS idx_rate_limit_unique 
  ON public.rate_limit_log(ip_address, endpoint);

-- Add partial index for active blocks
CREATE INDEX IF NOT EXISTS idx_rate_limit_blocked 
  ON public.rate_limit_log(ip_address, blocked_until) 
  WHERE blocked_until IS NOT NULL AND blocked_until > now();