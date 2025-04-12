
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Founders from "@/components/Founders";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { Helmet } from "react-helmet-async";

const Index = () => {
  // Enhanced JSON-LD structured data with more detailed service descriptions and emphasis on Web3 compliance
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Cointegrity Web3 Consultancy",
    "description": "Leading Web3 consultancy helping businesses navigate blockchain technology and digital asset transformation with expert strategic consulting and implementation services for the future of finance.",
    "url": "https://cointegrity.io",
    "logo": "https://cointegrity.io/logo.png",
    "sameAs": [
      "https://twitter.com/Cointegrity",
      "https://linkedin.com/company/cointegrity",
      "https://github.com/cointegrity"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Norway"
    },
    "priceRange": "$$$",
    "openingHours": "Mo,Tu,We,Th,Fr 09:00-17:00",
    "telephone": "+4712345678",
    "email": "contact@cointegrity.io",
    "keywords": "Web3 compliance, MiCA regulation, tokenomics, blockchain consulting, digital asset compliance, future of finance, decentralized finance, crypto regulation, Web3 strategy, token design",
    "slogan": "Shaping the Future of Finance",
    "service": [
      {
        "@type": "Service",
        "name": "Strategic Positioning",
        "description": "Transforming Web3 vision into market reality with tailored frameworks aligned with business objectives for the future of finance.",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Service",
        "name": "Token Architecture",
        "description": "Delivering optimized tokenomics models that drive real business value in the evolving future of finance landscape.",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Service",
        "name": "Regulatory Navigation",
        "description": "Guiding through the complex digital asset compliance landscape with focus on MiCA framework and the future of finance regulations.",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Service",
        "name": "Capital Acceleration",
        "description": "Transforming promising Web3 projects into well-funded ventures positioned for success in the future of finance.",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock"
        }
      }
    ],
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Josh Wilson"
        },
        "reviewBody": "We're grateful for Cointegrity's support in securing grants and connecting us with top blockchain partners. Their expertise unlocked opportunities we couldn't access alone.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Michelle Park"
        },
        "reviewBody": "Cointegrity's tokenomics design transformed our project, creating a sustainable model aligned with the future of finance that's attracted significant investment and user growth.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        }
      }
    ]
  };

  // FAQ structured data for enhanced SEO
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What services does Cointegrity offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cointegrity offers strategic positioning, token architecture, regulatory navigation focused on MiCA compliance, and capital acceleration services for businesses navigating the future of finance."
        }
      },
      {
        "@type": "Question",
        "name": "How does Cointegrity help with MiCA compliance?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our regulatory navigation service guides you through the complex digital asset compliance landscape with a focus on the MiCA framework in Europe, developing robust compliance strategies tailored to your specific needs."
        }
      },
      {
        "@type": "Question",
        "name": "What is Cointegrity's approach to tokenomics?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We analyze your Web3 commercial architecture and develop optimized tokenomics models that drive real business value, balancing utility, incentives, and economic sustainability for the future of finance."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#080112]">
      <Helmet>
        <title>Cointegrity Web3 Consultancy - Blockchain Solutions & Tokenomics Experts</title>
        <meta name="description" content="Leading Web3 consultancy specialized in blockchain strategy, tokenomics design, and MiCA regulatory compliance for enterprises building the future of finance." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Partners />
        <Founders />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
