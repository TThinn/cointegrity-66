
import * as React from 'react';
import { testimonials } from './testimonialsData';

export const useTestimonials = () => {
  const [activeTestimonials, setActiveTestimonials] = React.useState<number[]>([0, 1, 2, 3]);
  const [changingIndex, setChangingIndex] = React.useState<number | null>(null);
  const [isVisible, setIsVisible] = React.useState(true);
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);
  const rotationIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const testimonialsGridRef = React.useRef<HTMLDivElement>(null);
  const [maxSectionHeight, setMaxSectionHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const calculateMaxHeight = () => {
      if (testimonialsGridRef.current) {
        const currentHeight = testimonialsGridRef.current.offsetHeight;
        setMaxSectionHeight(prev => Math.max(prev, currentHeight));
      }
    };
    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, []);

  React.useEffect(() => {
    if (testimonialsGridRef.current) {
      const currentHeight = testimonialsGridRef.current.offsetHeight;
      setMaxSectionHeight(prev => Math.max(prev, currentHeight));
    }
  }, [activeTestimonials]);

  // Rotation logic with pause functionality
  React.useEffect(() => {
    let currentBoxIndex = 0;
    const rotateTestimonial = () => {
      // Skip rotation if paused
      if (isPaused) return;
      setChangingIndex(currentBoxIndex);
      setIsVisible(false);
      setTimeout(() => {
        setActiveTestimonials(prev => {
          const newTestimonials = [...prev];
          const currentlyDisplayed = new Set(prev);
          let nextTestimonialIndex;
          do {
            nextTestimonialIndex = Math.floor(Math.random() * testimonials.length);
          } while (currentlyDisplayed.has(nextTestimonialIndex));
          newTestimonials[currentBoxIndex] = nextTestimonialIndex;
          return newTestimonials;
        });
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => {
            if (testimonialsGridRef.current) {
              const currentHeight = testimonialsGridRef.current.offsetHeight;
              setMaxSectionHeight(prev => Math.max(prev, currentHeight));
            }
          }, 300);
          currentBoxIndex = (currentBoxIndex + 1) % 4;
        }, 100);
      }, 300);
    };

    rotationIntervalRef.current = setInterval(rotateTestimonial, 4000);
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [testimonials.length, isPaused]);

  // Card hover handlers
  const handleCardMouseEnter = (position: number) => {
    setHoveredCard(position);
    setIsPaused(true);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
    setIsPaused(false);
  };

  return {
    testimonials,
    activeTestimonials,
    changingIndex,
    isVisible,
    hoveredCard,
    handleCardMouseEnter,
    handleCardMouseLeave,
    testimonialsGridRef,
    maxSectionHeight
  };
};
