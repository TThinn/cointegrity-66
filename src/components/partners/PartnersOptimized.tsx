import React, { useRef, useState, useLayoutEffect } from "react";
import Container from "../ui/Container";
import { cn } from "@/lib/utils";
import { partnerLogos } from "../../data/partnerLogos";
import OptimizedImage from "../ui/OptimizedImage";
import { ParticleSystem } from "./ParticleSystem";

const CTA_PARTICLE_COUNT_DESKTOP = 15;
const CTA_PARTICLE_COUNT_MOBILE = 3;

const PartnersOptimized = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });
  const [particleCount, setParticleCount] = useState<number | null>(null);

  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current && ctaSectionRef.current) {
        const btnBox = ctaRef.current.getBoundingClientRect();
        const sectionBox = ctaSectionRef.current.getBoundingClientRect();
        const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;
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
    <section id="partners" className="py-20 relative overflow-hidden">
      {/* Background elements */}
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

        {/* Partner grid */}
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
                  priority={index < 6}
                  width={100}
                  height={40}
                />
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section with optimized particles */}
        <div className="mt-16 relative">
          <ParticleSystem 
            position={ctaPosition}
            count={particleCount}
            showShadow={true}
          />
          
          <div  
            ref={ctaSectionRef}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12 p-6 md:p-7 rounded-lg backdrop-blur-sm bg-transparent border border-white/30 relative z-10 overflow-hidden" 
            style={{ clipPath: 'inset(0 0 0 0)' }}
          >
            <ParticleSystem 
              position={ctaPosition}
              count={particleCount}
              showShadow={false}
            />

            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-[clamp(1.2rem,1rem+0.7vw,1.8rem)] font-bold mb-2 text-white">
                Want to partner with us?
              </h3>
            </div>
            
            <a href="/contact" className="inline-flex items-center relative z-10" ref={ctaRef}>
              <button className="bg-white/15 backdrop-blur-sm text-white px-6 py-2.5 rounded-full
                                border border-white/30 hover:bg-white/40 transition-all
                                transform hover:scale-105 duration-300 text-base font-semibold">
                Get in touch
              </button>
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

export default PartnersOptimized;