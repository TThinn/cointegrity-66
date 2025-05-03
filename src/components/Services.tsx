import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket } from "lucide-react";

const CTA_PARTICLE_COUNT_DESKTOP = 15;
const CTA_PARTICLE_COUNT_MOBILE = 3;

const services = [/* ... unchanged services array ... */];

const Services = () => {
  const isDarkBackground = false;
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });
  const [particleCount, setParticleCount] = useState<number | null>(null);

  // Correct position calculation relative to CTA section
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
  }, []);

  // Memoized particles array updates with position changes
  const particles = useMemo(() => {
    if (!particleCount) return [];
    return Array.from({ length: particleCount }, () => ({
      size: 20 + Math.random() * 80,
      x: ctaPosition.x - 8 + Math.random() * 16,
      y: ctaPosition.y - 8 + Math.random() * 16,
      moveX: (Math.random() - 0.5) * 12,
      moveY: (Math.random() - 0.5) * 16,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: [
        'rgba(225,29,143,0.9)',
        'rgba(147,51,234,0.6)',
        'rgba(255,255,255,0.15)'
      ][Math.floor(Math.random() * 3)]
    }));
  }, [ctaPosition, particleCount]);

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

  if (particleCount === null) return null;

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa] relative">
      <Container>
        {/* ... unchanged services grid ... */}

        {/* CTA Section */}
        <div 
          ref={ctaSectionRef}
          className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-2xl text-white relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #010822 0%, #010822 100%)" }}
        >
          {/* Dark background layer */}
          <div className="absolute inset-0 z-0 bg-[#010822]/95" />

          {/* Particles positioned relative to CTA section */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            {particles.map((p, i) => (
              <div
                key={`cta-particle-${i}`}
                className="absolute rounded-full blur-[12px] animate-light-particle"
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
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-white">Bring Substance to Your Digital Asset Strategy</h3>
          </div>
          
          <a 
            href="#contact" 
            className="inline-flex items-center relative z-10"
            ref={ctaRef}
          >
            <button className="bg-white/5 backdrop-blur-sm text-white px-6 py-3 rounded-full
                             border border-white/20 hover:bg-white/30 transition-all
                             transform hover:scale-105 duration-300 text-base font-semibold">
              Let's get started
            </button>
          </a>
        </div>
      </Container>

      {/* Animation styles */}
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
    </section>
  );
};

export default Services;
