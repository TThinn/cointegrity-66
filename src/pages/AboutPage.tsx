
import React from "react";
import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AboutPage = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#010822]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={location.pathname} currentHash="" />
      
      <Header />
      
      {/* Hero section with scroll indicator */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#010822] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
        
        <main id="main" className="relative z-10">
          <div className="pt-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto mb-8 text-center">
              <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 mb-8 justify-center transition-colors">
                <ArrowLeft size={16} />
                <span>Back to Homepage</span>
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                About <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent">Cointegrity</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Learn more about our mission, team, and expertise in Web3 compliance and blockchain technology.
              </p>
            </div>
          </div>
        </main>
        
        <ScrollIndicator targetSection="about-content" />
      </section>
      
      <div id="about-content">
        <AboutUs />
        <div className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              View all sections on our homepage
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
