
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

      if (!recaptchaLoaded) {
        throw new Error("Security verification not loaded. Please refresh the page.");
      }

      const recaptchaPromise = new Promise<string>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Security verification timed out"));
        }, 10000);

        if (typeof window.grecaptcha !== 'undefined') {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then((token: string) => {
              clearTimeout(timeout);
              resolve(token);
            })
            .catch((error: Error) => {
              clearTimeout(timeout);
              reject(error);
            });
        } else {
          clearTimeout(timeout);
          reject(new Error("ReCAPTCHA not available"));
        }
      });

      const token = await recaptchaPromise;

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
