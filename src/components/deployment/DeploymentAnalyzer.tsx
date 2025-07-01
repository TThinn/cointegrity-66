import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, XCircle, Info, Zap, Globe, Shield } from 'lucide-react';

interface AnalysisResult {
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  issue: string;
  solution: string;
  status: 'detected' | 'fixed' | 'pending';
  troubleshooting?: string[];
}

interface SystemInfo {
  domain: string;
  protocol: string;
  userAgent: string;
  timestamp: string;
  buildInfo: {
    mode: string;
    timestamp?: string;
  };
}

interface DomainDiagnostics {
  currentDomain: string;
  targetDomain: string;
  isCustomDomain: boolean;
  isSecure: boolean;
  domainStatus: 'connected' | 'pending' | 'failed' | 'staging';
}

export const DeploymentAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [domainDiagnostics, setDomainDiagnostics] = useState<DomainDiagnostics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Collect system information
    const currentDomain = window.location.hostname;
    const targetDomain = 'cointegrity.io';
    
    setSystemInfo({
      domain: currentDomain,
      protocol: window.location.protocol,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      buildInfo: {
        mode: import.meta.env.MODE,
        timestamp: process.env.BUILD_TIMESTAMP
      }
    });

    // Analyze domain status
    setDomainDiagnostics({
      currentDomain,
      targetDomain,
      isCustomDomain: currentDomain === targetDomain,
      isSecure: window.location.protocol === 'https:',
      domainStatus: currentDomain === targetDomain ? 'connected' : 
                   currentDomain.includes('lovable') ? 'staging' : 'pending'
    });
  }, []);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const results: AnalysisResult[] = [];

    // Domain Analysis with Enhanced Diagnostics
    const currentDomain = window.location.hostname;
    if (currentDomain !== 'cointegrity.io') {
      const troubleshootingSteps = [
        'Verify DNS A record points to Lovable\'s IP address',
        'Check domain registrar settings for correct nameservers',
        'Ensure domain is verified in Lovable project settings',
        'Wait 24-48 hours for DNS propagation to complete',
        'Clear browser cache and try accessing the domain directly',
        'Check if domain is properly configured in Lovable dashboard'
      ];

      results.push({
        category: 'Domain Configuration',
        severity: currentDomain.includes('lovable') ? 'medium' : 'high',
        issue: `Site is running on ${currentDomain} instead of cointegrity.io`,
        solution: 'Complete domain connection process in Lovable project settings',
        status: 'detected',
        troubleshooting: troubleshootingSteps
      });
    }

    // SSL Analysis
    if (window.location.protocol !== 'https:') {
      results.push({
        category: 'Security',
        severity: 'critical',
        issue: 'Site is not using HTTPS',
        solution: 'SSL certificate will be automatically provisioned once domain is connected',
        status: 'detected',
        troubleshooting: [
          'SSL certificates are automatically provided by Lovable',
          'Domain must be successfully connected first',
          'Certificate provisioning can take up to 24 hours'
        ]
      });
    }

    // Enhanced reCAPTCHA Analysis
    const recaptchaLoaded = typeof window.grecaptcha !== 'undefined';
    if (!recaptchaLoaded) {
      results.push({
        category: 'External Services',
        severity: 'high',
        issue: 'reCAPTCHA is not loaded - contact form will not work',
        solution: 'Update reCAPTCHA site key for the new domain in project environment variables',
        status: 'detected',
        troubleshooting: [
          'Go to Google reCAPTCHA Admin Console (https://www.google.com/recaptcha/admin)',
          'Add cointegrity.io to the list of authorized domains',
          'Update the site key in Lovable project environment variables',
          'Ensure reCAPTCHA script is properly loaded'
        ]
      });
    }

    // Service Worker Analysis
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) {
          results.push({
            category: 'Performance',
            severity: 'low',
            issue: 'Service Worker not registered',
            solution: 'Service worker will be automatically registered on production domain',
            status: 'detected'
          });
        }
      } catch (error) {
        results.push({
          category: 'Performance',
          severity: 'medium',
          issue: 'Service Worker registration failed',
          solution: 'Check service worker implementation and browser compatibility',
          status: 'detected'
        });
      }
    }

    // External Services Analysis
    const externalServices = [
      { 
        name: 'Google Analytics', 
        check: () => typeof window.gtag !== 'undefined',
        severity: 'medium' as const,
        troubleshooting: [
          'Verify Google Analytics tracking ID is correct',
          'Check if domain is authorized in GA property settings',
          'Ensure GA script loads before page tracking'
        ]
      },
      { 
        name: 'Cookiebot', 
        check: () => document.querySelector('script[src*="cookiebot"]') !== null,
        severity: 'medium' as const,
        troubleshooting: [
          'Update Cookiebot domain settings to include cointegrity.io',
          'Verify Cookiebot script URL is correct',
          'Check if domain is whitelisted in Cookiebot dashboard'
        ]
      }
    ];

    for (const service of externalServices) {
      if (!service.check()) {
        results.push({
          category: 'External Services',
          severity: service.severity,
          issue: `${service.name} is not loaded`,
          solution: `Check ${service.name} configuration for domain authorization`,
          status: 'detected',
          troubleshooting: service.troubleshooting
        });
      }
    }

    // Supabase Analysis
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { error } = await supabase.from('newsletter_subscriptions').select('count', { count: 'exact', head: true });
      if (error) {
        results.push({
          category: 'Backend',
          severity: 'high',
          issue: 'Supabase connection failed',
          solution: 'Verify Supabase configuration and API keys',
          status: 'detected',
          troubleshooting: [
            'Check Supabase project URL and anon key',
            'Verify RLS policies allow public access where needed',
            'Ensure Supabase project is not paused'
          ]
        });
      }
    } catch (error) {
      results.push({
        category: 'Backend',
        severity: 'high',
        issue: 'Supabase client initialization failed',
        solution: 'Verify Supabase integration and configuration',
        status: 'detected'
      });
    }

    // Performance Analysis
    try {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
        const loadTime = navEntry.loadEventEnd - navEntry.startTime;
        if (loadTime > 3000) {
          results.push({
            category: 'Performance',
            severity: 'medium',
            issue: `Slow page load time: ${Math.round(loadTime)}ms`,
            solution: 'Optimize assets, enable compression, and implement lazy loading',
            status: 'detected'
          });
        }
      } else if (performance.timing) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        if (loadTime > 3000) {
          results.push({
            category: 'Performance',
            severity: 'medium',
            issue: `Slow page load time: ${Math.round(loadTime)}ms`,
            solution: 'Optimize assets, enable compression, and implement lazy loading',
            status: 'detected'
          });
        }
      }
    } catch (error) {
      results.push({
        category: 'Performance',
        severity: 'low',
        issue: 'Performance measurement unavailable',
        solution: 'Performance timing API may not be supported in this browser',
        status: 'detected'
      });
    }

    // Build Analysis
    if (import.meta.env.MODE === 'development') {
      results.push({
        category: 'Build',
        severity: 'high',
        issue: 'Site is running in development mode',
        solution: 'Build and deploy the production version',
        status: 'detected'
      });
    }

    // Add success message if no critical issues found
    const criticalIssues = results.filter(r => r.severity === 'critical' || r.severity === 'high');
    if (criticalIssues.length === 0) {
      results.push({
        category: 'System Status',
        severity: 'low',
        issue: 'No critical issues detected',
        solution: 'System is functioning within acceptable parameters',
        status: 'fixed'
      });
    }

    setAnalysis(results);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: AnalysisResult['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
    }
  };

  const getSeverityIcon = (severity: AnalysisResult['severity']) => {
    switch (severity) {
      case 'low':
        return <Info className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
        return <XCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: AnalysisResult['status']) => {
    switch (status) {
      case 'detected':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'fixed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const groupedAnalysis = analysis.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, AnalysisResult[]>);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Deployment Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={runAnalysis} 
            disabled={isAnalyzing}
            className="w-full mb-4"
          >
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </Button>

          {/* Domain Status Card */}
          {domainDiagnostics && (
            <Card className="mb-4 border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5" />
                  Domain Status
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Current Domain:</span> 
                  <span className="ml-2 font-mono text-blue-600">{domainDiagnostics.currentDomain}</span>
                </div>
                <div>
                  <span className="font-medium">Target Domain:</span> 
                  <span className="ml-2 font-mono text-green-600">{domainDiagnostics.targetDomain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Status:</span>
                  <Badge className={
                    domainDiagnostics.domainStatus === 'connected' ? 'bg-green-100 text-green-800' :
                    domainDiagnostics.domainStatus === 'staging' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }>
                    {domainDiagnostics.domainStatus}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">HTTPS:</span>
                  <Badge className={domainDiagnostics.isSecure ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {domainDiagnostics.isSecure ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {systemInfo && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Protocol:</span> {systemInfo.protocol}
              </div>
              <div>
                <span className="font-medium">Build Mode:</span> {systemInfo.buildInfo.mode}
              </div>
              <div>
                <span className="font-medium">Build Time:</span> {systemInfo.buildInfo.timestamp || 'Unknown'}
              </div>
              <div>
                <span className="font-medium">Analysis Time:</span> {new Date(systemInfo.timestamp).toLocaleTimeString()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysis.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['critical', 'high', 'medium', 'low'].map(severity => {
                    const count = analysis.filter(item => item.severity === severity).length;
                    return (
                      <div key={severity} className="text-center">
                        <div className={`text-2xl font-bold ${
                          severity === 'critical' ? 'text-red-600' :
                          severity === 'high' ? 'text-orange-600' :
                          severity === 'medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {count}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">{severity}</div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                {Object.entries(groupedAnalysis).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-semibold text-lg">{category}</h4>
                    {items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        {getSeverityIcon(item.severity)}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={getSeverityColor(item.severity)}>
                              {item.severity}
                            </Badge>
                            {getStatusIcon(item.status)}
                          </div>
                          <p className="text-sm font-medium">{item.issue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="solutions" className="space-y-4">
                {analysis.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
                      <span className="font-medium">{item.category}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{item.issue}</p>
                    <p className="text-sm font-medium text-blue-700">{item.solution}</p>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="troubleshooting" className="space-y-4">
                {analysis.filter(item => item.troubleshooting).map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
                      <span className="font-medium">{item.category}: {item.issue}</span>
                    </div>
                    <div className="pl-4">
                      <h5 className="font-medium text-sm mb-2">Step-by-step troubleshooting:</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                        {item.troubleshooting?.map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
