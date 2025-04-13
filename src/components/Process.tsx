
import React from "react";
import Container from "./ui/Container";
import { ArrowRight, CheckCircle, MapPin, Zap, Shield, Award } from "lucide-react";
import Button from "./ui/CustomButtonComponent";

const Process = () => {
  const processSteps = [{
    id: 1,
    icon: <MapPin className="text-pink-400 w-8 h-8" />,
    title: "Discover",
    description: "We begin with a comprehensive discovery session to understand your business objectives, challenges, and vision for the future of finance.",
    details: "Our experts assess your current position, market opportunities, and competitive landscape to establish a strategic foundation."
  }, {
    id: 2,
    icon: <Zap className="text-pink-400 w-8 h-8" />,
    title: "Strategize",
    description: "Building on our findings, we develop a tailored roadmap that aligns with your goals and the evolving future of finance.",
    details: "This includes tokenomics design, regulatory compliance planning, and strategic positioning to maximize your impact in Web3."
  }, {
    id: 3,
    icon: <Shield className="text-pink-400 w-8 h-8" />,
    title: "Implement",
    description: "Our team guides you through the execution phase, ensuring MiCA compliance and optimal token architecture for the future of finance.",
    details: "We provide hands-on support, leveraging our network of partners and technical expertise to bring your vision to life."
  }, {
    id: 4,
    icon: <Award className="text-pink-400 w-8 h-8" />,
    title: "Scale",
    description: "With a solid foundation in place, we help you accelerate growth through capital raising, community building, and ongoing optimization.",
    details: "Your success in the future of finance is our priority, with continuous guidance to adapt to regulatory changes and market opportunities."
  }];

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#fbf9ff] to-[#fdf5fa]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-pink-600/10 to-purple-900/20"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"></div>
      </div>
      
      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm text-pink-600 uppercase tracking-wider font-medium">OUR PROCESS</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">Your Journey to Web3 Success</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">A structured approach to transform your business focusing on delivering maximum value</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="process-card group relative backdrop-blur-md p-8 transition-all duration-500 hover:scale-[1.02]" 
                style={{
                  animationDelay: `${0.1 + index * 0.1}s`
                }}
              >
                <div className="process-number">
                  <span className="text-pink-400 font-bold">{step.id}</span>
                </div>
                
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110 transform-gpu">
                  {step.icon}
                </div>
                
                <h4 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h4>
                <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
                <p className="text-gray-500 text-xs">{step.details}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-pink-400/50 group-hover:text-pink-400 transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="neo-box flex flex-col md:flex-row items-center justify-between gap-8 p-8 backdrop-blur-md relative">
            <div className="text-center md:text-left relative z-10">
              <h4 className="text-xl font-bold text-gray-800 mb-2">Ready to Shape the Future of Finance?</h4>
              <p className="text-gray-600">Our experts are ready to guide you through the next steps of your Web3 journey.</p>
            </div>
            
            <div className="relative z-10">
              <a href="#contact" className="micro-interaction">
                <Button variant="cta-primary" size="md" className="group relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                  <span className="relative z-10">
                    Schedule a Meetup
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Process;
