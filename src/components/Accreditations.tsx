
import React from "react";
import Container from "./ui/Container";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";
const Accreditations = () => {
  // Logo placeholders with links - in a real project, you would import actual logos
  const brands = [{
    name: "Ethereum Foundation",
    id: 1,
    url: "https://ethereum.org/foundation/",
    description: "Supporting the Ethereum ecosystem"
  }, {
    name: "Polkadot Network",
    id: 2,
    url: "https://polkadot.network/",
    description: "Blockchain interoperability platform"
  }, {
    name: "Chainlink",
    id: 3,
    url: "https://chain.link/",
    description: "Decentralized oracle network"
  }, {
    name: "Avalanche",
    id: 4,
    url: "https://www.avax.network/",
    description: "Scalable blockchain platform"
  }, {
    name: "Solana",
    id: 5,
    url: "https://solana.com/",
    description: "Fast, secure, and censorship-resistant blockchain"
  }, {
    name: "Near Protocol",
    id: 6,
    url: "https://near.org/",
    description: "Climate-neutral blockchain platform"
  }, {
    name: "Polygon",
    id: 7,
    url: "https://polygon.technology/",
    description: "Ethereum scaling solutions"
  }, {
    name: "Binance",
    id: 8,
    url: "https://www.binance.com/",
    description: "Leading cryptocurrency exchange"
  }];
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
  return <section className="py-24 relative overflow-hidden bg-[#080112]">
      {/* Add background elements similar to hero section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-pink-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Trusted by Industry Leaders
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We're proud to work with pioneering companies across the blockchain and Web3 ecosystem, 
              helping them innovate and scale with confidence.
            </p>
          </div>

          {/* Auto-sliding carousel for continuous movement */}
          <div className="mb-20 overflow-hidden">
            <div className="flex animate-carousel">
              {[...brands, ...brands].map((brand, index) => <a key={`${brand.id}-${index}`} href={brand.url} target="_blank" rel="noopener noreferrer" className="flex-none mx-4 w-40">
                  <div className="glass bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-lg flex items-center justify-center h-20">
                    <span className="bg-gradient-to-br from-pink-400 to-purple-500 bg-clip-text text-transparent text-sm font-medium">{brand.name}</span>
                  </div>
                </a>)}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">Accreditations</h3>
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
