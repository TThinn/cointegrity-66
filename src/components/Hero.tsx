import React, { useLayoutEffect, useRef, useState } from "react";
import Container from "./ui/Container";

const HERO_PARTICLE_COUNT_DESKTOP = 6;
const HERO_PARTICLE_COUNT_MOBILE = 3;

const Hero = () => {
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });

  // Get CTA button position for particle centering
  useLayoutEffect(() => {
    if (ctaRef.current) {
      const rect = ctaRef.current.getBoundingClientRect();
      setCtaPosition({
        x: (rect.left + rect.width/2) / window.innerWidth * 100,
        y: (rect.top + rect.height/2) / window.innerHeight * 100
      });
    }
  }, []);

  // Particle configuration with circular constraint
  const particles = useRef(Array.from({
    length: HERO_PARTICLE_COUNT_DESKTOP
  }, () => {
    const colors = ['rgba(255,255,255,0.3)','rgba(236,72,153,0.6)', 'rgba(147,51,234,0.6)'];
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 20;
    
    return {
      size: 50 + Math.random() * 150,
      x: ctaPosition.x + Math.cos(angle) * radius,
      y: ctaPosition.y + Math.sin(angle) * radius,
      baseX: ctaPosition.x,
      baseY: ctaPosition.y,
      radius: radius,
      angle: angle,
      speed: 0.1 + Math.random() * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 20
    }
  })).current;

  // Device detection and particle count
  useLayoutEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? HERO_PARTICLE_COUNT_MOBILE : HERO_PARTICLE_COUNT_DESKTOP);
      if (!isReady) setIsReady(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  if (particleCount === null) return null;

  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate">
      {/* Particle Container */}
      <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        {particles.slice(0, particleCount).map((p, i) => (
          <div 
            key={`particle-${i}`} 
            className="absolute rounded-full blur-[50px] animate-orb-float"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--base-x' as string]: `${p.baseX}%`,
              ['--base-y' as string]: `${p.baseY}%`,
              ['--radius' as string]: `${p.radius}%`,
              ['--angle' as string]: `${p.angle}rad`,
              ['--speed' as string]: p.speed
            } as React.CSSProperties}
          />
        ))}
      </div>

      <Container className="hero-content relative z-10 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center mx-auto mt-16 w-full max-w-[90vw] xl:max-w-[1200px]">
          <h1 className="font-bold leading-tight text-shadow mb-4 animate-fade-up text-balance"
              style={{
                animationDelay: "0.2s",
                fontSize: "clamp(1.9rem, 6vw, 4.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em"
              }}>
            <span className="text-white font-bold">Simplifying Web3 Complexity</span>
          </h1>

          <h2 className="text-white/80 animate-fade-up relative mb-8 text-balance"
              style={{
                animationDelay: "0.4s",
                fontSize: "clamp(0.9rem, 1.5vw, 1.5rem)",
                lineHeight: 1.25,
                fontWeight: 400,
                maxWidth: "40rem"
              }}>
            We provide Full-cycle Web3 Consulting Solutions at the Intersection of Blockchain, AI, Gaming, Tax & Compliance.
          </h2>
        </div>

        {/* Custom CTA Button */}
        <div ref={ctaRef} className="flex justify-center animate-fade-up mb-4"
             style={{ animationDelay: "0.5s" }}>
          <a href="#contact" className="inline-block">
            <button 
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                        border border-white/30 hover:bg-white/30 transition-all
                        transform hover:scale-105 duration-300 text-lg font-semibold">
              Get in Touch
            </button>
          </a>
        </div>

        {/* Stats grid */}
        <div className="mt-24 border-t border-white/10 pt-4 grid grid-cols-2 md:grid-cols-4 gap-10 animate-fade-up text-center"
             style={{ animationDelay: "0.6s" }}>
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
          }].map((stat, i) => (
            <div key={`stat-${i}`}>
              <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.number}</h3>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>

      <style>
        {`
          @keyframes orb-float {
            0%, 100% {
              opacity: 0.2;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                );
            }
            50% {
              opacity: 0.8;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) + var(--speed))) * var(--radius)), 
                  calc(sin(calc(var(--angle) + var(--speed))) * var(--radius))
                );
            }
          }
          .animate-orb-float {
            animation: orb-float ease-in-out infinite;
            mix-blend-mode: screen;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-orb-float {
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
