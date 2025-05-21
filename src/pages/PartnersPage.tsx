
import React from "react";
import Header from "@/components/Header";
import Partners from "@/components/Partners";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SectionContainer } from "@/components/ui/SectionContainer";
import BreadcrumbNav from "@/components/ui/BreadcrumbNav";

const PartnersPage = () => {
  const { currentPath } = useSectionTracking();
  
  return (
    <div className="min-h-screen bg-[#080112]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={currentPath} currentHash="" />
      
      <Header />
      <main id="main">
        <SectionContainer className="pt-24">
          <BreadcrumbNav className="mb-4" />
          
          <div className="mb-8">
            <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Our Network</h1>
            <p className="text-white/70 max-w-2xl">
              Discover the powerful ecosystem of partners and organizations we work with to drive innovation and adoption in Web3 and blockchain technology.
            </p>
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
