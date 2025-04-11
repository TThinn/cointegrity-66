
import React, { useState } from "react";
import Container from "./ui/Container";

const Partners = () => {
  const currentPartners = [
    {
      name: "Skatteetaten",
      id: 1,
      url: "https://www.skatteetaten.no/",
      description: "Norwegian Tax Administration",
      logo: "/lovable-uploads/4e30abfb-11f1-481b-bafe-4d8600b829c4.png"
    },
    {
      name: "Access Industries",
      id: 2,
      url: "https://www.accessindustries.com/",
      description: "Global investment company",
      logo: "/lovable-uploads/62662510-6939-4c52-9dc2-269ee8e747bc.png"
    },
    {
      name: "Binance",
      id: 4,
      url: "https://www.binance.com/",
      description: "Leading cryptocurrency exchange",
      logo: "/lovable-uploads/2de8101e-cc87-4988-80c5-f66cb682180f.png"
    },
    {
      name: "Solana",
      id: 5,
      url: "https://solana.com/",
      description: "Fast, secure, and censorship-resistant blockchain",
      logo: "/lovable-uploads/35e03803-e23e-4ae6-bd79-af9fa7db75b6.png"
    }
  ];
  
  const previousPartners = [
    {
      name: "WEMIX",
      id: 3,
      url: "https://wemix.com/",
      description: "Blockchain gaming platform",
      logo: "/lovable-uploads/bddb4dfb-6109-4631-b67f-22640d75336f.png"
    },
    {
      name: "EY",
      id: 6,
      url: "https://www.ey.com/",
      description: "Global professional services organization",
      logo: "/lovable-uploads/1ec5bfd8-e2e8-46c4-8b86-b6fa09a3b6e2.png"
    },
    {
      name: "Ubisoft",
      id: 7,
      url: "https://www.ubisoft.com/",
      description: "Video game publisher",
      logo: "/lovable-uploads/da17c90a-8518-4e2a-a5bc-ad3a48f2b0b5.png"
    },
    {
      name: "BlackRock",
      id: 8,
      url: "https://www.blackrock.com/",
      description: "Global investment management corporation",
      logo: "/lovable-uploads/eb9f6633-d391-4a4a-b623-5c220bfeeef2.png"
    }
  ];

  return (
    <section id="partners" className="py-24 relative overflow-hidden bg-[#0a0118]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">Partners</h2>
            <div className="w-[120px] h-[1px] mx-auto mb-6 bg-pink-500"></div>
            <p className="text-white/60 max-w-2xl mx-auto">Building the future of Web3 with leading organizations across the blockchain ecosystem.</p>
          </div>

          {/* Current Partners - Modern 3D Card Grid Layout */}
          <div className="mb-24">
            <h3 className="text-sm text-pink-400 uppercase tracking-wider font-medium text-center mb-10">Current Partners</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {currentPartners.map(partner => (
                <a 
                  key={partner.id} 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 p-6 flex items-center justify-center h-32 md:h-40 transition-all duration-500 hover:shadow-xl hover:shadow-pink-500/5 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-16 w-auto object-contain transition-all duration-500 group-hover:scale-110" 
                    style={{ 
                      maxWidth: partner.name === "EY" ? "80px" : "160px",
                      height: "auto" 
                    }} 
                    title={partner.name}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2 -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-medium text-center">{partner.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Past Partners - Interactive Horizontal Scrolling Gallery */}
          <div>
            <div className="text-center mb-10">
              <h3 className="text-sm text-pink-400 uppercase tracking-wider font-medium">Trusted by Industry Leaders</h3>
              <p className="text-white/60 text-sm mt-2 max-w-2xl mx-auto">We've collaborated with pioneering projects and companies across the blockchain and Web3 ecosystem.</p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
                {previousPartners.map(partner => (
                  <a 
                    key={partner.id} 
                    href={partner.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center p-4 hover:bg-white/5 rounded-lg transition-all duration-300 group"
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="max-h-12 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                      style={{ 
                        maxWidth: partner.name === "EY" ? "80px" : "140px",
                        height: "auto" 
                      }} 
                      title={partner.name}
                    />
                  </a>
                ))}
              </div>
              
              <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-pink-500/10 via-transparent to-purple-500/10"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
