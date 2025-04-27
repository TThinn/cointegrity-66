import React, { useState, useEffect, useCallback } from "react";
import Container from "./ui/Container";
import { Mail, Send } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: {
        action: string;
      }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = "6Lc_BCMrAAAAAAJ53CbmGbCdpq1plgfqyOJjInN1";

const ContactForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
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

  const showNotification = useCallback((type: "success" | "error", message: string) => {
    if (type === "success") {
      toast({
        title: "Success",
        description: message
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: message
      });
    }
  }, [toast]);

  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => {
          console.error("Failed to load reCAPTCHA");
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load security verification. Please refresh the page."
          });
        };
        document.body.appendChild(script);

        return () => {
          if (script && document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      } catch (error) {
        console.error("Error loading reCAPTCHA:", error);
      }
    };

    loadRecaptcha();
  }, [toast]);

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

  return <section id="contact" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#133a63]/30 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#010822]/20 rounded-full blur-[70px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up text-left lg:text-left md:text-center sm:text-center" style={{
          animationDelay: "0.1s"
        }}>
            <h2 className="font-semibold uppercase tracking-wider text-[cb46b3] text-[#cb46b3]">Contact Us</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Partner With Us to Bring Your Project to Life</h3>
            <p className="mt-4 text-lg text-gray-600">
              Have a project in mind or questions about our services? We're here to help you navigate the decentralized landscape.
            </p>
            
            <div className="mt-10 hidden md:block relative animate-float">
            </div>
          </div>
          
          <div 
            className="p-8 backdrop-blur-sm rounded-lg bg-white/20 relative"
            style={{
              animationDelay: "0.3s",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.7)"
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="John Doe" />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="john@example.com" />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input type="text" id="company" name="company" value={formState.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="Your Company" />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea id="message" name="message" value={formState.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="Tell us about your project or inquiry..." />
                </div>
              </div>
              
              <div className="mt-6">
                <Button type="submit" variant="cta-primary" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span> : <span className="flex items-center">
                      <Send size={18} className="mr-2" />
                      Send Message
                    </span>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>;
};

export default ContactForm;
