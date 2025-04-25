
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useRecaptcha } from './useRecaptcha';

export interface ContactFormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export const useContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const { getToken, isLoaded } = useRecaptcha();

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
    
    if (!isLoaded) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please wait for the page to fully load before submitting."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("Getting reCAPTCHA token...");
      const token = await getToken();
      console.log("Token received, sending to edge function...");
      
      if (!token) {
        throw new Error("Failed to generate reCAPTCHA token");
      }

      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formState,
          recaptchaToken: token
        }
      });

      console.log("Response from edge function:", { data, error });

      if (error) {
        throw new Error(error.message || "An error occurred while sending your message");
      }

      toast({
        title: "Success",
        description: "Your message has been sent! We'll be in touch soon."
      });
      resetForm();
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    isSubmitting,
    handleChange,
    handleSubmit,
    isLoaded
  };
};
