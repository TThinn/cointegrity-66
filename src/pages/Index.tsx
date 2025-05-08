
import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import AboutUs from "@/components/AboutUs";
import Founders from "@/components/Founders";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Process from "@/components/Process";
import { Helmet } from "react-helmet-async";
import { useAnalytics } from "@/hooks/useAnalytics";

const Index = () => {
  const { trackEvent } = useAnalytics();

  // Track section views for better analytics insights
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Update URL without triggering page reload (for better analytics tracking)
          if (sectionId) {
            window.history.replaceState({}, '', `#${sectionId}`);
            trackEvent('section_view', {
              category: 'Navigation',
              label: sectionId,
              nonInteraction: true
            });
          }
        }
      });
    }, { threshold: 0.3 });

    // Observe all sections for visibility
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [trackEvent]);

  // Enhanced JSON-LD structured data with more detailed service descriptions and emphasis on Web3 compliance
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Cointegrity Web3 Consultancy",
    "description": "Leading Web3 consultancy helping businesses navigate blockchain technology and digital asset transformation with expert strategic consulting and implementation services for the future of finance.",
    "url": "https://cointegrity.io",
    "logo": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
    "image": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
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
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://cointegrity.io"
    },
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
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web3 Consulting Services",
      "itemListElement": [
        {
          "@type": "OfferCatalogItem",
          "name": "Blockchain Strategy",
          "itemOffered": {
            "@type": "Service",
            "name": "Blockchain Strategy Consultation"
          }
        },
        {
          "@type": "OfferCatalogItem",
          "name": "Tokenomics Design",
          "itemOffered": {
            "@type": "Service",
            "name": "Token Economics Design"
          }
        }
      ]
    },
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
        },
        "datePublished": "2025-02-15"
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
        },
        "datePublished": "2025-03-20"
      }
    ]
  };

  // FAQ structured data for enhanced SEO - expanded with more questions
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
      },
      {
        "@type": "Question",
        "name": "Where is Cointegrity based?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cointegrity is based in Norway but provides Web3 and blockchain consulting services globally for businesses seeking expert guidance on digital asset transformation."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact Cointegrity for a consultation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can contact Cointegrity through our website contact form, by emailing contact@cointegrity.io, or by calling +4712345678 during our business hours."
        }
      }
    ]
  };

  // Section specific structured data for improved anchor link indexing
  const sectionsData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cointegrity.io/#about",
      "name": "About Cointegrity",
      "description": "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://cointegrity.io/#website"
      },
      "inLanguage": "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cointegrity.io/#services",
      "name": "Our Web3 & Blockchain Services",
      "description": "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://cointegrity.io/#website"
      },
      "inLanguage": "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://cointegrity.io/#founders",
      "name": "Meet Our Expert Team",
      "description": "Meet the talented team of Web3 specialists behind Cointegrity's success with decades of experience in blockchain technology.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://cointegrity.io/#website"
      },
      "inLanguage": "en-US"
    }
  ];

  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://cointegrity.io/#website",
    "url": "https://cointegrity.io/",
    "name": "Cointegrity - Web3 & Blockchain Solutions",
    "description": "Leading Web3 consultancy specialized in blockchain technology and digital asset transformation",
    "publisher": {
      "@type": "Organization",
      "name": "Cointegrity",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png",
        "width": 512,
        "height": 512
      }
    },
    "inLanguage": "en-US"
  };

  // Get the current URL path and hash
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  // Determine which section is being viewed to customize meta tags
  const getSectionTitle = () => {
    switch(currentHash) {
      case "#founders":
        return "Meet Our Expert Team | Cointegrity Web3 Consultancy";
      case "#services":
        return "Our Web3 & Blockchain Services | Cointegrity";
      case "#partners":
        return "Our Industry Partners | Cointegrity";
      case "#testimonials":
        return "Client Success Stories | Cointegrity";
      case "#about":
        return "About Cointegrity | Web3 & Blockchain Experts";
      case "#contact":
        return "Contact Cointegrity | Web3 & Blockchain Consultation";
      default:
        return "Cointegrity Web3 Consultancy - Blockchain Solutions & Tokenomics Experts";
    }
  };
  
  const getSectionDescription = () => {
    switch(currentHash) {
      case "#founders":
        return "Meet the talented team of Web3 specialists behind Cointegrity's success. Our founders bring decades of experience in blockchain technology and digital asset transformation.";
      case "#services":
        return "Discover our comprehensive Web3 services including strategic positioning, tokenomics design, regulatory compliance, and capital acceleration solutions.";
      case "#partners":
        return "Explore our network of trusted industry partners helping us deliver exceptional blockchain solutions and digital asset services.";
      case "#testimonials":
        return "Read what our clients say about Cointegrity's Web3 consultancy services. Real success stories from businesses we've helped transform.";
      case "#about":
        return "Learn about Cointegrity's mission to simplify Web3 complexity and our comprehensive approach to blockchain consulting and implementation.";
      case "#contact":
        return "Connect with Cointegrity's Web3 experts for consultation on blockchain technology, tokenomics, and regulatory compliance solutions.";
      default:
        return "Leading Web3 consultancy specialized in blockchain strategy, tokenomics design, and MiCA regulatory compliance for enterprises building the future of finance.";
    }
  };

  return (
    <div className="min-h-screen bg-[#080112]">
      <Helmet>
        <title>{getSectionTitle()}</title>
        <meta name="description" content={getSectionDescription()} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:title" content={getSectionTitle()} />
        <meta property="og:description" content={getSectionDescription()} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
        <meta property="og:image:alt" content="Cointegrity Logo" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={`https://cointegrity.io${currentPath}${currentHash}`} />
        <meta property="og:site_name" content="Cointegrity" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@Cointegrity" />
        <meta name="twitter:title" content={getSectionTitle()} />
        <meta name="twitter:description" content={getSectionDescription()} />
        <meta name="twitter:image" content="https://cointegrity.io/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
        <meta name="twitter:image:alt" content="Cointegrity Logo" />
        
        {/* LinkedIn */}
        <meta property="linkedin:owner" content="Cointegrity" />
        
        {/* Favicon */}
        <link rel="icon" href="/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" type="image/png" />
        <link rel="apple-touch-icon" href="/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
        <link rel="shortcut icon" href="/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png" />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://cointegrity.io${currentPath}${currentHash}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
        {sectionsData.map((data, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(data)}</script>
        ))}
      </Helmet>
      <Header />
      <main>
        <Hero />
        <AboutUs />
        <Process />
        <Services />
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
