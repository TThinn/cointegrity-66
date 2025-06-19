
import React from "react";
import { validateReactImport } from "@/utils/reactValidation";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  // Validate React in this component
  React.useEffect(() => {
    try {
      validateReactImport();
      console.log('✅ AppProviders React validation passed');
    } catch (error) {
      console.error('❌ AppProviders React validation failed:', error);
    }
  }, []);

  return (
    <div className="app-providers-wrapper">
      {children}
    </div>
  );
};
