
import React from "react";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ServicesPage = () => {
  const { currentPath } = useSectionTracking();
  
  return (
    <div className="min-h-screen bg-[#080112]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={currentPath} currentHash="" />
      
      <Header />
      <main id="main">
        <div className="pt-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mb-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900 flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
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
