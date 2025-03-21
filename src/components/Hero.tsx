
import React from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { ChevronRight, Globe, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-white to-purple-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute w-full h-1/3 bottom-0 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-block animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
              <Zap size={14} className="mr-1" /> Web3 Consultancy
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <span className="block mb-2">Transform Your Business</span>
            <span className="text-gradient">With Web3 Innovation</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-foreground/80 max-w-2xl text-balance animate-fade-up" style={{ animationDelay: "0.3s" }}>
            We help businesses navigate the complex world of Web3 with strategic consulting and expert implementation. Turn blockchain challenges into growth opportunities.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <Button href="#contact" size="lg" isGlowing>
              Get Started
              <ChevronRight size={18} className="ml-1" />
            </Button>
            <Button href="#services" variant="outlined" size="lg">
              Explore Services
            </Button>
          </div>
          
          <div className="mt-16 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: "0.5s" }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-lg">
                  {i}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Trusted by <span className="font-semibold">25+</span> leading companies
            </div>
          </div>
          
          <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-800 text-sm">
              <Globe size={14} className="mr-2" />
              <span>Global expertise, local impact</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
