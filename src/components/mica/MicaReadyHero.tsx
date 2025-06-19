
import React from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/CustomButtonComponent";
import { ArrowDown } from "lucide-react";

const MicaReadyHero = () => {
  const scrollToWaitlist = () => {
    const waitlistSection = document.querySelector('[data-section="waitlist"]');
    waitlistSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <span className="text-sm font-medium text-white">🚀 Coming Soon</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            MiCA-Ready
            <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Compliance Suite
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Comprehensive compliance solutions for digital asset service providers 
            navigating the EU's Markets in Crypto-Assets (MiCA) regulation.
          </p>
          
          {/* Key benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-white mb-1">Fast Implementation</h3>
              <p className="text-sm text-white/70">Ready-to-deploy compliance framework</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-semibold text-white mb-1">Full Compliance</h3>
              <p className="text-sm text-white/70">Complete MiCA regulatory coverage</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-white mb-1">Expert Support</h3>
              <p className="text-sm text-white/70">Dedicated compliance specialists</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            variant="primary" 
            size="lg" 
            onClick={scrollToWaitlist}
            className="text-lg px-8 py-4"
          >
            Join the Waitlist
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-white/60">MiCA Requirements</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/60">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-white/60">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">30s</div>
              <div className="text-sm text-white/60">Setup Time</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default MicaReadyHero;
