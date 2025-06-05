
import React from "react";
import Header from "@/components/Header";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";

const PartnersPage = () => {
  const { currentPath } = useSectionTracking();
  
  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={currentPath} currentHash="" />
      
      <Header />
      <main id="main" className="overflow-x-hidden">
        <SectionContainer className="pt-24">
          <div className="mb-8">
            <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </SectionContainer>
        <Partners />
        <SectionContainer className="py-8">
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            View all sections on our homepage
          </Link>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
