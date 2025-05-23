
import React from "react";
import { ParticleType } from "./types";

interface ParticleEffectProps {
  particles: ParticleType[];
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ particles }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={`testimonial-particle-${i}`}
          className="absolute rounded-full blur-[12px] animate-light-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            left: `${Math.max(0, Math.min(100, p.x))}%`,
            top: `${Math.max(0, Math.min(100, p.y))}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--move-x' as string]: `${p.moveX}vw`,
            ['--move-y' as string]: `${p.moveY}vh`,
            ['--rotate' as string]: `${p.rotate}deg`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
