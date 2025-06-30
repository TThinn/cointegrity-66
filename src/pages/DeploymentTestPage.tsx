
import React from "react";
import { DeploymentDiagnostic } from "@/components/debug/DeploymentDiagnostic";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DeploymentTestPage = () => {
  const testBasicFunctionality = () => {
    console.log('🧪 Testing basic functionality...');
    console.log('Current URL:', window.location.href);
    console.log('User Agent:', navigator.userAgent);
    console.log('Local Storage available:', typeof Storage !== 'undefined');
    console.log('Fetch API available:', typeof fetch !== 'undefined');
  };

  return (
    <div className="min-h-screen bg-[#010822] p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">🚀 Deployment Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-white/80">
                This page helps debug deployment issues for cointegrity.io
              </p>
              <Button onClick={testBasicFunctionality}>
                Test Basic Browser APIs
              </Button>
              <div className="text-sm text-white/60">
                <p>Current domain: <span className="font-mono">{window.location.hostname}</span></p>
                <p>Protocol: <span className="font-mono">{window.location.protocol}</span></p>
                <p>Port: <span className="font-mono">{window.location.port || 'default'}</span></p>
              </div>
            </div>
          </CardContent>
        </Card>

        <DeploymentDiagnostic />

        <Card>
          <CardHeader>
            <CardTitle className="text-white">🔧 Quick Fixes to Try</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-white/80">
              <div className="p-3 bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-2">1. Check External Service Configuration</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Verify reCAPTCHA site key is configured for cointegrity.io</li>
                  <li>Check if Cookiebot ID works with the new domain</li>
                  <li>Ensure Google Analytics allows the domain</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-900/20 rounded-lg">
                <h4 className="font-medium mb-2">2. DNS & SSL Verification</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Verify A record points to correct IP</li>
                  <li>Check SSL certificate is valid</li>
                  <li>Test with different browsers/devices</li>
                </ul>
              </div>
              
              <div className="p-3 bg-yellow-900/20 rounded-lg">
                <h4 className="font-medium mb-2">3. Network Issues</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Try accessing from different networks</li>
                  <li>Check if corporate firewalls are blocking</li>
                  <li>Test with mobile data vs WiFi</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeploymentTestPage;
