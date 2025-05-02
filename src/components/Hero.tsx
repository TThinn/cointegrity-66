import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const HERO_PARTICLE_COUNT_DESKTOP = 12;
const HERO_PARTICLE_COUNT_MOBILE = 5;

const Hero = () => {
  const [particleCount, setParticleCount] = useState(null);
  const ctaRef = useRef(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });

  // Get CTA button position for particle centering
  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current) {
        const box = ctaRef.current.getBoundingClientRect();
        const xCenter = (box.left + box.right) / 2;
        const yCenter = (box.top + box.bottom) / 2;
        
        // Convert to percentage of viewport
        setCtaPosition({
          x: (xCenter / window.innerWidth) * 100,
          y: (yCenter / window.innerHeight) * 100
        });
      }
    };
    
    // Update position after a short delay to ensure layout is complete
    setTimeout(updateCtaPosition, 100);
    window.addEventListener('resize', updateCtaPosition);
    return () => window.removeEventListener('resize', updateCtaPosition);
  }, []);

  // Pre-calculate all particle positions and properties ONCE
  const particles = useRef(Array.from({
    length: HERO_PARTICLE_COUNT_DESKTOP
  }, () => {
    const colors = [
      'rgba(225,29,143,0.6)', // Pink
      'rgba(147,51,234,0.6)', // Purple
      'rgba(255,255,255,0.4)' // White
    ];
    
    return {
      size: 50 + Math.random() * 200,
      x: ctaPosition.x - 10 + Math.random() * 20, // Centered around CTA
      y: ctaPosition.y - 10 + Math.random() * 20, // Centered around CTA
      moveX: (Math.random() - 0.5) * 30, // Limited movement range
      moveY: (Math.random() - 0.5) * 30, // Limited movement range
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 15,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  })).current;

  // Update particle positions when CTA position changes
  useEffect(() => {
    particles.forEach(p => {
      p.x = ctaPosition.x - 10 + Math.random() * 20;
      p.y = ctaPosition.y - 10 + Math.random() * 20;
    });
  }, [ctaPosition]);

  // Synchronous device detection BEFORE first paint
  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? HERO_PARTICLE_COUNT_MOBILE : HERO_PARTICLE_COUNT_DESKTOP);
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? HERO_PARTICLE_COUNT_MOBILE : HERO_PARTICLE_COUNT_DESKTOP);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Don't render particles until device type is known
  if (particleCount === null) return null;
  
  return <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#060115] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
        {/* Particle Container */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {particles.slice(0, particleCount).map((p, i) => <div key={`particle-${i}`} className="absolute rounded-full blur-[25px] animate-light-particle" style={{
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
        } as React.CSSProperties} />)}
        </div>
      </div>

      {/* Content container */}
      <Container className="hero-content relative z-8 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center mx-auto mt-16 w-full max-w-[90vw] xl:max-w-[1200px]">
          <h1 className="font-bold leading-tight text-shadow mb-4 animate-fade-up text-balance" style={{
          animationDelay: "0.2s",
          fontSize: "clamp(1.9rem, 6vw, 4.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em"
        }}>
            <span className="text-white font-extrabold">Simplifying Web3 Complexity</span>
          </h1>

          <h2 className="text-white/80 animate-fade-up relative mb-8 text-balance" style={{
          animationDelay: "0.4s",
          fontSize: "clamp(0.9rem, 1.5vw, 1.5rem)",
          lineHeight: 1.25,
          fontWeight: 400,
          maxWidth: "40rem"
        }}>
            We provide Full-cycle Web3 Consulting Solutions at the Intersection of Blockchain, AI, Gaming, Tax & Compliance.
          </h2>
        </div>

        {/* CTA Button with ref for positioning */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-4" style={{
        animationDelay: "0.5s"
      }}>
          <a href="#contact" className="inline-block">
            <button 
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                        border border-white/30 hover:bg-white/30 transition-all
                        transform hover:scale-105 duration-300 text-lg font-semibold">
              Connect With Us
            </button>
          </a>
        </div>

        {/* Stats grid */}
        <div className="mt-24 border-t border-white/10 pt-4 grid grid-cols-2 md:grid-cols-4 gap-10 animate-fade-up text-center" style={{
        animationDelay: "0.6s"
      }}>
          {[{
          number: "45+",
          label: "Years Experience"
        }, {
          number: "15+",
          label: "Project Jurisdictions"
        }, {
          number: "20+",
          label: "Enterprise Clients"
        }, {
          number: "40+",
          label: "Projects Delivered"
        }].map((stat, i) => <div key={`stat-${i}`}>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.number}</h3>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>)}
        </div>
      </Container>

      {/* Global animations */}
      <style>
        {`
          @keyframes light-particle {
            0%, 100% { 
              opacity: 0.4;
              transform: translate(0, 0) scale(1) rotate(0);
            }
            50% { 
              opacity: 0.8;
              transform: 
                translate(var(--move-x), var(--move-y)) 
                scale(1.5) 
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
    </section>;
};

export default Hero;
