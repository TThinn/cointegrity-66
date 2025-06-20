
import React from 'react';
import LightParticles from './LightParticles';

interface SafeLightParticlesProps {
  centerPosition: { x: number; y: number };
}

const SafeLightParticles: React.FC<SafeLightParticlesProps> = ({ centerPosition }) => {
  return <LightParticles centerPosition={centerPosition} />;
};

export default SafeLightParticles;
