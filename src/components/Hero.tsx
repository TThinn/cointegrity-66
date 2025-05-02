import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Container from "./ui/Container";

const HERO_PARTICLE_COUNT_DESKTOP = 10;
const HERO_PARTICLE_COUNT_MOBILE = 3;
const FIXED_RADIUS = 180; // Fixed radius for all particles

const Hero = () => {
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
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
    
    updateCtaPosition();
    window.addEventListener('resize', updateCtaPosition);
    return () => window.removeEventListener('resize', updateCtaPosition);
  }, []);

  // Generate particles with fixed circular constraint
  const generateParticles = () => {
    return Array.from({ length: HERO_PARTICLE_COUNT_DESKTOP }, () => {
      const colors = ['rgba(236,72,153,0.8)','rgba(147,51,234,0.6)','rgba(255,255,255,0.4)'];
      const angle = Math.random() * Math.PI * 2;
      
      // More varied distribution
      const distributionFactor = Math.pow(Math.random(), 0.5); // Less clustering at center
      const radius = distributionFactor * FIXED_RADIUS;
      
      return {
        // More varied sizes
        size: 5 + Math.random() * 30,
        x: ctaPosition.x + Math.cos(angle) * radius,
        y: ctaPosition.y + Math.sin(angle) * radius,
        baseX: ctaPosition.x,
        baseY: ctaPosition.y,
        radius: radius,
        angle: angle,
        // Much more varied speeds for independent movement
        speed: 0.2 + Math.random() * 3,
        // Independent movement patterns
        movementType: Math.floor(Math.random() * 3), // 0, 1, or 2 for different patterns
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        // Shorter durations for more frequent changes
        duration: 5 + Math.random() * 10
      };
    });
  };

  // Create particles reference
  const particles = useRef(generateParticles()).current;

  // Update particle positions when CTA position changes
  useEffect(() => {
    particles.forEach(p => {
      p.baseX = ctaPosition.x;
      p.baseY = ctaPosition.y;
    });
  }, [ctaPosition, particles]);

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
            className={`absolute rounded-full blur-[30px] animate-orb-float-${p.movementType + 1}`}
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              left: `${p.baseX}%`,
              top: `${p.baseY}%`,
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
          @keyframes orb-float-1 {
            0% {
              opacity: 0.3;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                ) scale(0.8);
            }
            25% {
              opacity: 0.7;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) + var(--speed))) * var(--radius) * 0.7), 
                  calc(sin(calc(var(--angle) - var(--speed) * 0.5)) * var(--radius) * 1.1)
                ) scale(1.2);
            }
            50% {
              opacity: 0.5;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) - var(--speed) * 0.8)) * var(--radius) * 1.2), 
                  calc(sin(calc(var(--angle) + var(--speed) * 1.2)) * var(--radius) * 0.8)
                ) scale(0.9);
            }
            75% {
              opacity: 0.8;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) + var(--speed) * 1.5)) * var(--radius) * 0.9), 
                  calc(sin(calc(var(--angle) - var(--speed) * 0.7)) * var(--radius) * 1.3)
                ) scale(1.1);
            }
            100% {
              opacity: 0.3;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                ) scale(0.8);
            }
          }
          
          @keyframes orb-float-2 {
            0% {
              opacity: 0.4;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                ) scale(1);
            }
            33% {
              opacity: 0.8;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) - var(--speed) * 1.2)) * var(--radius) * 0.9), 
                  calc(sin(calc(var(--angle) + var(--speed) * 0.8)) * var(--radius) * 1.1)
                ) scale(0.7);
            }
            66% {
              opacity: 0.6;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) + var(--speed) * 0.6)) * var(--radius) * 1.3), 
                  calc(sin(calc(var(--angle) - var(--speed) * 1.1)) * var(--radius) * 0.7)
                ) scale(1.3);
            }
            100% {
              opacity: 0.4;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                ) scale(1);
            }
          }
          
          @keyframes orb-float-3 {
            0% {
              opacity: 0.5;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                ) scale(0.9);
            }
            20% {
              opacity: 0.3;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) + var(--speed) * 0.4)) * var(--radius) * 1.1), 
                  calc(sin(calc(var(--angle) - var(--speed) * 0.9)) * var(--radius) * 0.8)
                ) scale(1.1);
            }
            40% {
              opacity: 0.7;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) - var(--speed) * 1.3)) * var(--radius) * 0.8), 
                  calc(sin(calc(var(--angle) + var(--speed) * 0.3)) * var(--radius) * 1.2)
                ) scale(0.8);
            }
            60% {
              opacity: 0.9;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) + var(--speed) * 0.7)) * var(--radius) * 1.3), 
                  calc(sin(calc(var(--angle) - var(--speed) * 1.4)) * var(--radius) * 0.9)
                ) scale(1.2);
            }
            80% {
              opacity: 0.4;
              transform: 
                translate(
                  calc(cos(calc(var(--angle) - var(--speed) * 0.5)) * var(--radius) * 0.7), 
                  calc(sin(calc(var(--angle) + var(--speed) * 1.0)) * var(--radius) * 1.1)
                ) scale(0.7);
            }
            100% {
              opacity: 0.5;
              transform: 
                translate(
                  calc(cos(var(--angle)) * var(--radius)), 
                  calc(sin(var(--angle)) * var(--radius))
                ) scale(0.9);
            }
          }
          
          .animate-orb-float-1, .animate-orb-float-2, .animate-orb-float-3 {
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            mix-blend-mode: screen;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-orb-float-1, .animate-orb-float-2, .animate-orb-float-3 {
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
