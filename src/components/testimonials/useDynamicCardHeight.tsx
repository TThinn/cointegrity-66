
import { useState, useEffect, useRef } from 'react';
import { TestimonialType } from './types';

export const useDynamicCardHeight = (testimonials: TestimonialType[], activeTestimonials: number[]) => {
  const [cardHeight, setCardHeight] = useState<number>(320);
  const measurementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateOptimalHeight = () => {
      if (!measurementRef.current) return;

      let maxHeight = 0;

      // Get current screen size for responsive calculations
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 640;
      const isTablet = screenWidth >= 640 && screenWidth < 1024;

      // Calculate responsive measurements
      const cardPadding = isMobile ? 64 : 96; // p-8 = 32px * 2, p-12 = 48px * 2
      const quoteFontSize = isMobile ? 14 : 16;
      const nameFontSize = isMobile ? 16 : 18;
      const titleFontSize = isMobile ? 14 : 16;
      const lineHeight = 1.5;
      const gapBetweenSections = isMobile ? 24 : 32; // mb-6 vs mb-8
      const titleMarginTop = 4; // mt-1

      // Calculate available width for text
      const availableWidth = isMobile 
        ? Math.min(screenWidth - 64, 400) - cardPadding // Account for container padding
        : isTablet 
        ? (screenWidth - 96) / 2 - cardPadding // 2 columns on tablet
        : (Math.min(screenWidth - 128, 1200)) / 2 - cardPadding; // 2 columns on desktop

      // Calculate height for each active testimonial
      activeTestimonials.forEach(index => {
        const testimonial = testimonials[index];
        if (!testimonial) return;

        // Calculate quote text height
        const quoteLength = testimonial.quote.length + 2; // Add 2 for quotes
        const avgCharsPerLine = Math.floor(availableWidth / (quoteFontSize * 0.55)); // More conservative estimate
        const quoteLines = Math.max(1, Math.ceil(quoteLength / avgCharsPerLine));
        const quoteHeight = quoteLines * (quoteFontSize * lineHeight);

        // Calculate name height (single line, but account for font size)
        const nameHeight = nameFontSize * lineHeight;

        // Calculate title height (might wrap on mobile)
        const titleLength = testimonial.title.length;
        const titleCharsPerLine = Math.floor(availableWidth / (titleFontSize * 0.55));
        const titleLines = Math.max(1, Math.ceil(titleLength / titleCharsPerLine));
        const titleHeight = titleLines * (titleFontSize * lineHeight);

        // Total height = padding + quote + gap + name + title margin + title
        const totalHeight = cardPadding + quoteHeight + gapBetweenSections + nameHeight + titleMarginTop + titleHeight;
        
        maxHeight = Math.max(maxHeight, totalHeight);
      });

      // Add buffer and ensure minimum height
      const finalHeight = Math.max(maxHeight + 40, 280); // Increased buffer
      setCardHeight(Math.round(finalHeight));
    };

    // Calculate initial height
    calculateOptimalHeight();

    // Recalculate on window resize with debounce
    const handleResize = () => {
      setTimeout(calculateOptimalHeight, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [testimonials, activeTestimonials]);

  return { cardHeight, measurementRef };
};
