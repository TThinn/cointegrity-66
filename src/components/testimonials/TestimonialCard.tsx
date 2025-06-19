
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
      className={`glass bg-white/5 backdrop-blur-md border border-white/10 p-12 shadow-lg transition-all duration-300 relative z-30 
        flex flex-col justify-between
        ${isChanging && !isVisible ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'} 
        ${isHovered ? 'transform -translate-y-2 shadow-xl border-white/20' : ''}`}
      style={{ 
        height: cardHeight ? `${cardHeight}px` : '320px',
        minHeight: '320px'
      }}
      onMouseEnter={() => onMouseEnter(position)}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-left h-full flex flex-col justify-between">
        {/* Quote section - takes available space */}
        <div className="flex-1 flex items-start">
          <p className="text-white/80 text-base leading-relaxed">"{testimonial.quote}"</p>
        </div>
        
        {/* Author section - anchored to bottom */}
        <div className="flex-shrink-0 mt-8 pt-8 border-t border-white/10">
          <p className="text-white font-semibold text-l">{testimonial.name}</p>
          <p className="text-white/60 text-base mt-1">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
