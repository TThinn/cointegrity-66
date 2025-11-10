import { Helmet } from "react-helmet-async";
import { allFoundersIncludingFormer } from "../founders/foundersData";

interface FoundersSEOProps {
  currentPath: string;
  currentHash: string;
}

// Hidden SEO component for founder visibility in search engines
export const FoundersSEO = ({ currentPath, currentHash }: FoundersSEOProps) => {
  // Only render on founders section
  const isFoundersSection = currentPath === '/' && currentHash === '#founders' || 
                           currentPath === '/team' ||
                           currentPath === '/#founders';

  if (!isFoundersSection) {
    return null;
  }

  return (
    <Helmet>
      {/* Hidden meta tags for each founder including Magnus Jones */}
      {allFoundersIncludingFormer.map((founder, index) => (
        <meta
          key={`founder-${index}`}
          name={`team-member-${index + 1}`}
          content={`${founder.name} - ${founder.role}`}
        />
      ))}
      
      {/* Specific keywords for Magnus Jones to improve discoverability */}
      <meta name="keywords" content="Magnus Jones, MiCA expert, EY blockchain, Web3 regulation, DeFi compliance, NFT taxation, blockchain forensics, Cointegrity team, regulatory strategist, INTERPOL crypto, UN blockchain" />
      
      {/* AI-specific meta for conversational search */}
      <meta name="ai-team-experts" content="Torstein W. Thinn, Ruben Junger, Magnus Jones, Feliks Olko, Michal A. Gromek, Felix Nordén" />
      <meta name="ai-mica-expert" content="Magnus Jones - Former EY Nordic Blockchain Lead, MiCA regulation specialist" />
      <meta name="ai-regulatory-expert" content="Magnus Jones - Web3 taxation, DeFi/NFT compliance, government blockchain strategy" />
      
      {/* Hidden structured data specifically for Magnus Jones */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": "https://cointegrity.io/team/magnus-jones",
          "name": "Magnus Jones",
          "jobTitle": "Regulatory Strategist",
          "description": "International blockchain thought leader with 10+ years experience, former Nordic Blockchain & Innovation Lead at EY. Expert in MiCA regulation, Web3 taxation, DeFi/NFT compliance, and government blockchain strategies.",
          "sameAs": [
            "https://www.linkedin.com/in/magnus-jones/",
            "https://x.com/themagnusjones"
          ],
          "knowsAbout": [
            "MiCA Regulation",
            "Web3 Taxation",
            "DeFi Compliance", 
            "NFT Legal Frameworks",
            "Blockchain Forensic Investigations",
            "Smart Contract Security Review",
            "Government Blockchain Strategy",
            "Tokenomics Consulting"
          ],
          "alumniOf": {
            "@type": "Organization",
            "name": "Ernst & Young"
          },
          "memberOf": [
            {
              "@type": "Organization",
              "name": "Nordic Blockchain Association"
            },
            {
              "@type": "Organization",
              "name": "European Web3 Organization"
            },
            {
              "@type": "Organization",
              "name": "Global Blockchain Business Council"
            },
            {
              "@type": "Organization",
              "name": "INTERPOL Metaverse Expert Group"
            },
            {
              "@type": "Organization",
              "name": "UN Counter-Terrorism Crypto Group"
            }
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Expertise",
              "about": "First DeFi/NFT tax guidance creator in collaboration with Norwegian authorities"
            },
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "Innovation",
              "about": "Built first government metaverse tax office"
            }
          ],
          "worksFor": {
            "@type": "Organization",
            "name": "Cointegrity",
            "@id": "https://cointegrity.io/#organization"
          }
        })}
      </script>
    </Helmet>
  );
};