
import React from "react";
import { ProcessStep as ProcessStepType } from "./processData";

interface ProcessStepProps {
  step: ProcessStepType;
  index: number;
  isDarkBackground?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ 
  step, 
  index, 
  isDarkBackground = true 
}) => {
  return (
    <div 
      className={`p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 ${
        isDarkBackground ? 'bg-white/10' : 'bg-white/20'
      }`}
      style={{
        animationDelay: `${0.1 + index * 0.1}s`,
        boxShadow: isDarkBackground ? "0 4px 15px rgba(0, 0, 0, 0.1)" : "0 4px 15px rgba(0, 0, 0, 0.05)",
        border: isDarkBackground ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.7)"
      }}
    >
      <div 
        className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
        style={{
          background: `linear-gradient(135deg, rgba(203, 70, 179, 0.2), rgba(203, 70, 179, 0.3))`
        }}
      >
        {step.icon}
      </div>
      <h3 className={`text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 ${
        isDarkBackground ? 'text-white' : 'text-gray-800'
      }`}>
        {step.title}
      </h3>
      <p className={`text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] ${
        isDarkBackground ? 'text-gray-200' : 'text-gray-600'
      }`}>
        {step.description}
      </p>
    </div>
  );
};

export default ProcessStep;
