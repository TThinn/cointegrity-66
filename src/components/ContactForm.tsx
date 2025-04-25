
import React from "react";
import Container from "./ui/Container";
import { Send } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
import FormInput from "./ui/FormInput";
import { useContactForm } from "@/hooks/useContactForm";

const ContactForm = () => {
  const { formState, isSubmitting, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative overflow-hidden">
      {/* Background elements */}
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
            <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Partner With Us to Bring Your Project to Life
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Have a project in mind or questions about our services? We're here to help you navigate the decentralized landscape.
            </p>
            <div className="mt-10 hidden md:block relative animate-float"></div>
          </div>
          
          <div className="p-8 backdrop-blur-sm rounded-lg bg-white/20 relative"
            style={{
              animationDelay: "0.3s",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.7)"
            }}>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormInput
                  label="Your Name"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
                
                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
                
                <div className="col-span-2">
                  <FormInput
                    label="Company (Optional)"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                  />
                </div>
                
                <div className="col-span-2">
                  <FormInput
                    label="Your Message"
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    isTextArea
                    rows={4}
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
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
