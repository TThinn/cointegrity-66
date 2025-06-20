
import { useMemo } from 'react';

export const useCardHeight = (testimonials: any[], activeTestimonials: number[]) => {
  const cardHeight = useMemo(() => {
    // Calculate a consistent height based on the content
    // This is a simple implementation that provides a fixed height
    return 280; // Fixed height in pixels
  }, [testimonials, activeTestimonials]);

  return cardHeight;
};
