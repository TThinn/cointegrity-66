
import React, { useEffect, useState } from "react";
import Container from "./ui/Container";
import TestimonialCard from "./testimonials/TestimonialCard";
import { useTestimonials } from "./testimonials/useTestimonials";

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);
  const {
    testimonials,
    activeTestimonials,
    changingIndex,
    isVisible,
    hoveredCard,
    handleCardMouseEnter,
    handleCardMouseLeave,
    testimonialsGridRef,
  } = useTestimonials();
  
  const sectionRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const [particles, setParticles] = useState([]);
  const [fixedSectionHeight, setFixedSectionHeight] = useState(0);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };

    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate fixed section height based on largest testimonials
  useEffect(() => {
    const calculateFixedHeight = () => {
      // Create temporary elements to measure text heights
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.visibility = 'hidden';
      tempContainer.style.width = isMobile ? '100%' : '50%';
      tempContainer.style.maxWidth = isMobile ? '640px' : '500px';
      document.body.appendChild(tempContainer);

      const cardHeights = testimonials.map(testimonial => {
        const tempCard = document.createElement('div');
        tempCard.className = 'glass bg-white/5 backdrop-blur-md border border-white/10 p-8';
        tempCard.innerHTML = `
          <div class="text-left">
            <p class="text-white/80 text-sm mb-6">"${testimonial.quote}"</p>
            <div>
              <p class="text-white font-semibold">${testimonial.name}</p>
              <p class="text-white/60 text-xs">${testimonial.title}</p>
            </div>
          </div>
        `;
        tempContainer.appendChild(tempCard);
        const height = tempCard.offsetHeight;
        tempContainer.removeChild(tempCard);
        return height;
      });

      document.body.removeChild(tempContainer);

      // Find two largest card heights
      const sortedHeights = [...cardHeights].sort((a, b) => b - a);
      const largestCardHeight = sortedHeights[0] || 200;
      const secondLargestCardHeight = sortedHeights[1] || 200;

      // Calculate total height components with proper spacing
      const sectionPaddingTop = 80; // py-20 = 5rem = 80px top
      const sectionPaddingBottom = 80; // py-20 = 5rem = 80px bottom
      
      // Header section (h2, h3, p with margins)
      const headerHeight = 200; // More realistic header height with margins
      
      // Cards container height
      const cardSpacing = 24; // Gap between cards (gap-6 = 1.5rem = 24px)
      const cardsContainerHeight = isMobile 
        ? largestCardHeight + cardSpacing + secondLargestCardHeight // Mobile: stacked
        : Math.max(largestCardHeight, secondLargestCardHeight); // Desktop: side by side
      
      // CTA section
      const ctaSpacing = 8; // 8px spacing between cards and CTA as requested
      const ctaButtonHeight = 48; // Button height
      const ctaBottomMargin = 8; // 8px from bottom
      
      const totalHeight = sectionPaddingTop + headerHeight + cardsContainerHeight + ctaSpacing + ctaButtonHeight + ctaBottomMargin + sectionPaddingBottom;
      
      console.log('Height calculation:', {
        sectionPaddingTop,
        headerHeight,
        cardsContainerHeight,
        ctaSpacing,
        ctaButtonHeight,
        ctaBottomMargin,
        sectionPaddingBottom,
        totalHeight,
        isMobile
      });
      
      setFixedSectionHeight(totalHeight);
    };

    // Calculate on mount and when screen size changes
    calculateFixedHeight();
    window.addEventListener('resize', calculateFixedHeight);
    return () => window.removeEventListener('resize', calculateFixedHeight);
  }, [isMobile, testimonials]);

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
  }, [fixedSectionHeight]);

  // Get the active testimonials to display based on mobile/desktop and available testimonials
  const testimonialsToShow = isMobile ? activeTestimonials.slice(0, 2) : activeTestimonials;

  return (
    <section 
      id="testimonials" 
      className="py-20 relative overflow-hidden" 
      ref={sectionRef}
      style={{ height: fixedSectionHeight > 0 ? `${fixedSectionHeight}px` : 'auto' }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10 h-full flex flex-col">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">Client Success Stories</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-white">Why Leading Organizations Choose Our Web3 Expertise</h3>
            <p className="mt-2 text-white/60 max-w-2xl mx-auto">Our knowledge-first approach to Web3 transformation helps organizations successfully navigate the complex decentralized landscape. With deep expertise in blockchain strategy, product development, tax compliance, and capital acceleration, our specialists bridge the gap between traditional business and Web3 innovation. As your dependable guide through complex blockchain challenges, we deliver solutions that create measurable value. Don't just take our word for it-read what our clients say about working with our team:</p>
          </div>

          <div className="flex-1 relative z-30 flex flex-col justify-between">
            <div ref={testimonialsGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {testimonialsToShow.map((testimonialIndex, position) => (
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
            
            {/* CTA Section - positioned at bottom with 8px spacing */}
            <div className="text-center relative z-20" style={{ marginTop: '8px', marginBottom: '8px' }}>
              <div className="inline-block relative">
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
                        '--move-x': `${p.moveX}vw`,
                        '--move-y': `${p.moveY}vh`,
                        '--rotate': `${p.rotate}deg`
                      } as React.CSSProperties}
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
