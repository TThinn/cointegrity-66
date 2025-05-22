import React, { useRef, useEffect } from "react";
import CTAParticleEffect from "./CTAParticleEffect";
import CTAButton from "./CTAButton";
import { useCTAParticles } from "./useCTAParticles";

const ServicesCTA = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  
  // Use the custom hook for particle management
  const { particles, particleCount } = useCTAParticles(ctaRef, ctaSectionRef);

  if (particleCount === null) return null;

  return (
    <div className="mt-16 relative">
      {/* CTA Section */}
      <div 
        ref={ctaSectionRef}
        className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16 p-6 md:p-7 rounded-lg backdrop-blur-sm transition-all duration-300 bg-white/20 border border-white/70 relative z-10 overflow-hidden"
        style={{ 
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
          minHeight: "100px"
        }}
      >
        {/* Content */}
        <div className="flex-1 text-center md:text-left relative z-10">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Bring Substance to Your Digital Asset Strategy</h3>
        </div>
        
        {/* Button Container with particles */}
        <div className="flex items-center justify-center h-full relative"> 
          {/* Particles */}
          <CTAParticleEffect particles={particles} />
          
          {/* Button */}
          <CTAButton buttonRef={ctaRef} />
        </div>
      </div>
      
      {/* Outer container for shadow effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        {/* This is the key: we create the same structure as inside the CTA section */}
        <div className="flex flex-col md:flex-row items-center justify-center h-full">
          {/* Empty flex-1 div to match the heading's space */}
          <div className="flex-1"></div>
          
          {/* Button container equivalent - this ensures the shadow particles are positioned relative to the same point */}
          <div className="flex items-center justify-center h-full relative">
            {/* Shadow particles */}
            <div className="absolute inset-0 pointer-events-none">
              {particles.map((p, i) => (
                <div
                  key={`shadow-particle-${i}`}
                  className="absolute rounded-full blur-[25px]"
                  style={{
                    width: `${p.size * 1.5}px`,
                    height: `${p.size * 1.5}px`,
                    background: p.color.replace(/[^,]+(?=\))/, '0.15'),
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    animationDelay: `${p.delay}s`,
                    animationDuration: `${p.duration}s`,
                    animation: 'light-particle ease-in-out infinite',
                    ['--move-x' as string]: `${p.moveX}vw`,
                    ['--move-y' as string]: `${p.moveY}vh`,
                    ['--rotate' as string]: `${p.rotate}deg`,
                    opacity: 0.4,
                    mixBlendMode: 'multiply'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mask to hide shadows inside CTA */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg" 
        style={{
          background: '#FDF9FC',
          zIndex: 7,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0.5% 0.5%, 0.5% 99.5%, 99.5% 99.5%, 99.5% 0.5%, 0.5% 0.5%, 0% 0%)'
        }}
      />
      
      {/* Animation Styles */}
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
          @media (prefers-reduced-motion: reduce) {
            .animate-light-particle {
              animation: none !important;
              opacity: 0.5 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ServicesCTA;
