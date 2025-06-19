
import React from "react";
import LightParticles from "./LightParticles";

interface SafeLightParticlesProps {
  centerPosition?: { x: number; y: number };
}

const SafeLightParticles: React.FC<SafeLightParticlesProps> = (props) => {
  try {
    return <LightParticles {...props} />;
  } catch (error) {
    console.warn('SafeLightParticles rendering error:', error);
    return null;
  }
};

export default SafeLightParticles;
