
import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import Container from "./ui/Container";
import { Link } from "react-router-dom";
const CTA_PARTICLE_COUNT_DESKTOP = 12; // Increased from 8 to make more visible
const CTA_PARTICLE_COUNT_MOBILE = 5; // Increased from 3 to make more visible

const AboutUs = () => {
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const [ctaPosition, setCtaPosition] = useState({
    x: 50,
    y: 50
  });
  const [particleCount, setParticleCount] = useState<number | null>(null);

  // Particle positioning relative to CTA section
  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current && ctaSectionRef.current) {
        const btnBox = ctaRef.current.getBoundingClientRect();
        const sectionBox = ctaSectionRef.current.getBoundingClientRect();
        const x = ((btnBox.left + btnBox.right) / 2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) / sectionBox.height * 100;
        setCtaPosition({
          x,
          y
        });
      }
    };
    const timeout = setTimeout(updateCtaPosition, 100);
    window.addEventListener('resize', updateCtaPosition);
    return () => {
      window.removeEventListener('resize', updateCtaPosition);
      clearTimeout(timeout);
    };
  }, []);

  // Particle configuration
  const particles = useMemo(() => {
    if (!particleCount) return [];
    return Array.from({
      length: particleCount
    }, () => ({
      size: 40 + Math.random() * 120,
      // Increased max size from 80 to 120
      x: ctaPosition.x - 10 + (Math.random() - 0.5) * 15,
      // Wider spread
      y: ctaPosition.y - 10 + (Math.random() - 0.5) * 15,
      // Wider spread
      moveX: (Math.random() - 0.5) * 20,
      // Increased movement
      moveY: (Math.random() - 0.5) * 25,
      // Increased movement
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: ['rgba(225,29,143,0.6)',
      // Pink - increased opacity
      'rgba(147,51,234,0.4)' // Purple - increased opacity
      ][Math.floor(Math.random() * 4)]
    }));
  }, [ctaPosition, particleCount]);

  // Responsive particle count
  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP);
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (particleCount === null) return null;
  return <section id="about" className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative">
      <Container>
        <div className="flex flex-col md:flex-row gap-10 mb-16">
          {/* Left column */}
          <div className="w-full md:w-2/5">
            {/* Moved h2 heading here with left alignment */}
            <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3] mb-4">About Us</h2>
            
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight">
              We are an Agile and Seasoned Team of Web3 Specialists.
            </h3>

            {/* CTA with particles - moved to left column */}
            <div ref={ctaSectionRef} className="relative flex justify-center mt-8 mb-6" style={{
            height: "120px"
          }} // Added fixed height to ensure visibility
          >
              {/* Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
                {particles.map((p, i) => <div key={`cta-particle-${i}`} className="absolute rounded-full blur-[16px] animate-light-particle" // Increased blur
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
              }} />)}
              </div>

              {/* Button - using a fragment with href for simplicity with animations, but will navigate to the ID */}
              <a href="#contact" className="inline-flex items-center z-10 relative" // Added relative positioning
            ref={ctaRef}>
                <button className="bg-[#010822]/5 backdrop-blur-md text-white px-6 py-3 rounded-full
                   border border-[#010822]/10 hover:bg-[#010822]/15 transition-all
                   transform hover:scale-105 duration-300 text-base font-semibold shadow-lg">
                  Connect With Us
                </button>
              </a>
            </div>
          </div>
          
          {/* Right column */}
          <div className="w-full md:w-3/5 text-gray-600">
            <p className="mb-4">We provide comprehensive <strong>blockchain consulting</strong> and execution services, bridging the gap between traditional business and <strong>Web3 infrastructure</strong>. Our expertise spans strategic positioning, decentralized product development, go-to-market strategies, AI-powered solutions, <strong>Regulatory &amp; Tax Compliance</strong>, and growth capital - delivering solutions that simplify complexity and amplify opportunity.</p>
            <p className="mb-4">Specializing in <strong>blockchain integration</strong> and regulatory navigation, we help transform your digital vision into reality. Whether you're launching a token, building a compliant platform, or seeking funding for your <strong>Web3 initiative</strong>, our team guides you through the entire <strong>digital transformation</strong> journey.</p>
            <p>We are committed to bringing <strong>integrity and clarity</strong> to the decentralized landscape, striking the perfect balance between innovation and compliance, opportunity and security, vision and execution.</p>
          </div>
        </div>
      </Container>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes light-particle {
            0%, 100% { 
              opacity: 0.5;
              transform: translate(0, 0) scale(0.9) rotate(0);
            }
            25% {
              opacity: 0.8;
              transform: 
                translate(calc(var(--move-x) * 0.3), calc(var(--move-y) * -0.7)) 
                scale(1.2) 
                rotate(calc(var(--rotate) * 0.3));
            }
            50% { 
              opacity: 1;
              transform: 
                translate(var(--move-x), var(--move-y)) 
                scale(1.5) 
                rotate(calc(var(--rotate) * 0.6));
            }
            75% {
              opacity: 0.8;
              transform: 
                translate(calc(var(--move-x) * -0.3), calc(var(--move-y) * 0.7)) 
                scale(1.3) 
                rotate(var(--rotate));
            }
          }
          .animate-light-particle {
            animation: light-particle 10s ease-in-out infinite;
            mix-blend-mode: screen;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-light-particle {
              animation: none;
              opacity: 0.5 !important;
            }
          }
        `}
      </style>
    </section>;
};
export default AboutUs;
