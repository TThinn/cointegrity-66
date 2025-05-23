
import React from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const ServicesPage = () => {
  const { currentPath } = useSectionTracking();
  
  return (
    <div className="min-h-screen bg-[#080112] overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={currentPath} currentHash="" />
      
      <Header />
      <main id="main" className="overflow-x-hidden">
        <div className="pt-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mb-8">
            <BreadcrumbNav className="mb-4" />
            
            <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Services</h1>
            <p className="text-white/70 max-w-2xl">
              Comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.
            </p>
          </div>
        </div>
        <Services />
        <div className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              View all sections on our homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
