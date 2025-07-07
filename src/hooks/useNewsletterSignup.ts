
import { useState } from 'react';
// Lazy load Supabase to reduce bundle size
const getSupabase = async () => {
  const { supabase } = await import('@/integrations/supabase/client');
  return supabase;
};
import { showSuccessToast, showErrorToast } from '@/components/ui/custom-toast';

// Enhanced email validation
const validateEmail = (email: string): string[] => {
  const errors = [];
  
  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else {
    const trimmedEmail = email.trim();
    
    if (trimmedEmail.length > 254) {
      errors.push('Email address is too long');
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(trimmedEmail)) {
      errors.push('Please enter a valid email address');
    } else if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
      errors.push('Email format is invalid');
    }
  }
  
  return errors;
};

// Input sanitization
const sanitizeEmail = (email: string): string => {
  return email
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim()
    .toLowerCase();
};

export const useNewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isLoading) {
      return;
    }
    
    setIsLoading(true);

    try {
      // Enhanced validation
      const validationErrors = validateEmail(email);
      if (validationErrors.length > 0) {
        showErrorToast({
          title: 'Invalid Email',
          errorMessage: validationErrors[0],
          formData: { name: '', message: 'Newsletter signup attempt with invalid email' }
        });
        return;
      }

      // Sanitize email
      const sanitizedEmail = sanitizeEmail(email);
      
      console.log('Newsletter signup attempt:', {
        originalEmail: email,
        sanitizedEmail: sanitizedEmail,
        source: 'blog_page'
      });

      // Lazy load Supabase
      const supabase = await getSupabase();

      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: sanitizedEmail,
            source: 'blog_page'
          }
        ]);

      if (error) {
        console.error('Newsletter signup error:', error);
        
        if (error.code === '23505') {
          showErrorToast({
            title: 'Already Subscribed',
            errorMessage: 'This email is already subscribed to our newsletter',
            formData: { name: '', message: `Newsletter signup attempt with email: ${sanitizedEmail}` }
          });
        } else if (error.message.includes('check constraint')) {
          showErrorToast({
            title: 'Invalid Email',
            errorMessage: 'Please enter a valid email address',
            formData: { name: '', message: `Newsletter signup attempt with email: ${sanitizedEmail}` }
          });
        } else if (error.code === '42501') {
          showErrorToast({
            title: 'Access Denied',
            errorMessage: 'Newsletter signup is temporarily unavailable',
            formData: { name: '', message: `Newsletter signup attempt blocked: ${error.message}` }
          });
        } else {
          showErrorToast({
            title: 'Subscription Failed',
            errorMessage: 'An error occurred. Please try again.',
            formData: { name: '', message: `Newsletter signup error: ${error.message}` }
          });
        }
      } else {
        showSuccessToast({
          title: 'Successfully Subscribed!',
          description: `Thank you for subscribing to our newsletter!\n\nYou'll be the first to know when we publish new Web3 insights and analysis.`
        });
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter signup unexpected error:', error);
      showErrorToast({
        title: 'Subscription Failed',
        errorMessage: 'An unexpected error occurred. Please try again.',
        formData: { name: '', message: `Newsletter signup attempt with email: ${email}` }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value: string) => {
    // Apply basic sanitization on input
    const sanitizedValue = value.replace(/<[^>]*>/g, '').substring(0, 254);
    setEmail(sanitizedValue);
  };

  return {
    email,
    setEmail: handleEmailChange,
    isLoading,
    subscribe
  };
};
