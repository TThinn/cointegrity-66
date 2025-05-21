
import React from "react";
import Header from "@/components/Header";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProcessPage = () => {
  const { currentPath } = useSectionTracking();
  
  return (
    <div className="min-h-screen bg-[#080112]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={currentPath} currentHash="" />
      
      <Header />
      <main id="main">
        <div className="pt-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mb-8">
            <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Process</h1>
            <p className="text-white/70 max-w-2xl">
              Learn about our approach to implementing blockchain and Web3 solutions for organizations.
            </p>
          </div>
        </div>
        <Process />
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

export default ProcessPage;
