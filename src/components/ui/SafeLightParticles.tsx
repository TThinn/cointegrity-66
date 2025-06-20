
import React from "react";
import LightParticles from "./LightParticles";

interface SafeLightParticlesProps {
  centerPosition?: { x: number; y: number };
}

// Simplified - just pass through to LightParticles
const SafeLightParticles: React.FC<SafeLightParticlesProps> = (props) => {
  return <LightParticles {...props} />;
};

export default SafeLightParticles;
