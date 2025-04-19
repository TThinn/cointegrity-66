
import React from "react";
import Container from "./ui/Container";
import { MapPin, Zap, Shield, Award } from "lucide-react";
import Button from "./ui/CustomButtonComponent";

const processSteps = [
  {
    id: 1,
    icon: <MapPin className="text-blue-400 w-8 h-8" />,
    title: "Discover",
    description:
      "We start with a comprehensive session to understand your objectives and challenges. Our team assesses your position, market opportunities, and competitive landscape to set a strong foundation."
  },
  {
    id: 2,
    icon: <Zap className="text-blue-400 w-8 h-8" />,
    title: "Strategize",
    description:
      "We develop a tailored roadmap aligned with your goals, including tokenomics, compliance planning, and strategic positioning to maximize your impact in Web3."
  },
  {
    id: 3,
    icon: <Shield className="text-blue-400 w-8 h-8" />,
    title: "Implement",
    description:
      "Our team guides you through execution, ensuring compliance and optimal token architecture. We provide hands-on support and leverage our network to bring your vision to life."
  },
  {
    id: 4,
    icon: <Award className="text-blue-400 w-8 h-8" />,
    title: "Scale",
    description:
      "We help accelerate growth through capital raising, community building, and ongoing optimization, with continuous guidance to adapt to regulatory changes and new opportunities."
  }
];

const Process = () => (
  <section id="process" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-blue-600/10 to-blue-900/20"></div>
      <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
    </div>

    <Container>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-sm text-blue-400 uppercase tracking-wider font-medium">OUR PROCESS</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">Your Journey to Web3 Success</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            A structured approach to transform your business focusing on delivering maximum value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className="group relative process-card p-8 rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] overflow-visible bg-white/5"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Number circle, half outside the box */}
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#000624] to-[#121c36] flex items-center justify-center border border-blue-400/30 z-10">
                <span className="text-blue-400 font-bold">{step.id}</span>
              </div>

              <div className="mb-4 transition-transform duration-300 group-hover:scale-110 transform-gpu">
                {step.icon}
              </div>

              <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
              <p className="text-white/70 text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 contact-card backdrop-blur-md bg-white/10 rounded-xl">
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-white mb-2">Ready to get your project in motion?</h4>
            <p className="text-white/80">Our experts are ready to guide you through the next steps of your Web3 journey.</p>
          </div>
          <div>
            <a href="#contact" className="micro-interaction">
              <Button
                variant="cta-primary"
                size="md"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
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
