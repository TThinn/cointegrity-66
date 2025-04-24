import React from "react";
import Container from "./ui/Container";
import { MapPin, Zap, Shield, Award } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
const processSteps = [{
  id: 1,
  icon: <MapPin className="text-[#3d6b9c] w-8 h-8" />,
  title: "Discover",
  description: "We start with a comprehensive session to understand your objectives and challenges. Our team assesses your position, market opportunities, and competitive landscape to set a strong foundation."
}, {
  id: 2,
  icon: <Zap className="text-[#3d6b9c] w-8 h-8" />,
  title: "Strategize",
  description: "We develop a tailored roadmap aligned with your goals, including tokenomics, compliance planning, and strategic positioning to maximize your impact in Web3."
}, {
  id: 3,
  icon: <Shield className="text-[#3d6b9c] w-8 h-8" />,
  title: "Implement",
  description: "Our team guides you through execution, ensuring compliance and optimal token architecture. We provide hands-on support and leverage our network to bring your vision to life."
}, {
  id: 4,
  icon: <Award className="text-[#3d6b9c] w-8 h-8" />,
  title: "Scale",
  description: "We help accelerate growth through capital raising, community building, and ongoing optimization, with continuous guidance to adapt to regulatory changes and new opportunities."
}];
const Process = () => <section id="process" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#133a63]"></div>
      <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
    </div>

    <Container>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-sm uppercase tracking-wider font-medium text-[#cb46b3]">OUR PROCESS</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">Your Journey to Web3 Success</h3>
          <p className="text-white/60 max-w-2xl mx-auto">
            A structured approach to transform your business focusing on delivering maximum value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {processSteps.map((step, index) => <div key={step.id} className="group relative process-card p-8 rounded-xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] overflow-visible bg-[#133a63]/20 hover:bg-[#133a63]/30" style={{
          animationDelay: `${0.1 + index * 0.1}s`,
          borderStyle: "solid",
          borderWidth: "1px",
          borderImage: "linear-gradient(135deg, #010822 0%, transparent 40%, transparent 60%, #133a63 100%) 1"
        }}>
              <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-[#010822] to-[#0a1a3a] flex items-center justify-center border border-[#3d6b9c]/30 z-10">
                <span className="text-[#3d6b9c] font-bold">{step.id}</span>
              </div>

              <div className="mb-4 transition-transform duration-300 group-hover:scale-110 transform-gpu">
                {step.icon}
              </div>

              <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
              <p className="text-white/70 text-sm">{step.description}</p>
            </div>)}
        </div>

        
      </div>
    </Container>
  </section>;
export default Process;