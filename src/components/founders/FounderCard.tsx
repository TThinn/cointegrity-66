
import React from "react";
import { Linkedin, X } from "lucide-react";
import { Founder } from "./foundersData";
import FounderDialog from "./FounderDialog";
import OptimizedImage from "../ui/OptimizedImage";

interface FounderCardProps {
  founder: Founder;
  index: number;
}

const getImageStyles = (name: string) => {
  switch (name) {
    case "Torstein W. Thinn":
      return {
        objectPosition: "center -25%",
        transform: "scale(1.7)"
      };
    case "Magnus Jones":
      return {
        objectPosition: "center top",
        transform: "scale(1.5)"
      };
    case "Feliks Olko":
      return {
        top: "35%",
        transform: "scale(1.8) translateY(0)",
        objectFit: "cover" as const
      };
    case "Ruben Junger":
      return {
        top: "40%",
        transform: "scale(1.75)",
        objectFit: "cover" as const
      };
    case "Michal A. Gromek":
      return {
        objectPosition: "center 10px",
        transform: "scale(1.6)"
      };
    case "Felix Nordén":
      return {
        objectPosition: "center 20%",
        transform: "scale(1.4)"
      };
    default:
      return {};
  }
};

const FounderCard: React.FC<FounderCardProps> = ({ founder, index }) => {
  const imageStyles = getImageStyles(founder.name);
  const isAbsolutePositioned = founder.name === "Feliks Olko" || founder.name === "Ruben Junger";

  return (
    <div className="hover:translate-y-[-4px] transition-all duration-300 h-full">
      <div 
        className="p-6 backdrop-blur-sm text-center rounded-lg bg-white/20 flex flex-col h-full"
        style={{
          animationDelay: `${0.1 + index * 0.1}s`,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.7)",
          willChange: "transform"
        }}
      >
        <div className="relative mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 overflow-hidden rounded-full mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-10 rounded-full"></div>
          <OptimizedImage 
            src={founder.image} 
            alt={founder.name} 
            className={`${isAbsolutePositioned ? 'absolute' : ''} w-full h-full`}
            style={imageStyles}
            fill={true}
            objectFit="cover"
            priority={false}
            sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, (max-width: 1024px) 112px, (max-width: 1280px) 128px, 144px"
          />
        </div>
        
        <h3 className="text-[clamp(1rem,0.9rem+0.25vw,1.2rem)] font-semibold text-gray-800">
          {founder.name}
        </h3>
        
        <div className="mt-1 text-[clamp(0.75rem,0.7rem+0.15vw,0.875rem)] font-medium text-[#cb46b3]">
          {founder.role}
        </div>
        
        <div className="mt-3 flex-grow flex flex-col">
          <p className="text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] text-gray-600 line-clamp-5">
            {founder.fullBio}
          </p>
          
          <FounderDialog founder={founder} />
        </div>
        
        <div className="mt-4 flex space-x-3 justify-center relative z-20">
          {founder.social.linkedin && (
            <a 
              href={founder.social.linkedin} 
              className="text-gray-500 hover:text-blue-600 transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
            </a>
          )}
          {founder.social.twitter && (
            <a 
              href={founder.social.twitter} 
              className="text-gray-500 hover:text-blue-600 transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <X size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default FounderCard;
