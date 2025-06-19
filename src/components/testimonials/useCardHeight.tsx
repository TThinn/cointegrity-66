
import { useState, useEffect } from 'react';
import { TestimonialType } from './types';

export const useCardHeight = (testimonials: TestimonialType[], activeTestimonials: number[]) => {
  const [cardHeight, setCardHeight] = useState<number>(320); // Default minimum height

  useEffect(() => {
    const calculateCardHeight = () => {
      // Get screen width for responsive calculations
      const screenWidth = window.innerWidth;
      
      // Base calculations for different screen sizes
      const isMobile = screenWidth < 640;
      const isTablet = screenWidth >= 640 && screenWidth < 1024;
      
      // Get the active testimonials to calculate height for
      const activeTestimonialTexts = activeTestimonials.map(index => testimonials[index]?.quote || '');
      
      // Find the longest quote
      const longestQuote = activeTestimonialTexts.reduce((longest, current) => 
        current.length > longest.length ? current : longest, ''
      );
      
      // Calculate approximate height based on text length and screen size
      let baseHeight = 320; // Minimum height
      let charHeightMultiplier;
      let maxWidth;
      
      if (isMobile) {
        charHeightMultiplier = 0.12; // Mobile text wraps more
        maxWidth = screenWidth - 64; // Account for padding
      } else if (isTablet) {
        charHeightMultiplier = 0.08;
        maxWidth = (screenWidth - 128) / 2; // Two columns with padding
      } else {
        charHeightMultiplier = 0.06;
        maxWidth = (screenWidth - 192) / 2; // Desktop two columns
      }
      
      // Rough calculation: chars per line based on average char width
      const avgCharWidth = 8; // Approximate pixels per character
      const charsPerLine = Math.floor(maxWidth / avgCharWidth);
      const estimatedLines = Math.ceil(longestQuote.length / charsPerLine);
      
      // Calculate height based on estimated lines plus padding for name/title
      const textHeight = estimatedLines * 24; // 24px line height
      const paddingAndSpacing = 160; // Space for padding, name, title, and spacing
      
      const calculatedHeight = Math.max(baseHeight, textHeight + paddingAndSpacing);
      
      setCardHeight(calculatedHeight);
    };

    calculateCardHeight();
    
    // Recalculate on window resize
    const handleResize = () => calculateCardHeight();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonials, activeTestimonials]);

  return cardHeight;
};
