
import React from "react";
import Header from "@/components/Header";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";

const AboutPage = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#010822]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={location.pathname} currentHash="" />
      
      <Header backgroundType="dark" />
      
      {/* Just show the About Us content directly without hero section */}
      <main id="main" className="pt-20">
        <AboutUs />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
