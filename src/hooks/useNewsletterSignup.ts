
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { showSuccessToast, showErrorToast } from '@/components/ui/custom-toast';

export const useNewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      showErrorToast({
        title: 'Invalid Email',
        errorMessage: 'Please enter a valid email address',
        formData: { name: '', message: 'Newsletter signup attempt with invalid email' }
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert([
          {
            email: email.toLowerCase().trim(),
            source: 'blog_page'
          }
        ]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          showErrorToast({
            title: 'Already Subscribed',
            errorMessage: 'This email is already subscribed to our newsletter',
            formData: { name: '', message: `Newsletter signup attempt with email: ${email}` }
          });
        } else {
          showErrorToast({
            title: 'Subscription Failed',
            errorMessage: error.message,
            formData: { name: '', message: `Newsletter signup attempt with email: ${email}` }
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
      console.error('Newsletter signup error:', error);
      showErrorToast({
        title: 'Subscription Failed',
        errorMessage: 'An unexpected error occurred. Please try again.',
        formData: { name: '', message: `Newsletter signup attempt with email: ${email}` }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    isLoading,
    subscribe
  };
};
