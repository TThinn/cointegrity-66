import React from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButton";
import { ArrowRight, ExternalLink } from "lucide-react";
const Hero = () => {
  return <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden grid-pattern bg-[#080112]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-up" style={{
            animationDelay: "0.2s"
          }}>
              <span className="text-gradient">Making Web3 for</span>
              <span className="block mt-3 text-white">Real business</span>
              <span className="block mt-3 text-gradient text-3xl">Strategy, Tokenomics &amp; Compliance</span>
            </h1>
            
            <p className="mt-8 text-lg text-white/60 max-w-md text-balance animate-fade-up" style={{
            animationDelay: "0.3s"
          }}>We simplify complexity and amplify impact, enabling you to focus on delivering maximum value to your stakeholders.</p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-5 animate-fade-up" style={{
            animationDelay: "0.4s"
          }}>
              <Button href="#contact" size="lg" isGlowing>
                Talk to an expert
                <ArrowRight size={16} className="ml-1" />
              </Button>
              <Button href="#services" variant="outlined" size="lg">
                Our services
                <ExternalLink size={16} className="ml-1" />
              </Button>
            </div>
          </div>
          
          
        </div>
          
        <div className="mt-20 md:mt-32 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up text-center" style={{
        animationDelay: "0.6s"
      }}>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">5+</h3>
            <p className="text-white/60 text-sm mt-1">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">$100M+</h3>
            <p className="text-white/60 text-sm mt-1">Assets Managed</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">25+</h3>
            <p className="text-white/60 text-sm mt-1">Enterprise Clients</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">60+</h3>
            <p className="text-white/60 text-sm mt-1">Projects Delivered</p>
          </div>
        </div>
      </Container>
    </section>;
};
export default Hero;