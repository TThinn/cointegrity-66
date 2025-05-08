
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
import { useSectionTracking } from "@/hooks/useSectionTracking";

const Index = () => {
  // Use custom hook for section tracking and URL management
  const { currentPath, currentHash } = useSectionTracking();

  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with all metadata and structured data */}
      <SeoHead currentPath={currentPath} currentHash={currentHash} />
      
      <Header />
      <main>
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

export default Index;
