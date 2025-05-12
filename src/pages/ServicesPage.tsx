
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import { SeoHead } from "@/components/seo/SeoHead";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with metadata and structured data */}
      <SeoHead currentPath="/services" currentHash="" />
      
      <Header />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
