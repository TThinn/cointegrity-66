
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

interface SafeRouterProps {
  children: React.ReactNode;
}

export const SafeRouter: React.FC<SafeRouterProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure DOM is fully ready before initializing router
    if (document.readyState === 'complete') {
      setIsReady(true);
    } else {
      const handleLoad = () => setIsReady(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#010822] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return <BrowserRouter>{children}</BrowserRouter>;
};
