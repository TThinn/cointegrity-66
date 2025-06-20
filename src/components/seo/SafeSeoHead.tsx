
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SeoHead } from "./SeoHead";

interface SafeSeoHeadProps {
  currentPath: string;
  currentHash: string;
}

export const SafeSeoHead: React.FC<SafeSeoHeadProps> = ({ currentPath, currentHash }) => {
  const [isRouterReady, setIsRouterReady] = useState(false);

  // Check if router context is available
  useEffect(() => {
    try {
      // Try to access router context
      const location = useLocation();
      setIsRouterReady(true);
    } catch (error) {
      console.warn('Router context not ready, delaying SeoHead render');
      // Retry after a short delay
      const timer = setTimeout(() => {
        setIsRouterReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Don't render until router is ready
  if (!isRouterReady) {
    return null;
  }

  return <SeoHead currentPath={currentPath} currentHash={currentHash} />;
};
