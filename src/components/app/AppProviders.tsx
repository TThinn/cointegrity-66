
import React from "react";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  console.log('🔍 AppProviders rendering');
  
  return (
    <div className="app-providers-wrapper">
      {children}
    </div>
  );
};
