
import React from "react";
import { SectionContainer } from "./ui/SectionContainer";
import OptimizedImage from "./ui/OptimizedImage";
import { partnerLogos } from "../data/partnerLogos";
import Container from "./ui/Container";

const Partners = () => {
  return (
    <section id="partners" className="py-16 bg-gradient-to-b from-[#0a0119] to-[#080112] relative">
      <Container>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">Trusted Collaborations</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold text-white mb-2">Partners & Clients</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              We've collaborated with leading organizations across various industries
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {partnerLogos.map((logo, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-3 rounded-lg h-20 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <OptimizedImage
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={60}
                  className="max-h-12 opacity-10 hover:opacity-100 transition-opacity duration-300"
                  objectFit="contain"
                  priority={index < 6} // Only prioritize the first 6 images
                  sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, (max-width: 1024px) 16vw, 10vw"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Partners;
