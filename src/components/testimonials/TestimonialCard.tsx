
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
      className={`glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg transition-all duration-300 relative z-30 
        flex flex-col justify-between
        ${isChanging && !isVisible ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'} 
        ${isHovered ? 'transform -translate-y-2 shadow-xl border-white/20' : ''}`}
      style={{ height: cardHeight ? `${cardHeight}px` : 'auto' }}
      onMouseEnter={() => onMouseEnter(position)}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-left h-full flex flex-col justify-between">
        <p className="text-white/80 text-sm mb-6 flex-1 overflow-hidden">"{testimonial.quote}"</p>
        <div className="flex-shrink-0">
          <p className="text-white font-semibold">{testimonial.name}</p>
          <p className="text-white/60 text-xs">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
