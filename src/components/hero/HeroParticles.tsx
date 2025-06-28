
import React, { useEffect, useRef } from 'react';

interface HeroParticlesProps {
  ctaPosition: { x: number; y: number };
}

const HeroParticles: React.FC<HeroParticlesProps> = ({ ctaPosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Light particles animation focused around CTA
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      baseOpacity: number;
    }> = [];

    // Create particles centered around CTA position
    for (let i = 0; i < 80; i++) {
      const centerX = (ctaPosition.x / 100) * canvas.width;
      const centerY = (ctaPosition.y / 100) * canvas.height;
      
      particles.push({
        x: centerX + (Math.random() - 0.5) * 400,
        y: centerY + (Math.random() - 0.5) * 400,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        baseOpacity: Math.random() * 0.4 + 0.1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Pulsing opacity
        particle.opacity = particle.baseOpacity + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;

        // Draw particle with gradient
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, 'rgba(225, 29, 143, 0.8)');
        gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.4)');
        gradient.addColorStop(1, 'rgba(147, 51, 234, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [ctaPosition]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default HeroParticles;
