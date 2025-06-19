
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Button from "@/components/ui/CustomButtonComponent";
import { Loader2, CheckCircle } from "lucide-react";

const MicaReadyWaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    serviceInterest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            company: formData.company.trim(),
            role: formData.role.trim(),
            service_interest: formData.serviceInterest
          }
        ]);

      if (error) {
        console.error('Error inserting waitlist entry:', error);
        
        if (error.code === '23505') {
          toast.error("This email is already on our waitlist!");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        return;
      }

      setIsSubmitted(true);
      toast.success("Welcome to the waitlist! We'll be in touch soon.");
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        serviceInterest: ''
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto" data-section="waitlist">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">
            You're on the list!
          </h3>
          <p className="text-white/80 mb-6">
            Thank you for joining our MiCA-Ready Suite waitlist. We'll notify you as soon as 
            early access becomes available and keep you updated on our progress.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => setIsSubmitted(false)}
            className="mt-4"
          >
            Join Another Person
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto" data-section="waitlist">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@company.com"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              required
              placeholder="Your company or organization"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
              Role/Title
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., CEO, Compliance Officer, Legal Counsel"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="serviceInterest" className="block text-sm font-medium text-white mb-2">
              Service Interest
            </label>
            <select
              id="serviceInterest"
              name="serviceInterest"
              value={formData.serviceInterest}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="" className="bg-gray-800">Select a service...</option>
              <option value="intelligence-feed" className="bg-gray-800">MiCA Intelligence Feed</option>
              <option value="license-screening" className="bg-gray-800">MiCA License Screening</option>
              <option value="document-review" className="bg-gray-800">Document Review & Enhancement</option>
              <option value="full-application" className="bg-gray-800">Full Application Support</option>
              <option value="multiple" className="bg-gray-800">Multiple Services</option>
              <option value="not-sure" className="bg-gray-800">Not Sure Yet</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full text-lg py-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Joining Waitlist...
              </>
            ) : (
              'Join the Waitlist'
            )}
          </Button>

          <p className="text-xs text-white/60 text-center">
            By joining our waitlist, you agree to receive updates about the MiCA-Ready Suite. 
            We respect your privacy and won't share your information with third parties.
          </p>
        </form>
      </div>
    </div>
  );
};

export default MicaReadyWaitlistForm;
