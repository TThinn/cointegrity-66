import React from "react";
import { Helmet } from "react-helmet-async";

export const HomepageFAQStructuredData: React.FC = () => {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://cointegrity.io/#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Cointegrity different from other Web3 consultancies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We combine deep regulatory expertise with cutting-edge AI technology to deliver 10x faster compliance solutions. Our team has 20+ years of experience and we're the only consultancy offering AI-powered MiCA compliance automation."
        }
      },
      {
        "@type": "Question",
        "name": "How long does Web3 implementation typically take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Traditional consulting takes 6-18 months. Our AI-powered approach reduces this to 2-6 months for most projects, with MiCA compliance delivered in as little as 3-4 months depending on jurisdiction."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need MiCA compliance for my crypto business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you operate in or target EU markets, issue crypto-assets, or provide crypto services like custody, trading, or portfolio management, you likely need MiCA compliance. Our AI screening tool can determine your exact requirements in minutes."
        }
      },
      {
        "@type": "Question",
        "name": "What's included in your Web3 consulting process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide end-to-end support including digital strategy, tokenomics design, regulatory compliance, smart contract development, go-to-market strategy, and investor relations. Each engagement is tailored to your specific needs."
        }
      },
      {
        "@type": "Question",
        "name": "How do you handle regulatory compliance across different jurisdictions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We have expertise across all 27 EU member states and maintain updated regulatory frameworks. Our AI-powered platform continuously monitors regulatory changes and updates compliance requirements in real-time."
        }
      },
      {
        "@type": "Question",
        "name": "Can you help with both technical and legal aspects of Web3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide comprehensive support covering technical development, legal compliance, business strategy, and market entry. Our multidisciplinary team includes lawyers, developers, economists, and industry experts."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
    </Helmet>
  );
};