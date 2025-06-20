
import { useState, useEffect, useRef, useCallback } from 'react';
import { TestimonialType } from './types';

interface CardHeightMeasurement {
  cardHeight: number;
  measurementRef: React.RefObject<HTMLDivElement>;
  isInitialized: boolean;
}

export const useCardHeightMeasurement = (
  testimonials: TestimonialType[]
): CardHeightMeasurement => {
  const [cardHeight, setCardHeight] = useState<number>(320);
  const [isInitialized, setIsInitialized] = useState(false);
  const measurementRef = useRef<HTMLDivElement>(null);
  const measuredHeights = useRef<Map<number, number>>(new Map());

  const measureAllCards = useCallback(() => {
    if (!measurementRef.current) return;

    const container = measurementRef.current;
    let maxHeight = 280; // minimum height

    // Measure all testimonials
    testimonials.forEach((testimonial, index) => {
      // Create a temporary card element for measurement
      const tempCard = document.createElement('div');
      tempCard.className = 'glass bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 shadow-lg absolute opacity-0 pointer-events-none';
      tempCard.style.width = getCardWidth();
      tempCard.style.minHeight = '280px';
      
      tempCard.innerHTML = `
        <div class="h-full flex flex-col justify-between">
          <div class="flex-1 flex items-start mb-6 sm:mb-8">
            <p class="text-white/80 text-sm sm:text-base leading-relaxed break-words hyphens-auto">
              "${testimonial.quote}"
            </p>
          </div>
          <div class="flex-shrink-0">
            <p class="text-white font-semibold text-base sm:text-lg leading-tight">
              ${testimonial.name}
            </p>
            <p class="text-white/60 text-sm sm:text-base mt-1 leading-tight">
              ${testimonial.title}
            </p>
          </div>
        </div>
      `;

      container.appendChild(tempCard);
      
      // Force layout calculation
      tempCard.offsetHeight;
      
      const height = Math.max(tempCard.scrollHeight, 280);
      measuredHeights.current.set(index, height);
      maxHeight = Math.max(maxHeight, height);
      
      container.removeChild(tempCard);
    });

    setCardHeight(maxHeight + 20); // Add small buffer
    setIsInitialized(true);
  }, [testimonials]);

  const getCardWidth = (): string => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 640) {
      return `${Math.min(screenWidth - 64, 400)}px`; // Mobile: full width minus padding
    } else if (screenWidth < 1024) {
      return `${(screenWidth - 96) / 2 - 40}px`; // Tablet: half width minus gaps
    } else {
      return `${(Math.min(screenWidth - 128, 1200)) / 2 - 40}px`; // Desktop: half of max container width
    }
  };

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
