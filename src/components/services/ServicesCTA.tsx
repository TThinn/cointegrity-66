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
      {/* Original CTA Section with inner particles */}
      <div 
        ref={ctaSectionRef}
        className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16 p-6 md:p-7 rounded-lg backdrop-blur-sm transition-all duration-300 bg-white/20 border border-white/70 relative overflow-hidden"
        style={{ 
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
          minHeight: "100px",
          zIndex: 10
        }}
      >
        {/* Content */}
        <div className="flex-1 text-center md:text-left relative z-10">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Bring Substance to Your Digital Asset Strategy</h3>
        </div>
        
        {/* Button Container with particles */}
        <div className="flex items-center justify-center h-full relative"> 
          {/* Original particles */}
          <CTAParticleEffect particles={particles} />
          
          {/* Button */}
          <CTAButton buttonRef={ctaRef} />
        </div>
      </div>
      
      {/* Create an absolutely positioned clone of the CTA section for shadows */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        {/* Shadow particles - using the same component for exact positioning */}
        <CTAParticleEffect 
          particles={particles.map(p => ({
            ...p,
            size: p.size * 1.5,
            color: p.color.replace(/[^,]+(?=\))/, '0.15')
          }))} 
        />
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
      <CTAAnimationStyles />
    </div>
  );
};

export default ServicesCTA;
