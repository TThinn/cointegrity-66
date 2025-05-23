
import React from "react";

const HeroStats: React.FC = () => {
  const stats = [
    { number: "45+", label: "Years Experience" },
    { number: "15+", label: "Project Jurisdictions" },
    { number: "20+", label: "Enterprise Clients" },
    { number: "40+", label: "Projects Delivered" }
  ];

  return (
    <div 
      className="mt-24 border-t border-white/10 pt-4 grid grid-cols-2 md:grid-cols-4 gap-10 animate-fade-up text-center"
      style={{ animationDelay: "0.6s" }}
    >
      {stats.map((stat, i) => (
        <div key={`stat-${i}`}>
          <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.number}</h3>
          <p className="text-white/60 text-sm mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
