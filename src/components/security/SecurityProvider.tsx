
import React, { createContext, useContext, useEffect, useState } from 'react';
import { detectCrawler } from '@/utils/crawlerDetection';
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
  const [isCrawler, setIsCrawler] = useState(false);

  const checkSecurity = async (): Promise<boolean> => {
    try {
      // Quick crawler check at the start
      const userAgent = navigator.userAgent || '';
      const crawlerInfo = detectCrawler(userAgent);
      
      if (crawlerInfo.isLegitimate) {
        setIsSecure(true);
        setSecurityLevel('low');
        setIsCrawler(true);
        return true;
      }

      // Simplified rate limiting check (less aggressive)
      const rateLimit = rateLimiter.checkLimit('security-check');
      if (!rateLimit.allowed) {
        setSecurityLevel('medium');
        setIsSecure(true); // Don't block, just monitor
        return true;
      }

      // Very basic suspicious activity check
      const suspicious = rateLimiter.checkSuspiciousActivity();
      if (suspicious.suspicious && suspicious.patterns.length > 10) { // Higher threshold
        setSecurityLevel('medium');
        console.log('[Security] Elevated monitoring due to activity patterns');
      }

      setIsSecure(true);
      return true;
    } catch (error) {
      console.error('Security check failed:', error);
      setIsSecure(true); // Fail open
      return true;
    }
  };

  const reportSecurityEvent = async (event: string, details?: any) => {
    // Simplified logging - don't spam the logs
    if (Math.random() < 0.1) { // Only log 10% of events to reduce noise
      console.log(`[Security Event] ${event}:`, details);
    }
  };

  useEffect(() => {
    // Single security check on mount
    checkSecurity();

    // Only set up monitoring for non-crawlers
    let interval: NodeJS.Timeout | undefined;
    
    if (!isCrawler) {
      // Much less frequent monitoring (every 5 minutes instead of 1 minute)
      interval = setInterval(checkSecurity, 300000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCrawler]);

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
