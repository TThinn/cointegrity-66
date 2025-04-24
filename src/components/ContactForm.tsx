import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = "your-recaptcha-site-key"; // Replace with your actual site key

const ContactForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
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
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });

      // Send to Supabase Edge Function
      const response = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          recaptchaToken: token,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus("success");
      toast({
        title: "Success",
        description: "Your message has been sent! We'll be in touch soon.",
      });

      // Reset form
      setFormState({
        name: "",
        email: "",
        company: "",
        message: ""
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#133a63]/30 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#010822]/20 rounded-full blur-[70px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className="animate-fade-up text-left lg:text-left md:text-center sm:text-center" 
            style={{
              animationDelay: "0.1s"
            }}
          >
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#133a63]">Contact Us</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Partner With Us to Bring Your Project to Life</h3>
            <p className="mt-4 text-lg text-gray-600">
              Have a project in mind or questions about our services? We're here to help you navigate the decentralized landscape.
            </p>
            
            {/* Added visual element */}
            <div className="mt-10 hidden md:block relative animate-float">
            </div>
          </div>
          
          <div 
            className="contact-card p-8 backdrop-blur-xl relative" 
            style={{
              animationDelay: "0.3s"
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formState.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" 
                    placeholder="John Doe" 
                  />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formState.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" 
                    placeholder="john@example.com" 
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formState.company} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" 
                    placeholder="Your Company" 
                  />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formState.message} 
                    onChange={handleChange} 
                    required 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg border border-[#133a63]/30 focus:ring-2 focus:ring-[#133a63] focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" 
                    placeholder="Tell us about your project or inquiry..." 
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Button type="submit" variant="cta-primary" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send size={18} className="mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>
                
                {submitStatus === "success" && (
                  <div className="mt-4 p-3 rounded-lg bg-green-900/30 text-green-600 flex items-center">
                    <Check size={18} className="mr-2" />
                    Your message has been sent! We'll be in touch soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="mt-4 p-3 rounded-lg bg-red-900/30 text-red-600 flex items-center">
                    <AlertCircle size={18} className="mr-2" />
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
