
import React from "react";
import { ParticleType } from "./types";

interface ParticleEffectProps {
  particles: ParticleType[];
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ particles }) => {
  return (
    <div className="absolute -inset-8 z-10 pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={`testimonial-particle-${i}`}
          className="absolute rounded-full blur-[12px] animate-light-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--move-x': `${p.moveX}vw`,
            '--move-y': `${p.moveY}vh`,
            '--rotate': `${p.rotate}deg`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
