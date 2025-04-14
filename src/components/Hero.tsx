import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on mount and on resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate random movement parameters and size for each particle
  const generateParticleStyle = () => {
    const size = 120 + Math.random() * 300;
    return {
      '--start-x': `${Math.random() * 100}%`,
      '--start-y': `${Math.random() * 100}%`,
      '--move-x': `${(Math.random() - 0.5) * 80}vw`,
      '--move-y': `${(Math.random() - 0.5) * 80}vh`,
      '--rotate': `${Math.random() * 360}deg`,
      width: `${size}px`,
      height: `${size}px`
    };
  };

  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#060115] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060115] to-[#060115]"></div>
        {/* Animated or static particles based on device */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {[...Array(isMobile ? 5 : 25)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full blur-[30px] ${isMobile ? "" : "animate-light-particle"}`}
              style={{
                ...generateParticleStyle(),
                background: `rgba(225,29,143,0.3)`,
                left: `var(--start-x)`,
                top: `var(--start-y)`,
                ...(isMobile
                  ? { opacity: 0.4 + Math.random() * 0.4 }
                  : {
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${10 + Math.random() * 15}s`
                    })
              }}
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <Container className="hero-content relative z-8 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mt-16">
          <h1
            className="text-[40px] lg:text-[60px] tracking-tight text-balance animate-fade-up mb-8 font-bold leading-tight text-shadow"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-white font-extrabold">Simplifying Web3 Complexity</span>
          </h1>

          {/* Accent line */}
          <div
            className="w-[120px] h-[1px] mb-8 animate-fade-up bg-pink-500"
            style={{ animationDelay: "0.25s" }}
          ></div>

          <h2
            className="text-lg max-w-2xl text-balance animate-fade-up relative mb-16 text-white/80"
            style={{ animationDelay: "0.4s" }}
          >
            We provide Full-cycle Web3 Consulting Solutions at the Intersection of Blockchain, Ai, Gaming, Tax & Compliance.
          </h2>
        </div>

        {/* CTA Button */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-20"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            variant="cta-primary"
            className="floating-element w-full sm:w-auto"
            href="#contact"
            transitionDuration="5s"
            style={{ animationDelay: "3s" }}
          >
            Connect With Us
          </Button>
        </div>

        {/* Stats grid */}
        <div
          className="mt-4 border-t border-white/10 pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-up text-center"
          style={{ animationDelay: "0.6s" }}
        >
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

      {/* Global animations */}
      <style>
        {`
        @keyframes light-particle {
          0% {
            opacity: 0.4;
            transform: translate(0, 0) scale(1) rotate(0);
          }
          50% {
            opacity: 0.8;
            transform:
              translate(var(--move-x), var(--move-y))
              scale(1.5)
              rotate(var(--rotate));
          }
          100% {
            opacity: 0.4;
            transform: translate(0, 0) scale(1) rotate(0);
          }
        }

        .animate-light-particle {
          animation: light-particle ease-in-out infinite;
          mix-blend-mode: screen;
          will-change: transform, opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-light-particle {
            animation: none;
            opacity: 0.3 !important;
          }
        }
        `}
      </style>
    </section>
  );
};

export default Hero;
