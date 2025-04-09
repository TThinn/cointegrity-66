import React from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const Hero = () => {
  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#080112] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] to-[#312E81]"></div>

        {/* Dynamic light particles */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-[150px] h-[150px] rounded-full blur-[50px] animate-light-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
                background: `rgba(225,29,143,0.4)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Existing content container */}
      <Container className="hero-content relative z-10 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-16">
          <h1 className="text-[36px] lg:text-[56px] tracking-tight text-balance animate-fade-up mb-8 font-normal leading-tight text-shadow" style={{ animationDelay: "0.2s" }}>
            <span className="text-white/80" data-text="Strategic Web3 Advisory for" style={{ backgroundPosition: "center center" }}>Strategic Web3 Advisory for</span>{" "}
            <span className="text-white floating-element" data-text="Tokenomics" style={{ animationDelay: "2s" }}>Tokenomics</span>{" "}
            <span className="text-white/80" data-text="&" style={{ backgroundPosition: "center center" }}>&</span>{" "}
            <span className="text-white floating-element" data-text="Regulatory" style={{ animationDelay: "2.3s" }}>Regulatory</span>{" "}
            <span className="text-white floating-element" data-text="Compliance" style={{ animationDelay: "2.6s" }}>Compliance</span>
          </h1>

          {/* Accent line */}
          <div style={{ animationDelay: "0.25s" }} className="w-[120px] h-[1px] mb-8 animate-fade-up bg-pink-500"></div>

          <h2 className="text-lg max-w-2xl text-balance animate-fade-up relative mb-16 text-white/80" style={{ animationDelay: "0.4s" }}>
            We simplify complexity and amplify impact, enabling you to focus on delivering maximum value to your stakeholders.
          </h2>
        </div>

        {/* Buttons and stats sections */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-20" style={{ animationDelay: "0.5s" }}>
          <Button variant="cta-primary" className="floating-element w-full sm:w-auto" href="#contact" transitionDuration="5s" style={{ animationDelay: "3s" }}>
            Talk to an expert
          </Button>
        </div>

        <div className="mt-4 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up text-center" style={{ animationDelay: "0.6s" }}>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">45+</h3>
            <p className="text-white/60 text-sm mt-1">Years Experience</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">15+</h3>
            <p className="text-white/60 text-sm mt-1">Project Jurisdictions</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">20+</h3>
            <p className="text-white/60 text-sm mt-1">Enterprise Clients</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">40+</h3>
            <p className="text-white/60 text-sm mt-1">Projects Delivered</p>
          </div>
        </div>
      </Container>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes light-particle {
          0% {
            opacity: 0.4;
            transform: scale(1) translate(0, 0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5) translate(
              ${Math.random() * 50 - 25}px,
              ${Math.random() * 50 - 25}px
            );
          }
          100% {
            opacity: 0.4;
            transform: scale(1) translate(0, 0);
          }
        }

        .animate-light-particle {
          animation: light-particle infinite ease-in-out;
          mix-blend-mode: screen;
        }

        /* Performance optimization */
        @media (prefers-reduced-motion: reduce) {
          .animate-light-particle {
            animation: none;
            opacity: 0.3 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
