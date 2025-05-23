
import React from "react";
import Container from "./ui/Container";
import { useTestimonials } from "./testimonials/useTestimonials";
import { useParticles } from "./testimonials/useParticles";
import TestimonialCard from "./testimonials/TestimonialCard";
import ParticleEffect from "./testimonials/ParticleEffect";

const Testimonials = () => {
  const {
    testimonials,
    activeTestimonials,
    changingIndex,
    isVisible,
    hoveredCard,
    handleCardMouseEnter,
    handleCardMouseLeave,
    testimonialsGridRef,
    maxSectionHeight
  } = useTestimonials();

  const { particles, sectionRef, buttonRef } = useParticles();

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#133a63]/30 rounded-full blur-[90px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#010822]/20 rounded-full blur-[70px]"></div>
      </div>

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3]">
            CLIENT TESTIMONIALS
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
            What Our Clients Say
          </h3>
          <p className="mt-4 text-lg text-gray-600">
            Discover how we've helped businesses navigate the complexities of Web3 and blockchain technology.
          </p>
        </div>

        <div 
          ref={testimonialsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 transition-all duration-500"
          style={{ minHeight: `${maxSectionHeight}px` }}
        >
          {activeTestimonials.map((testimonialIndex, position) => (
            <TestimonialCard
              key={`${testimonialIndex}-${position}`}
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

        {/* CTA Section with Particles */}
        <div ref={sectionRef} className="mt-16 relative overflow-hidden">
          {/* Particles */}
          <ParticleEffect particles={particles} />
          
          {/* CTA Content */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16 p-6 md:p-7 rounded-lg backdrop-blur-sm transition-all duration-300 bg-white/20 border border-white/70 relative z-10">
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Ready to Transform Your Business?</h3>
              <p className="text-gray-600">Let's discuss how we can help you navigate the Web3 landscape.</p>
            </div>
            
            <a 
              ref={buttonRef}
              href="/contact" 
              className="inline-flex items-center relative z-10"
            >
              <button className="bg-gradient-to-r from-[#cb46b3] to-[#9333ea] text-white px-6 py-2.5 rounded-full
                                hover:from-[#d946ef] hover:to-[#a855f7] transition-all
                                transform hover:scale-105 duration-300 text-base font-semibold">
                Get Started
              </button>
            </a>
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

export default Testimonials;
