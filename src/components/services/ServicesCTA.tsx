import React, { useRef } from "react";
import CTAParticleEffect from "./CTAParticleEffect";
import CTAButton from "./CTAButton";
import CTAAnimationStyles from "./CTAAnimationStyles";
import { useCTAParticles } from "./useCTAParticles";

const ServicesCTA = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  
  // Use the custom hook for particle management
  const { particles, particleCount } = useCTAParticles(ctaRef, ctaSectionRef);

  if (particleCount === null) return null;

  return (
    <div className="mt-16 relative">
      {/* Original CTA Section */}
      <div 
        ref={ctaSectionRef}
        className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16 p-6 md:p-7 rounded-lg backdrop-blur-sm transition-all duration-300 bg-white/20 border border-white/70 relative z-20"
        style={{ 
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
          minHeight: "100px",
          isolation: "isolate"
        }}
      >
        {/* Content */}
        <div className="flex-1 text-center md:text-left relative z-10">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Bring Substance to Your Digital Asset Strategy</h3>
        </div>
        
        {/* Button Container with particles */}
        <div className="flex items-center justify-center h-full relative"> 
          {/* Original particles - kept inside CTA */}
          <CTAParticleEffect particles={particles} />
          
          {/* Button */}
          <CTAButton buttonRef={ctaRef} />
        </div>
      </div>

      {/* Shadow particles - positioned BEHIND the CTA section */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
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
              transform: `translate(-${p.size * 0.25}px, -${p.size * 0.25}px)`,
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

      {/* Animation Styles */}
      <CTAAnimationStyles />
    </div>
  );
};

export default ServicesCTA;
