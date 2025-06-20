
import { useState, useEffect, useRef } from 'react';
import { TestimonialType } from './types';

export const useCardHeight = (testimonials: TestimonialType[], activeTestimonials: number[]) => {
  const [cardHeight, setCardHeight] = useState<number>(320); // Default minimum height
  const measureRef = useRef<HTMLDivElement | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    // Prevent execution during initial render
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    const calculateCardHeight = () => {
      try {
        // Get screen width for responsive calculations
        const screenWidth = window.innerWidth;
        
        // Responsive breakpoints and settings
        const isMobile = screenWidth < 640;
        const isTablet = screenWidth >= 640 && screenWidth < 1024;
        
        // Get the active testimonials to calculate height for
        const activeTestimonialTexts = activeTestimonials.map(index => testimonials[index]?.quote || '');
        
        if (activeTestimonialTexts.length === 0) {
          setCardHeight(320);
          return;
        }

        // Use a more conservative approach without DOM manipulation
        let maxTextLength = 0;
        activeTestimonialTexts.forEach(quote => {
          maxTextLength = Math.max(maxTextLength, quote.length);
        });

        // Estimate height based on text length and screen size
        let estimatedTextHeight;
        
        if (isMobile) {
          // Mobile: narrower width, more line breaks
          estimatedTextHeight = Math.ceil(maxTextLength / 45) * 26; // ~45 chars per line, 26px line height
        } else if (isTablet) {
          // Tablet: medium width
          estimatedTextHeight = Math.ceil(maxTextLength / 65) * 26; // ~65 chars per line
        } else {
          // Desktop: wider width
          estimatedTextHeight = Math.ceil(maxTextLength / 75) * 26; // ~75 chars per line
        }

        // Calculate total card height
        const paddingTop = 48;
        const textToAuthorSpacing = 32;
        const authorSectionHeight = 60;
        const paddingBottom = 48;
        
        const calculatedHeight = paddingTop + estimatedTextHeight + textToAuthorSpacing + authorSectionHeight + paddingBottom;
        
        // Ensure minimum height
        const finalHeight = Math.max(320, calculatedHeight);
        
        setCardHeight(finalHeight);
      } catch (error) {
        console.warn('Error calculating card height, using default:', error);
        setCardHeight(320);
      }
    };

    // Use setTimeout to ensure we're not blocking the render cycle
    const timeoutId = setTimeout(calculateCardHeight, 100);
    
    // Recalculate on window resize with debounce
    let resizeTimeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(calculateCardHeight, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [testimonials, activeTestimonials]);

  return cardHeight;
};
