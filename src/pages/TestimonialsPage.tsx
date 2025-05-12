
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { SeoHead } from "@/components/seo/SeoHead";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with metadata and structured data */}
      <SeoHead currentPath="/testimonials" currentHash="" />
      
      <Header />
      <main className="pt-20">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
