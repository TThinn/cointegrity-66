
import React from "react";
import Container from "./ui/Container";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

const Accreditations = () => {
  const brands = [
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
      name: "WEMIX",
      id: 3,
      url: "https://wemix.com/",
      description: "Blockchain gaming platform",
      logo: "/lovable-uploads/bddb4dfb-6109-4631-b67f-22640d75336f.png"
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

  const certifications = [{
    name: "Certified Blockchain Professional",
    id: 1
  }, {
    name: "Ethereum Developer Certification",
    id: 2
  }, {
    name: "Web3 Security Specialist",
    id: 3
  }, {
    name: "ISO 27001 Information Security",
    id: 4
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
            <p className="text-white/60 max-w-2xl mx-auto">
              We're proud to work with pioneering companies across the blockchain and Web3 ecosystem, 
              helping them innovate and scale with confidence.
            </p>
          </div>

          <div className="mb-20 overflow-hidden">
            <div className="flex animate-carousel-fast">
              {[...brands, ...brands].map((brand, index) => (
                <a 
                  key={`${brand.id}-${index}`} 
                  href={brand.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-none mx-4 w-60"
                >
                  <div className="flex items-center justify-center h-24">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="max-h-20 w-auto object-contain opacity-60"
                      style={{
                        maxWidth: brand.name === "EY" ? "80px" : "160px",
                      }}
                      title={brand.name}
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">Client Testimonials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map(cert => <div key={cert.id} className="glass bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center text-center p-6 animate-fade-up" style={{
              animationDelay: `${0.1 * cert.id}s`
            }}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">{cert.id}</span>
                  </div>
                  <h4 className="text-white text-lg font-medium mb-2">{cert.name}</h4>
                  <p className="text-white/60 text-sm">
                    Internationally recognized credential demonstrating expertise and best practices.
                  </p>
                </div>)}
            </div>
          </div>
        </div>
      </Container>
    </section>;
};
export default Accreditations;

