import { useState } from 'react';
import { securityGuard } from '@/utils/securityGuard';
import { toast } from 'sonner';

interface SecureFormOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  rateLimitAction?: string;
}

export const useSecureFormSubmission = (options: SecureFormOptions = {}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionTime, setSubmissionTime] = useState<number | null>(null);

  const startSubmission = () => {
    setSubmissionTime(Date.now());
  };

  const submitSecurely = async (
    data: {
      name: string;
      email: string;
      company: string;
      [key: string]: any;
    },
    submitFunction: (data: any) => Promise<any>
  ) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const timing = submissionTime ? Date.now() - submissionTime : undefined;
      const userAgent = navigator.userAgent;

      // Run security checks
      const securityChecks = await securityGuard.validateFormSubmission({
        name: data.name,
        email: data.email,
        company: data.company,
        userAgent,
        timing
      });

      // Check for blocking issues
      const blockingIssues = securityChecks.filter(check => !check.passed && check.action === 'block');
      if (blockingIssues.length > 0) {
        const reason = blockingIssues[0].reason || 'Security validation failed';
        
        // Log security event
        await securityGuard.logSecurityEvent({
          type: 'validation_failure',
          details: { 
            reason,
            checks: blockingIssues,
            formData: { name: data.name, email: data.email, company: data.company }
          },
          severity: 'high',
          userAgent
        });

        toast.error(reason);
        options.onError?.(reason);
        return;
      }

      // Check for warnings
      const warnings = securityChecks.filter(check => !check.passed && check.action === 'warn');
      if (warnings.length > 0) {
        await securityGuard.logSecurityEvent({
          type: 'form_submission',
          details: { 
            warnings: warnings.map(w => w.reason),
            formData: { name: data.name, email: data.email, company: data.company }
          },
          severity: 'medium',
          userAgent
        });
      }

      // Sanitize data before submission
      const sanitizedData = {
        ...data,
        name: securityGuard.sanitizeOutput(data.name),
        email: securityGuard.sanitizeOutput(data.email),
        company: securityGuard.sanitizeOutput(data.company)
      };

      // Submit the form
      const result = await submitFunction(sanitizedData);

      // Log successful submission
      await securityGuard.logSecurityEvent({
        type: 'form_submission',
        details: { 
          success: true,
          formType: 'secure_submission',
          email: data.email
        },
        severity: 'low',
        userAgent
      });

      options.onSuccess?.(result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Submission failed';
      
      // Log error
      await securityGuard.logSecurityEvent({
        type: 'form_submission',
        details: { 
          error: errorMessage,
          formData: { name: data.name, email: data.email, company: data.company }
        },
        severity: 'high',
        userAgent: navigator.userAgent
      });

      toast.error(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitSecurely,
    startSubmission
  };
};