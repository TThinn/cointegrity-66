
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Partners from "@/components/Partners";
import { SeoHead } from "@/components/seo/SeoHead";

const PartnersPage = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with metadata and structured data */}
      <SeoHead currentPath="/partners" currentHash="" />
      
      <Header />
      <main className="pt-20">
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;
