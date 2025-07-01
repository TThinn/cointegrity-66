
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DeploymentTracker } from "@/components/deployment/DeploymentTracker";
import { DeploymentAnalyzer } from "@/components/deployment/DeploymentAnalyzer";
import { DeploymentDiagnostic } from "@/components/debug/DeploymentDiagnostic";

const DeploymentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#010822] p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-white text-2xl">🚀 Comprehensive Deployment Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80 mb-4">
              Complete deployment monitoring and diagnostics for cointegrity.io
            </p>
            <div className="text-sm text-white/60 space-y-1">
              <p>Current domain: <span className="font-mono text-blue-300">{window.location.hostname}</span></p>
              <p>Protocol: <span className="font-mono text-blue-300">{window.location.protocol}</span></p>
              <p>Build mode: <span className="font-mono text-blue-300">{import.meta.env.MODE}</span></p>
              <p>Timestamp: <span className="font-mono text-blue-300">{new Date().toLocaleString()}</span></p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="tracker" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tracker">Deployment Tracker</TabsTrigger>
            <TabsTrigger value="analyzer">Issue Analyzer</TabsTrigger>
            <TabsTrigger value="diagnostic">Service Diagnostic</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracker" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Real-time Deployment Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Monitor the entire deployment process step-by-step to identify exactly where failures occur.
                </p>
                <DeploymentTracker />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Deployment Issue Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Analyze current deployment issues and get specific solutions for each problem.
                </p>
                <DeploymentAnalyzer />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="diagnostic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-white">Service Diagnostics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 mb-4">
                  Test all external services and integrations to ensure they're working correctly.
                </p>
                <DeploymentDiagnostic />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">🎯 Quick Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-white/80">
              <div className="p-4 bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2 text-blue-300">1. Domain Configuration</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Verify custom domain is set to cointegrity.io</li>
                  <li>Check DNS A record points to Lovable's IP</li>
                  <li>Ensure SSL certificate is active</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-900/20 rounded-lg">
                <h4 className="font-medium mb-2 text-green-300">2. Service Configuration</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Update reCAPTCHA site key for new domain</li>
                  <li>Configure SMTP settings for contact form</li>
                  <li>Verify Google Analytics tracking code</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium mb-2 text-yellow-300">3. Build Process</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Ensure production build is deployed</li>
                  <li>Check for any build errors or warnings</li>
                  <li>Verify all dependencies are installed</li>
                </ul>
              </div>
              
              <div className="p-4 bg-purple-900/20 rounded-lg">
                <h4 className="font-medium mb-2 text-purple-300">4. Performance</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Enable service worker for caching</li>
                  <li>Optimize images and assets</li>
                  <li>Test loading times across devices</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeploymentDashboard;
