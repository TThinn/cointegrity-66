
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PlaceholderData } from "@/utils/contactPlaceholders";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

// Use the same RECAPTCHA site key that's defined in ContactForm
const RECAPTCHA_SITE_KEY = "6Lc_BCMrAAAAAAJ53CbmGbCdpq1plgfqyOJjInN1";

export const useContactForm = () => {
  const { toast } = useToast();
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
            }, 5000);

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

      // Call the edge function with the form data and token
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formState,
          recaptchaToken: token
        }
      });

      if (error) {
        throw new Error(error.message || "Failed to send message");
      }

      toast({
        title: "Success",
        description: "Your message has been sent! We'll be in touch soon."
      });
      resetForm();
    } catch (error: any) {
      console.error('Contact form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to send message. Please try again."
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
