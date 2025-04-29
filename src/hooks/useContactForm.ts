
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PlaceholderData } from "@/utils/contactPlaceholders";
import { showSuccessToast, showErrorToast } from "@/components/ui/custom-toast";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Use the same RECAPTCHA site key that's defined in ContactForm
const RECAPTCHA_SITE_KEY = "6Lc_BCMrAAAAAAJ53CbmGbCdpq1plgfqyOJjInN1";

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

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
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formState.name || !formState.email || !formState.message) {
        throw new Error("Please fill in all required fields");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Get reCAPTCHA token if available, otherwise use a fallback
      let token = "recaptcha-not-available";
      
      // If reCAPTCHA is loaded, try to get a token
      if (recaptchaLoaded && typeof window.grecaptcha !== 'undefined') {
        try {
          token = await new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
              console.log("reCAPTCHA timeout, proceeding with fallback");
              resolve("recaptcha-timeout");
            }, 7000); // Updated from 5000 to 7000

            window.grecaptcha
              .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
              .then((recaptchaToken: string) => {
                clearTimeout(timeout);
                resolve(recaptchaToken);
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
      } else {
        console.warn("reCAPTCHA not loaded or not available");
      }

      console.log("Submitting form with data:", { 
        name: formState.name,
        email: formState.email,
        company: formState.company,
        messageLength: formState.message.length,
        recaptchaTokenLength: token.length
      });

      // Call the edge function with the form data and token
      const { data: mainData, error: mainError } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formState,
          recaptchaToken: token
        }
      });

      console.log("Edge function response:", mainData, mainError);

      if (mainError) {
        throw new Error(mainError.message || "Failed to send message");
      }

      // Send confirmation email to the customer
      try {
        const { data: confirmData, error: confirmError } = await supabase.functions.invoke('send-confirmation-email', {
          body: {
            name: formState.name,
            email: formState.email,
            company: formState.company
          }
        });

        if (confirmError) {
          console.warn("Failed to send confirmation email:", confirmError);
          // Don't throw error here, we still want to count the submission as successful
        } else {
          console.log("Confirmation email sent successfully:", confirmData);
        }
      } catch (confirmSendError) {
        console.warn("Error sending confirmation email:", confirmSendError);
        // Don't block the success flow if confirmation email fails
      }

      showSuccessToast({
        title: "Thank you for reaching out! 🚀",
        description: "We've received your message and our team of wizards is on it.\nA confirmation email is heading your way - keep an eye on your inbox!"
      });
      
      resetForm();
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
