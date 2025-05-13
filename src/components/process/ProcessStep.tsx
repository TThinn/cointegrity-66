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
const ProcessStep: React.FC<ProcessStepProps> = ({
  step,
  isLast
}) => {
  // Get the icon component based on the icon name
  const iconElement = iconComponents[step.icon as keyof typeof iconComponents];
  return <div className="neo-box p-6 animate-fade-up bg-enhanced-contrast rounded-lg hover:translate-y-[-4px] transition-all duration-300">
      <div className="mb-4 flex-shrink-0">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-[#1f2937]/60 border border-white/5">
          {iconElement}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-3">{step.title}</h4>
        <p className="text-white/90 leading-relaxed">{step.description}</p>
      </div>
    </div>;
};
export default ProcessStep;