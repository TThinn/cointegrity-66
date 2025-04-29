import React, { useState, useEffect, useRef } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const Testimonials = () => {
  const [activeTestimonials, setActiveTestimonials] = useState<number[]>([0, 1, 2, 3]);
  const [changingIndex, setChangingIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track maximum section height to prevent layout shifts
  const [maxSectionHeight, setMaxSectionHeight] = useState<number>(0);

  const testimonials = [{
    id: 1,
    quote: "Torstein Thinn was instrumental in identifying the challenges posed by cryptocurrencies and establishing what became the world's first dedicated crypto task force. I have come to know him as a positive, solution-oriented leader, and his collaborative approach both internally and externally positioned Norway as a global pioneer in the tax treatment of digital assets. Overall his personality matched well with my vision for the Tax administration, to be a Digital Innovator",
    name: "Hans Christian Holte",
    title: "Former Director of the Norwegian Tax Administration, currently Labour and Welfare Director (NAV)"
  }, {
    id: 2,
    quote: "Working with Cointegrity has been transformative for our business growth. Their guidance helped us navigate the future of finance with confidence.",
    name: "Sarah Johnson",
    title: "Founder of TechBridge"
  }, {
    id: 3,
    quote: "Torstein Thinn played a pivotal role in automating and streamlining AKJ's trading and systems processes, significantly enhancing scalability and operational efficiency. His expertise contributed to AKJ's continued success as a global leader in turnkey solutions for fund setup across crypto and traditional markets.",
    name: "Anders Kvamme Jensen",
    title: "Founder and Chairman, AKJ group"
  }, {
    id: 4,
    quote: "Cointegrity's tokenomics design transformed our project, creating a sustainable model aligned with the future of finance that's attracted significant investment and user growth.",
    name: "Michelle Park",
    title: "Co-founder of TokenWave"
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

  // Record and maintain maximum section height to prevent layout shifts
  useEffect(() => {
    const calculateMaxHeight = () => {
      if (testimonialsGridRef.current) {
        const currentHeight = testimonialsGridRef.current.offsetHeight;
        // Keep track of the maximum height we've seen
        setMaxSectionHeight(prev => Math.max(prev, currentHeight));
      }
    };
    
    // Calculate on mount and whenever window resizes
    calculateMaxHeight();
    window.addEventListener('resize', calculateMaxHeight);
    
    return () => {
      window.removeEventListener('resize', calculateMaxHeight);
    };
  }, []);
  
  // Recalculate max height when testimonials change
  useEffect(() => {
    if (testimonialsGridRef.current) {
      const currentHeight = testimonialsGridRef.current.offsetHeight;
      setMaxSectionHeight(prev => Math.max(prev, currentHeight));
    }
  }, [activeTestimonials]);
  
  useEffect(() => {
    let currentBoxIndex = 0;
    
    const rotateTestimonial = () => {
      // Set which box is changing
      setChangingIndex(currentBoxIndex);
      
      // Make it disappear
      setIsVisible(false);
      
      // After it disappears, change the content
      setTimeout(() => {
        setActiveTestimonials(prev => {
          const newTestimonials = [...prev];
          
          // Find a testimonial that's not currently displayed
          const currentlyDisplayed = new Set(prev);
          let nextTestimonialIndex;
          do {
            nextTestimonialIndex = Math.floor(Math.random() * testimonials.length);
          } while (currentlyDisplayed.has(nextTestimonialIndex));
          
          newTestimonials[currentBoxIndex] = nextTestimonialIndex;
          return newTestimonials;
        });
        
        // Make it reappear
        setTimeout(() => {
          setIsVisible(true);
          
          // After transition completes, check if we need to update max height
          setTimeout(() => {
            if (testimonialsGridRef.current) {
              const currentHeight = testimonialsGridRef.current.offsetHeight;
              setMaxSectionHeight(prev => Math.max(prev, currentHeight));
            }
          }, 300);
          
          // Move to next box for next interval
          currentBoxIndex = (currentBoxIndex + 1) % 4;
        }, 100); // Very short delay before reappearing
      }, 300); // Time while card is invisible
    };
    
    // Start the rotation
    const interval = setInterval(rotateTestimonial, 4000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-14 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#133a63]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3]">CLIENT TESTIMONIALS</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">You will be in good company</h3>
            <p className="text-white/60 max-w-2xl mx-auto">Experiences from working with Cointegrity or our Co-Founders in reshaping the industry</p>
          </div>

          {/* Fixed height wrapper to prevent layout shifts */}
          <div 
            className="transition-all duration-300" 
            style={{ minHeight: `${maxSectionHeight}px` }}
          >
            <div 
              ref={testimonialsGridRef}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
            >
              {[0, 1, 2, 3].map((position) => (
                <div
                  key={position}
                  className={`glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg transition-all duration-300 ${
                    changingIndex === position && !isVisible 
                      ? 'opacity-0 transform scale-95' 
                      : 'opacity-100 transform scale-100'
                  }`}
                >
                  <div className="text-left">
                    <p className="text-white/80 text-sm mb-6">"{testimonials[activeTestimonials[position]].quote}"</p>
                    <div>
                      <p className="text-white font-semibold">{testimonials[activeTestimonials[position]].name}</p>
                      <p className="text-white/60 text-xs">{testimonials[activeTestimonials[position]].title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Button placement with consistent spacing */}
          <div className="mt-5 text-center animate-fade-up">
            <a href="#contact">
              <Button variant="cta-primary" size="md">Partner with us</Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
