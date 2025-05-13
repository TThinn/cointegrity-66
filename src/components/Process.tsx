
import React from "react";
import Container from "./ui/Container";
import ProcessStepsList from "./process/ProcessStepsList";
import ProcessCTA from "./process/ProcessCTA";

const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]"></div>
        <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#0a1a3a]/10 rounded-full blur-[100px]"></div>
      </div>

      <Container>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-sm uppercase tracking-wider font-medium text-pink-400">OUR PROCESS</h2>
            <h3 className="mt-2 text-3xl md:text-4xl font-bold mb-2 text-white">Your Journey to Web3 Success</h3>
            <p className="mt-2 text-white/60 max-w-2xl mx-auto">A structured approach to transform your business, focusing on delivering maximum value</p>
          </div>

          <ProcessStepsList />
          <ProcessCTA />
        </div>
      </Container>
    </section>
  );
};

export default Process;
