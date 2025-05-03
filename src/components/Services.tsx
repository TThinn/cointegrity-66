import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket } from "lucide-react";

const CTA_PARTICLE_COUNT_DESKTOP = 8;
const CTA_PARTICLE_COUNT_MOBILE = 3;

const Services = () => {
  // Particle effect logic
  const ctaRef = useRef(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });
  const [particleCount, setParticleCount] = useState(null);

  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current) {
        const box = ctaRef.current.getBoundingClientRect();
        const xCenter = (box.left + box.right) / 2;
        const yCenter = (box.top + box.bottom) / 2;
        setCtaPosition({
          x: xCenter / window.innerWidth * 100,
          y: yCenter / window.innerHeight * 100
        });
      }
    };

    setTimeout(updateCtaPosition, 100);
    window.addEventListener('resize', updateCtaPosition);
    return () => window.removeEventListener('resize', updateCtaPosition);
  }, []);

  const particles = useRef(Array.from({ length: CTA_PARTICLE_COUNT_DESKTOP }, () => ({
    size: 10 + Math.random() * 40,
    x: ctaPosition.x - 5 + Math.random() * 10,
    y: ctaPosition.y - 5 + Math.random() * 10,
    moveX: (Math.random() - 0.5) * 10,
    moveY: (Math.random() - 0.5) * 15,
    rotate: Math.random() * 360,
    delay: Math.random() * 5,
    duration: 7 + Math.random() * 15,
    color: ['rgba(225,29,143,0.7)', 'rgba(147,51,234,0.4)', 'rgba(255,255,255,0.1)'][Math.floor(Math.random() * 3)]
  }))).current;

  useEffect(() => {
    particles.forEach(p => {
      p.x = ctaPosition.x - 5 + Math.random() * 10;
      p.y = ctaPosition.y - 5 + Math.random() * 10;
    });
  }, [ctaPosition]);

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
      {/* Existing services content... */}

      {/* Modified CTA section */}
      <div className="mt-16 neo-box-alt flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-2xl text-white relative overflow-hidden" 
           style={{ background: "linear-gradient(90deg, #010822 0%, #010822 100%)" }}>
        
        {/* Particle Container */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {particles.slice(0, particleCount).map((p, i) => (
            <div key={`cta-particle-${i}`} 
                 className="absolute rounded-full blur-[15px] animate-light-particle"
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
                 } as React.CSSProperties} />
          ))}
        </div>

        <div className="flex-1 text-center md:text-left relative z-10">
          <h3 className="text-2xl font-bold mb-3 text-white">Bring Substance to Your Digital Asset Strategy</h3>
        </div>
        
        <a href="#contact" className="inline-flex items-center relative z-10" ref={ctaRef}>
          <button className="bg-white/5 backdrop-blur-sm text-white px-6 py-3 rounded-full
                           border border-white/20 hover:bg-white/30 transition-all
                           transform hover:scale-105 duration-300 text-base font-semibold">
            Let's get started
          </button>
        </a>
      </div>

      <style>
        {`@keyframes light-particle {
            0%, 100% { opacity: 0.4; transform: translate(0, 0) scale(1) rotate(0); }
            25% { opacity: 0.6; transform: translate(calc(var(--move-x) * 0.3), calc(var(--move-y) * -0.7)) scale(1.2) rotate(calc(var(--rotate) * 0.3)); }
            50% { opacity: 0.8; transform: translate(var(--move-x), var(--move-y)) scale(1.5) rotate(calc(var(--rotate) * 0.6)); }
            75% { opacity: 0.6; transform: translate(calc(var(--move-x) * -0.3), calc(var(--move-y) * 0.7)) scale(1.3) rotate(var(--rotate)); }
          }`}
      </style>
    </section>
  );
};
