
import React from "react";
import Container from "./ui/Container";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden grid-pattern bg-[#080112]">
      {/* Animated background overlay */}
      <div className="animated-bg absolute inset-0 z-0"></div>
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[100px]"></div>
      </div>
      
      <Container className="hero-content relative z-10 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-16">
          <h1 className="text-[36px] lg:text-[56px] tracking-tight text-balance animate-fade-up mb-8 font-normal leading-tight" style={{
            animationDelay: "0.2s"
          }}>
            <span className="gradient-word" data-text="Strategic Web3 Advisory for" style={{
              backgroundPosition: "center center"
            }}>Strategic Web3 Advisory for</span>
            {" "}
            <span className="text-white floating-element" data-text="Tokenomics" style={{
              animationDelay: "2s"
            }}>Tokenomics</span> {" "}
            <span className="gradient-word" data-text="&" style={{
              backgroundPosition: "center center"
            }}>&</span> {" "}
            <span className="text-white floating-element" data-text="Regulatory" style={{
              animationDelay: "2.3s"
            }}>Regulatory</span> {" "}
            <span className="text-white floating-element" data-text="Compliance" style={{
              animationDelay: "2.6s"
            }}>Compliance</span>
          </h1>
          
          {/* Accent line */}
          <div style={{
            animationDelay: "0.25s"
          }} className="w-[120px] h-[1px] mb-14 animate-fade-up bg-pink-500"></div>
          
          <p className="text-lg max-w-2xl text-balance animate-fade-up relative mb-20 text-white" 
             style={{
               animationDelay: "0.4s"
             }}>
            <span className="gradient-word" data-text="We simplify complexity and amplify impact, enabling you to focus on delivering maximum value to your stakeholders." style={{
              backgroundPosition: "center center"
            }}>We simplify complexity and amplify impact, enabling you to focus on delivering maximum value to your stakeholders.</span>
          </p>
        </div>
          
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-12" style={{
          animationDelay: "0.5s"
        }}>
          <Button size="lg" className="floating-element bg-gradient-to-r from-pink-600 via-pink-500 to-[#483AA7] hover:opacity-90 text-white px-6 py-3 h-12 rounded-lg shadow-button w-full sm:w-auto" asChild style={{
            animationDelay: "3s"
          }}>
            <a href="#contact">
              Talk to an expert
            </a>
          </Button>
          <Button variant="outline" size="lg" className="floating-element border border-pink-600 text-pink-600 hover:bg-pink-500/10 px-6 py-3 h-12 rounded-lg bg-transparent w-full sm:w-auto" asChild style={{
            animationDelay: "3.3s"
          }}>
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
    </section>
  );
};

export default Hero;
