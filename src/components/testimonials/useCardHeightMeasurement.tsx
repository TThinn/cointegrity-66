
import { useState, useEffect, useRef, useCallback } from 'react';
import { TestimonialType } from './types';

interface CardHeightMeasurement {
  cardHeight: number;
  measurementRef: React.RefObject<HTMLDivElement>;
  isInitialized: boolean;
}

// Define breakpoints for different screen sizes
const BREAKPOINTS = {
  mobile: 375,    // Small mobile
  tablet: 768,    // Tablet
  desktop: 1024,  // Desktop
  large: 1400     // Large desktop
};

export const useCardHeightMeasurement = (
  testimonials: TestimonialType[]
): CardHeightMeasurement => {
  const [cardHeight, setCardHeight] = useState<number>(320);
  const [isInitialized, setIsInitialized] = useState(false);
  const measurementRef = useRef<HTMLDivElement>(null);
  const measuredHeights = useRef<Map<string, number>>(new Map());

  const getCardWidthForBreakpoint = (breakpoint: number): string => {
    if (breakpoint < 640) {
      // Mobile: full width minus padding
      return `${Math.min(breakpoint - 64, 400)}px`;
    } else if (breakpoint < 1024) {
      // Tablet: half width minus gaps
      return `${(breakpoint - 96) / 2 - 40}px`;
    } else {
      // Desktop: half of max container width
      return `${(Math.min(breakpoint - 128, 1200)) / 2 - 40}px`;
    }
  };

  const measureCardAtBreakpoint = (testimonial: TestimonialType, breakpoint: number): number => {
    if (!measurementRef.current) return 280;

    const container = measurementRef.current;
    const tempCard = document.createElement('div');
    
    // Apply responsive classes based on breakpoint
    const paddingClass = breakpoint < 640 ? 'p-8' : 'p-8 sm:p-12';
    const textSizeClass = breakpoint < 640 ? 'text-sm' : 'text-sm sm:text-base';
    const titleSizeClass = breakpoint < 640 ? 'text-base' : 'text-base sm:text-lg';
    const marginClass = breakpoint < 640 ? 'mb-2' : 'mb-2 sm:mb-4';
    
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

  const measureAllCards = useCallback(() => {
    if (!measurementRef.current) return;

    let maxHeight = 280; // minimum height
    const breakpointValues = Object.values(BREAKPOINTS);

    // Measure all testimonials across all breakpoints
    testimonials.forEach((testimonial, index) => {
      breakpointValues.forEach(breakpoint => {
        const key = `${index}-${breakpoint}`;
        const height = measureCardAtBreakpoint(testimonial, breakpoint);
        measuredHeights.current.set(key, height);
        maxHeight = Math.max(maxHeight, height);
      });
    });

    console.log('Measured heights across breakpoints:', Array.from(measuredHeights.current.entries()));
    console.log('Final max height:', maxHeight);

    setCardHeight(maxHeight + 20); // Add small buffer
    setIsInitialized(true);
  }, [testimonials]);

  useEffect(() => {
    if (testimonials.length === 0) return;

    // Initial measurement
    const timer = setTimeout(() => {
      measureAllCards();
    }, 100);

    // Handle window resize with debounce
    const handleResize = () => {
      measuredHeights.current.clear();
      setIsInitialized(false);
      setTimeout(() => {
        measureAllCards();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [testimonials, measureAllCards]);

  return {
    cardHeight,
    measurementRef,
    isInitialized
  };
};
