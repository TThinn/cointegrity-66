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
        const elementTop = element.offsetTop;
        const headerHeight = 80; // Match HEADER_HEIGHT from scrollManager
        const scrollPosition = elementTop - headerHeight;
        
        window.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth'
        });
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
  return <button onClick={handleClick} className={cn("fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20", "flex items-center justify-center", "text-white/90 hover:text-white transition-colors duration-300", "group cursor-pointer", className)} style={{
    animation: "gentle-bounce 3s ease-in-out infinite"
  }} aria-label="Scroll to see more content">
      <div className="relative">
        <ChevronDown size={24} className="drop-shadow-lg text-white" />
        
      </div>
    </button>;
};
export default ScrollIndicator;