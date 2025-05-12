
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutUs from "@/components/AboutUs";
import { SeoHead } from "@/components/seo/SeoHead";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with metadata and structured data */}
      <SeoHead currentPath="/about" currentHash="" />
      
      <Header />
      <main className="pt-20">
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
