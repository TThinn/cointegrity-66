
import { useState, useEffect } from 'react';
import { testimonials } from './testimonialsData';

export const useCardHeight = () => {
  const [cardHeights, setCardHeights] = useState<{
    mobile: number;
    tablet: number;
    desktop: number;
  }>({
    mobile: 0,
    tablet: 0,
    desktop: 0
  });
  const [currentHeight, setCurrentHeight] = useState<number>(0);

  useEffect(() => {
    // Define breakpoint widths to match Tailwind's responsive breakpoints
    const breakpoints = {
      mobile: 320,   // sm and below
      tablet: 640,   // md
      desktop: 1024  // lg and above
    };

    const calculateHeightForWidth = (width: number) => {
      // Create a temporary measurement container
      const measurementContainer = document.createElement('div');
      measurementContainer.style.position = 'absolute';
      measurementContainer.style.visibility = 'hidden';
      measurementContainer.style.top = '-9999px';
      measurementContainer.style.width = `${width}px`;
      document.body.appendChild(measurementContainer);

      let maxHeight = 0;

      // Measure each testimonial at this width
      testimonials.forEach((testimonial) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg transition-all duration-300 relative z-30';
        cardElement.style.width = '100%';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'text-left h-full flex flex-col justify-between';
        
        const quoteP = document.createElement('p');
        quoteP.className = 'text-white/80 text-sm mb-6 flex-1 overflow-hidden';
        quoteP.textContent = `"${testimonial.quote}"`;
        
        const authorDiv = document.createElement('div');
        authorDiv.className = 'flex-shrink-0';
        
        const nameP = document.createElement('p');
        nameP.className = 'text-white font-semibold';
        nameP.textContent = testimonial.name;
        
        const titleP = document.createElement('p');
        titleP.className = 'text-white/60 text-xs';
        titleP.textContent = testimonial.title;
        
        authorDiv.appendChild(nameP);
        authorDiv.appendChild(titleP);
        contentDiv.appendChild(quoteP);
        contentDiv.appendChild(authorDiv);
        cardElement.appendChild(contentDiv);
        measurementContainer.appendChild(cardElement);
        
        const height = cardElement.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
        
        measurementContainer.removeChild(cardElement);
      });

      // Clean up
      document.body.removeChild(measurementContainer);
      
      // Add some padding to ensure comfort
      return maxHeight + 20;
    };

    // Calculate heights for all breakpoints
    const heights = {
      mobile: calculateHeightForWidth(breakpoints.mobile),
      tablet: calculateHeightForWidth(breakpoints.tablet),
      desktop: calculateHeightForWidth(breakpoints.desktop)
    };

    setCardHeights(heights);

    // Set initial height based on current screen size
    const updateCurrentHeight = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentHeight(heights.mobile);
      } else if (width < 1024) {
        setCurrentHeight(heights.tablet);
      } else {
        setCurrentHeight(heights.desktop);
      }
    };

    updateCurrentHeight();

    // Listen for resize events to update height
    const handleResize = () => {
      updateCurrentHeight();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { maxCardHeight: currentHeight };
};
