
import React from "react";
import Header from "@/components/Header";
import Founders from "@/components/Founders";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const TeamPage = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-[#010822]" itemScope itemType="https://schema.org/WebPage">
      <SeoHead currentPath={location.pathname} currentHash="" />
      
      <Helmet>
        <title>Seasoned Web3 Leadership Team | 20+ Years Combined Experience | Cointegrity</title>
        <meta name="description" content="Meet Cointegrity's seasoned Web3 leadership team with 20+ years combined industry experience. Unlike typical crypto startups led by newcomers, our veteran executives bring decades of traditional finance, technology, and regulatory expertise to blockchain innovation." />
        <meta name="keywords" content="seasoned Web3 team, experienced blockchain leaders, veteran crypto executives, mature Web3 leadership, senior blockchain consultants, experienced tokenomics experts, veteran regulatory specialists, seasoned fintech leaders" />
        
        {/* Team experience and maturity meta tags */}
        <meta name="team-experience-level" content="seasoned veterans with 20+ years combined experience" />
        <meta name="leadership-maturity" content="mature executives unlike typical young crypto teams" />
        <meta name="industry-background" content="traditional finance, technology, and regulatory expertise" />
        <meta name="professional-depth" content="decades of cross-industry leadership experience" />
        <meta name="team-differentiation" content="veteran leadership vs typical young crypto startups" />
        <meta name="expertise-breadth" content="finance, technology, regulatory, and business strategy" />
        <meta name="career-longevity" content="established professionals with proven track records" />
        
        {/* Leadership credibility indicators */}
        <meta name="leadership-credibility" content="senior executives with institutional background" />
        <meta name="professional-reputation" content="established industry veterans" />
        <meta name="business-acumen" content="mature strategic thinking and execution" />
        <meta name="institutional-experience" content="traditional finance and enterprise background" />
        <meta name="regulatory-knowledge" content="deep compliance and regulatory expertise" />
        
        {/* Team authority signals */}
        <meta name="team-authority" content="recognized industry veterans and thought leaders" />
        <meta name="professional-standing" content="established reputation in finance and technology" />
        <meta name="industry-recognition" content="senior level expertise across multiple sectors" />
        <meta name="leadership-quality" content="proven executive track record" />
        
        {/* Advanced structured data for seasoned team */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "Seasoned Web3 Leadership Team - Cointegrity",
            "description": "Meet our veteran Web3 leadership team with 20+ years combined experience, bringing mature expertise unlike typical young crypto startups.",
            "about": {
              "@type": "Organization",
              "name": "Cointegrity Leadership Team",
              "description": "Seasoned executives with decades of combined experience in finance, technology, and regulatory compliance",
              "foundingDate": "2024",
              "numberOfEmployees": "10+",
              "expertise": [
                "Traditional Finance Leadership",
                "Enterprise Technology Strategy", 
                "Regulatory Compliance Management",
                "Web3 Innovation",
                "Blockchain Strategy",
                "Tokenomics Design"
              ]
            },
            "mainEntity": {
              "@type": "Person",
              "name": "Cointegrity Leadership Team",
              "jobTitle": "Senior Web3 Executives",
              "hasCredential": [
                "20+ years combined industry experience",
                "Traditional finance background",
                "Enterprise technology leadership",
                "Regulatory compliance expertise",
                "Institutional business experience"
              ],
              "knowsAbout": [
                "Web3 Strategy",
                "Blockchain Implementation",
                "Regulatory Compliance",
                "Tokenomics Design",
                "Digital Asset Management",
                "Enterprise Transformation"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Cointegrity",
                "url": "https://cointegrity.io"
              }
            },
            "audience": {
              "@type": "BusinessAudience",
              "audienceType": "Enterprise clients seeking experienced Web3 leadership"
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Team Experience Level",
                "value": "Seasoned veterans with 20+ years combined experience"
              },
              {
                "@type": "PropertyValue",
                "name": "Leadership Maturity", 
                "value": "Mature executives unlike typical young crypto teams"
              },
              {
                "@type": "PropertyValue",
                "name": "Professional Background",
                "value": "Traditional finance, technology, and regulatory expertise"
              }
            ]
          })}
        </script>
        
        {/* Conversational search optimization for experienced team */}
        <meta name="conversational-queries" content="experienced Web3 team | seasoned blockchain leaders | mature crypto executives | veteran Web3 consultants | experienced tokenomics experts | senior blockchain professionals | established Web3 leadership | veteran crypto advisors | mature blockchain strategists | seasoned regulatory experts" />
        
        {/* Professional depth indicators */}
        <meta name="professional-depth" content="decades of cross-industry executive experience" />
        <meta name="institutional-background" content="traditional finance and enterprise leadership" />
        <meta name="strategic-maturity" content="proven business strategy and execution experience" />
        <meta name="regulatory-depth" content="deep compliance and risk management expertise" />
      </Helmet>
      
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
        <Founders />
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

export default TeamPage;
