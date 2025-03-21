
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Founders from "@/components/Founders";
import Accreditations from "@/components/Accreditations";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#080112]">
      <Header />
      <Hero />
      <Services />
      <Founders />
      <Accreditations />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
