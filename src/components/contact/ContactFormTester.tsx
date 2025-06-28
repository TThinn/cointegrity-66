
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

const ContactFormTester = () => {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTests = async () => {
    setIsRunning(true);
    const results = [];

    // Test 1: Check if edge function exists
    console.log("Testing contact form edge function availability...");
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: "Test User",
          email: "test@example.com",
          company: "Test Company",
          message: "This is a test message to verify the contact form is working.",
          recaptchaToken: "test-token"
        }
      });
      
      results.push({
        test: "Edge Function Availability",
        status: error ? "FAIL" : "PASS",
        details: error ? error.message : "Function responded successfully",
        data: data
      });
    } catch (err) {
      results.push({
        test: "Edge Function Availability", 
        status: "ERROR",
        details: err.message,
        data: null
      });
    }

    // Test 2: Check security audit log table
    console.log("Testing security audit log table...");
    try {
      const { data, error } = await supabase
        .from('security_audit_log')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false });
        
      results.push({
        test: "Security Audit Log Table",
        status: error ? "FAIL" : "PASS", 
        details: error ? error.message : `Found ${data?.length || 0} recent audit entries`,
        data: data
      });
    } catch (err) {
      results.push({
        test: "Security Audit Log Table",
        status: "ERROR",
        details: err.message,
        data: null
      });
    }

    // Test 3: Check rate limit log table
    console.log("Testing rate limit table...");
    try {
      const { data, error } = await supabase
        .from('rate_limit_log')
        .select('*')
        .limit(5)
        .order('last_attempt', { ascending: false });
        
      results.push({
        test: "Rate Limit Log Table",
        status: error ? "FAIL" : "PASS",
        details: error ? error.message : `Found ${data?.length || 0} rate limit entries`,
        data: data
      });
    } catch (err) {
      results.push({
        test: "Rate Limit Log Table", 
        status: "ERROR",
        details: err.message,
        data: null
      });
    }

    // Test 4: Test form validation
    console.log("Testing form validation...");
    const validationTests = [
      { name: "", email: "test@example.com", message: "test", expected: "fail" },
      { name: "Test", email: "invalid-email", message: "test", expected: "fail" },
      { name: "Test", email: "test@example.com", message: "", expected: "fail" },
      { name: "Valid Name", email: "valid@example.com", message: "Valid message that is long enough", expected: "pass" }
    ];

    for (const testCase of validationTests) {
      const errors = [];
      
      if (!testCase.name || testCase.name.length < 2) errors.push("Name too short");
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(testCase.email)) errors.push("Invalid email");
      if (!testCase.message || testCase.message.length < 10) errors.push("Message too short");
      
      const actualResult = errors.length === 0 ? "pass" : "fail";
      
      results.push({
        test: `Form Validation: ${testCase.name || 'Empty'} / ${testCase.email}`,
        status: actualResult === testCase.expected ? "PASS" : "FAIL",
        details: errors.length > 0 ? errors.join(", ") : "Validation passed",
        data: testCase
      });
    }

    setTestResults(results);
    setIsRunning(false);
    console.log("Contact form tests completed:", results);
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Contact Form Testing Dashboard</h3>
        <Button onClick={runTests} disabled={isRunning}>
          {isRunning ? "Running Tests..." : "Run Tests"}
        </Button>
      </div>

      {testResults.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Test Results:</h4>
          {testResults.map((result, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{result.test}</span>
                <Badge 
                  variant={result.status === "PASS" ? "default" : "destructive"}
                >
                  {result.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2">{result.details}</p>
              {result.data && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-gray-500">View Details</summary>
                  <pre className="mt-2 bg-gray-100 p-2 rounded overflow-auto">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium mb-2">Manual Testing Steps:</h4>
        <ol className="text-sm space-y-1 list-decimal list-inside">
          <li>Fill out the contact form with valid information</li>
          <li>Submit the form and check for success message</li>
          <li>Try submitting with invalid data to test validation</li>
          <li>Check the browser console for any errors</li>
          <li>Verify emails are being sent (check with the recipient)</li>
        </ol>
      </div>
    </Card>
  );
};

export default ContactFormTester;
