
import React, { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButton";
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from "lucide-react";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      
      // Reset form after submission
      setFormState({
        name: "",
        email: "",
        company: "",
        message: "",
      });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[70px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="text-sm font-semibold text-purple-600 uppercase tracking-wider">Contact Us</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Let's Build Your Web3 Future
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Have a project in mind or questions about our services? We're here to help you navigate the decentralized landscape.
            </p>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Mail size={20} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-700">Email Us</p>
                  <a href="mailto:contact@omega-web3.com" className="text-base text-purple-600 hover:text-purple-700">
                    contact@omega-web3.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Phone size={20} className="text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-700">Call Us</p>
                  <a href="tel:+11234567890" className="text-base text-blue-600 hover:text-blue-700">
                    +1 (123) 456-7890
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <MapPin size={20} className="text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-700">Visit Us</p>
                  <p className="text-base text-gray-600">
                    123 Blockchain Ave, Suite 200<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
            
            {/* Added visual element */}
            <div className="mt-10 hidden md:block relative animate-float">
              <img 
                src="/lovable-uploads/0a9ba7eb-382a-4fff-a4e6-c616ab19371d.png" 
                alt="Web3 Technology Visualization" 
                className="max-w-[180px] h-auto rounded-lg opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg mix-blend-overlay"></div>
            </div>
          </div>
          
          <div className="glass-card animate-fade-up relative" style={{ animationDelay: "0.3s" }}>
            <div className="absolute -top-10 -right-10 w-[150px] h-[150px] animate-pulse opacity-30">
              <img 
                src="/lovable-uploads/4e58e92f-3bc5-42cb-ada9-d7b8af5e4c7b.png" 
                alt="Decorative tech element" 
                className="w-full h-full object-contain opacity-70"
              />
            </div>
            
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all focus:outline-none"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all focus:outline-none"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all focus:outline-none"
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
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all focus:outline-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full"
                  isGlowing
                  disabled={isSubmitting}
                >
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
                  <div className="mt-4 p-3 rounded-lg bg-green-50 text-green-700 flex items-center">
                    <Check size={18} className="mr-2" />
                    Your message has been sent! We'll be in touch soon.
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 flex items-center">
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
