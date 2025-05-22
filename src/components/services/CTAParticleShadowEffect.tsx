import React from "react";
import { ParticleType } from "../testimonials/types";

interface CTAParticleShadowEffectProps {
  particles: ParticleType[];
  isDarkMode?: boolean;
}

const CTAParticleShadowEffect: React.FC<CTAParticleShadowEffectProps> = ({ 
  particles, 
  isDarkMode = false 
}) => {
  const bgColor = isDarkMode ? '#010822' : '#FDF9FC';
  
  return (
    <>
      {/* Shadow particles - positioned absolutely to match inner particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-visible">
        {particles.map((p, i) => (
          <div
            key={`shadow-particle-${i}`}
            className="absolute rounded-full blur-[25px] animate-light-particle"
            style={{
              width: `${p.size * 1.5}px`,
              height: `${p.size * 1.5}px`,
              background: p.color.replace(/[^,]+(?=\))/, '0.15'),
              // Use exact same percentage positioning as inner particles
              left: `${p.x}%`,
              top: `${p.y}%`,
              // Use transform to adjust for the larger size while maintaining center alignment
              transform: `translate(-50%, -50%) scale(1.5)`,
              transformOrigin: 'center center',
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--move-x' as string]: `${p.moveX}vw`,
              ['--move-y' as string]: `${p.moveY}vh`,
              ['--rotate' as string]: `${p.rotate}deg`,
              opacity: 0.4,
              mixBlendMode: isDarkMode ? 'screen' : 'multiply'
            }}
          />
        ))}
      </div>
      
      {/* Mask to hide shadow orbs inside CTA - positioned with negative z-index */}
      <div 
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: bgColor,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0.5% 0.5%, 0.5% 99.5%, 99.5% 99.5%, 99.5% 0.5%, 0.5% 0.5%, 0% 0%)',
          zIndex: 6
        }}
      />
    </>
  );
};

export default CTAParticleShadowEffect;
