import React, { useLayoutEffect, useRef, useState } from "react";
import Container from "./ui/Container";
import Button from "./ui/CustomButtonComponent";

const HERO_PARTICLE_COUNT_DESKTOP = 10;
const HERO_PARTICLE_COUNT_MOBILE = 3;

const Hero = () => {
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Pre-calculate all particle positions and properties ONCE
  const particles = useRef(Array.from({
    length: HERO_PARTICLE_COUNT_DESKTOP
  }, () => ({
    size: Math.random() * 300,
    x: 10 + Math.random() * 90,
    y: 10 + Math.random() * 90,
    moveX: (Math.random() - 0.5) * 300, // Allows movement in both directions
    moveY: (Math.random() - 0.5) * 300,
    rotate: Math.random() * 360,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 40
  }))).current;

  // Synchronous device detection BEFORE first paint
  useLayoutEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? HERO_PARTICLE_COUNT_MOBILE : HERO_PARTICLE_COUNT_DESKTOP);
      if (!isReady) setIsReady(true);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady]);

  // Don't render particles until device type is known
  if (particleCount === null) return null;
  
  return (
    <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom right, #010822 0%, #133a63 100%)"
          }}
        />
        {/* Particle Container with transition */}
        <div className={`absolute inset-0 z-[1] pointer-events-none transition-opacity duration-700 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
          {particles.slice(0, particleCount).map((p, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full blur-[25px] animate-light-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: 'rgba(51,195,240,0.4)',
                left: `${p.x}%`,
                top: `${p.y}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
                ['--move-x' as string]: `${p.moveX}vw`,
                ['--move-y' as string]: `${p.moveY}vh`,
                ['--rotate' as string]: `${p.rotate}deg`
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
      
     {/* Content container */}
<Container className="hero-content relative z-8 text-lg font-normal flex flex-col min-h-[70vh] justify-between">
<div className="flex flex-col items-center text-center mx-auto mt-16 w-full max-w-[90vw] xl:max-w-[1200px]">
<h1 className="font-bold leading-tight text-shadow mb-4 animate-fade-up text-balance" style={{
animationDelay: "0.2s",
fontSize: "clamp(1.9rem, 6vw, 4.5rem)",
lineHeight: 1.1,
letterSpacing: "-0.03em"
}}>
<span className="text-white font-extrabold">Simplifying Web3 Complexity</span>
</h1>

<h2 className="text-white/80 animate-fade-up relative mb-8 text-balance" style={{
animationDelay: "0.4s",
fontSize: "clamp(0.9rem, 1.5vw, 1.5rem)",
lineHeight: 1.25,
fontWeight: 400,
maxWidth: "40rem"
}}>
We provide Full-cycle Web3 Consulting Solutions at the Intersection of Blockchain, Ai, Gaming, Tax & Compliance.
</h2>
</div>

{/* CTA Button */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-4" style={{
animationDelay: "0.5s"
}}>
<Button variant="cta-primary" className="floating-element w-full sm:w-auto" href="#contact">
Get in Touch
</Button>
</div>

{/* Stats grid */}
<div className="mt-24 border-t border-white/10 pt-4 grid grid-cols-2 md:grid-cols-4 gap-10 animate-fade-up text-center" style={{
animationDelay: "0.6s"
}}>
{[{
number: "45+",
label: "Years Experience"
}, {
number: "15+",
label: "Project Jurisdictions"
}, {
number: "20+",
label: "Enterprise Clients"
}, {
number: "40+",
label: "Projects Delivered"
}].map((stat, i) => <div key={`stat-${i}`}>
<h3 className="text-3xl md:text-4xl font-bold text-white">{stat.number}</h3>
<p className="text-white/60 text-sm mt-1">{stat.label}</p>
</div>)}
</div>
</Container>

{/* Global animations */}
<style>
{`
@keyframes light-particle {
0%, 100% {
opacity: 0.4;
transform: translate(0, 0) scale(1) rotate(0);
}
50% {
opacity: 0.8;
transform:
translate(var(--move-x), var(--move-y))
scale(1.5)
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
</section>
);
};

export default Hero;
