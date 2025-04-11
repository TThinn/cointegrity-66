
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Founders from "@/components/Founders";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Omega Web3 Consultancy",
    "description": "Leading Web3 consultancy helping businesses navigate blockchain technology and digital transformation with expert strategic consulting and implementation services.",
    "url": "https://omega-web3.com",
    "logo": "https://omega-web3.com/logo.png",
    "sameAs": [
      "https://twitter.com/OmegaWeb3",
      "https://linkedin.com/company/omega-web3",
      "https://github.com/omega-web3"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Norway"
    },
    "priceRange": "$$$",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
    "telephone": "+4712345678",
    "email": "contact@omega-web3.com",
    "service": [
      {
        "@type": "Service",
        "name": "Strategic Positioning",
        "description": "Transforming Web3 vision into market reality with tailored frameworks aligned with business objectives."
      },
      {
        "@type": "Service",
        "name": "Token Architecture",
        "description": "Delivering optimized tokenomics models that drive real business value."
      },
      {
        "@type": "Service",
        "name": "Regulatory Navigation",
        "description": "Guiding through the complex digital asset compliance landscape with focus on MiCA framework."
      },
      {
        "@type": "Service",
        "name": "Capital Acceleration",
        "description": "Transforming promising Web3 projects into well-funded ventures."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#080112]">
      <Helmet>
        <title>Omega Web3 Consultancy - Blockchain Solutions & Tokenomics Experts</title>
        <meta name="description" content="Leading Web3 consultancy specialized in blockchain strategy, tokenomics design, and regulatory compliance for enterprises." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Services />
        <Founders />
        <Partners />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
