
import { useState, useEffect, useRef } from 'react';
import { TestimonialType } from './types';

export const useDynamicCardHeight = (testimonials: TestimonialType[], activeTestimonials: number[]) => {
  const [cardHeight, setCardHeight] = useState<number>(320);
  const measurementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateOptimalHeight = () => {
      if (!measurementRef.current) return;

      const container = measurementRef.current;
      let maxHeight = 0;

      // Get current screen size for responsive calculations
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 640;
      const isTablet = screenWidth >= 640 && screenWidth < 1024;

      // Calculate base font sizes and spacing based on screen size
      const baseFontSize = isMobile ? 14 : 16;
      const lineHeight = 1.5;
      const baseSpacing = isMobile ? 32 : 48; // p-8 on mobile, p-12 on desktop
      const authorSectionHeight = isMobile ? 60 : 70; // Approximate height for name + title
      const gapBetweenSections = 32; // mt-8

      // Calculate available width for text (accounting for padding)
      const cardPadding = baseSpacing;
      const availableWidth = isMobile 
        ? Math.min(screenWidth - 64, 400) - cardPadding // Account for container padding
        : isTablet 
        ? (screenWidth - 96) / 2 - cardPadding // 2 columns on tablet
        : (Math.min(screenWidth - 128, 1200)) / 2 - cardPadding; // 2 columns on desktop

      // Calculate height for each active testimonial
      activeTestimonials.forEach(index => {
        const testimonial = testimonials[index];
        if (!testimonial) return;

        // Estimate text height based on character count and available width
        const textLength = testimonial.quote.length;
        const avgCharsPerLine = Math.floor(availableWidth / (baseFontSize * 0.6)); // Rough estimate
        const estimatedLines = Math.ceil(textLength / avgCharsPerLine);
        const textHeight = estimatedLines * (baseFontSize * lineHeight);

        // Total height = top/bottom padding + text height + gap + author section
        const totalHeight = baseSpacing + textHeight + gapBetweenSections + authorSectionHeight;
        
        maxHeight = Math.max(maxHeight, totalHeight);
      });

      // Add some buffer and ensure minimum height
      const finalHeight = Math.max(maxHeight + 20, 280);
      setCardHeight(Math.round(finalHeight));
    };

    // Calculate initial height
    calculateOptimalHeight();

    // Recalculate on window resize
    const handleResize = () => {
      setTimeout(calculateOptimalHeight, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonials, activeTestimonials]);

  return { cardHeight, measurementRef };
};
