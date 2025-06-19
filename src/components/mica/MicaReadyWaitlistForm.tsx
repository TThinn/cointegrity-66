
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Button from "@/components/ui/CustomButtonComponent";
import { Loader2, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MicaReadyWaitlistFormProps {
  serviceInterest: string;
  buttonText: string;
  buttonClass: string;
}

const MicaReadyWaitlistForm = ({ serviceInterest, buttonText, buttonClass }: MicaReadyWaitlistFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            service_interest: serviceInterest
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
        role: ''
      });

    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      role: ''
    });
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <button className={buttonClass}>
            {buttonText}
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white">
          <div className="text-center p-4">
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
              onClick={handleClose}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={buttonClass}>
          {buttonText}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-4">
            Join the Waitlist
          </DialogTitle>
        </DialogHeader>
        
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

          <div className="flex gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Joining...
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </div>

          <p className="text-xs text-white/60 text-center">
            By joining our waitlist, you agree to receive updates about the MiCA-Ready Suite. 
            We respect your privacy and won't share your information with third parties.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MicaReadyWaitlistForm;
