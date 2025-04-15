import React, { useState, useEffect, useMemo } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const Hero = () => {
  const [isReady, setIsReady] = useState(false);
  const [particleCount, setParticleCount] = useState(25); // Default to desktop count

  // Pre-calculate all possible particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      style: {
        '--start-x': `${Math.random() * 100}%`,
        '--start-y': `${Math.random() * 100}%`,
        '--move-x': `${(Math.random() - 0.5) * 80}vw`,
        '--move-y': `${(Math.random() - 0.5) * 80}vh`,
        '--rotate': `${Math.random() * 360}deg`,
        width: `${120 + Math.random() * 300}px`,
        height: `${120 + Math.random() * 300}px`,
        background: `rgba(225,29,143,0.3)`,
        left: `var(--start-x)`,
        top: `var(--start-y)`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${10 + Math.random() * 15}s`
      }
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? 5 : 25);
      if (!isReady) setIsReady(true);
    };

    // Initial check
    handleResize();
    
    // Cleanup
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#060115] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060115] to-[#060115]"></div>
        
        {/* Particle Container */}
        <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          {particles.slice(0, particleCount).map(({ id, style }) => (
            <div
              key={id}
              className="absolute rounded-full blur-[30px] animate-light-particle"
              style={style}
            />
          ))}
        </div>
      </div>

      {/* Rest of your content remains unchanged */}
      <Container className="hero-content relative z-8 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        {/* ... existing content ... */}
      </Container>

      <style jsx>{`
        @keyframes light-particle {
          0%, 100% { opacity: 0.4; transform: translate(0,0) scale(1); }
          50% { opacity: 0.8; transform: 
            translate(var(--move-x), var(--move-y)) 
            scale(1.5) 
            rotate(var(--rotate)); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
