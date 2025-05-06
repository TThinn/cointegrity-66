
import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import Container from "./ui/Container";
import { Target, Layers, Scale, Rocket } from "lucide-react";

const CTA_PARTICLE_COUNT_DESKTOP = 15;
const CTA_PARTICLE_COUNT_MOBILE = 3;

const services = [{
  icon: <Target size={24} className="text-[#cb46b3]" />,
  title: "STRATEGIC POSITIONING",
  items: ["Product Market Fit", "Go-To-Market", "Messaging", "Partnerships", "Ecosystem Mapping", "Market Insight Report", "Advisory Board"],
  color: "#cb46b3"
}, {
  icon: <Layers size={24} className="text-[#cb46b3]" />,
  title: "WEB3 INFRASTRUCTURE",
  items: ["Tokenomics", "Smart Contracts", "Web3 Development", "Community Development", "Exchange Listings", "Whitepaper", "Ecosystem Audit"],
  color: "#cb46b3"
}, {
  icon: <Scale size={24} className="text-[#cb46b3]" />,
  title: "Tax & Compliance",
  items: ["MiCA", "Crypto Tax Returns", "Tax & Legal Mapping", "Banking, Accounting & Auditing", "Due Diligence Reports", "Crypto Compliance", "AML/KYC/CFT"],
  color: "#cb46b3"
}, {
  icon: <Rocket size={24} className="text-[#cb46b3]" />,
  title: "CAPITAL ACCELERATION",
  items: ["Investor Network Access", "Investor Relations Support", "Market Making", "Grants", "Pitch Coaching", "Collateral", "Data Room"],
  color: "#cb46b3"
}];

const Services = () => {
  const isDarkBackground = false;
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const [ctaPosition, setCtaPosition] = useState({ x: 50, y: 50 });
  const [particleCount, setParticleCount] = useState<number | null>(null);

  // Particle positioning relative to CTA section
  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current && ctaSectionRef.current) {
        const btnBox = ctaRef.current.getBoundingClientRect();
        const sectionBox = ctaSectionRef.current.getBoundingClientRect();
        
        const x = ((btnBox.left + btnBox.right)/2 - sectionBox.left) / sectionBox.width * 100;
        const y = ((btnBox.top + btnBox.bottom)/2 - sectionBox.top) / sectionBox.height * 100;

        setCtaPosition({ x, y });
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
    return Array.from({ length: particleCount }, () => ({
      size: 40 + Math.random() * 120, // Increased size for better visibility
      x: ctaPosition.x - 10 + (Math.random()-0.5) * 20, // Wider spread
      y: ctaPosition.y - 4 + (Math.random()-0.5) * 20, // Wider spread
      moveX: (Math.random() - 0.5) * 20, // Increased movement
      moveY: (Math.random() - 0.5) * 25, // Increased movement
      rotate: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      color: [
        'rgba(225,29,143,0.7)',  // Pink - increased opacity
        'rgba(147,51,234,0.5)',   // Purple - increased opacity
      ][Math.floor(Math.random() * 2)]
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

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3]">Our Services</h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">Serving a Diversified Market</h3>
          <p className="mt-4 text-lg text-gray-600">
            Our clients are spread across various industries and sectors, including governmental agencies, global consulting firms, launch platforms, gaming companies, VASPs, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 ${isDarkBackground ? 'bg-white/15' : 'bg-white/20'}`}
              style={{
                animationDelay: `${0.1 + index * 0.1}s`,
                boxShadow: isDarkBackground 
                  ? "0 4px 15px rgba(0, 0, 0, 0.1)" 
                  : "0 4px 15px rgba(0, 0, 0, 0.05)",
                border: isDarkBackground 
                  ? "1px solid rgba(255, 255, 255, 0.15)" 
                  : "1px solid rgba(255, 255, 255, 0.7)"
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" 
                  style={{ background: `linear-gradient(135deg, ${service.color}${isDarkBackground ? '30' : '20'}, ${service.color}${isDarkBackground ? '50' : '40'})` }}>
                {service.icon}
              </div>
              <h3 className={`text-[clamp(0.9rem,0.85rem+0.25vw,1.1rem)] font-semibold mb-3 ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}>
                {service.title}
              </h3>
              <ul className={`text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] list-none ${isDarkBackground ? 'text-gray-200' : 'text-gray-600'}`}>
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start mb-[0.35rem]">
                    <span style={{ color: service.color }} className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section with Particles - Updated to match service card styles */}
        <div 
          ref={ctaSectionRef}
          className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-lg backdrop-blur-sm transition-all duration-300 bg-white/20 border border-white/70"
          style={{ 
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Content */}
          <div className="flex-1 text-center md:text-left relative z-10">
            <h3 className="text-2xl font-bold mb-3 text-gray-800">Bring Substance to Your Digital Asset Strategy</h3>
          </div>
          
          {/* Button Container with particles */}
          <div className="relative z-10" style={{ height: "120px" }}>
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {particles.map((p, i) => (
                <div
                  key={`cta-particle-${i}`}
                  className="absolute rounded-full blur-[16px] animate-light-particle"
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
            
            {/* Button - Styled like in AboutUs */}
            <a 
              href="#contact" 
              className="inline-flex items-center relative z-10 mt-10"
              ref={ctaRef}
            >
              <button className="bg-black/5 backdrop-blur-md text-white px-6 py-3 rounded-full
                           border border-black/10 hover:bg-black/15 transition-all
                           transform hover:scale-105 duration-300 text-base font-semibold
                           shadow-lg">
                Let's get started
              </button>
            </a>
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
    </section>
  );
};

export default Services;
