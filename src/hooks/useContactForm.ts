
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PlaceholderData } from "@/utils/contactPlaceholders";
import { showSuccessToast, showErrorToast } from "@/components/ui/custom-toast";
import { useNavigate } from "react-router-dom";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Use the same RECAPTCHA site key that's defined in ContactForm
const RECAPTCHA_SITE_KEY = "6Lc_BCMrAAAAAAJ53CbmGbCdpq1plgfqyOJjInN1";

// Enhanced client-side validation
const validateFormData = (formState: FormState) => {
  const errors = [];
  
  // Name validation
  if (!formState.name.trim()) {
    errors.push("Name is required");
  } else if (formState.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  } else if (formState.name.trim().length > 100) {
    errors.push("Name must be less than 100 characters");
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(formState.name.trim())) {
    errors.push("Name can only contain letters, spaces, hyphens, apostrophes, and periods");
  }
  
  // Email validation
  if (!formState.email.trim()) {
    errors.push("Email is required");
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formState.email.trim())) {
    errors.push("Please enter a valid email address");
  } else if (formState.email.trim().length > 254) {
    errors.push("Email address is too long");
  }
  
  // Message validation
  if (!formState.message.trim()) {
    errors.push("Message is required");
  } else if (formState.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long");
  } else if (formState.message.trim().length > 5000) {
    errors.push("Message must be less than 5000 characters");
  }
  
  // Company validation (optional)
  if (formState.company && formState.company.trim().length > 200) {
    errors.push("Company name must be less than 200 characters");
  }
  
  return errors;
};

// Input sanitization
const sanitizeInput = (input: string): string => {
  // Remove potential script tags and dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim();
};

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const navigate = useNavigate();

  const resetForm = useCallback(() => {
    setFormState({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply real-time input sanitization
    const sanitizedValue = sanitizeInput(value);
    
    setFormState(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Enhanced client-side validation
      const validationErrors = validateFormData(formState);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0]); // Show first error
      }

      // Additional sanitization before submission
      const sanitizedFormState = {
        name: sanitizeInput(formState.name),
        email: sanitizeInput(formState.email.toLowerCase()),
        company: sanitizeInput(formState.company),
        message: sanitizeInput(formState.message)
      };

      // Get reCAPTCHA token with enhanced error handling
      let token = "recaptcha-not-available";
      
      if (recaptchaLoaded && typeof window.grecaptcha !== 'undefined') {
        try {
          token = await new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.log("reCAPTCHA timeout, proceeding with fallback");
              resolve("recaptcha-timeout");
            }, 7000);

            window.grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
              .then((recaptchaToken: string) => {
                clearTimeout(timeout);
                
                // Validate token format
                if (!recaptchaToken || recaptchaToken.length < 20) {
                  console.warn("Invalid reCAPTCHA token format");
                  resolve("recaptcha-invalid");
                } else {
                  resolve(recaptchaToken);
                }
              })
              .catch((error: Error) => {
                clearTimeout(timeout);
                console.warn("reCAPTCHA error:", error);
                resolve("recaptcha-error");
              });
          });
        } catch (recaptchaError) {
          console.warn("Error getting reCAPTCHA token:", recaptchaError);
        }
      }

      console.log("Submitting form with enhanced validation:", { 
        name: sanitizedFormState.name,
        email: sanitizedFormState.email,
        company: sanitizedFormState.company,
        messageLength: sanitizedFormState.message.length,
        recaptchaTokenType: token.startsWith('recaptcha-') ? token : 'valid-token'
      });

      // Call the edge function with sanitized data
      const { data: mainData, error: mainError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...sanitizedFormState,
          recaptchaToken: token
        }
      });

      console.log("Edge function response:", mainData, mainError);

      if (mainError) {
        // Handle specific error types
        if (mainError.message.includes('Too many requests')) {
          throw new Error("Too many requests. Please wait before trying again.");
        } else if (mainError.message.includes('Validation failed')) {
          throw new Error("Please check your input and try again.");
        } else if (mainError.message.includes('Security verification')) {
          throw new Error("Security verification failed. Please try again.");
        }
        throw new Error(mainError.message || "Failed to send message");
      }

      // Send confirmation email (non-blocking)
      try {
        const { error: confirmError } = await supabase.functions.invoke('send-confirmation-email', {
          body: {
            name: sanitizedFormState.name,
            email: sanitizedFormState.email,
            company: sanitizedFormState.company
          }
        });

        if (confirmError) {
          console.warn("Failed to send confirmation email:", confirmError);
        }
      } catch (confirmSendError) {
        console.warn("Error sending confirmation email:", confirmSendError);
      }

      // Success - navigate to thank you page
      resetForm();
      navigate('/thank-you');
      
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      
      showErrorToast({
        title: "Message Not Sent",
        errorMessage: error.message || "Failed to send message. Please try again.",
        formData: {
          name: formState.name,
          message: formState.message
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    isSubmitting,
    recaptchaLoaded,
    setRecaptchaLoaded,
    handleChange,
    handleSubmit
  };
};
