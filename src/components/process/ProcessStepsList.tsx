
import React from "react";
import { processSteps } from "./processData";
import ProcessStep from "./ProcessStep";

interface ProcessStepsListProps {
  isDarkBackground?: boolean;
}

const ProcessStepsList: React.FC<ProcessStepsListProps> = ({ 
  isDarkBackground = true 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {processSteps.map((step, index) => (
        <ProcessStep 
          key={step.id} 
          step={step} 
          isLast={index === processSteps.length - 1}
        />
      ))}
    </div>
  );
};

export default ProcessStepsList;
