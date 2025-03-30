
import React from "react";
import Container from "./ui/Container";
import { Button } from "./ui/button";

const Hero = () => {
  return <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden grid-pattern bg-[#080112]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container className="relative z-10 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-16">
          <h1 className="text-[36px] lg:text-[56px] tracking-tight text-balance animate-fade-up mb-8 font-normal leading-tight" style={{
          animationDelay: "0.2s"
        }}>
            <span className="gradient-word" data-text="Strategic Web3 Advisory for" style={{
              backgroundImage: "linear-gradient(90deg, rgba(7, 1, 27, 0.4) 0%, rgba(7, 1, 27, 0.05) 50%, rgba(7, 1, 27, 0.4) 100%)",
              backgroundSize: "100% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>Strategic Web3 Advisory for</span>
            <span className="ml-2 text-white">Tokenomics</span> 
            <span className="gradient-word mx-2" data-text="&" style={{
              backgroundImage: "linear-gradient(90deg, rgba(7, 1, 27, 0.4) 0%, rgba(7, 1, 27, 0.05) 50%, rgba(7, 1, 27, 0.4) 100%)",
              backgroundSize: "100% 100%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}>&</span> 
            <span className="text-white">Regulatory Compliance</span>
          </h1>
          
          {/* Accent line */}
          <div style={{
          animationDelay: "0.25s"
        }} className="w-[120px] h-[1px] mb-14 animate-fade-up bg-pink-500"></div>
          
          <p className="text-lg max-w-2xl text-balance animate-fade-up text-white mb-20" 
             style={{
               animationDelay: "0.4s",
             }}>
            We simplify complexity and amplify impact, enabling you to focus on delivering maximum value to your stakeholders.
          </p>
        </div>
          
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-12" style={{
        animationDelay: "0.5s"
      }}>
          <Button size="lg" className="bg-gradient-to-r from-pink-600 via-pink-500 to-[#483AA7] hover:opacity-90 text-white px-6 py-3 h-12 rounded-lg shadow-button w-full sm:w-auto" asChild>
            <a href="#contact">
              Talk to an expert
            </a>
          </Button>
          <Button variant="outline" size="lg" className="border border-pink-600 text-pink-600 hover:bg-pink-500/10 px-6 py-3 h-12 rounded-lg bg-transparent w-full sm:w-auto" asChild>
            <a href="#services">
              Our services
            </a>
          </Button>
        </div>
          
        <div className="mt-4 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up text-center" style={{
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
