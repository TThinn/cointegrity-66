
import React from 'react';
import { testimonials } from './testimonialsData';

export const useFixedSectionHeight = () => {
  const [fixedSectionHeight, setFixedSectionHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const calculateFixedHeight = () => {
      // Create temporary elements to measure testimonial card heights
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.top = '-9999px';
      tempContainer.style.left = '-9999px';
      tempContainer.style.visibility = 'hidden';
      tempContainer.style.width = window.innerWidth < 640 ? '100%' : '50%';
      tempContainer.style.maxWidth = '500px';
      tempContainer.style.padding = '0 1rem'; // Account for container padding
      document.body.appendChild(tempContainer);

      const cardHeights: number[] = [];

      // Measure each testimonial card with exact styling
      testimonials.forEach((testimonial) => {
        const tempCard = document.createElement('div');
        tempCard.className = 'glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg';
        tempCard.style.width = '100%';
        tempCard.style.boxSizing = 'border-box';
        
        tempCard.innerHTML = `
          <div class="text-left">
            <p class="text-white/80 text-sm mb-6" style="line-height: 1.6;">"${testimonial.quote}"</p>
            <div>
              <p class="text-white font-semibold" style="line-height: 1.4;">${testimonial.name}</p>
              <p class="text-white/60 text-xs" style="line-height: 1.4;">${testimonial.title}</p>
            </div>
          </div>
        `;
        
        tempContainer.appendChild(tempCard);
        cardHeights.push(tempCard.offsetHeight);
        tempContainer.removeChild(tempCard);
      });

      document.body.removeChild(tempContainer);

      // Sort heights and get the two largest
      const sortedHeights = cardHeights.sort((a, b) => b - a);
      const largestCardHeight = sortedHeights[0] || 300; // Fallback minimum
      const secondLargestCardHeight = sortedHeights[1] || 300; // Fallback minimum

      // Enhanced calculation with more generous spacing
      const isMobile = window.innerWidth < 640;
      
      // Header section - increased for better text wrapping
      const headerHeight = isMobile ? 320 : 280;
      
      // Cards section height - add extra buffer
      const gridGap = 24; // gap-6 = 24px
      const cardsHeight = isMobile 
        ? largestCardHeight + secondLargestCardHeight + gridGap + 40 // Extra buffer for mobile stacking
        : Math.max(largestCardHeight, secondLargestCardHeight) + 20; // Extra buffer for desktop
      
      // CTA section - increased for proper button visibility
      const ctaHeight = 160; // More space for button and particles
      
      // Section padding (py-20 = 80px top + 80px bottom)
      const sectionPadding = 160;
      
      // Spacing between sections - increased
      const headerMarginBottom = 64; // mb-16 = 64px
      const cardsToCtaSpacing = 80; // Increased spacing between cards and CTA
      
      // Additional safety buffer
      const safetyBuffer = 100;
      
      // Calculate total height with generous spacing
      const totalCalculatedHeight = 
        sectionPadding + 
        headerHeight + 
        headerMarginBottom + 
        cardsHeight + 
        cardsToCtaSpacing + 
        ctaHeight +
        safetyBuffer;
      
      // Ensure minimum viewport height
      const minViewportHeight = Math.max(window.innerHeight - 60, 800); // Minimum 800px or viewport minus header
      
      // Use the larger of calculated height or minimum viewport
      const finalHeight = Math.max(totalCalculatedHeight, minViewportHeight);
      
      setFixedSectionHeight(finalHeight);
      
      console.log('🔍 Enhanced Height Calculation Details:', {
        isMobile,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        largestCardHeight,
        secondLargestCardHeight,
        headerHeight,
        cardsHeight,
        ctaHeight,
        sectionPadding,
        headerMarginBottom,
        cardsToCtaSpacing,
        safetyBuffer,
        totalCalculatedHeight,
        minViewportHeight,
        finalHeight
      });
    };

    // Calculate on mount and resize
    calculateFixedHeight();
    
    const handleResize = () => {
      // Debounce resize to avoid excessive calculations
      setTimeout(calculateFixedHeight, 150);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return fixedSectionHeight;
};
