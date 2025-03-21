
import React from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButton";
import { ArrowRight, ExternalLink } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden grid-pattern bg-[#080112]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-sm font-medium">
                <span className="text-blue-400 mr-2">•</span>
                <span className="text-white/80">Web3 Strategy & Implementation</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <span className="text-gradient">Bridging</span>
              <span className="block mt-3 text-white"> the gap between</span>
              <span className="block mt-3 text-gradient">Web2 & Web3</span>
            </h1>
            
            <p className="mt-8 text-lg text-white/60 max-w-md text-balance animate-fade-up" style={{ animationDelay: "0.3s" }}>
              We guide businesses through the complex Web3 landscape with expert strategic consulting and seamless implementation services.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-5 animate-fade-up" style={{ animationDelay: "0.4s" }}>
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
          
          <div className="relative flex justify-center items-center animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="w-full h-full max-w-lg relative animate-float">
              <img
                src="/lovable-uploads/10635277-352f-4e7e-a485-44cecd080a67.png"
                alt="Digital knowledge representation with glowing book"
                className="w-full h-auto object-cover z-10 relative rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg mix-blend-overlay"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-[-30px] right-[-30px] w-[150px] h-[150px] bg-blue-500/20 rounded-full blur-[50px] animate-pulse"></div>
              <div className="absolute bottom-[-20px] left-[-20px] w-[120px] h-[120px] bg-purple-500/20 rounded-full blur-[40px] animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>
          </div>
        </div>
          
        <div className="mt-20 md:mt-32 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up text-center" style={{ animationDelay: "0.6s" }}>
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
    </section>
  );
};

export default Hero;
