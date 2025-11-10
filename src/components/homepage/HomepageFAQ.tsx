import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Container from "@/components/ui/Container";

const CTA_PARTICLE_COUNT_DESKTOP = 12;
const CTA_PARTICLE_COUNT_MOBILE = 5;

const faqs = [
  {
    question: "What makes Cointegrity different from other Web3 consultancies?",
    answer: "We combine deep regulatory expertise with cutting-edge AI technology to deliver 10x faster compliance solutions. Our team has 20+ years of experience and we're the only consultancy offering AI-powered MiCA compliance automation."
  },
  {
    question: "How long does Web3 implementation typically take?",
    answer: "Traditional consulting takes 6-18 months. Our AI-powered approach reduces this to 2-6 months for most projects, with MiCA compliance delivered in as little as 3-4 months depending on jurisdiction."
  },
  {
    question: "Do I need a MiCA license for my crypto business?",
    answer: (
      <>
        If you operate in or target EU markets, issue crypto-assets, or provide crypto services like custody, trading, or portfolio management, you likely need MiCA compliance. Our AI screening tool at{" "}
        <a 
          href="https://micahub.net" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#cb46b3] hover:underline"
        >
          Micahub.net
        </a>{" "}
        can determine your exact requirements in minutes.
      </>
    )
  },
  {
    question: "What's included in your Web3 consulting process?",
    answer: "We provide end-to-end support including digital strategy, tokenomics design, regulatory compliance, smart contract development, go-to-market strategy, and investor relations. Each engagement is tailored to your specific needs."
  },
  {
    question: "How do you handle regulatory compliance across different jurisdictions?",
    answer: "We have expertise across all 27 EU member states and maintain updated regulatory frameworks. Our AI-powered platform continuously monitors regulatory changes and updates compliance requirements in real-time."
  },
  {
    question: "Can you help with both technical and legal aspects of Web3?",
    answer: "Yes, we provide comprehensive support covering technical development, legal compliance, business strategy, and market entry. Our multidisciplinary team includes developers, economists, AI specialists, and industry experts."
  }
];

const HomepageFAQ = () => {
  const [openItems, setOpenItems] = React.useState<number[]>([]);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const ctaSectionRef = useRef<HTMLDivElement | null>(null);
  const [ctaPosition, setCtaPosition] = useState({
    x: 50,
    y: 50,
  });
  const [particleCount, setParticleCount] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Particle positioning relative to CTA section
  useLayoutEffect(() => {
    const updateCtaPosition = () => {
      if (ctaRef.current && ctaSectionRef.current) {
        const btnBox = ctaRef.current.getBoundingClientRect();
        const sectionBox = ctaSectionRef.current.getBoundingClientRect();
        const x =
          (((btnBox.left + btnBox.right) / 2 - sectionBox.left) /
            sectionBox.width) *
          100;
        const y =
          (((btnBox.top + btnBox.bottom) / 2 - sectionBox.top) /
            sectionBox.height) *
          100;
        setCtaPosition({
          x,
          y,
        });
      }
    };
    const timeout = setTimeout(updateCtaPosition, 100);
    window.addEventListener("resize", updateCtaPosition);
    return () => {
      window.removeEventListener("resize", updateCtaPosition);
      clearTimeout(timeout);
    };
  }, []);

  // Particle configuration
  const particles = useMemo(() => {
    if (!particleCount) return [];
    return Array.from(
      {
        length: particleCount,
      },
      () => ({
        size: 40 + Math.random() * 120,
        x: ctaPosition.x - 10 + (Math.random() - 0.5) * 15,
        y: ctaPosition.y - 10 + (Math.random() - 0.5) * 15,
        moveX: (Math.random() - 0.5) * 20,
        moveY: (Math.random() - 0.5) * 25,
        rotate: Math.random() * 360,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 12,
        color: [
          "rgba(225,29,143,0.7)",
          "rgba(147,51,234,0.5)",
        ][Math.floor(Math.random() * 2)],
      }),
    );
  }, [ctaPosition, particleCount]);

  // Responsive particle count
  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    setParticleCount(
      isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP,
    );
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(
        isMobile ? CTA_PARTICLE_COUNT_MOBILE : CTA_PARTICLE_COUNT_DESKTOP,
      );
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  if (particleCount === null) return null;

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-20 relative overflow-hidden mesh-gradient">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3] mb-4">
            Frequently Asked Questions
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
            Everything You Need to Know About Our Web3 Services
          </h3>
          <p className="text-gray-300">
            Get answers to common questions about our consulting process, timelines, and expertise.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
            >
              <CollapsibleTrigger className="w-full text-left p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h4>
                  <ChevronDown 
                    className={`h-5 w-5 text-[#cb46b3] transition-transform duration-300 flex-shrink-0 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-6 bg-white/5 backdrop-blur-sm rounded-b-lg border-x border-b border-white/10 -mt-1">
                <div className="pt-4 border-t border-white/10">
                  <div className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-300 mb-4">
            Still have questions? We're here to help.
          </p>
          <div
            ref={ctaSectionRef}
            className="relative flex justify-center mt-8 mb-6"
            style={{
              height: "120px",
            }}
          >
            {/* Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-visible z-0">
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
                    ["--move-x" as string]: `${p.moveX}vw`,
                    ["--move-y" as string]: `${p.moveY}vh`,
                    ["--rotate" as string]: `${p.rotate}deg`,
                  }}
                />
              ))}
            </div>

            {/* Button */}
            <a
              href="#contact"
              className="inline-flex items-center z-10 relative"
              ref={ctaRef}
            >
              <button
                className={`px-6 py-3 rounded-full text-white
                border transition-all transform hover:scale-105 duration-300 text-base font-semibold shadow-lg
                ${
                  isMobile
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 border-pink-500/30 hover:from-pink-600 hover:to-purple-700"
                    : "bg-black/15  border-black/10 hover:bg-black/25"
                }`}
              >
                Contact Our Experts
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

export default HomepageFAQ;