
import React, { useLayoutEffect, useRef, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const HERO_PARTICLE_COUNT_DESKTOP = 12;
const HERO_PARTICLE_COUNT_MOBILE = 5;

const Hero = () => {
  const [particleCount, setParticleCount] = useState(null);

  // Pre-calculate all particle positions and properties ONCE
  const particles = useRef(
    Array.from({ length: HERO_PARTICLE_COUNT_DESKTOP }, () => ({
      size: Math.random() * 600,
      x: 1 + Math.random() * 30,
      y: 1 + Math.random() * 30,
      moveX: (Math.random()) * 80,
      moveY: (Math.random()) * 80,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 40
    }))
  ).current;

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

  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#060115] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060115] to-[#060115]" />
        {/* Particle Container */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {particles.slice(0, particleCount).map((p, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full blur-[25px] animate-light-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: 'rgba(225,29,143,0.6)',
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                // Fix: Use CSS variables with proper TypeScript handling
                ['--move-x' as string]: `${p.moveX}vw`,
                ['--move-y' as string]: `${p.moveY}vh`,
                ['--rotate' as string]: `${p.rotate}deg`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <Container className="hero-content relative z-8 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-16">
          <h1
            className="text-[40px] lg:text-[60px] tracking-tight text-balance animate-fade-up mb-4 font-bold leading-tight text-shadow"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-white font-extrabold">Simplifying Web3 Complexity</span>
          </h1>

          <h2
            className="text-lg max-w-2xl text-balance animate-fade-up relative mb-8 text-white/80"
            style={{ animationDelay: "0.4s" }}
          >
            We provide Full-cycle Web3 Consulting Solutions at the Intersection of Blockchain, Ai, Gaming, Tax & Compliance.
          </h2>
        </div>

        {/* CTA Button */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-4"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            variant="cta-primary"
            className="floating-element w-full sm:w-auto"
            href="#contact"
          >
            Connect With Us
          </Button>
        </div>

        {/* Stats grid */}
        <div
          className="mt-16 border-t border-white/10 pt-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up text-center"
          style={{ animationDelay: "0.6s" }}
        >
          {[
            { number: "45+", label: "Years Experience" },
            { number: "15+", label: "Project Jurisdictions" },
            { number: "20+", label: "Enterprise Clients" },
            { number: "40+", label: "Projects Delivered" }
          ].map((stat, i) => (
            <div key={`stat-${i}`}>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.number}</h3>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Global animations - Fix: Correct style element props */}
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
    </section>
  );
};

export default Hero;
