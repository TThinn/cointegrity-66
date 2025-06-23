
import React from "react";

const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mx-auto w-full max-w-[90vw] xl:max-w-[1200px] mt-12">
      <h1 
        className="font-bold leading-tight text-shadow mb-8 animate-fade-up text-balance" 
        style={{
          animationDelay: "0.2s",
          fontSize: "clamp(1.9rem, 6vw, 4.5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.03em"
        }}
      >
        <span className="text-white font-bold">Simplifying Web3 Complexity</span>
      </h1>

      <h2 
        className="text-white/80 animate-fade-up relative mb-6 text-balance" 
        style={{
          animationDelay: "0.4s",
          fontSize: "clamp(0.9rem, 1.5vw, 1.5rem)",
          lineHeight: 1.25,
          fontWeight: 400,
          maxWidth: "40rem"
        }}
      >
        The consultancy that bridges traditional business expertise with Web3 innovation - whether you're entering, investing in, or optimizing for Web3
      </h2>
    </div>
  );
};

export default HeroContent;
