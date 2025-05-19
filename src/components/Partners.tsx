import React from "react";
import Container from "./ui/Container";
import { cn } from "@/lib/utils";
import { partners } from "../data/partners";
import { partnerLogos } from "../data/partnerLogos";
const Partners = () => {
  return <section id="partners" className="py-20 bg-gradient-to-b from-[#030014] to-[#02010a] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">
            Collaboration with Industry Leaders
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-white">
            Our Network
          </h3>
          <p className="mt-4 text-lg text-gray-300">
            Collaborating with industry leaders across blockchain, finance, technology, and governmental sectors to drive the future of Web3.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {partnerLogos.map((partner, index) => <a href={partner.url || "#"} target={partner.url ? "_blank" : undefined} rel={partner.url ? "noopener noreferrer" : undefined} key={index} className={cn("flex items-center justify-center p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10", "transition-all duration-300 hover:scale-105 group h-28")} title={partner.name}>
              <img src={partner.logo} alt={partner.name} className="max-w-full max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" />
            </a>)}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Want to partner with us? <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">Get in touch</a>
          </p>
        </div>
      </Container>
    </section>;
};
export default Partners;