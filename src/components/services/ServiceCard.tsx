
import React from "react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
  isDarkBackground?: boolean;
}

const ServiceCard = ({ 
  icon, 
  title, 
  items, 
  color, 
  isDarkBackground = false 
}: ServiceCardProps) => {
  return (
    <div 
      className={`p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 ${isDarkBackground ? 'bg-white/15' : 'bg-white/20'}`}
      style={{
        animationDelay: `0.1s`,
        boxShadow: isDarkBackground 
          ? "0 4px 15px rgba(0, 0, 0, 0.1)" 
          : "0 4px 15px rgba(0, 0, 0, 0.05)",
        border: isDarkBackground 
          ? "1px solid rgba(255, 255, 255, 0.15)" 
          : "1px solid rgba(255, 255, 255, 0.7)"
      }}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
          style={{ background: `linear-gradient(135deg, ${color}${isDarkBackground ? '30' : '20'}, ${color}${isDarkBackground ? '50' : '40'})` }}>
        {icon}
      </div>
      <h3 className={`text-[clamp(0.9rem,0.85rem+0.25vw,1.1rem)] font-semibold mb-3 ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}>
        {title}
      </h3>
      <ul className={`text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] list-none ${isDarkBackground ? 'text-gray-200' : 'text-gray-600'}`}>
        {items.map((item, itemIndex) => (
          <li key={itemIndex} className="flex items-start mb-[0.35rem]">
            <span style={{ color }} className="mr-2">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
