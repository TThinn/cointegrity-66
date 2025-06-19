
import React from 'react';
import { TooltipProvider } from '@radix-ui/react-tooltip';

interface SafeTooltipProviderProps {
  children: React.ReactNode;
}

/**
 * Safe wrapper for TooltipProvider
 */
const SafeTooltipProvider: React.FC<SafeTooltipProviderProps> = ({ children }) => {
  return (
    <TooltipProvider delayDuration={300}>
      {children}
    </TooltipProvider>
  );
};

export default SafeTooltipProvider;
