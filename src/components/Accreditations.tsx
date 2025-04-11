
import React, { useState } from "react";
import Container from "./ui/Container";
const Accreditations = () => {
  const [pausedRow1, setPausedRow1] = useState(false);
  const [pausedRow2, setPausedRow2] = useState(false);
  const brands = [{
    name: "Skatteetaten",
    id: 1,
    url: "https://www.skatteetaten.no/",
    description: "Norwegian Tax Administration",
    logo: "/lovable-uploads/4e30abfb-11f1-481b-bafe-4d8600b829c4.png"
  }, {
    name: "Access Industries",
    id: 2,
    url: "https://www.accessindustries.com/",
    description: "Global investment company",
    logo: "/lovable-uploads/62662510-6939-4c52-9dc2-269ee8e747bc.png"
  }, {
    name: "WEMIX",
    id: 3,
    url: "https://wemix.com/",
    description: "Blockchain gaming platform",
    logo: "/lovable-uploads/bddb4dfb-6109-4631-b67f-22640d75336f.png"
  }, {
    name: "Binance",
    id: 4,
    url: "https://www.binance.com/",
    description: "Leading cryptocurrency exchange",
    logo: "/lovable-uploads/2de8101e-cc87-4988-80c5-f66cb682180f.png"
  }, {
    name: "Solana",
    id: 5,
    url: "https://solana.com/",
    description: "Fast, secure, and censorship-resistant blockchain",
    logo: "/lovable-uploads/35e03803-e23e-4ae6-bd79-af9fa7db75b6.png"
  }, {
    name: "EY",
    id: 6,
    url: "https://www.ey.com/",
    description: "Global professional services organization",
    logo: "/lovable-uploads/1ec5bfd8-e2e8-46c4-8b86-b6fa09a3b6e2.png"
  }, {
    name: "Ubisoft",
    id: 7,
    url: "https://www.ubisoft.com/",
    description: "Video game publisher",
    logo: "/lovable-uploads/da17c90a-8518-4e2a-a5bc-ad3a48f2b0b5.png"
  }, {
    name: "BlackRock",
    id: 8,
    url: "https://www.blackrock.com/",
    description: "Global investment management corporation",
    logo: "/lovable-uploads/eb9f6633-d391-4a4a-b623-5c220bfeeef2.png"
  }];
  const testimonials = [{
    id: 1,
    quote: "We're grateful for Cointegrity's support in securing grants and connecting us with top blockchain partners. Their expertise unlocked opportunities we couldn't access alone.",
    name: "Josh Wilson",
    title: "CEO of Reload Games"
  }, {
    id: 2,
    quote: "Working with Cointegrity has been transformative for our business growth. Their guidance and network were invaluable for our Web3 strategy implementation.",
    name: "Sarah Johnson",
    title: "Founder of TechBridge"
  }, {
    id: 3,
    quote: "Torstein Thinn played a pivotal role in automating and streamlining AKJ's trading and systems processes, significantly enhancing scalability and operational efficiency. His expertise contributed to AKJ's continued success as a global leader in turnkey solutions for fund setup across crypto and traditional markets.",
    name: "Anders Kvamme Jensen",
    title: "Founder and Chairman, AKJ group"
  }, {
    id: 4,
    quote: "Cointegrity's tokenomics design transformed our project, creating a sustainable model that's attracted significant investment and user growth.",
    name: "Michelle Park",
    title: "Co-founder of TokenWave"
  }, {
    id: 5,
    quote: "The strategic positioning advice we received from Cointegrity was instrumental in differentiating our product in a crowded market.",
    name: "Alex Rivera",
    title: "Head of Strategy at Web3 Solutions"
  }, {
    id: 6,
    quote: "Their regulatory navigation expertise saved us countless hours and potential pitfalls as we expanded into European markets under MiCA.",
    name: "Elena Kovacs",
    title: "Legal Director at DeFi Protocol"
  }, {
    id: 7,
    quote: "The capital acceleration program connected us with perfect investors who understood our vision and provided more than just funding.",
    name: "Thomas Wright",
    title: "CEO of MetaVerse Platforms"
  }, {
    id: 8,
    quote: "Cointegrity's team demonstrated exceptional knowledge of both traditional finance and blockchain technology, bridging gaps we couldn't on our own.",
    name: "Jennifer Liu",
    title: "VP of Operations at Crypto Exchange"
  }];
  return <section id="testimonials" className="py-24 relative overflow-hidden bg-[#080112]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm text-pink-400 uppercase tracking-wider font-medium">Testimonials</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Trusted by Industry Leaders
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">We are proud to have worked with pioneering projects and companies across the blockchain and Web3 ecosystem, helping them innovate and scale with confidence.</p>
          </div>

          {/* Static Brand Grid */}
          <div className="mb-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
              {brands.map(brand => <a key={brand.id} href={brand.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-24 w-full hover:opacity-80 transition-opacity">
                  <img src={brand.logo} alt={brand.name} className="max-h-20 w-auto object-contain opacity-60" style={{
                maxWidth: brand.name === "EY" ? "80px" : "160px",
                height: "auto",
                verticalAlign: "middle"
              }} title={brand.name} />
                </a>)}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-white text-center">Client Testimonials</h3>
            
            {/* Testimonials Carousel - First row (right to left) */}
            <div className="relative mb-10 overflow-hidden">
              {/* Fade left edge */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#080112] to-transparent z-10"></div>
              
              <div className={`flex ${pausedRow1 ? "" : "animate-carousel-rtl"}`} onMouseEnter={() => setPausedRow1(true)} onMouseLeave={() => setPausedRow1(false)}>
                {[...testimonials, ...testimonials].slice(0, 10).map((testimonial, index) => <div key={`row1-${testimonial.id}-${index}`} className="flex-none w-[500px] mx-4 glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg cursor-pointer transition-transform hover:-translate-y-1 duration-300" onClick={() => setPausedRow1(!pausedRow1)}>
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
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#080112] to-transparent z-10"></div>
            </div>
            
            {/* Testimonials Carousel - Second row (left to right) */}
            <div className="relative overflow-hidden">
              {/* Fade left edge */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#080112] to-transparent z-10"></div>
              
              <div className={`flex ${pausedRow2 ? "" : "animate-carousel-ltr"}`} onMouseEnter={() => setPausedRow2(true)} onMouseLeave={() => setPausedRow2(false)}>
                {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4)].map((testimonial, index) => <div key={`row2-${testimonial.id}-${index}`} className="flex-none w-[500px] mx-4 glass bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-lg cursor-pointer transition-transform hover:-translate-y-1 duration-300" onClick={() => setPausedRow2(!pausedRow2)}>
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
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#080112] to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>;
};
export default Accreditations;
