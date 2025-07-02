import React, { useState, useEffect } from "react";
import { globalRateLimiter } from "@/utils/rateLimiter";
import { Shield, Clock, AlertTriangle } from "lucide-react";

interface RateLimitGuardProps {
  children: React.ReactNode;
  action?: string;
  showWarning?: boolean;
}

export const RateLimitGuard = ({ 
  children, 
  action = "page-access",
  showWarning = true 
}: RateLimitGuardProps) => {
  const [rateLimitState, setRateLimitState] = useState<{
    blocked: boolean;
    retryAfter?: number;
    reason?: string;
    warning?: boolean;
  }>({ blocked: false });

  useEffect(() => {
    const checkRateLimit = () => {
      const result = globalRateLimiter.checkLimit(action);
      const suspicious = globalRateLimiter.checkSuspiciousActivity();
      
      if (!result.allowed) {
        setRateLimitState({
          blocked: true,
          retryAfter: result.retryAfter,
          reason: result.reason
        });
      } else if (suspicious.suspicious && showWarning) {
        setRateLimitState({
          blocked: false,
          warning: true
        });
      } else {
        setRateLimitState({ blocked: false });
      }
    };

    checkRateLimit();
    
    // Check periodically if blocked
    const interval = setInterval(checkRateLimit, 5000);
    return () => clearInterval(interval);
  }, [action, showWarning]);

  if (rateLimitState.blocked) {
    return (
      <div className="min-h-screen bg-[#010822] flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-red-900/20 border border-red-500/30 rounded-lg p-6 text-center">
          <Shield className="text-red-400 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-red-200 mb-4">
            Access Temporarily Restricted
          </h2>
          <p className="text-red-100/80 mb-4">
            {rateLimitState.reason || "Too many requests detected. Please slow down."}
          </p>
          {rateLimitState.retryAfter && (
            <div className="flex items-center justify-center gap-2 text-red-300 mb-4">
              <Clock size={16} />
              <span>Retry in {rateLimitState.retryAfter} seconds</span>
            </div>
          )}
          <div className="text-sm text-red-100/60 space-y-2">
            <p>This helps protect our content from automated scraping.</p>
            <p>If you're a legitimate user, please wait and try again.</p>
            <p className="mt-4 text-xs">
              For API access or licensing: 
              <a href="mailto:hello@cointegrity.io" className="text-red-300 hover:text-red-200 ml-1">
                hello@cointegrity.io
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (rateLimitState.warning) {
    return (
      <div className="relative">
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-3 mb-4 mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-orange-200">
            <AlertTriangle size={16} />
            <span className="text-sm font-medium">
              High activity detected. Please browse at normal speed to avoid temporary restrictions.
            </span>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};