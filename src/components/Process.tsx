import React from "react";
import Container from "./ui/Container";
import { MapPin, Zap, Shield, Award } from "lucide-react";
import Button from "./ui/CustomButtonComponent";
const processSteps = [{
  id: 1,
  icon: <MapPin className="text-[#cb46b3] w-8 h-8" />,
  title: "DISCOVER",
  description: "We start with a comprehensive session to understand your objectives and challenges. Our team assesses your position, market opportunities, and competitive landscape to set a strong foundation."
}, {
  id: 2,
  icon: <Zap className="text-[#cb46b3] w-8 h-8" />,
  title: "STRATEGIZE",
  description: "We develop a tailored roadmap aligned with your goals, including tokenomics, compliance planning, and strategic positioning to maximize your impact in Web3."
}, {
  id: 3,
  icon: <Shield className="text-[#cb46b3] w-8 h-8" />,
  title: "IMPLEMENT",
  description: "Our team guides you through execution, ensuring compliance and optimal token architecture. We provide hands-on support and leverage our network to bring your vision to life."
}, {
  id: 4,
  icon: <Award className="text-[#cb46b3] w-8 h-8" />,
  title: "SCALE",
  description: "We help accelerate growth through capital raising, community building, and ongoing optimization, with continuous guidance to adapt to regulatory changes and new opportunities."
}];
const Process = () => {
  // Explicitly set this section to have a dark background
  const isDarkBackground = true;
  return <section id="process" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>

      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">OUR PROCESS</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 text-white">Your Journey to Web3 Success</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              A structured approach to transform your business focusing on delivering maximum value
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => <div key={step.id} className={`p-6 rounded-lg backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300 ${isDarkBackground ? 'bg-white/15' : 'bg-white/20'}`} style={{
            animationDelay: `${0.1 + index * 0.1}s`,
            boxShadow: isDarkBackground ? "0 4px 15px rgba(0, 0, 0, 0.1)" : "0 4px 15px rgba(0, 0, 0, 0.05)",
            border: isDarkBackground ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.7)"
          }}>
                <div className="w-12 h-12 flex items-center justify-center rounded-xl mb-4" style={{
              background: `linear-gradient(135deg, rgba(203, 70, 179, 0.2), rgba(203, 70, 179, 0.3))`
            }}>
                  {step.icon}
                </div>
                <h3 className={`text-[clamp(1.1rem,1rem+0.3vw,1.3rem)] font-semibold mb-3 ${isDarkBackground ? 'text-white' : 'text-gray-800'}`}>
                  {step.title}
                </h3>
                <p className={`text-[clamp(0.8rem,0.75rem+0.2vw,1rem)] leading-[1.3] ${isDarkBackground ? 'text-gray-200' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </div>)}
          </div>

          {/* CTA box - with same styling as cards */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-16 p-8 md:p-10 rounded-lg backdrop-blur-sm bg-white/15 relative overflow-hidden" style={{
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.15)"
        }}>
            <div className="flex-1 text-center md:text-left relative z-10">
              <h3 className="text-[clamp(1.25rem,1.1rem+0.8vw,2rem)] font-bold mb-3 text-white">Ready to get your project in motion?</h3>
            </div>
            <a href="#contact" className="inline-flex items-center relative z-10">
              <Button variant="cta-primary">Let's Roll</Button>
            </a>
          </div>
        </div>
      </Container>
    </section>;
};
export default Process;
