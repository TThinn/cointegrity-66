import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import Container from "./ui/Container";
const CTA_PARTICLE_COUNT_DESKTOP = 20;
const CTA_PARTICLE_COUNT_MOBILE = 4;
const testimonials = [{
  id: 1,
  quote: "Torstein Thinn was instrumental in identifying the challenges posed by cryptocurrencies and establishing what became the world's first dedicated crypto task force. I have come to know him as a positive, solution-oriented leader, and his collaborative approach both internally and externally positioned Norway as a global pioneer in the tax treatment of digital assets. Overall his personality matched well with my vision for the Tax administration, to be a Digital Innovator",
  name: "Hans Christian Holte",
  title: "Former Director of the Norwegian Tax Administration, currently Labour and Welfare Director (NAV)"
}, {
  id: 2,
  quote: "I've known Ruben for years and he is without a doubt one of the most ethical and hard working people I am proud to call a friend. His devotion to his craft and perfecting it is unmatched, and his pursuit of perfecting the client experience is at the highest level. He's taken several orgs from the ground up and helped shape their path to success, and I look forward to watching the continued growth of Cointegrity",
  name: "Anthony Gonzalez or 'Tony'",
  title: "Founder of WebThree Consulting"
}, {
  id: 3,
  quote: "Torstein Thinn played a pivotal role in automating and streamlining AKJ's trading and systems processes, significantly enhancing scalability and operational efficiency. His expertise contributed to AKJ's continued success as a global leader in turnkey solutions for fund setup across crypto and traditional markets.",
  name: "Anders Kvamme Jensen",
  title: "Founder and Chairman, AKJ group"
}, {
  id: 4,
  quote: "When building in Web3, it's not just about who you know, but who believes in you and opens the right doors. Ruben from the Cointegrity team didn't just show up with advice, he rolled up his sleeves and helped. The moment he joined, he helped us find partners, navigate early-stage challenges, and make introductions that led to real opportunities. His team was outstanding as well, a group of professionals with deep expertise in fundraising, growth, legal and ecosystem development. They didn't just talk, they delivered.",
  name: "Jamie Batzorig",
  title: "Co-founder of iAgent"
}, {
  id: 5,
  quote: "The strategic positioning advice we received from Cointegrity was instrumental in differentiating our product in the evolving future of finance landscape.",
  name: "Alex Rivera",
  title: "Head of Strategy at Web3 Solutions"
}, {
  id: 6,
  quote: "Their regulatory navigation expertise in MiCA compliance saved us countless hours and potential pitfalls as we expanded into European markets, cementing our position in the future of finance.",
  name: "Elena Kovacs",
  title: "Legal Director at DeFi Protocol"
}, {
  id: 7,
  quote: "The capital acceleration program connected us with perfect investors who understood our vision for the future of finance and provided more than just funding.",
  name: "Thomas Wright",
  title: "CEO of MetaVerse Platforms"
}, {
  id: 8,
  quote: "Cointegrity's team demonstrated exceptional knowledge of both traditional finance and blockchain technology, bridging gaps in the future of finance that we couldn't on our own.",
  name: "Jennifer Liu",
  title: "VP of Operations at Crypto Exchange"
}];
const Testimonials = () => {
  const [activeTestimonials, setActiveTestimonials] = useState<number[]>([0, 1, 2, 3]);
  const [changingIndex, setChangingIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [ctaPosition, setCtaPosition] = useState({
    x: 50,
    y: 50
  });
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [maxSectionHeight, setMaxSectionHeight] = useState<number>(0);

  // Define the spread value
  const spread = 20; // This controls how far particles can spread from the center point

  useLayoutEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current && sectionRef.current) {
        const btnBox = buttonRef.current.getBoundingClientRect();
        const sectionBox = sectionRef.current.getBoundingClientRect();
        const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;
        setCtaPosition({
          x,
          y
        });
      }
    };
    const timeout = setTimeout(updateButtonPosition, 100);
    window.addEventListener('resize', updateButtonPosition);
    return () => {
      window.removeEventListener('resize', updateButtonPosition);
      clearTimeout(timeout);
    };
  }, []);
  const particles = useMemo(() => {
    if (!particleCount) return [];
    return Array.from({
      length: particleCount
    }, () => ({
      size: 30 + Math.random() * 180,
      x: ctaPosition.x - 15 + Math.random() * 20,
      y: ctaPosition.y - spread * 1.4 + Math.random() * (2 * spread),
      moveX: (Math.random() - 0.5) * 20,
      moveY: (Math.random() - 0.5) * 30,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 40,
      color: ['rgba(225,29,143,0.9)', 'rgba(147,51,234,0.6)', 'rgba(255,255,255,0.15)'][Math.floor(Math.random() * 3)]
    }));
  }, [ctaPosition, particleCount]);
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
  useEffect(() => {
    const calculateMaxHeight = () => {
      if (testimonialsGridRef.current) {
        const currentHeight = testimonialsGridRef.current.offsetHeight;
        setMaxSectionHeight(prev => Math.max(prev, currentHeight));
      }
    };
    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    return () => window.removeEventListener('resize', calculateMaxHeight);
  }, []);
  useEffect(() => {
    if (testimonialsGridRef.current) {
      const currentHeight = testimonialsGridRef.current.offsetHeight;
      setMaxSectionHeight(prev => Math.max(prev, currentHeight));
    }
  }, [activeTestimonials]);

  // Modified rotation logic with pause functionality
  useEffect(() => {
    let currentBoxIndex = 0;
    const rotateTestimonial = () => {
      // Skip rotation if paused
      if (isPaused) return;
      setChangingIndex(currentBoxIndex);
      setIsVisible(false);
      setTimeout(() => {
        setActiveTestimonials(prev => {
          const newTestimonials = [...prev];
          const currentlyDisplayed = new Set(prev);
          let nextTestimonialIndex;
          do {
            nextTestimonialIndex = Math.floor(Math.random() * testimonials.length);
          } while (currentlyDisplayed.has(nextTestimonialIndex));
          newTestimonials[currentBoxIndex] = nextTestimonialIndex;
          return newTestimonials;
        });
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => {
            if (testimonialsGridRef.current) {
              const currentHeight = testimonialsGridRef.current.offsetHeight;
              setMaxSectionHeight(prev => Math.max(prev, currentHeight));
            }
          }, 300);
          currentBoxIndex = (currentBoxIndex + 1) % 4;
        }, 100);
      }, 300);
    };
    rotationIntervalRef.current = setInterval(rotateTestimonial, 4000);
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [testimonials.length, isPaused]);

  // Card hover handlers
  const handleCardMouseEnter = (position: number) => {
    setHoveredCard(position);
    setIsPaused(true);
  };
  const handleCardMouseLeave = () => {
    setHoveredCard(null);
    setIsPaused(false);
  };
  return <section id="testimonials" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">CLIENT TESTIMONIALS</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-white">Why Work With Us</h3>
            <p className="mt-2 text-white/60 max-w-2xl mx-auto">We believe in a knowledge-first approach to Web3 transformation. We fully understand that navigating the decentralized landscape is a critical strategic challenge for any organization. Our team of specialists brings deep expertise across strategy, product development, tax & compliance, and capital acceleration - delivering solutions that bridge the gap between traditional business and web3 innovation, acting as a dependable guide through your complex Web3 challenges. Don't just take our word for it, here are some testimonials from people we have worked with:</p>
          </div>

          {/* Added relative positioning and z-index to ensure proper stacking context */}
          <div className="transition-all duration-300 relative z-30" style={{
          minHeight: `${maxSectionHeight}px`
        }}>
            <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[0, 1, 2, 3].map(position => <div key={position} className={`glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg transition-all duration-300 relative z-30 ${changingIndex === position && !isVisible ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'} ${hoveredCard === position ? 'transform -translate-y-2 shadow-xl border-white/20' : ''}`} onMouseEnter={() => handleCardMouseEnter(position)} onMouseLeave={handleCardMouseLeave}>
                  <div className="text-left">
                    <p className="text-white/80 text-sm mb-6">"{testimonials[activeTestimonials[position]].quote}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonials[activeTestimonials[position]].name}</p>
                      <p className="text-white/60 text-xs">{testimonials[activeTestimonials[position]].title}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          
          {/* Keep the original bottom spacing */}
          <div className="mt-5 -mb-4 text-center relative z-20">
            <div className="inline-block relative">
              <div className="absolute -inset-8 z-10 pointer-events-none">
                {particles.map((p, i) => <div key={`testimonial-particle-${i}`} className="absolute rounded-full blur-[12px] animate-light-particle" style={{
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
              }} />)}
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
    </section>;
};
export default Testimonials;
