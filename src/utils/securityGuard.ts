import { supabase } from '@/integrations/supabase/client';
import { rateLimiter } from './rateLimiter';

export interface SecurityCheck {
  passed: boolean;
  reason?: string;
  action?: 'block' | 'warn' | 'log';
}

class SecurityGuard {
  // Enhanced input validation
  validateInput(input: string, type: 'email' | 'name' | 'company' | 'general'): SecurityCheck {
    if (!input || typeof input !== 'string') {
      return { passed: false, reason: 'Invalid input type', action: 'block' };
    }

    // Check for excessive length
    if (input.length > 500) {
      return { passed: false, reason: 'Input too long', action: 'block' };
    }

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /eval\(/i,
      /expression\(/i,
      /vbscript:/i,
      /data:text\/html/i
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(input)) {
        return { passed: false, reason: 'Suspicious content detected', action: 'block' };
      }
    }

    // Type-specific validation
    switch (type) {
      case 'email':
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(input)) {
          return { passed: false, reason: 'Invalid email format', action: 'block' };
        }
        break;
      
      case 'name':
        if (input.length < 2 || !/^[a-zA-Z\s'-]+$/.test(input)) {
          return { passed: false, reason: 'Invalid name format', action: 'block' };
        }
        break;
      
      case 'company':
        if (input.length < 2) {
          return { passed: false, reason: 'Company name too short', action: 'block' };
        }
        break;
    }

    return { passed: true };
  }

  // Check for bot behavior - SEO friendly
  checkBotBehavior(userAgent?: string, timing?: number): SecurityCheck {
    if (!userAgent) {
      return { passed: true };
    }

    // Allow legitimate SEO crawlers and bots
    const legitimateBotPatterns = [
      /googlebot/i,
      /bingbot/i,
      /slurp/i,
      /yandexbot/i,
      /baiduspider/i,
      /applebot/i,
      /duckduckbot/i,
      /perplexitybot/i,
      /claude-web/i,
      /chatgpt-user/i,
      /you\.com/i,
      /searchgpt/i,
      /claude-bot/i,
      /twitterbot/i,
      /facebookexternalhit/i,
      /linkedinbot/i,
      /ia_archiver/i,
      /archive\.org_bot/i,
      /wayback/i,
      /commoncrawl/i
    ];

    // Check if it's a legitimate bot first
    const isLegitimateBot = legitimateBotPatterns.some(pattern => 
      pattern.test(userAgent)
    );

    if (isLegitimateBot) {
      return { passed: true };
    }

    // Only block obviously malicious patterns
    const maliciousBotPatterns = [
      /scrapy/i,
      /selenium/i,
      /phantom/i,
      /python-requests.*scraper/i,
      /aggressive.*scraper/i,
    ];

    const isMaliciousBot = maliciousBotPatterns.some(pattern => 
      pattern.test(userAgent)
    );

    if (isMaliciousBot) {
      return {
        passed: false,
        reason: 'Detected malicious scraper behavior',
        action: 'block'
      };
    }

    // Be more lenient with timing for SEO crawlers
    if (timing && timing < 500) {
      return {
        passed: false,
        reason: 'Submission too fast (possible bot)',
        action: 'warn'
      };
    }

    return { passed: true };
  }

  // Validate form submission
  async validateFormSubmission(data: {
    name: string;
    email: string;
    company: string;
    userAgent?: string;
    timing?: number;
  }): Promise<SecurityCheck[]> {
    const checks: SecurityCheck[] = [];

    // Rate limiting check
    const rateLimit = rateLimiter.checkLimit('form-submission');
    if (!rateLimit.allowed) {
      checks.push({
        passed: false,
        reason: rateLimit.reason || 'Rate limit exceeded',
        action: 'block'
      });
    }

    // Input validation
    checks.push(this.validateInput(data.name, 'name'));
    checks.push(this.validateInput(data.email, 'email'));
    checks.push(this.validateInput(data.company, 'company'));

    // Bot detection
    checks.push(this.checkBotBehavior(data.userAgent, data.timing));

    // Check for suspicious activity patterns
    const { suspicious, patterns } = rateLimiter.checkSuspiciousActivity();
    if (suspicious) {
      checks.push({
        passed: false,
        reason: `Suspicious activity: ${patterns.join(', ')}`,
        action: 'warn'
      });
    }

    return checks;
  }

  // Log security events
  async logSecurityEvent(event: {
    type: 'form_submission' | 'rate_limit' | 'bot_detection' | 'validation_failure';
    details: Record<string, any>;
    severity: 'low' | 'medium' | 'high';
    userAgent?: string;
  }): Promise<void> {
    try {
      // In a real implementation, this would go to your audit log
      console.warn('[Security Event]', {
        timestamp: new Date().toISOString(),
        ...event
      });

      // You could also send this to your backend audit system
      // await supabase.from('security_audit_log').insert({
      //   event_type: event.type,
      //   payload: event.details,
      //   user_agent: event.userAgent,
      //   created_at: new Date().toISOString()
      // });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  // Sanitize output to prevent XSS
  sanitizeOutput(input: string): string {
    if (!input) return '';
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
}

export const securityGuard = new SecurityGuard();