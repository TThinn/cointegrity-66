
import React from "react";

interface CTAButtonProps {
  buttonRef: React.RefObject<HTMLAnchorElement>;
}

const CTAButton: React.FC<CTAButtonProps> = ({ buttonRef }) => {
  return (
    <a 
      href="#contact" 
      className="inline-flex items-center relative z-10"
      ref={buttonRef}
    >
      <button className="bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-full
                 border border-white/30 hover:bg-white/40 transition-all
                 transform hover:scale-105 duration-300 text-base font-semibold
                 shadow-lg">
        Let's get started
      </button>
    </a>
  );
};

export default CTAButton;
