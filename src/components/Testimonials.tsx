import React, { useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";
const Testimonials = () => {
  const [pausedRow1, setPausedRow1] = useState(false);
  const [pausedRow2, setPausedRow2] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const testimonials = [{
    id: 1,
    quote: "We're grateful for Cointegrity's support in securing grants and connecting us with top blockchain partners. Their expertise unlocked opportunities we couldn't access alone.",
    name: "Josh Wilson",
    title: "CEO of Reload Games"
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
  const handleTestimonialClick = testimonial => {
    setSelectedTestimonial(testimonial);
    setTimeout(() => setSelectedTestimonial(null), 3000);
  };
  return <section id="testimonials" className="py-24 relative overflow-hidden bg-[#0a0218]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm text-pink-400 uppercase tracking-wider font-medium">CLIENT TESTIMONIALS</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">You will be in good company</h3>
            <p className="text-white/60 max-w-2xl mx-auto">Experiences from working with Cointegrity or our Co-Founders in shaping the future of finance</p>
          </div>

          <div className="mb-10">
            {/* Testimonials Carousel - First row (right to left) */}
            <div className="relative mb-10 overflow-hidden">
              {/* Fade left edge */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0a0218] to-transparent z-10"></div>
              
              <div className={`flex ${pausedRow1 ? "" : "animate-carousel-rtl"}`} onMouseEnter={() => setPausedRow1(true)} onMouseLeave={() => setPausedRow1(false)}>
                {[...testimonials, ...testimonials].slice(0, 10).map((testimonial, index) => <div key={`row1-${testimonial.id}-${index}`} className={`flex-none w-[500px] mx-4 glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${selectedTestimonial?.id === testimonial.id ? 'scale-105 border-pink-400' : ''}`} onClick={() => handleTestimonialClick(testimonial)} aria-label={`Testimonial from ${testimonial.name}`}>
                    <div className="text-left">
                      <p className="text-white/80 text-sm mb-6">"{testimonial.quote}"</p>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-white/60 text-xs">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
              
              {/* Fade right edge */}
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0a0218] to-transparent z-10"></div>
            </div>
            
            {/* Testimonials Carousel - Second row (left to right) */}
            <div className="relative overflow-hidden">
              {/* Fade left edge */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0a0218] to-transparent z-10"></div>
              
              <div className={`flex ${pausedRow2 ? "" : "animate-carousel-ltr"}`} onMouseEnter={() => setPausedRow2(true)} onMouseLeave={() => setPausedRow2(false)}>
                {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4)].map((testimonial, index) => <div key={`row2-${testimonial.id}-${index}`} className={`flex-none w-[500px] mx-4 glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 ${selectedTestimonial?.id === testimonial.id ? 'scale-105 border-pink-400' : ''}`} onClick={() => handleTestimonialClick(testimonial)} aria-label={`Testimonial from ${testimonial.name}`}>
                    <div className="text-left">
                      <p className="text-white/80 text-sm mb-6">"{testimonial.quote}"</p>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-white/60 text-xs">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>)}
              </div>
              
              {/* Fade right edge */}
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0a0218] to-transparent z-10"></div>
            </div>
          </div>
          
          {/* CTA for testimonials section */}
          <div className="mt-10 text-center animate-fade-up">
            <a href="#contact">
              <Button variant="cta-primary" size="md" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                Join the Future of Finance
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>;
};
export default Testimonials;