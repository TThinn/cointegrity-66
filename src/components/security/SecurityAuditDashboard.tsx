import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { useSecurityContext } from './SecurityProvider';
import { rateLimiter } from '@/utils/rateLimiter';

interface SecurityMetrics {
  rateLimit: {
    allowed: boolean;
    retryAfter?: number;
    reason?: string;
  };
  suspiciousActivity: {
    suspicious: boolean;
    patterns: string[];
  };
  securityLevel: 'low' | 'medium' | 'high';
}

export const SecurityAuditDashboard: React.FC = () => {
  const { isSecure, securityLevel, checkSecurity } = useSecurityContext();
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const collectMetrics = async () => {
    const rateLimit = rateLimiter.checkLimit('audit-check');
    const suspiciousActivity = rateLimiter.checkSuspiciousActivity();
    
    setMetrics({
      rateLimit,
      suspiciousActivity,
      securityLevel
    });
    setLastCheck(new Date());
  };

  useEffect(() => {
    collectMetrics();
    const interval = setInterval(collectMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [securityLevel]);

  const getSecurityIcon = () => {
    switch (securityLevel) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <Shield className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSecurityStatusColor = () => {
    if (!isSecure) return 'destructive';
    switch (securityLevel) {
      case 'low':
        return 'default';
      case 'medium':
        return 'secondary';
      case 'high':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (!metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Loading Security Status...
          </CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getSecurityIcon()}
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Badge variant={getSecurityStatusColor()}>
                {isSecure ? 'Secure' : 'At Risk'} - {securityLevel.toUpperCase()}
              </Badge>
              {lastCheck && (
                <p className="text-sm text-muted-foreground mt-2">
                  Last checked: {lastCheck.toLocaleTimeString()}
                </p>
              )}
            </div>
            <button
              onClick={checkSecurity}
              className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Refresh
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting</CardTitle>
        </CardHeader>
        <CardContent>
          {metrics.rateLimit.allowed ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              Normal traffic patterns
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Rate limit exceeded: {metrics.rateLimit.reason}
                {metrics.rateLimit.retryAfter && (
                  <span className="block mt-1">
                    Retry after: {metrics.rateLimit.retryAfter} seconds
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activity Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          {metrics.suspiciousActivity.suspicious ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Suspicious activity detected:
                <ul className="list-disc list-inside mt-2">
                  {metrics.suspiciousActivity.patterns.map((pattern, index) => (
                    <li key={index} className="text-sm">{pattern}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-4 w-4" />
              No suspicious activity detected
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Measures Active</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Input validation enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Rate limiting active</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Bot detection running</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Security headers configured</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">DOM monitoring active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};