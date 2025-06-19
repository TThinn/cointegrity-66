
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
      document.body.appendChild(tempContainer);

      const cardHeights: number[] = [];

      // Measure each testimonial card
      testimonials.forEach((testimonial) => {
        const tempCard = document.createElement('div');
        tempCard.className = 'glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg';
        tempCard.style.width = '100%';
        
        tempCard.innerHTML = `
          <div class="text-left">
            <p class="text-white/80 text-sm mb-6">"${testimonial.quote}"</p>
            <div>
              <p class="text-white font-semibold">${testimonial.name}</p>
              <p class="text-white/60 text-xs">${testimonial.title}</p>
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
      const largestCardHeight = sortedHeights[0] || 0;
      const secondLargestCardHeight = sortedHeights[1] || 0;

      // Calculate total section height
      const headerHeight = 200; // Approximate header height
      const ctaHeight = 100; // CTA button area height
      const gridGap = 24; // Gap between cards (gap-6 = 24px)
      
      const isMobile = window.innerWidth < 640;
      const maxContentHeight = isMobile 
        ? largestCardHeight + secondLargestCardHeight + gridGap // Mobile: cards stacked
        : Math.max(largestCardHeight, secondLargestCardHeight); // Desktop: cards side by side

      const totalHeight = headerHeight + maxContentHeight + ctaHeight + 160; // 160px for padding
      
      setFixedSectionHeight(Math.max(totalHeight, window.innerHeight - 160)); // Minimum full viewport minus header
      
      console.log('Fixed section height calculated:', {
        largestCardHeight,
        secondLargestCardHeight,
        maxContentHeight,
        totalHeight,
        finalHeight: Math.max(totalHeight, window.innerHeight - 160)
      });
    };

    // Calculate on mount and resize
    calculateFixedHeight();
    
    const handleResize = () => {
      setTimeout(calculateFixedHeight, 100); // Debounce resize
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return fixedSectionHeight;
};
