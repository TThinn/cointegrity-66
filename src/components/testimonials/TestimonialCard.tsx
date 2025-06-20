
import React from "react";
import { TestimonialType } from "./types";

interface TestimonialCardProps {
  testimonial: TestimonialType;
  position: number;
  isChanging: boolean;
  isVisible: boolean;
  isHovered: boolean;
  onMouseEnter: (position: number) => void;
  onMouseLeave: () => void;
  cardHeight?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  position,
  isChanging,
  isVisible,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  cardHeight,
}) => {
  return (
    <div
      className={`glass bg-white/5 backdrop-blur-md border border-white/10 p-8 sm:p-12 shadow-lg transition-all duration-300 relative z-30 
        flex flex-col justify-between overflow-hidden
        ${isChanging && !isVisible ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'} 
        ${isHovered ? 'transform -translate-y-2 shadow-xl border-white/20' : ''}`}
      style={{ 
        height: cardHeight ? `${cardHeight}px` : 'auto',
        minHeight: '280px'
      }}
      onMouseEnter={() => onMouseEnter(position)}
      onMouseLeave={onMouseLeave}
    >
      <div className="h-full flex flex-col justify-between">
        {/* Quote section - flexible height with proper overflow */}
        <div className="flex-1 flex items-start mb-6 sm:mb-8">
          <p className="text-white/80 text-sm sm:text-base leading-relaxed break-words hyphens-auto">
            "{testimonial.quote}"
          </p>
        </div>
        
        {/* Author section - fixed height at bottom, no border */}
        <div className="flex-shrink-0">
          <p className="text-white font-semibold text-base sm:text-lg leading-tight">
            {testimonial.name}
          </p>
          <p className="text-white/60 text-sm sm:text-base mt-1 leading-tight">
            {testimonial.title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
