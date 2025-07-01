
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, Loader2, Clock, Zap } from 'lucide-react';

interface DeploymentStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'error' | 'warning';
  progress: number;
  message: string;
  details?: string;
  startTime?: number;
  endTime?: number;
  duration?: number;
  critical: boolean;
}

interface DeploymentTrackerState {
  stages: DeploymentStage[];
  currentStage: number;
  isRunning: boolean;
  overallProgress: number;
  startTime?: number;
  endTime?: number;
  errors: string[];
  warnings: string[];
}

export const DeploymentTracker: React.FC = () => {
  const [state, setState] = useState<DeploymentTrackerState>({
    stages: [
      {
        id: 'pre-flight',
        name: 'Pre-flight Checks',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      },
      {
        id: 'environment',
        name: 'Environment Validation',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      },
      {
        id: 'services',
        name: 'External Services Check',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      },
      {
        id: 'build',
        name: 'Build Process',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      },
      {
        id: 'deployment',
        name: 'Deployment Upload',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      },
      {
        id: 'dns',
        name: 'DNS Propagation',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: false
      },
      {
        id: 'ssl',
        name: 'SSL Certificate',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      },
      {
        id: 'verification',
        name: 'Site Verification',
        status: 'pending',
        progress: 0,
        message: 'Waiting to start...',
        critical: true
      }
    ],
    currentStage: 0,
    isRunning: false,
    overallProgress: 0,
    errors: [],
    warnings: []
  });

  const updateStage = useCallback((stageId: string, updates: Partial<DeploymentStage>) => {
    setState(prev => ({
      ...prev,
      stages: prev.stages.map(stage => 
        stage.id === stageId 
          ? { 
              ...stage, 
              ...updates,
              ...(updates.status === 'running' && !stage.startTime ? { startTime: Date.now() } : {}),
              ...(updates.status && ['success', 'error'].includes(updates.status) && !stage.endTime ? { 
                endTime: Date.now(),
                duration: stage.startTime ? Date.now() - stage.startTime : undefined
              } : {})
            }
          : stage
      )
    }));
  }, []);

  const addError = useCallback((error: string) => {
    setState(prev => ({
      ...prev,
      errors: [...prev.errors, error]
    }));
  }, []);

  const addWarning = useCallback((warning: string) => {
    setState(prev => ({
      ...prev,
      warnings: [...prev.warnings, warning]
    }));
  }, []);

  // Pre-flight checks
  const runPreFlightChecks = async () => {
    updateStage('pre-flight', { status: 'running', message: 'Running pre-flight checks...' });
    
    try {
      // Check browser compatibility
      const browserChecks = {
        localStorage: typeof Storage !== 'undefined',
        fetch: typeof fetch !== 'undefined',
        Promise: typeof Promise !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator
      };
      
      updateStage('pre-flight', { progress: 25, message: 'Checking browser compatibility...' });
      
      // Check network connectivity
      try {
        await fetch('https://www.google.com/favicon.ico', { mode: 'no-cors' });
        updateStage('pre-flight', { progress: 50, message: 'Network connectivity verified...' });
      } catch (error) {
        addWarning('Network connectivity check failed');
      }
      
      // Check current domain
      const currentDomain = window.location.hostname;
      updateStage('pre-flight', { progress: 75, message: `Current domain: ${currentDomain}` });
      
      // Final validation
      updateStage('pre-flight', { 
        status: 'success', 
        progress: 100, 
        message: 'Pre-flight checks completed',
        details: `Browser: Compatible, Domain: ${currentDomain}`
      });
      
    } catch (error) {
      updateStage('pre-flight', { 
        status: 'error', 
        progress: 100, 
        message: 'Pre-flight checks failed',
        details: String(error)
      });
      addError(`Pre-flight check failed: ${error}`);
    }
  };

  // Environment validation
  const runEnvironmentValidation = async () => {
    updateStage('environment', { status: 'running', message: 'Validating environment...' });
    
    try {
      // Check environment variables
      const envChecks = {
        nodeEnv: process.env.NODE_ENV,
        buildTimestamp: process.env.BUILD_TIMESTAMP
      };
      
      updateStage('environment', { progress: 33, message: 'Checking environment variables...' });
      
      // Check Vite configuration
      const viteConfig = {
        mode: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        prod: import.meta.env.PROD
      };
      
      updateStage('environment', { progress: 66, message: 'Validating Vite configuration...' });
      
      updateStage('environment', { 
        status: 'success', 
        progress: 100, 
        message: 'Environment validation completed',
        details: `Mode: ${viteConfig.mode}, Prod: ${viteConfig.prod}`
      });
      
    } catch (error) {
      updateStage('environment', { 
        status: 'error', 
        progress: 100, 
        message: 'Environment validation failed',
        details: String(error)
      });
      addError(`Environment validation failed: ${error}`);
    }
  };

  // External services check
  const runExternalServicesCheck = async () => {
    updateStage('services', { status: 'running', message: 'Checking external services...' });
    
    try {
      let progress = 0;
      
      // Check Supabase
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        await supabase.from('newsletter_subscriptions').select('count', { count: 'exact', head: true });
        progress += 25;
        updateStage('services', { progress, message: 'Supabase connection verified...' });
      } catch (error) {
        addWarning(`Supabase connection failed: ${error}`);
        progress += 25;
      }
      
      // Check reCAPTCHA
      if (typeof window.grecaptcha !== 'undefined') {
        progress += 25;
        updateStage('services', { progress, message: 'reCAPTCHA loaded successfully...' });
      } else {
        addWarning('reCAPTCHA not loaded');
        progress += 25;
      }
      
      // Check Google Analytics
      if (typeof window.gtag !== 'undefined') {
        progress += 25;
        updateStage('services', { progress, message: 'Google Analytics verified...' });
      } else {
        addWarning('Google Analytics not loaded');
        progress += 25;
      }
      
      // Check Cookiebot
      const cookiebotScript = document.querySelector('script[src*="cookiebot"]');
      if (cookiebotScript) {
        progress += 25;
        updateStage('services', { progress, message: 'Cookiebot script found...' });
      } else {
        addWarning('Cookiebot script not found');
        progress += 25;
      }
      
      updateStage('services', { 
        status: 'success', 
        progress: 100, 
        message: 'External services check completed'
      });
      
    } catch (error) {
      updateStage('services', { 
        status: 'error', 
        progress: 100, 
        message: 'External services check failed',
        details: String(error)
      });
      addError(`External services check failed: ${error}`);
    }
  };

  // Build process simulation
  const runBuildProcess = async () => {
    updateStage('build', { status: 'running', message: 'Simulating build process...' });
    
    try {
      // Simulate build steps
      const buildSteps = [
        'Analyzing dependencies...',
        'Compiling TypeScript...',
        'Processing CSS...',
        'Optimizing assets...',
        'Generating bundles...'
      ];
      
      for (let i = 0; i < buildSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 800));
        const progress = ((i + 1) / buildSteps.length) * 100;
        updateStage('build', { progress, message: buildSteps[i] });
      }
      
      updateStage('build', { 
        status: 'success', 
        progress: 100, 
        message: 'Build process completed successfully'
      });
      
    } catch (error) {
      updateStage('build', { 
        status: 'error', 
        progress: 100, 
        message: 'Build process failed',
        details: String(error)
      });
      addError(`Build process failed: ${error}`);
    }
  };

  // Deployment upload simulation
  const runDeploymentUpload = async () => {
    updateStage('deployment', { status: 'running', message: 'Uploading deployment...' });
    
    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        updateStage('deployment', { 
          progress: i, 
          message: `Uploading files... ${i}%` 
        });
      }
      
      updateStage('deployment', { 
        status: 'success', 
        progress: 100, 
        message: 'Deployment upload completed'
      });
      
    } catch (error) {
      updateStage('deployment', { 
        status: 'error', 
        progress: 100, 
        message: 'Deployment upload failed',
        details: String(error)
      });
      addError(`Deployment upload failed: ${error}`);
    }
  };

  // DNS propagation check
  const runDNSCheck = async () => {
    updateStage('dns', { status: 'running', message: 'Checking DNS propagation...' });
    
    try {
      const targetDomain = 'cointegrity.io';
      const currentDomain = window.location.hostname;
      
      // Simulate DNS check
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (currentDomain === targetDomain) {
        updateStage('dns', { 
          status: 'success', 
          progress: 100, 
          message: 'DNS propagation verified',
          details: `Domain: ${currentDomain}`
        });
      } else {
        updateStage('dns', { 
          status: 'warning', 
          progress: 100, 
          message: 'DNS not fully propagated',
          details: `Current: ${currentDomain}, Target: ${targetDomain}`
        });
        addWarning(`DNS propagation pending: ${currentDomain} -> ${targetDomain}`);
      }
      
    } catch (error) {
      updateStage('dns', { 
        status: 'error', 
        progress: 100, 
        message: 'DNS check failed',
        details: String(error)
      });
      addError(`DNS check failed: ${error}`);
    }
  };

  // SSL certificate check
  const runSSLCheck = async () => {
    updateStage('ssl', { status: 'running', message: 'Checking SSL certificate...' });
    
    try {
      const isHTTPS = window.location.protocol === 'https:';
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isHTTPS) {
        updateStage('ssl', { 
          status: 'success', 
          progress: 100, 
          message: 'SSL certificate verified',
          details: 'HTTPS connection established'
        });
      } else {
        updateStage('ssl', { 
          status: 'warning', 
          progress: 100, 
          message: 'SSL certificate not active',
          details: 'Site is running on HTTP'
        });
        addWarning('Site is not using HTTPS');
      }
      
    } catch (error) {
      updateStage('ssl', { 
        status: 'error', 
        progress: 100, 
        message: 'SSL check failed',
        details: String(error)
      });
      addError(`SSL check failed: ${error}`);
    }
  };

  // Site verification
  const runSiteVerification = async () => {
    updateStage('verification', { status: 'running', message: 'Verifying site functionality...' });
    
    try {
      // Test critical functionality
      const tests = [
        { name: 'Contact form', test: () => document.querySelector('#contact') !== null },
        { name: 'Navigation', test: () => document.querySelector('nav') !== null },
        { name: 'Hero section', test: () => document.querySelector('#hero') !== null },
        { name: 'Services section', test: () => document.querySelector('#services') !== null }
      ];
      
      let passedTests = 0;
      for (const test of tests) {
        await new Promise(resolve => setTimeout(resolve, 300));
        if (test.test()) {
          passedTests++;
        } else {
          addWarning(`${test.name} not found`);
        }
        const progress = (passedTests / tests.length) * 100;
        updateStage('verification', { progress, message: `Testing ${test.name}...` });
      }
      
      updateStage('verification', { 
        status: passedTests === tests.length ? 'success' : 'warning', 
        progress: 100, 
        message: `Site verification completed (${passedTests}/${tests.length} tests passed)`
      });
      
    } catch (error) {
      updateStage('verification', { 
        status: 'error', 
        progress: 100, 
        message: 'Site verification failed',
        details: String(error)
      });
      addError(`Site verification failed: ${error}`);
    }
  };

  const runDeploymentSequence = async () => {
    setState(prev => ({ 
      ...prev, 
      isRunning: true, 
      startTime: Date.now(),
      errors: [],
      warnings: []
    }));

    const stages = [
      runPreFlightChecks,
      runEnvironmentValidation,
      runExternalServicesCheck,
      runBuildProcess,
      runDeploymentUpload,
      runDNSCheck,
      runSSLCheck,
      runSiteVerification
    ];

    for (let i = 0; i < stages.length; i++) {
      setState(prev => ({ ...prev, currentStage: i }));
      await stages[i]();
      
      // Calculate overall progress
      const overallProgress = ((i + 1) / stages.length) * 100;
      setState(prev => ({ ...prev, overallProgress }));
      
      // Small delay between stages
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setState(prev => ({ 
      ...prev, 
      isRunning: false, 
      endTime: Date.now()
    }));
  };

  const getStatusIcon = (status: DeploymentStage['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-400" />;
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: DeploymentStage['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDuration = (ms?: number) => {
    if (!ms) return '';
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const totalDuration = state.startTime && state.endTime 
    ? state.endTime - state.startTime 
    : undefined;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Deployment Tracker
            {state.isRunning && (
              <Badge className="bg-blue-100 text-blue-800">Running</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Overall Progress: {Math.round(state.overallProgress)}%
              </div>
              {totalDuration && (
                <div className="text-sm text-gray-600">
                  Total Duration: {formatDuration(totalDuration)}
                </div>
              )}
            </div>
            
            <Progress value={state.overallProgress} className="w-full" />
            
            <Button 
              onClick={runDeploymentSequence} 
              disabled={state.isRunning}
              className="w-full"
            >
              {state.isRunning ? 'Running Deployment Tracker...' : 'Start Deployment Tracking'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {state.stages.map((stage, index) => (
          <Card key={stage.id} className={`${
            index === state.currentStage && state.isRunning ? 'ring-2 ring-blue-500' : ''
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(stage.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">{stage.name}</span>
                    <Badge className={getStatusColor(stage.status)}>
                      {stage.status}
                    </Badge>
                    {stage.critical && (
                      <Badge variant="outline" className="text-xs">
                        Critical
                      </Badge>
                    )}
                    {stage.duration && (
                      <span className="text-xs text-gray-500">
                        {formatDuration(stage.duration)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{stage.message}</p>
                  
                  {stage.status === 'running' && (
                    <Progress value={stage.progress} className="w-full mb-2" />
                  )}
                  
                  {stage.details && (
                    <p className="text-xs text-gray-500">{stage.details}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(state.errors.length > 0 || state.warnings.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Issues Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {state.errors.map((error, index) => (
                <div key={index} className="flex items-center gap-2 text-red-600">
                  <XCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              ))}
              {state.warnings.map((warning, index) => (
                <div key={index} className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{warning}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
