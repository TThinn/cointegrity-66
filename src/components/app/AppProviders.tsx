
import React, { useEffect, useState } from "react";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const [isReactReady, setIsReactReady] = useState(false);

  useEffect(() => {
    // Ensure React is properly initialized before rendering providers
    const checkReactReady = () => {
      if (typeof React !== 'undefined' && React.useState) {
        setIsReactReady(true);
      }
    };

    checkReactReady();
    
    // Fallback check after a short delay
    const timer = setTimeout(checkReactReady, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReactReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-providers-wrapper">
      {children}
    </div>
  );
};
