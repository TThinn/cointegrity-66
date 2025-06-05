
import React, { forwardRef } from "react";

const HeroCTA = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div 
      ref={ref}
      className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-2"
      style={{ animationDelay: "0.5s" }}
    >
      <a href="#contact" className="inline-block">
        <button className="bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                        border border-white/20 hover:bg-white/30 transition-all
                        transform hover:scale-105 duration-300 text-lg font-semibold">
          Connect With Us
        </button>
      </a>
    </div>
  );
});

HeroCTA.displayName = "HeroCTA";

export default HeroCTA;
