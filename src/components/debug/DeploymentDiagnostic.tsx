
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'checking' | 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

export const DeploymentDiagnostic: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Supabase Connection', status: 'checking', message: 'Testing connection...' },
    { name: 'Google Analytics', status: 'checking', message: 'Checking GA configuration...' },
    { name: 'reCAPTCHA', status: 'checking', message: 'Validating reCAPTCHA setup...' },
    { name: 'Cookiebot', status: 'checking', message: 'Testing Cookiebot script...' },
    { name: 'Domain Configuration', status: 'checking', message: 'Checking domain setup...' },
  ]);

  const updateServiceStatus = (name: string, status: ServiceStatus['status'], message: string, details?: string) => {
    setServices(prev => prev.map(service => 
      service.name === name ? { ...service, status, message, details } : service
    ));
  };

  const testSupabaseConnection = async () => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data, error } = await supabase.from('newsletter_subscriptions').select('count', { count: 'exact', head: true });
      
      if (error) {
        updateServiceStatus('Supabase Connection', 'error', 'Connection failed', error.message);
      } else {
        updateServiceStatus('Supabase Connection', 'success', 'Connected successfully');
      }
    } catch (error) {
      updateServiceStatus('Supabase Connection', 'error', 'Import/connection error', String(error));
    }
  };

  const testGoogleAnalytics = () => {
    if (typeof window.gtag !== 'undefined') {
      updateServiceStatus('Google Analytics', 'success', 'GA loaded successfully');
    } else {
      updateServiceStatus('Google Analytics', 'warning', 'GA not loaded - may affect tracking');
    }
  };

  const testRecaptcha = () => {
    if (typeof window.grecaptcha !== 'undefined') {
      updateServiceStatus('reCAPTCHA', 'success', 'reCAPTCHA loaded successfully');
    } else {
      updateServiceStatus('reCAPTCHA', 'warning', 'reCAPTCHA not loaded - forms may not work');
    }
  };

  const testCookiebot = () => {
    const cookiebotScript = document.querySelector('script[src*="cookiebot"]');
    if (cookiebotScript) {
      updateServiceStatus('Cookiebot', 'success', 'Cookiebot script found');
    } else {
      updateServiceStatus('Cookiebot', 'warning', 'Cookiebot script not found');
    }
  };

  const testDomainConfiguration = () => {
    const currentDomain = window.location.hostname;
    const expectedDomain = 'cointegrity.io';
    
    if (currentDomain === expectedDomain) {
      updateServiceStatus('Domain Configuration', 'success', `Deployed on correct domain: ${currentDomain}`);
    } else if (currentDomain.includes('lovable')) {
      updateServiceStatus('Domain Configuration', 'warning', `Currently on staging: ${currentDomain}`, 'This is expected during testing');
    } else {
      updateServiceStatus('Domain Configuration', 'error', `Unexpected domain: ${currentDomain}`, 'Check DNS configuration');
    }
  };

  const runAllTests = async () => {
    console.log('🔍 Starting deployment diagnostic tests...');
    
    // Reset all to checking
    setServices(prev => prev.map(service => ({ ...service, status: 'checking' as const })));
    
    // Run tests with delays to show progress
    setTimeout(testDomainConfiguration, 500);
    setTimeout(testGoogleAnalytics, 1000);
    setTimeout(testRecaptcha, 1500);
    setTimeout(testCookiebot, 2000);
    setTimeout(testSupabaseConnection, 2500);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'checking':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'checking':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const errorCount = services.filter(s => s.status === 'error').length;
  const warningCount = services.filter(s => s.status === 'warning').length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔍 Deployment Diagnostic Tool
          {errorCount > 0 && (
            <Badge variant="destructive">{errorCount} errors</Badge>
          )}
          {warningCount > 0 && (
            <Badge variant="secondary">{warningCount} warnings</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name} className="flex items-start gap-3 p-3 border rounded-lg">
              {getStatusIcon(service.status)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{service.name}</span>
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{service.message}</p>
                {service.details && (
                  <p className="text-xs text-gray-500 mt-1">{service.details}</p>
                )}
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <Button onClick={runAllTests} className="w-full">
              Re-run All Tests
            </Button>
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            <h4 className="font-medium">Next Steps:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>If you see errors, these services may be causing deployment issues</li>
              <li>Check the browser console for additional error messages</li>
              <li>Test the contact form and newsletter signup functionality</li>
              <li>Verify DNS settings in your domain registrar</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
