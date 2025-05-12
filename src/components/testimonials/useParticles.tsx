
import { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { ParticleType } from './types';

const CTA_PARTICLE_COUNT_DESKTOP = 20;
const CTA_PARTICLE_COUNT_MOBILE = 4;

export const useParticles = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });
  const [particleCount, setParticleCount] = useState<number | null>(null);
  
  // Define the spread value
  const spread = 20; // This controls how far particles can spread from the center point

  useLayoutEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current && sectionRef.current) {
        const btnBox = buttonRef.current.getBoundingClientRect();
        const sectionBox = sectionRef.current.getBoundingClientRect();
        const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;
        setCtaPosition({ x, y });
      }
    };
    const timeout = setTimeout(updateButtonPosition, 100);
    window.addEventListener('resize', updateButtonPosition);
    return () => {
      window.removeEventListener('resize', updateButtonPosition);
      clearTimeout(timeout);
    };
  }, []);

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

  const particles = useMemo(() => {
    if (!particleCount) return [];
    
    return Array.from({ length: particleCount }, () => ({
      size: 30 + Math.random() * 180,
      x: ctaPosition.x - 15 + Math.random() * 20,
      y: ctaPosition.y - spread * 1.4 + Math.random() * (2 * spread),
      moveX: (Math.random() - 0.5) * 20,
      moveY: (Math.random() - 0.5) * 30,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 40,
      color: ['rgba(225,29,143,0.9)', 'rgba(147,51,234,0.6)', 'rgba(255,255,255,0.15)'][Math.floor(Math.random() * 3)]
    })) as ParticleType[];
  }, [ctaPosition, particleCount]);

  return { particles, sectionRef, buttonRef };
};
