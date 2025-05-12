
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Founders from "@/components/Founders";
import { SeoHead } from "@/components/seo/SeoHead";

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with metadata and structured data */}
      <SeoHead currentPath="/team" currentHash="" />
      
      <Header />
      <main className="pt-20">
        <Founders />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
