
import { useState, useEffect } from 'react';
import { TestimonialType } from './types';

export const useCardHeight = (testimonials: TestimonialType[], activeTestimonials: number[]) => {
  const [cardHeight, setCardHeight] = useState<number>(320); // Default minimum height

  useEffect(() => {
    const calculateCardHeight = () => {
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

      // Create a temporary element to measure text dimensions
      const measureElement = document.createElement('div');
      measureElement.style.position = 'absolute';
      measureElement.style.visibility = 'hidden';
      measureElement.style.whiteSpace = 'normal';
      measureElement.style.wordWrap = 'break-word';
      measureElement.style.fontFamily = 'inherit';
      measureElement.style.lineHeight = '1.625'; // leading-relaxed = 1.625
      
      // Set responsive font size and container width
      if (isMobile) {
        measureElement.style.fontSize = '16px'; // text-base
        measureElement.style.width = `${screenWidth - 96}px`; // Account for padding and margins
      } else if (isTablet) {
        measureElement.style.fontSize = '16px'; // text-base
        measureElement.style.width = `${(screenWidth - 200) / 2}px`; // Two columns with gaps and padding
      } else {
        measureElement.style.fontSize = '16px'; // text-base
        measureElement.style.width = `${(screenWidth - 288) / 2}px`; // Desktop two columns with proper spacing
      }

      document.body.appendChild(measureElement);

      let maxTextHeight = 0;

      // Measure each active testimonial text
      activeTestimonialTexts.forEach(quote => {
        measureElement.textContent = `"${quote}"`;
        const textHeight = measureElement.offsetHeight;
        maxTextHeight = Math.max(maxTextHeight, textHeight);
      });

      document.body.removeChild(measureElement);

      // Calculate total card height
      // Components: padding-top (48px) + text height + margin between text and author (32px) + 
      // author section height (~60px) + padding-bottom (48px)
      const paddingTop = 48;
      const textToAuthorSpacing = 32;
      const authorSectionHeight = 60; // Name + title + spacing
      const paddingBottom = 48;
      
      const calculatedHeight = paddingTop + maxTextHeight + textToAuthorSpacing + authorSectionHeight + paddingBottom;
      
      // Ensure minimum height
      const finalHeight = Math.max(320, calculatedHeight);
      
      setCardHeight(finalHeight);
    };

    // Small delay to ensure DOM is ready
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
