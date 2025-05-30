
import React from "react";
import { Link } from "react-router-dom";

const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mx-auto mt-16 w-full max-w-[90vw] xl:max-w-[1200px]">
      <h1 className="font-bold leading-tight text-shadow mb-8 animate-fade-up text-balance" style={{
        animationDelay: "0.2s",
        fontSize: "clamp(1.9rem, 6vw, 4.5rem)",
        lineHeight: 1.1,
        letterSpacing: "-0.03em"
      }}>
        <span className="text-white font-bold">Simplifying Web3 Complexity</span>
      </h1>

      <h2 className="text-white/80 animate-fade-up relative mb-8 text-balance" style={{
        animationDelay: "0.4s",
        fontSize: "clamp(0.9rem, 1.5vw, 1.5rem)",
        lineHeight: 1.25,
        fontWeight: 400,
        maxWidth: "40rem"
      }}>
        The consultancy that bridges traditional business expertise with Web3 innovation - whether you're entering, investing in, or optimizing for{" "}
        <Link to="/services" className="text-pink-400 hover:text-pink-300 underline transition-colors">
          blockchain technology
        </Link>
      </h2>

      {/* Quick navigation links */}
      <div className="flex flex-wrap justify-center gap-4 mt-6 animate-fade-up" style={{ animationDelay: "0.6s" }}>
        <Link 
          to="/services" 
          className="text-white/70 hover:text-white text-sm transition-colors border-b border-transparent hover:border-white/50"
        >
          Our Services
        </Link>
        <Link 
          to="/team" 
          className="text-white/70 hover:text-white text-sm transition-colors border-b border-transparent hover:border-white/50"
        >
          Expert Team
        </Link>
        <Link 
          to="/testimonials" 
          className="text-white/70 hover:text-white text-sm transition-colors border-b border-transparent hover:border-white/50"
        >
          Success Stories
        </Link>
        <Link 
          to="/contact" 
          className="text-white/70 hover:text-white text-sm transition-colors border-b border-transparent hover:border-white/50"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroContent;
