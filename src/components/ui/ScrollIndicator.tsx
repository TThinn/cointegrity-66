
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  targetSection?: string;
}

export const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ 
  className, 
  targetSection 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      if (scrolled && !hasScrolled) {
        setHasScrolled(true);
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  const handleClick = () => {
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Scroll to next section (viewport height)
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20",
        "flex flex-col items-center gap-2",
        "text-white/90 hover:text-white transition-colors duration-300",
        "group cursor-pointer",
        className
      )}
      style={{
        animation: "gentle-bounce 3s ease-in-out infinite"
      }}
      aria-label="Scroll to see more content"
    >
      <span className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
        Scroll for more
      </span>
      <div className="relative">
        <ChevronDown 
          size={24} 
          className="drop-shadow-lg text-white" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d946ef] to-[#9333ea] rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-opacity" />
      </div>
    </button>
  );
};

export default ScrollIndicator;
