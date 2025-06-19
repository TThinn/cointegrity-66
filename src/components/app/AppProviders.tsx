
import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <TooltipProvider delayDuration={300}>
      {children}
    </TooltipProvider>
  );
};
