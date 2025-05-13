
import React from "react";
import { MapPin, Zap, Shield, Award } from "lucide-react";
import { ProcessStep as ProcessStepType } from "./processData";

// Create a mapping from icon names to actual icon components
const iconComponents = {
  MapPin: <MapPin className="text-[#cb46b3] w-8 h-8" />,
  Zap: <Zap className="text-[#cb46b3] w-8 h-8" />,
  Shield: <Shield className="text-[#cb46b3] w-8 h-8" />,
  Award: <Award className="text-[#cb46b3] w-8 h-8" />
};

interface ProcessStepProps {
  step: ProcessStepType;
  isLast: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, isLast }) => {
  // Get the icon component based on the icon name
  const iconElement = iconComponents[step.icon as keyof typeof iconComponents];

  return (
    <div className="flex mb-12 last:mb-0 animate-fade-up items-start">
      <div className="mr-6 flex-shrink-0">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10">
          {iconElement}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-2">{step.title}</h4>
        <p className="text-white/70 leading-relaxed">{step.description}</p>
        {!isLast && <div className="mt-8 h-8 border-l border-dashed border-white/10 ml-8"></div>}
      </div>
    </div>
  );
};

export default ProcessStep;
