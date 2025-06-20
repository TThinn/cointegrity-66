
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Founders from "@/components/Founders";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { SeoHead } from "@/components/seo/SeoHead";
import { ResourceHints } from "@/components/seo/ResourceHints";
import { InvisibleInternalLinks } from "@/components/seo/InvisibleInternalLinks";
import { useLocation } from "react-router-dom";

/**
 * Main index page with semantic HTML structure
 */
const Index = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      {/* Resource hints for proper initialization order */}
      <ResourceHints />
      
      {/* SEO Head with all metadata and structured data */}
      <SeoHead currentPath={location.pathname} currentHash={location.hash} />
      
      {/* Invisible internal links for SEO */}
      <InvisibleInternalLinks currentPath={location.pathname} />
      
      <Header />
      <main id="main" className="overflow-x-hidden">
        <Hero />
        <AboutUs />
        <Process />
        <Services />
        <Partners />
        <Founders />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

Index.displayName = "IndexPage";

export default Index;
