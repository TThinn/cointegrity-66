
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import LightParticles from "@/components/ui/LightParticles";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

const GuidesPage = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead currentPath={location.pathname} currentHash={location.hash} />
      <Header />
      
      {/* Hero section with full height and centered content */}
      <section className="hero-section relative overflow-hidden bg-[#010822] isolate min-h-screen flex items-center justify-center">
        {/* Background elements - using consistent color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
          <LightParticles centerPosition={{ x: 50, y: 60 }} />
        </div>

        {/* Bottom edge gradient hint */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

        {/* Content container with same styling as Hero */}
        <div className="hero-content relative z-8 text-lg font-normal max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Web3 & Blockchain
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Guides</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Comprehensive guides to help you navigate the Web3 and blockchain ecosystem
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                              border border-white/20 hover:bg-white/30 transition-all
                              transform hover:scale-105 duration-300 text-lg font-semibold">
                Coming Soon!
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator />
      </section>
      
      <Footer />
    </div>
  );
};

export default GuidesPage;
