
import { useState, useEffect } from 'react';
import { TestimonialType } from './types';

export const useCardHeight = (testimonials: TestimonialType[], activeTestimonials: number[]) => {
  const [cardHeight, setCardHeight] = useState<number>(320);

  useEffect(() => {
    // Simple height calculation based on content length
    const calculateHeight = () => {
      if (activeTestimonials.length === 0) {
        setCardHeight(320);
        return;
      }

      // Get the longest quote from active testimonials
      let maxLength = 0;
      activeTestimonials.forEach(index => {
        const quote = testimonials[index]?.quote || '';
        maxLength = Math.max(maxLength, quote.length);
      });

      // Simple height estimation based on character count
      const baseHeight = 200;
      const estimatedTextHeight = Math.ceil(maxLength / 60) * 24; // ~60 chars per line, 24px line height
      const totalHeight = baseHeight + estimatedTextHeight;
      
      setCardHeight(Math.max(320, totalHeight));
    };

    calculateHeight();
  }, [testimonials, activeTestimonials]);

  return cardHeight;
};
