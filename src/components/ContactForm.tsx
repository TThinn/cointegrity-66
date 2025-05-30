import React, { useEffect, useState } from "react";
import { placeholders, PlaceholderData } from "@/utils/contactPlaceholders";
import Container from "./ui/Container";
import ContactFormFields from "./contact/ContactFormFields";
import SubmitButton from "./contact/SubmitButton";
import { useContactForm } from "@/hooks/useContactForm";
import { Link } from "react-router-dom";

const RECAPTCHA_SITE_KEY = "6Lc_BCMrAAAAAAJ53CbmGbCdpq1plgfqyOJjInN1";

const ContactForm = () => {
  const {
    formState,
    isSubmitting,
    recaptchaLoaded,
    setRecaptchaLoaded,
    handleChange,
    handleSubmit
  } = useContactForm();
  const [currentPlaceholder, setCurrentPlaceholder] = useState<PlaceholderData>(placeholders[0]);
  const [isTyping, setIsTyping] = useState(false);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (!isTyping) {
      intervalId = setInterval(() => {
        setCurrentPlaceholder(prev => {
          const currentIndex = placeholders.findIndex(p => p.name === prev.name);
          const nextIndex = (currentIndex + 1) % placeholders.length;
          return placeholders[nextIndex];
        });
      }, 8000); // Changed from 5000 to 7000 (7 seconds)
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isTyping]);
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.onload = () => setRecaptchaLoaded(true);
        script.onerror = () => {
          console.error("Failed to load reCAPTCHA");
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
  }, [setRecaptchaLoaded]);
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsTyping(true);
    handleChange(e);
  };
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#133a63]/30 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#010822]/20 rounded-full blur-[70px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left lg:text-left md:text-center sm:text-center">
            <h2 className="font-semibold uppercase tracking-wider text-[cb46b3] text-[#cb46b3]">
              DIGITAL ASSET SOLUTIONS
            </h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Partner With Leading Web3 Experts to Transform Your Business
            </h3>
            <p className="mt-2 text-lg text-gray-600">
              Have a Web3 project in mind or questions about blockchain implementation? Our{" "}
              <Link to="/team" className="text-[#cb46b3] hover:text-[#cb46b3]/80 underline transition-colors">
                expert consultants
              </Link>{" "}
              are here to help you navigate the decentralized landscape with confidence. From{" "}
              <Link to="/services#tokenomics" className="text-[#cb46b3] hover:text-[#cb46b3]/80 underline transition-colors">
                tokenomics design
              </Link>{" "}
              to{" "}
              <Link to="/services#compliance" className="text-[#cb46b3] hover:text-[#cb46b3]/80 underline transition-colors">
                MiCA compliance
              </Link>, we provide comprehensive solutions tailored to your organization's needs.
            </p>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>
                📧 Trusted by governments, enterprises, and Web3 startups worldwide<br/>
                🔒 Confidential consultations with industry-leading experts<br/>
                ⚡ Rapid response within 24 hours for urgent blockchain projects
              </p>
            </div>
            
            <div className="mt-10 hidden md:block relative animate-float"></div>
          </div>
          
          <div className="p-8 backdrop-blur-sm rounded-lg bg-white/20 relative" style={{
            animationDelay: "0.3s",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.7)"
          }}>
            <form onSubmit={handleSubmit}>
              <ContactFormFields 
                formState={formState} 
                currentPlaceholder={currentPlaceholder} 
                handleChange={handleFormChange} 
              />
              <div className="mt-6">
                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </form>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              By submitting this form, you agree to receive communications about our Web3 consulting services. 
              Read our <Link to="/privacy" className="underline hover:text-gray-700">privacy policy</Link>.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
