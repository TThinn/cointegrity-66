
import { useState, useEffect, useRef, useCallback } from 'react';
import { TestimonialType } from './types';

interface CardHeightMeasurement {
  cardHeight: number;
  measurementRef: React.RefObject<HTMLDivElement>;
  isInitialized: boolean;
}

// Define breakpoints for different screen sizes
const BREAKPOINTS = {
  mobile: 640,    // Mobile breakpoint
  tablet: 1024,   // Tablet breakpoint
  desktop: 1400   // Desktop breakpoint
};

export const useCardHeightMeasurement = (
  testimonials: TestimonialType[]
): CardHeightMeasurement => {
  const [cardHeight, setCardHeight] = useState<number>(320);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('mobile');
  const measurementRef = useRef<HTMLDivElement>(null);
  const measuredHeights = useRef<Map<string, number>>(new Map());

  const getCurrentBreakpoint = (): string => {
    const width = window.innerWidth;
    if (width < BREAKPOINTS.mobile) return 'mobile';
    if (width < BREAKPOINTS.tablet) return 'tablet';
    return 'desktop';
  };

  const getCardWidthForBreakpoint = (breakpoint: string): string => {
    const width = window.innerWidth;
    
    switch (breakpoint) {
      case 'mobile':
        // Mobile: full width minus padding
        return `${Math.min(width - 64, 400)}px`;
      case 'tablet':
        // Tablet: half width minus gaps
        return `${(width - 96) / 2 - 40}px`;
      case 'desktop':
      default:
        // Desktop: half of max container width
        return `${(Math.min(width - 128, 1200)) / 2 - 40}px`;
    }
  };

  const measureCardAtBreakpoint = (testimonial: TestimonialType, breakpoint: string): number => {
    if (!measurementRef.current) return 280;

    const container = measurementRef.current;
    const tempCard = document.createElement('div');
    
    // Apply responsive classes based on breakpoint
    const paddingClass = breakpoint === 'mobile' ? 'p-8' : 'p-8 sm:p-12';
    const textSizeClass = breakpoint === 'mobile' ? 'text-sm' : 'text-sm sm:text-base';
    const titleSizeClass = breakpoint === 'mobile' ? 'text-base' : 'text-base sm:text-lg';
    const marginClass = breakpoint === 'mobile' ? 'mb-2' : 'mb-2 sm:mb-4';
    
    tempCard.className = `glass bg-white/5 backdrop-blur-md border border-white/10 ${paddingClass} shadow-lg absolute opacity-0 pointer-events-none`;
    tempCard.style.width = getCardWidthForBreakpoint(breakpoint);
    tempCard.style.minHeight = '280px';
    
    tempCard.innerHTML = `
      <div class="h-full flex flex-col justify-between">
        <div class="flex-1 flex items-start ${marginClass}">
          <p class="text-white/80 ${textSizeClass} leading-relaxed break-words hyphens-auto">
            "${testimonial.quote}"
          </p>
        </div>
        <div class="flex-shrink-0">
          <p class="text-white font-semibold ${titleSizeClass} leading-tight">
            ${testimonial.name}
          </p>
          <p class="text-white/60 ${textSizeClass} mt-1 leading-tight">
            ${testimonial.title}
          </p>
        </div>
      </div>
    `;

    container.appendChild(tempCard);
    
    // Force layout calculation
    tempCard.offsetHeight;
    
    const height = Math.max(tempCard.scrollHeight, 280);
    container.removeChild(tempCard);
    
    return height;
  };

  const measureCardsForCurrentBreakpoint = useCallback(() => {
    if (!measurementRef.current) return;

    const breakpoint = getCurrentBreakpoint();
    setCurrentBreakpoint(breakpoint);
    
    let maxHeightForBreakpoint = 280; // minimum height

    // Measure all testimonials for the current breakpoint only
    testimonials.forEach((testimonial, index) => {
      const key = `${index}-${breakpoint}`;
      const height = measureCardAtBreakpoint(testimonial, breakpoint);
      measuredHeights.current.set(key, height);
      maxHeightForBreakpoint = Math.max(maxHeightForBreakpoint, height);
    });

    console.log(`Heights for ${breakpoint}:`, 
      testimonials.map((_, index) => measuredHeights.current.get(`${index}-${breakpoint}`))
    );
    console.log(`Max height for ${breakpoint}:`, maxHeightForBreakpoint);

    setCardHeight(maxHeightForBreakpoint + 20); // Add small buffer
    setIsInitialized(true);
  }, [testimonials]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    // Initial measurement
    const timer = setTimeout(() => {
      measureCardsForCurrentBreakpoint();
    }, 100);

    // Handle window resize with debounce
    const handleResize = () => {
      const newBreakpoint = getCurrentBreakpoint();
      
      // Only recalculate if breakpoint changed
      if (newBreakpoint !== currentBreakpoint) {
        measuredHeights.current.clear();
        setIsInitialized(false);
        setTimeout(() => {
          measureCardsForCurrentBreakpoint();
        }, 150);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [testimonials, measureCardsForCurrentBreakpoint, currentBreakpoint]);

  return {
    cardHeight,
    measurementRef,
    isInitialized
  };
};
