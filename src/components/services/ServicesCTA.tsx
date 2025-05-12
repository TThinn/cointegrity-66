
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
    <div 
      ref={ctaSectionRef}
      className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-lg backdrop-blur-sm transition-all duration-300 bg-white/20 border border-white/70"
      style={{ 
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        minHeight: "140px"
      }}
    >
      {/* Content */}
      <div className="flex-1 text-center md:text-left relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">Bring Substance to Your Digital Asset Strategy</h3>
      </div>
      
      {/* Button Container with particles */}
      <div className="flex items-center justify-center h-full relative"> 
        {/* Particles */}
        <CTAParticleEffect particles={particles} />
        
        {/* Button */}
        <CTAButton buttonRef={ctaRef} />
      </div>

      {/* Animation Styles */}
      <CTAAnimationStyles />
    </div>
  );
};

export default ServicesCTA;
