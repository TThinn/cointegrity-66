
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import LightParticles from "@/components/ui/LightParticles";

const CaseStudiesPage = () => {
  const { currentPath, currentHash } = useSectionTracking();

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead currentPath={currentPath} currentHash={currentHash} />
      <Header />
      
      {/* Hero section with all background effects */}
      <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate">
        {/* Background elements - using consistent color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
          <LightParticles centerPosition={{ x: 50, y: 60 }} />
        </div>

        {/* Content container with same styling as Hero */}
        <div className="hero-content relative z-8 text-lg font-normal flex flex-col justify-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Web3 & Blockchain
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Case Studies</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Real-world examples of successful Web3 implementations and blockchain solutions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up mb-4">
            <button className="bg-white/5 backdrop-blur-sm text-white px-8 py-3 rounded-full 
                            border border-white/20 hover:bg-white/30 transition-all
                            transform hover:scale-105 duration-300 text-lg font-semibold">
              Coming Soon!
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
