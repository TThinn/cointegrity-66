
import React, { useState } from "react";
import Container from "./ui/Container";
import { Mail, Phone, MapPin, Send, Check, AlertCircle } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
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
        message: ""
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    }, 1500);
  };
  return <section id="contact" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/30 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[70px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up" style={{
          animationDelay: "0.1s"
        }}>
            <span className="text-sm font-semibold uppercase tracking-wider text-pink-600">Contact Us</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
              Let's Build Your Web3 Future
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have a project in mind or questions about our services? We're here to help you navigate the decentralized landscape.
            </p>
            
            {/* Added visual element */}
            <div className="mt-10 hidden md:block relative animate-float">
            </div>
          </div>
          
          <div className="glass-card bg-white/60 backdrop-blur-xl border border-pink-100/50 hover:border-pink-200/70 animate-fade-up relative" style={{
          animationDelay: "0.3s"
        }}>
            <div className="absolute -top-10 -right-10 w-[150px] h-[150px] animate-pulse opacity-30">
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="John Doe" />
                </div>
                
                <div className="col-span-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="john@example.com" />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company (Optional)
                  </label>
                  <input type="text" id="company" name="company" value={formState.company} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="Your Company" />
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea id="message" name="message" value={formState.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-lg border border-purple-100 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all focus:outline-none bg-white/80 text-gray-800" placeholder="Tell us about your project or inquiry..." />
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
                
                {submitStatus === "success" && <div className="mt-4 p-3 rounded-lg bg-green-900/30 text-green-600 flex items-center">
                    <Check size={18} className="mr-2" />
                    Your message has been sent! We'll be in touch soon.
                  </div>}
                
                {submitStatus === "error" && <div className="mt-4 p-3 rounded-lg bg-red-900/30 text-red-600 flex items-center">
                    <AlertCircle size={18} className="mr-2" />
                    There was an error sending your message. Please try again.
                  </div>}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>;
};
export default ContactForm;
