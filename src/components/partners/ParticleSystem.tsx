import React, { useMemo } from "react";

interface Particle {
  size: number;
  x: number;
  y: number;
  moveX: number;
  moveY: number;
  rotate: number;
  delay: number;
  duration: number;
  color: string;
}

interface ParticleSystemProps {
  position: { x: number; y: number };
  count: number;
  showShadow?: boolean;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  position,
  count,
  showShadow = false
}) => {
  const particles = useMemo((): Particle[] => {
    return Array.from({ length: count }, () => ({
      size: 20 + Math.random() * 80,
      x: position.x - 4 + (Math.random() - 0.5) * 12,
      y: position.y - 4 + (Math.random() - 0.5) * 12,
      moveX: (Math.random() - 0.5) * 10,
      moveY: (Math.random() - 0.5) * 14,
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: ['rgba(225,29,143,0.9)', 'rgba(147,51,234,0.6)', 'rgba(255,255,255,0.15)'][
        Math.floor(Math.random() * 3)
      ]
    }));
  }, [position, count]);

  if (showShadow) {
    return (
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-visible">
        {particles.map((p, i) => (
          <div
            key={`shadow-particle-${i}`}
            className="absolute rounded-full blur-[25px] animate-light-particle"
            style={{
              width: `${p.size * 1.5}px`,
              height: `${p.size * 1.5}px`,
              background: p.color.replace(/[^,]+(?=\))/, '0.15'),
              left: `calc(${p.x}% - ${p.size * 0.25}px)`,
              top: `calc(${p.y}% - ${p.size * 0.25}px)`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--move-x' as string]: `${p.moveX}vw`,
              ['--move-y' as string]: `${p.moveY}vh`,
              ['--rotate' as string]: `${p.rotate}deg`,
              opacity: 0.4,
              mixBlendMode: 'screen'
            }}
          />
        ))}
      </div>
    );
  }

  return (
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
            ['--move-x' as string]: `${p.moveX}vw`,
            ['--move-y' as string]: `${p.moveY}vh`,
            ['--rotate' as string]: `${p.rotate}deg`
          }}
        />
      ))}
    </div>
  );
};