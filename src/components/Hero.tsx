import React, { useLayoutEffect, useRef, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const HERO_PARTICLE_COUNT_DESKTOP = 10;
const HERO_PARTICLE_COUNT_MOBILE = 3;

const Hero = () => {
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Pre-calculate all particle positions and properties ONCE
  const particles = useRef(Array.from({
    length: HERO_PARTICLE_COUNT_DESKTOP
  }, () => ({
    size: Math.random() * 300,
    x: 1 + Math.random() * 60,
    y: 1 + Math.random() * 60,
    moveX: (Math.random() - 0.5) * 160, // Allows movement in both directions
    moveY: (Math.random() - 0.5) * 160,
    rotate: Math.random() * 360,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 40
  }))).current;

  // Synchronous device detection BEFORE first paint
  useLayoutEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? HERO_PARTICLE_COUNT_MOBILE : HERO_PARTICLE_COUNT_DESKTOP);
      if (!isReady) setIsReady(true);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  // Don't render particles until device type is known
  if (particleCount === null) return null;
  
  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom right, #010822 0%, #133a63 100%)"
          }}
        />
        {/* Particle Container with transition */}
        <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          {particles.slice(0, particleCount).map((p, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full blur-[25px] animate-light-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: 'rgba(61,107,156,0.3)', // Using brand color #3d6b9c
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
      </div>
      
      {/* Rest of your content remains EXACTLY the same */}
      {/* ... */}
    </section>
  );
};

export default Hero;
