
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { SeoHead } from "@/components/seo/SeoHead";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      {/* SEO Head with metadata and structured data */}
      <SeoHead currentPath="/contact" currentHash="" />
      
      <Header />
      <main className="pt-20">
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
