
import { useState, useRef, useEffect, useMemo } from 'react';
import { ParticleType } from './types';

export const useParticles = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [particles, setParticles] = useState<ParticleType[]>([]);

  // Generate particles based on button position
  useEffect(() => {
    if (!buttonRef.current || !sectionRef.current) return;

    const btnBox = buttonRef.current.getBoundingClientRect();
    const sectionBox = sectionRef.current.getBoundingClientRect();
    const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
    const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;

    const count = window.innerWidth < 768 ? 5 : 12;
    const newParticles = Array.from({ length: count }, () => ({
      size: 20 + Math.random() * 80,
      x: x - 4 + (Math.random() - 0.5) * 12,
      y: y - 4 + (Math.random() - 0.5) * 12,
      moveX: (Math.random() - 0.5) * 10,
      moveY: (Math.random() - 0.5) * 14,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: ['rgba(225,29,143,0.9)', 'rgba(147,51,234,0.6)', 'rgba(255,255,255,0.15)'][Math.floor(Math.random() * 3)]
    }));

    setParticles(newParticles);

    const handleResize = () => {
      if (!buttonRef.current || !sectionRef.current) return;
      
      const btnBox = buttonRef.current.getBoundingClientRect();
      const sectionBox = sectionRef.current.getBoundingClientRect();
      const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
      const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;

      setParticles(prev => prev.map(p => ({
        ...p,
        x: x - 4 + (Math.random() - 0.5) * 12,
        y: y - 4 + (Math.random() - 0.5) * 12,
      })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { particles, sectionRef, buttonRef };
};
