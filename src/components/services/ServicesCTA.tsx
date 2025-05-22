import React, { useRef, useEffect } from "react";
import CTAParticleEffect from "./CTAParticleEffect";
import CTAButton from "./CTAButton";
import { useCTAParticles } from "./useCTAParticles";

const ServicesCTA = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const shadowContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Use the custom hook for particle management
  const { particles, particleCount } = useCTAParticles(ctaRef, ctaSectionRef);
  
  // Ensure the shadow container is positioned exactly like the CTA section
  useEffect(() => {
    if (!ctaSectionRef.current || !shadowContainerRef.current) return;
    
    const updatePosition = () => {
      const ctaRect = ctaSectionRef.current.getBoundingClientRect();
      const shadowContainer = shadowContainerRef.current;
      if (shadowContainer) {
        // Set exact dimensions and position
        shadowContainer.style.width = `${ctaRect.width}px`;
        shadowContainer.style.height = `${ctaRect.height}px`;
        shadowContainer.style.top = '0';
        shadowContainer.style.left = '0';
      }
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  if (particleCount === null) return null;

  return (
    <div className="mt-16 relative">
      {/* Shadow particles layer - positioned exactly like the CTA section */}
      <div 
        ref={shadowContainerRef}
        className="absolute pointer-events-none"
        style={{ zIndex: 5 }}
      >
        {/* Use the exact same particle component for identical positioning */}
        <CTAParticleEffect 
          particles={particles.map(p => ({
            ...p,
            size: p.size * 1.5,
            color: p.color.replace(/[^,]+(?=\))/, '0.15')
          }))} 
        />
      </div>
      
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
      
      {/* Mask to hide shadows inside CTA - positioned exactly like the CTA section */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none rounded-lg" 
        style={{
          background: '#FDF9FC',
          zIndex: 7,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0.5% 0.5%, 0.5% 99.5%, 99.5% 99.5%, 99.5% 0.5%, 0.5% 0.5%, 0% 0%)'
        }}
      />
    </div>
  );
};

export default ServicesCTA;
