import React, { createContext, useContext, useEffect, useState } from 'react';
import { securityGuard } from '@/utils/securityGuard';
import { rateLimiter } from '@/utils/rateLimiter';

interface SecurityContextType {
  isSecure: boolean;
  securityLevel: 'low' | 'medium' | 'high';
  checkSecurity: () => Promise<boolean>;
  reportSecurityEvent: (event: string, details?: any) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [isSecure, setIsSecure] = useState(true);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('low');

  const checkSecurity = async (): Promise<boolean> => {
    try {
      // Check if user agent suggests legitimate crawler
      const userAgent = navigator.userAgent?.toLowerCase() || '';
      const legitimateCrawlers = [
        'googlebot', 'bingbot', 'slurp', 'yandexbot', 'baiduspider', 
        'applebot', 'duckduckbot', 'perplexitybot', 'claude-web', 
        'chatgpt-user', 'searchgpt', 'claude-bot', 'twitterbot',
        'facebookexternalhit', 'linkedinbot', 'ia_archiver', 
        'archive.org_bot', 'wayback', 'commoncrawl'
      ];
      
      const isLegitmateCrawler = legitimateCrawlers.some(crawler => 
        userAgent.includes(crawler)
      );
      
      // Skip security checks for legitimate crawlers
      if (isLegitmateCrawler) {
        setIsSecure(true);
        setSecurityLevel('low');
        return true;
      }

      // Check rate limiting (more lenient)
      const rateLimit = rateLimiter.checkLimit('security-check');
      if (!rateLimit.allowed) {
        setSecurityLevel('medium'); // Reduced from 'high'
        setIsSecure(true); // Don't block, just warn
        return true; // Changed to allow access
      }

      // Check for suspicious activity (less aggressive)
      const { suspicious, patterns } = rateLimiter.checkSuspiciousActivity();
      if (suspicious && patterns.length > 5) { // Increased threshold
        setSecurityLevel('medium');
        await securityGuard.logSecurityEvent({
          type: 'bot_detection',
          details: { patterns },
          severity: 'low', // Reduced severity
          userAgent: navigator.userAgent
        });
      }

      // More lenient bot detection
      const botCheck = securityGuard.checkBotBehavior(navigator.userAgent);
      if (!botCheck.passed && botCheck.action === 'block') {
        setSecurityLevel('medium'); // Reduced from 'high'
        await securityGuard.logSecurityEvent({
          type: 'bot_detection',
          details: { reason: botCheck.reason },
          severity: 'medium',
          userAgent: navigator.userAgent
        });
        // Don't block - just log for monitoring
      }

      setIsSecure(true);
      return true;
    } catch (error) {
      console.error('Security check failed:', error);
      setIsSecure(true); // Fail open for SEO
      return true;
    }
  };

  const reportSecurityEvent = async (event: string, details?: any) => {
    await securityGuard.logSecurityEvent({
      type: event as any,
      details: details || {},
      severity: 'medium',
      userAgent: navigator.userAgent
    });
  };

  useEffect(() => {
    // Initial security check
    checkSecurity();

    // Set up periodic security monitoring
    const interval = setInterval(checkSecurity, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const value: SecurityContextType = {
    isSecure,
    securityLevel,
    checkSecurity,
    reportSecurityEvent
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};