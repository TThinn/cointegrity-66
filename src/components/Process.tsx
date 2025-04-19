import React from "react";
import Container from "./ui/Container";
import { MapPin, Zap, Shield, Award } from "lucide-react";
import Button from "./ui/CustomButtonComponent";

// Color definitions
const colors = {
  darkest: "#010822",
  lightest: "#133a63",
  cardBase: "#133a63",
  accent: "#3d6b9c"
};

const processSteps = [
  {
    id: 1,
    icon: <MapPin className="text-[#3d6b9c] w-8 h-8" />,
    title: "Discover",
    description: "We start with a comprehensive session to understand your objectives and challenges. Our team assesses your position, market opportunities, and competitive landscape to set a strong foundation."
  },
  // ... other process steps with same structure
];

const Process = () => (
  <section id="process" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#133a63]"></div>
      <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-[#133a63]/10 rounded-full blur-[100px]"></div>
    </div>

    <Container>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-sm text-[#3d6b9c] uppercase tracking-wider font-medium">OUR PROCESS</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">Your Journey to Web3 Success</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            A structured approach to transform your business focusing on delivering maximum value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className="group relative process-card p-8 rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] overflow-visible bg-[#133a63]/20 hover:bg-[#133a63]/30"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#010822] to-[#0a1a3a] flex items-center justify-center border border-[#3d6b9c]/30 z-10">
                <span className="text-[#3d6b9c] font-bold">{step.id}</span>
              </div>

              <div className="mb-4 transition-transform duration-300 group-hover:scale-110 transform-gpu">
                {step.icon}
              </div>

              <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
              <p className="text-white/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 contact-card backdrop-blur-md bg-[#133a63]/30 rounded-xl">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-white mb-2">Ready to get your project in motion?</h4>
            <p className="text-white/80">Our experts are ready to guide you through the next steps of your Web3 journey.</p>
          </div>
          <div>
            <a href="#contact" className="micro-interaction">
              <Button
                variant="cta-primary"
                size="md"
                className="group relative overflow-hidden bg-gradient-to-r from-[#0a1a3a] to-[#133a63] hover:from-[#133a63] hover:to-[#0a1a3a]"
              >
                <span className="relative z-10">Schedule a Meetup</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Container>
  </section>
);

export default Process;
