
import { useState, useLayoutEffect, useMemo } from "react";
import { ParticleType } from "../testimonials/types";

const CTA_PARTICLE_COUNT_DESKTOP = 18;
const CTA_PARTICLE_COUNT_MOBILE = 3;

interface CTAPosition {
  x: number;
  y: number;
}

export const useCTAParticles = (ctaRef: React.RefObject<HTMLAnchorElement>, ctaSectionRef: React.RefObject<HTMLDivElement>) => {
  // Initialize with default values - don't try to calculate before refs exist
  const [ctaPosition, setCtaPosition] = useState<CTAPosition>({ x: 50, y: 50 });
  const [particleCount, setParticleCount] = useState<number | null>(null);

  // Particle positioning relative to CTA section
  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current && ctaSectionRef.current) {
        const btnBox = ctaRef.current.getBoundingClientRect();
        const sectionBox = ctaSectionRef.current.getBoundingClientRect();
        
        const x = ((btnBox.left + btnBox.right)/2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom)/2 - sectionBox.top) / sectionBox.height * 100;

        setCtaPosition({ x, y });
      }
    };

    const timeout = setTimeout(updateCtaPosition, 100);
    window.addEventListener('resize', updateCtaPosition);
    return () => {
      window.removeEventListener('resize', updateCtaPosition);
      clearTimeout(timeout);
    };
  }, [ctaRef, ctaSectionRef]);

  // Responsive particle count
  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP);
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Particle configuration
  const particles = useMemo(() => {
    if (!particleCount) return [];
    return Array.from({ length: particleCount }, () => ({
      size: 40 + Math.random() * 40,
      x: ctaPosition.x - 45 + (Math.random() - 0.5) * 25, // Tighter distribution
      y: ctaPosition.y + 5 + (Math.random() - 0.5) * 25, // Tighter distribution
      moveX: (Math.random() - 0.5) * 18,
      moveY: (Math.random() - 0.5) * 20,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: [
        'rgba(225,29,143,0.7)',  // Pink
        'rgba(147,51,234,0.5)',   // Purple
      ][Math.floor(Math.random() * 2)]
    }));
  }, [ctaPosition, particleCount]);

  return { particles, particleCount };
};
