
import React, { useLayoutEffect, useRef, useState } from "react";
import Container from "./ui/Container";
import HeroParticles from "./hero/HeroParticles";
import HeroContent from "./hero/HeroContent";
import HeroCTA from "./hero/HeroCTA";
import ScrollIndicator from "./ui/ScrollIndicator";
// import HeroStats from "./hero/HeroStats"; // Retained for later use

const Hero = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaPosition, setCtaPosition] = useState({
    x: 50,
    y: 50
  });

  // Get CTA button position for particle centering
  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current) {
        const box = ctaRef.current.getBoundingClientRect();
        const xCenter = (box.left + box.right) / 2;
        const yCenter = (box.top + box.bottom) / 2;

        // Convert to percentage of viewport
        setCtaPosition({
          x: xCenter / window.innerWidth * 100,
          y: yCenter / window.innerHeight * 100
        });
      }
    };

    // Update position after a short delay to ensure layout is complete
    setTimeout(updateCtaPosition, 100);
    window.addEventListener('resize', updateCtaPosition);
    return () => window.removeEventListener('resize', updateCtaPosition);
  }, []);

  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#060115] isolate min-h-[88vh]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
        <HeroParticles ctaPosition={ctaPosition} />
      </div>

      {/* Bottom edge gradient hint */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

      {/* Content container */}
      <Container className="hero-content relative z-8 text-lg font-normal flex flex-col min-h-[70vh] justify-center gap-6">
        <HeroContent />
        <HeroCTA ref={ctaRef} />
        {/* <HeroStats /> */}
      </Container>

      {/* Scroll indicator */}
      <ScrollIndicator targetSection="services" />
    </section>
  );
};

export default Hero;
