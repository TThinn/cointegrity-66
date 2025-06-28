
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";

const PARTICLE_COUNT_DESKTOP = 18;
const PARTICLE_COUNT_MOBILE = 5;

interface LightParticlesProps {
  centerPosition?: { x: number; y: number };
}

const LightParticles: React.FC<LightParticlesProps> = ({ 
  centerPosition = { x: 50, y: 50 } 
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [particles, setParticles] = useState<any[]>([]);

  // Simple mount check
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize particles after component mount
  useEffect(() => {
    if (!isMounted) return;
    
    const colors = [
      'rgba(225,29,143,0.8)', // Pink
      'rgba(147,51,234,0.5)', // Purple
      'rgba(255,255,255,0.1)' // White
    ];
    
    const newParticles = Array.from({
      length: PARTICLE_COUNT_DESKTOP
    }, () => ({
      size: 30 + Math.random() * 160,
      x: centerPosition.x - 15 + Math.random() * 15,
      y: centerPosition.y - 15 + Math.random() * 20,
      moveX: (Math.random() - 0.5) * 25,
      moveY: (Math.random() - 0.5) * 30,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 7 + Math.random() * 15,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setParticles(newParticles);
  }, [isMounted, centerPosition.x, centerPosition.y]);

  // Device detection
  useLayoutEffect(() => {
    if (!isMounted) return;
    
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP);
    
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

  // Don't render until mounted and particles are initialized and device type is known
  if (!isMounted || particleCount === null || particles.length === 0) {
    return null;
  }

  return (
    <>
      {/* Particle Container */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {particles.slice(0, particleCount).map((p, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full blur-[25px] animate-light-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--move-x' as string]: `${p.moveX}vw`,
              ['--move-y' as string]: `${p.moveY}vh`,
              ['--rotate' as string]: `${p.rotate}deg`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Global animations */}
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
          .animate-light-particle {
            animation: light-particle ease-in-out infinite;
            mix-blend-mode: screen;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-light-particle {
              animation: none;
              opacity: 0.3 !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default LightParticles;
