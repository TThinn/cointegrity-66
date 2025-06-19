
import React from "react";
import { ParticleType } from "./types";

interface ParticleEffectProps {
  particles: ParticleType[];
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ particles }) => {
  return (
    <>
      <div className="absolute inset-0 z-[1] pointer-events-none">
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
              '--move-x': `${p.moveX}vw`,
              '--move-y': `${p.moveY}vh`,
              '--rotate': `${p.rotate}deg`
            } as React.CSSProperties}
          />
        ))}
      </div>

      <style>
        {`
          @keyframes light-particle {
            0%, 100% { 
              opacity: 0.4;
              transform: translate(0, 0) scale(1) rotate(0);
            }
            25% {
              opacity: 0.6;
              transform: 
                translate(calc(var(--move-x) * 0.3), calc(var(--move-y) * -0.7)) 
                scale(1.2) 
                rotate(calc(var(--rotate) * 0.3));
            }
            50% { 
              opacity: 0.8;
              transform: 
                translate(var(--move-x), var(--move-y)) 
                scale(1.5) 
                rotate(calc(var(--rotate) * 0.6));
            }
            75% {
              opacity: 0.6;
              transform: 
                translate(calc(var(--move-x) * -0.3), calc(var(--move-y) * 0.7)) 
                scale(1.3) 
                rotate(var(--rotate));
            }
          }
          .animate-light-particle {
            animation: light-particle ease-in-out infinite;
            mix-blend-mode: screen;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-light-particle {
              animation: none;
              opacity: 0.3 !important;
            }
          }
        `}
      </style>
    </>
  );
};

export default ParticleEffect;
