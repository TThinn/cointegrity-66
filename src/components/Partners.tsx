import React, { useState } from "react";
import Container from "./ui/Container";

const Partners = () => {
  const [pausedRow, setPausedRow] = useState(false);

  // Current partners with 3D-style interactive cards for 2025 Web3 trends
  const currentPartners = [{
    name: "Binance",
    id: 1,
    url: "https://www.binance.com/",
    description: "Leading cryptocurrency exchange",
    logo: "/lovable-uploads/2de8101e-cc87-4988-80c5-f66cb682180f.png"
  }, {
    name: "Solana",
    id: 2,
    url: "https://solana.com/",
    description: "Fast, secure, and censorship-resistant blockchain",
    logo: "/lovable-uploads/35e03803-e23e-4ae6-bd79-af9fa7db75b6.png"
  }, {
    name: "BlackRock",
    id: 3,
    url: "https://www.blackrock.com/",
    description: "Global investment management corporation",
    logo: "/lovable-uploads/eb9f6633-d391-4a4a-b623-5c220bfeeef2.png"
  }, {
    name: "Ubisoft",
    id: 4,
    url: "https://www.ubisoft.com/",
    description: "Video game publisher",
    logo: "/lovable-uploads/da17c90a-8518-4e2a-a5bc-ad3a48f2b0b5.png"
  }];

  // Previous partners/clients in a horizontal scrolling format
  const previousPartners = [{
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
    name: "EY",
    id: 4,
    url: "https://www.ey.com/",
    description: "Global professional services organization",
    logo: "/lovable-uploads/1ec5bfd8-e2e8-46c4-8b86-b6fa09a3b6e2.png"
  }];

  return <section id="partners" className="py-24 relative overflow-hidden">
      {/* Updated background to match Process section */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#133a63]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">PARTNERS</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              Building the Future Together
            </h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Collaborating with industry leaders to build the future of Web3 technologies and blockchain innovation.
            </p>
          </div>
          
          {/* Current Partners Section - Modern 3D Card Grid */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Current Partners
            </h3>
            <p className="text-white/60 max-w-2xl mb-10 mx-auto text-center">
              Strategic partnerships that enable us to provide cutting-edge blockchain and digital asset solutions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentPartners.map(partner => <a key={partner.id} href={partner.url} target="_blank" rel="noopener noreferrer" className="block group">
                  <div className="h-52 perspective-1000">
                    <div className="relative h-full w-full transition-all duration-500 transform-gpu group-hover:rotate-y-12 preserve-3d">
                      <div className="absolute inset-0 glass backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center shadow-lg transition-all">
                        <div className="p-4 flex-1 flex items-center justify-center w-full">
                          <img src={partner.logo} alt={partner.name} className="max-h-16 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-center mt-4">
                          <p className="text-white font-semibold">{partner.name}</p>
                          <p className="text-white/60 text-xs">{partner.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>)}
            </div>
          </div>
          
          {/* Previous Partners Section - Interactive Horizontal Scroll */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              Trusted by Industry Leaders
            </h3>
            <p className="text-white/60 max-w-2xl mb-10 mx-auto text-center">
              Our founders are proud to have worked at, and collaborated with these pioneering organizations, driving innovation in blockchain and digital assets.
            </p>
            
            <div className="relative overflow-hidden">
              {/* Fade left edge */}
              <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#010822] to-transparent z-10"></div>
              
              <div className={`flex ${pausedRow ? "" : "animate-carousel-rtl"}`} onMouseEnter={() => setPausedRow(true)} onMouseLeave={() => setPausedRow(false)}>
                {[...previousPartners, ...previousPartners, ...previousPartners].map((partner, index) => (
                  <div 
                    key={`${partner.id}-${index}`} 
                    className="flex-none mx-8 w-60 glass backdrop-blur-md bg-white/5 rounded-xl border border-white/10 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <a href={partner.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <div className="h-24 flex items-center justify-center mb-4">
                        <img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="max-h-16 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity" 
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium">{partner.name}</p>
                        <p className="text-white/60 text-xs">{partner.description}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              
              {/* Fade right edge */}
              <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#010822] to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>;
};

export default Partners;
