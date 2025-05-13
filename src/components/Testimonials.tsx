import React from "react";
import Container from "./ui/Container";
import TestimonialCard from "./testimonials/TestimonialCard";
import ParticleEffect from "./testimonials/ParticleEffect";
import { useTestimonials } from "./testimonials/useTestimonials";
import { useParticles } from "./testimonials/useParticles";
import { testimonials } from "./testimonials/testimonialsData";
const Testimonials = () => {
  const {
    activeTestimonials,
    changingIndex,
    isVisible,
    hoveredCard,
    handleCardMouseEnter,
    handleCardMouseLeave,
    testimonialsGridRef,
    maxSectionHeight
  } = useTestimonials();
  const {
    particles,
    sectionRef,
    buttonRef
  } = useParticles();
  return <section id="testimonials" className="py-20 relative overflow-hidden" ref={sectionRef}>
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
            <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[0, 1, 2, 3].map(position => <TestimonialCard key={position} testimonial={testimonials[activeTestimonials[position]]} position={position} isChanging={changingIndex === position} isVisible={isVisible} isHovered={hoveredCard === position} onMouseEnter={handleCardMouseEnter} onMouseLeave={handleCardMouseLeave} />)}
            </div>
          </div>
          
          <div className="mt-5 -mb-8 text-center relative z-20">
            <div className="inline-block relative">
              <ParticleEffect particles={particles} />
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
    </section>;
};
export default Testimonials;