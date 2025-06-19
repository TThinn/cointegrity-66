
import React from "react";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <div className="app-providers-wrapper">
      {children}
    </div>
  );
};
