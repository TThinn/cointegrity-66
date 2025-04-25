import React, { useState, useEffect, useCallback } from "react";
import Container from "./ui/Container";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import { useToast } from "@/hooks/use-toast";

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
  // Explicitly set this section to have a dark background
  const isDarkBackground = true;
  
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to reset form state
  const resetForm = useCallback(() => {
    setFormState({
      name: "",
      email: "",
      company: "",
      message: ""
    });
  }, []);

  // Helper function to show toast notifications
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
    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    // Improved cleanup function with error handling
    return () => {
      // Check if the script element still exists before removing
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
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
      // Get reCAPTCHA token
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: 'submit'
      });

      // Send to Supabase Edge Function
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formState,
          recaptchaToken: token
        })
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Show success notification and reset form
      showNotification("success", "Your message has been sent! We'll be in touch soon.");
      resetForm();
    } catch (error) {
      showNotification("error", "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return <section id="contact" className="py-20 relative overflow-hidden">
      {/* Updated background to match Process section */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#133a63]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up text-left lg:text-left md:text-center sm:text-center" style={{
          animationDelay: "0.1s"
        }}>
            <h2 className="font-semibold uppercase tracking-wider text-[cb46b3] text-[#cb46b3]">Contact Us</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">Partner With Us to Bring Your Project to Life</h3>
            <p className="mt-4 text-lg text-white/60">
              Have a project in mind or questions about our services? We're here to help you navigate the decentralized landscape.
            </p>
            
            {/* Added visual element */}
            <div className="mt-10 hidden md:block relative animate-float">
            </div>
          </div>
          
          <div 
            className="p-8 backdrop-blur-sm rounded-lg bg-white/15 relative"
            style={{
              animationDelay: "0.3s",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)"
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Your Name
                  </label>
                  <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/10 text-white" placeholder="John Doe" />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/10 text-white" placeholder="john@example.com" />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-1">
                    Company (Optional)
                  </label>
                  <input type="text" id="company" name="company" value={formState.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/10 text-white" placeholder="Your Company" />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-1">
                    Your Message
                  </label>
                  <textarea id="message" name="message" value={formState.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/10 text-white" placeholder="Tell us about your project or inquiry..." />
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
