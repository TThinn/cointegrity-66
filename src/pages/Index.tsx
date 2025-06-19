
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
import { SafeResourceHints } from "@/components/seo/SafeResourceHints";
import { InvisibleInternalLinks } from "@/components/seo/InvisibleInternalLinks";
import { useSectionTracking } from "@/hooks/useSectionTracking";

/**
 * Main index page with semantic HTML structure
 * Setup for potential hybrid rendering approach
 */
const Index = () => {
  // Use custom hook for section tracking and URL management
  const { currentPath, currentHash } = useSectionTracking();

  // Check if we have any server-side pre-rendered content
  // This is a preparation for hybrid rendering approach
  const isHydrating = React.useRef(true);
  React.useEffect(() => {
    isHydrating.current = false;
  }, []);

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden" itemScope itemType="https://schema.org/WebPage">
      {/* Safe resource hints for proper initialization order */}
      <SafeResourceHints />
      
      {/* SEO Head with all metadata and structured data */}
      <SeoHead currentPath={currentPath} currentHash={currentHash} />
      
      {/* Invisible internal links for SEO */}
      <InvisibleInternalLinks currentPath={currentPath} />
      
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

// Add display name for component
Index.displayName = "IndexPage";

export default Index;
