
import React from "react";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ContactPage = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#010822]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={location.pathname} currentHash="" />
      
      <Header />
      <main id="main">
        <div className="pt-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto mb-8">
            <Link to="/" className="text-white/70 hover:text-white flex items-center gap-2 mb-4 transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>
        <ContactForm />
        <div className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
              View all sections on our homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
