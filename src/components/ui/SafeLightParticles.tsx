
import React, { useState, useEffect } from "react";
import LightParticles from "./LightParticles";

interface SafeLightParticlesProps {
  centerPosition?: { x: number; y: number };
}

const SafeLightParticles: React.FC<SafeLightParticlesProps> = (props) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure component is mounted and ready before rendering particles
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Don't render until component is fully ready
  if (!isReady) return null;

  try {
    return <LightParticles {...props} />;
  } catch (error) {
    console.warn('SafeLightParticles rendering error:', error);
    return null;
  }
};

export default SafeLightParticles;
