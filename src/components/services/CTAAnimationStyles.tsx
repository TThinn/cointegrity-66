
import React from "react";

const CTAAnimationStyles: React.FC = () => {
  return (
    <style>
      {`
        @keyframes light-particle {
          0%, 100% { 
            opacity: 0.4;
            transform: translate(0, 0) scale(1) rotate(0);
          }
          25% {
            opacity: 0.6;
            transform: 
              translate(calc(var(--move-x) * 0.3), calc(var(--move-y) * -0.7)) 
              scale(1.2) 
              rotate(calc(var(--rotate) * 0.3));
          }
          50% { 
            opacity: 0.8;
            transform: 
              translate(var(--move-x), var(--move-y)) 
              scale(1.5) 
              rotate(calc(var(--rotate) * 0.6));
          }
          75% {
            opacity: 0.6;
            transform: 
              translate(calc(var(--move-x) * -0.3), calc(var(--move-y) * 0.7)) 
              scale(1.3) 
              rotate(var(--rotate));
          }
        }
        .animate-light-particle {
          animation: light-particle ease-in-out infinite;
          mix-blend-mode: screen;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-light-particle {
            animation: none;
            opacity: 0.3 !important;
          }
        }
      `}
    </style>
  );
};

export default CTAAnimationStyles;
