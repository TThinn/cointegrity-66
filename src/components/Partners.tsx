
import React, { useRef, useState, useLayoutEffect, useMemo } from "react";
import Container from "./ui/Container";
import { cn } from "@/lib/utils";
import { partnerLogos } from "../data/partnerLogos";
import OptimizedImage from "./ui/OptimizedImage";

const CTA_PARTICLE_COUNT_DESKTOP = 15;
const CTA_PARTICLE_COUNT_MOBILE = 3;

const Partners = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const [ctaPosition, setCtaPosition] = useState({
    x: 50,
    y: 50
  });
  const [particleCount, setParticleCount] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current && ctaSectionRef.current) {
        const btnBox = ctaRef.current.getBoundingClientRect();
        const sectionBox = ctaSectionRef.current.getBoundingClientRect();
        const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;
        setCtaPosition({
          x,
          y
        });
      }
    };
    const timeout = setTimeout(updateCtaPosition, 100);
    window.addEventListener('resize', updateCtaPosition);
    return () => {
      window.removeEventListener('resize', updateCtaPosition);
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
    return Array.from({
      length: particleCount
    }, () => ({
      size: 20 + Math.random() * 80,
      x: ctaPosition.x - 4 + (Math.random() - 0.5) * 12,
      y: ctaPosition.y - 4 + (Math.random() - 0.5) * 12,
      moveX: (Math.random() - 0.5) * 10,
      moveY: (Math.random() - 0.5) * 14,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: ['rgba(225,29,143,0.9)', 'rgba(147,51,234,0.6)', 'rgba(255,255,255,0.15)'][Math.floor(Math.random() * 3)]
    }));
  }, [ctaPosition, particleCount]);

  if (particleCount === null) return null;

  return (
    <section id="partners" className="py-20 relative overflow-hidden">
      {/* Background elements to match the first section */}
      <div className="absolute inset-0 bg-[#010822]"></div>
      <div className="absolute inset-0 bg-[#0a1a3a]/10 blur-[100px] rounded-full"></div>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">
            Collaboration with Industry Leaders
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
            Our Network
          </h3>
          <p className="mt-4 text-lg text-gray-300">
            Collaborating with industry leaders across blockchain, finance, technology, and governmental sectors to drive the future of Web3.
          </p>
        </div>

        {/* Updated grid with more columns and compact sizing */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 relative z-10">
          {partnerLogos.map((partner, index) => (
            <a 
              href={partner.url || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={index} 
              className={cn(
              "flex items-center justify-center p-4 rounded-lg bg-transparent border border-white/30",
              "transition-all duration-300 hover:border-white/50 group h-14 sm:h-18"
              )}
              title={partner.name}
              aria-label={`Visit ${partner.name} website`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <OptimizedImage
                  src={partner.logo} 
                  alt={partner.name} 
                  className="max-h-7 object-contain opacity-80 group-hover:opacity-100 transition-all duration-300" 
                  priority={index < 6} // Only prioritize loading for the first 6 logos
                  width={100}
                  height={40}
                />
              </div>
            </a>
          ))}
        </div>

{/* CTA Section with Particles and properly aligned shadow effect */}
<div className="mt-16 relative">
  {/* External shadow effect that matches particle positions */}
  <div className="absolute inset-0 z-[5] pointer-events-none overflow-visible">
    {particles.map((p, i) => (
      <div 
        key={`shadow-particle-${i}`} 
        className="absolute rounded-full blur-[25px] animate-light-particle" 
        style={{
          width: `${p.size * 1.5}px`,
          height: `${p.size * 1.5}px`,
          background: p.color.replace(/[^,]+(?=\))/, '0.15'),
          // Adjust position to account for larger size
          left: `calc(${p.x}% - ${p.size * 0.25}px)`,
          top: `calc(${p.y}% - ${p.size * 0.25}px)`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          ['--move-x' as string]: `${p.moveX}vw`,
          ['--move-y' as string]: `${p.moveY}vh`,
          ['--rotate' as string]: `${p.rotate}deg`,
          opacity: 0.4,
          mixBlendMode: 'screen'
        }} 
      />
    ))}
  </div>
  
  {/* CTA Section - with clip-path to hide shadows inside */}
  <div  
    ref={ctaSectionRef}
    className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 p-6 md:p-7 rounded-lg backdrop-blur-sm bg-transparent border border-white/30 relative z-10 overflow-hidden" 
    style={{
      clipPath: 'inset(0 0 0 0)',
    }}
  >
    {/* Particles */}
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

    <div className="flex-1 text-center md:text-left relative z-10">
      <h3 className="text-[clamp(1.2rem,1rem+0.7vw,1.8rem)] font-bold mb-2 text-white">Want to partner with us?</h3>
    </div>
    
    <a href="/contact" className="inline-flex items-center relative z-10" ref={ctaRef}>
      <button className="bg-white/15 backdrop-blur-sm text-white px-6 py-2.5 rounded-full
                        border border-white/30 hover:bg-white/40 transition-all
                        transform hover:scale-105 duration-300 text-base font-semibold">Get in touch</button>
    </a>
  </div>
  
{/* Mask to hide shadow orbs inside CTA */}
<div className="absolute inset-0 bg-[#010822] z-[6] pointer-events-none rounded-lg" 
     style={{
       clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 0.5% 0.5%, 0.5% 99.5%, 99.5% 99.5%, 99.5% 0.5%, 0.5% 0.5%, 0% 0%)',
     }}>
</div>
</div>      
      </Container>

      {/* Animation Styles */}
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

export default Partners;
