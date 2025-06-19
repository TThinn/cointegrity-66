
import React, { useState, useEffect } from "react";
import LightParticles from "./LightParticles";
import { useInitialization } from "../app/SafeInitializationProvider";

interface SafeLightParticlesProps {
  centerPosition?: { x: number; y: number };
}

const SafeLightParticles: React.FC<SafeLightParticlesProps> = (props) => {
  const [isComponentReady, setIsComponentReady] = useState(false);
  const { isReady: isInitReady } = useInitialization();

  useEffect(() => {
    // Wait for both initialization and component mount
    if (isInitReady) {
      const timer = setTimeout(() => {
        setIsComponentReady(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInitReady]);

  // Don't render until both initialization and component are ready
  if (!isInitReady || !isComponentReady) {
    return null;
  }

  try {
    return <LightParticles {...props} />;
  } catch (error) {
    console.warn('SafeLightParticles rendering error:', error);
    return null;
  }
};

export default SafeLightParticles;
