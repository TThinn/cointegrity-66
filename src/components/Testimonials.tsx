
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import TestimonialCard from "./testimonials/TestimonialCard";
import ParticleEffect from "./testimonials/ParticleEffect";
import { testimonials } from "./testimonials/testimonialsData";

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTestimonials, setActiveTestimonials] = useState([0, 1, 2, 3]);
  const [changingIndex, setChangingIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [maxSectionHeight, setMaxSectionHeight] = useState(0);
  const testimonialsGridRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [particles, setParticles] = useState([]);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      
      if (mobile && activeTestimonials.length > 2) {
        // On mobile, only show first 2 testimonials
        setActiveTestimonials(activeTestimonials.slice(0, 2));
      } else if (!mobile && activeTestimonials.length < 4) {
        // On desktop, ensure we show 4 testimonials
        const currentIds = new Set(activeTestimonials);
        const newIds = [...activeTestimonials];
        
        while (newIds.length < 4) {
          const randomId = Math.floor(Math.random() * testimonials.length);
          if (!currentIds.has(randomId)) {
            newIds.push(randomId);
            currentIds.add(randomId);
          }
        }
        
        setActiveTestimonials(newIds);
      }
    };

    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [activeTestimonials]);

  // Calculate section height
  useEffect(() => {
    if (testimonialsGridRef.current) {
      setMaxSectionHeight(testimonialsGridRef.current.offsetHeight);
    }
  }, [activeTestimonials, isMobile]);

  // Generate particles
  useEffect(() => {
    if (!buttonRef.current || !sectionRef.current) return;

    const btnBox = buttonRef.current.getBoundingClientRect();
    const sectionBox = sectionRef.current.getBoundingClientRect();
    const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
    const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;

    const count = window.innerWidth < 768 ? 5 : 12;
    const newParticles = Array.from({ length: count }, () => ({
      size: 20 + Math.random() * 80,
      x: x - 4 + (Math.random() - 0.5) * 12,
      y: y - 4 + (Math.random() - 0.5) * 12,
      moveX: (Math.random() - 0.5) * 10,
      moveY: (Math.random() - 0.5) * 14,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: ['rgba(225,29,143,0.9)', 'rgba(147,51,234,0.6)', 'rgba(255,255,255,0.15)'][Math.floor(Math.random() * 3)]
    }));

    setParticles(newParticles);

    const handleResize = () => {
      if (!buttonRef.current || !sectionRef.current) return;
      
      const btnBox = buttonRef.current.getBoundingClientRect();
      const sectionBox = sectionRef.current.getBoundingClientRect();
      const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
      const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;

      setParticles(prev => prev.map(p => ({
        ...p,
        x: x - 4 + (Math.random() - 0.5) * 12,
        y: y - 4 + (Math.random() - 0.5) * 12,
      })));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardMouseEnter = (position) => {
    setHoveredCard(position);
  };

  const handleCardMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">Client Success Stories</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-white">Why Leading Organizations Choose Our Web3 Expertise</h3>
            <p className="mt-2 text-white/60 max-w-2xl mx-auto">Our knowledge-first approach to Web3 transformation helps organizations successfully navigate the complex decentralized landscape. With deep expertise in blockchain strategy, product development, tax compliance, and capital acceleration, our specialists bridge the gap between traditional business and Web3 innovation. As your dependable guide through complex blockchain challenges, we deliver solutions that create measurable value. Don't just take our word for it-read what our clients say about working with our team:</p>
          </div>

          <div className="transition-all duration-300 relative z-30" style={{
            minHeight: `${maxSectionHeight}px`
          }}>
            <div ref={testimonialsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {activeTestimonials.map((testimonialIndex, position) => (
                <TestimonialCard 
                  key={position} 
                  testimonial={testimonials[testimonialIndex]} 
                  position={position} 
                  isChanging={changingIndex === position} 
                  isVisible={isVisible} 
                  isHovered={hoveredCard === position} 
                  onMouseEnter={() => handleCardMouseEnter(position)} 
                  onMouseLeave={handleCardMouseLeave} 
                />
              ))}
            </div>
          </div>
          
          <div className="mt-5 -mb-8 text-center relative z-20 overflow-hidden">
            <div className="inline-block relative">
              <div className="absolute inset-0 z-[1] pointer-events-none overflow-x-hidden">
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
                      ['--move-x']: `${p.moveX}vw`,
                      ['--move-y']: `${p.moveY}vh`,
                      ['--rotate']: `${p.rotate}deg`
                    }} 
                  />
                ))}
              </div>
              <a href="#contact" ref={buttonRef} className="inline-flex items-center relative z-20">
                <button className="bg-white/15 backdrop-blur-sm text-white px-6 py-3 rounded-full
                              border border-white/30 hover:bg-white/40 transition-all
                              transform hover:scale-105 duration-300 text-base font-semibold">
                  Partner with us
                </button>
              </a>
            </div>
          </div>
        </div>
      </Container>

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

export default Testimonials;
