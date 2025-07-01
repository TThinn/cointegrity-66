
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, XCircle, Info, Zap } from 'lucide-react';

interface AnalysisResult {
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  issue: string;
  solution: string;
  status: 'detected' | 'fixed' | 'pending';
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

export const DeploymentAnalyzer: React.FC = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Collect system information
    setSystemInfo({
      domain: window.location.hostname,
      protocol: window.location.protocol,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      buildInfo: {
        mode: import.meta.env.MODE,
        timestamp: process.env.BUILD_TIMESTAMP
      }
    });
  }, []);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const results: AnalysisResult[] = [];

    // Domain Analysis
    const currentDomain = window.location.hostname;
    if (currentDomain !== 'cointegrity.io') {
      results.push({
        category: 'Domain',
        severity: currentDomain.includes('lovable') ? 'medium' : 'high',
        issue: `Site is running on ${currentDomain} instead of cointegrity.io`,
        solution: 'Configure custom domain in Lovable project settings and update DNS records',
        status: 'detected'
      });
    }

    // SSL Analysis
    if (window.location.protocol !== 'https:') {
      results.push({
        category: 'Security',
        severity: 'critical',
        issue: 'Site is not using HTTPS',
        solution: 'Enable SSL certificate in hosting configuration',
        status: 'detected'
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
            solution: 'Ensure service worker is properly initialized',
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
      { name: 'Google Analytics', check: () => typeof window.gtag !== 'undefined' },
      { name: 'reCAPTCHA', check: () => typeof window.grecaptcha !== 'undefined' },
      { name: 'Cookiebot', check: () => document.querySelector('script[src*="cookiebot"]') !== null }
    ];

    for (const service of externalServices) {
      if (!service.check()) {
        results.push({
          category: 'External Services',
          severity: service.name === 'reCAPTCHA' ? 'high' : 'medium',
          issue: `${service.name} is not loaded`,
          solution: `Check ${service.name} configuration and script loading`,
          status: 'detected'
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
          solution: 'Check Supabase configuration and API keys',
          status: 'detected'
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
    if (performance.navigation) {
      const loadTime = performance.navigation.loadEventEnd - performance.navigation.navigationStart;
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

    // Add success message if no issues found
    if (results.length === 0) {
      results.push({
        category: 'System',
        severity: 'low',
        issue: 'No critical issues detected',
        solution: 'System appears to be functioning normally',
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

          {systemInfo && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Domain:</span> {systemInfo.domain}
              </div>
              <div>
                <span className="font-medium">Protocol:</span> {systemInfo.protocol}
              </div>
              <div>
                <span className="font-medium">Build Mode:</span> {systemInfo.buildInfo.mode}
              </div>
              <div>
                <span className="font-medium">Build Time:</span> {systemInfo.buildInfo.timestamp || 'Unknown'}
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
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
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
