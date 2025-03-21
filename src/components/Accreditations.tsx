
import React from "react";
import Container from "./ui/Container";

const Accreditations = () => {
  // Logo placeholders - in a real project, you would import actual logos
  const brands = [
    { name: "Ethereum Foundation", id: 1 },
    { name: "Polkadot Network", id: 2 },
    { name: "Chainlink", id: 3 },
    { name: "Avalanche", id: 4 },
    { name: "Solana", id: 5 },
    { name: "Near Protocol", id: 6 },
    { name: "Polygon", id: 7 },
    { name: "Binance", id: 8 },
  ];

  const certifications = [
    { name: "Certified Blockchain Professional", id: 1 },
    { name: "Ethereum Developer Certification", id: 2 },
    { name: "Web3 Security Specialist", id: 3 },
    { name: "ISO 27001 Information Security", id: 4 },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0c0218]">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Trusted by Industry Leaders
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We're proud to work with pioneering companies across the blockchain and Web3 ecosystem, 
              helping them innovate and scale with confidence.
            </p>
          </div>

          {/* Brands we work with */}
          <div className="mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 items-center justify-center">
              {brands.map((brand) => (
                <div 
                  key={brand.id} 
                  className="flex items-center justify-center h-16 px-6 animate-fade-up"
                  style={{ animationDelay: `${0.1 * brand.id}s` }}
                >
                  <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-6 rounded-lg glass-card w-full h-full flex items-center justify-center">
                    <span className="text-gradient text-lg font-semibold">{brand.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white text-center">
              Our Accreditations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="glass-card flex flex-col items-center text-center p-6 animate-fade-up"
                  style={{ animationDelay: `${0.1 * cert.id}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-4">
                    <span className="text-white text-xl font-bold">{cert.id}</span>
                  </div>
                  <h4 className="text-white text-lg font-medium mb-2">{cert.name}</h4>
                  <p className="text-white/60 text-sm">
                    Internationally recognized credential demonstrating expertise and best practices.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Accreditations;
