
import React from "react";
import { ParticleType } from "../testimonials/types";

interface CTAParticleEffectProps {
  particles: ParticleType[];
}

const CTAParticleEffect: React.FC<CTAParticleEffectProps> = ({ particles }) => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-x-hidden">
      {particles.map((p, i) => (
        <div
          key={`cta-particle-${i}`}
          className="absolute rounded-full blur-[12px] animate-light-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            left: `${p.x}%`,
            top: `${p.y}%`,
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

export default CTAParticleEffect;
