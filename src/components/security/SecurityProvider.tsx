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
      // Check rate limiting
      const rateLimit = rateLimiter.checkLimit('security-check');
      if (!rateLimit.allowed) {
        setSecurityLevel('high');
        setIsSecure(false);
        return false;
      }

      // Check for suspicious activity
      const { suspicious, patterns } = rateLimiter.checkSuspiciousActivity();
      if (suspicious) {
        setSecurityLevel(patterns.length > 2 ? 'high' : 'medium');
        await securityGuard.logSecurityEvent({
          type: 'bot_detection',
          details: { patterns },
          severity: 'medium',
          userAgent: navigator.userAgent
        });
      }

      // Basic bot detection
      const botCheck = securityGuard.checkBotBehavior(navigator.userAgent);
      if (!botCheck.passed) {
        setSecurityLevel('high');
        setIsSecure(false);
        await securityGuard.logSecurityEvent({
          type: 'bot_detection',
          details: { reason: botCheck.reason },
          severity: 'high',
          userAgent: navigator.userAgent
        });
        return false;
      }

      setIsSecure(true);
      return true;
    } catch (error) {
      console.error('Security check failed:', error);
      setIsSecure(false);
      return false;
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