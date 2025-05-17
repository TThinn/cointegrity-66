
import React from "react";
import Container from "./ui/Container";
import { Link } from "react-router-dom";
import OptimizedImage from "./ui/OptimizedImage";
import { ExternalLink } from "lucide-react";
import SectionContainer from "./ui/SectionContainer";

const Partners = () => {
  // Combined network partners list
  const networkPartners = [
    {
      name: "Ethereum",
      id: 1,
      url: "https://ethereum.org/",
      logo: "/lovable-uploads/10635277-352f-4e7e-a485-44cecd080a67.png"
    },
    {
      name: "Solana",
      id: 2,
      url: "https://solana.com/",
      logo: "/lovable-uploads/35e03803-e23e-4ae6-bd79-af9fa7db75b6.png"
    },
    {
      name: "Binance",
      id: 3,
      url: "https://www.binance.com/",
      logo: "/lovable-uploads/2de8101e-cc87-4988-80c5-f66cb682180f.png"
    },
    {
      name: "Sui",
      id: 4,
      url: "https://sui.io/",
      logo: "/lovable-uploads/cca33c9c-dbea-42f9-86c0-8cdec21a9e7a.png"
    },
    {
      name: "Avalanche",
      id: 5,
      url: "https://www.avax.network/",
      logo: "/lovable-uploads/f8ee235e-8951-4727-9a4d-4071d2c60ce3.png"
    },
    {
      name: "Meta",
      id: 6,
      url: "https://about.meta.com/",
      logo: "/lovable-uploads/1d01d80c-fe6c-4579-9640-773c15a22a79.png"
    },
    {
      name: "BlackRock",
      id: 7,
      url: "https://www.blackrock.com/",
      logo: "/lovable-uploads/eb9f6633-d391-4a4a-b623-5c220bfeeef2.png"
    },
    {
      name: "Mubadala",
      id: 8,
      url: "https://www.mubadala.com/",
      logo: "/lovable-uploads/19835558-fb21-4847-b38f-3c6e94633ff6.png"
    },
    {
      name: "Access Industries",
      id: 9,
      url: "https://www.accessindustries.com/",
      logo: "/lovable-uploads/62662510-6939-4c52-9dc2-269ee8e747bc.png"
    },
    {
      name: "AKJ",
      id: 10,
      url: "https://www.akj.com/",
      logo: "/lovable-uploads/1bac2890-8c6e-4688-994e-10abf9d0d9be.png"
    },
    {
      name: "K33",
      id: 11,
      url: "https://k33.com/",
      logo: "/lovable-uploads/4a1df2a6-21ec-4f4d-bf1e-0be36a960849.png"
    },
    {
      name: "TaxBit",
      id: 12,
      url: "https://taxbit.com/",
      logo: "/lovable-uploads/8a9ae834-c522-4892-836c-ed6830831589.png"
    },
    {
      name: "CEPOL",
      id: 13,
      url: "https://www.cepol.europa.eu/",
      logo: "/lovable-uploads/a595c043-bf2d-40aa-8236-e48bc96dd969.png"
    },
    {
      name: "Ministry of Defence",
      id: 14,
      url: "https://www.gov.uk/government/organisations/ministry-of-defence",
      logo: "/lovable-uploads/4e58e92f-3bc5-42cb-ada9-d7b8af5e4c7b.png"
    },
    {
      name: "United Nations",
      id: 15,
      url: "https://www.un.org/",
      logo: "/lovable-uploads/32e8bd55-2f0b-4772-bab3-657297e9573f.png"
    },
    {
      name: "OSCE",
      id: 16,
      url: "https://www.osce.org/",
      logo: "/lovable-uploads/0d4c386b-c572-4c92-8715-d6725b80040a.png"
    },
    {
      name: "GBBC",
      id: 17,
      url: "https://gbbcouncil.org/",
      logo: "/lovable-uploads/0a9ba7eb-382a-4fff-a4e6-c616ab19371d.png"
    },
    {
      name: "Nordic Blockchain Association",
      id: 18,
      url: "https://nordicblockchain.com/",
      logo: "/lovable-uploads/23b8985f-164c-4c02-a983-2dfa808c0689.png"
    },
    {
      name: "Google Cloud",
      id: 19,
      url: "https://cloud.google.com/",
      logo: "/lovable-uploads/2dd79377-6c9c-43cc-8fe1-5d1eb429c567.png"
    },
    {
      name: "Microsoft",
      id: 20,
      url: "https://www.microsoft.com/",
      logo: "/lovable-uploads/a2b1c3d2-c3ca-4547-8cae-e6eca459eeaa.png"
    },
    {
      name: "AWS",
      id: 21,
      url: "https://aws.amazon.com/",
      logo: "/lovable-uploads/e6a83d86-6685-4904-9bb1-f6d5c0a536dc.png"
    },
    {
      name: "WEMIX",
      id: 22,
      url: "https://wemix.com/",
      logo: "/lovable-uploads/bddb4dfb-6109-4631-b67f-22640d75336f.png"
    },
    {
      name: "Deloitte",
      id: 23,
      url: "https://www.deloitte.com/",
      logo: "/lovable-uploads/fab0fa22-b5a9-4bc7-9d5b-092c5abe5827.png"
    },
    {
      name: "Ernst & Young",
      id: 24,
      url: "https://www.ey.com/",
      logo: "/lovable-uploads/1ec5bfd8-e2e8-46c4-8b86-b6fa09a3b6e2.png"
    }
  ];

  return (
    <SectionContainer 
      id="partners" 
      className="py-20 bg-[#080112]"
      title="Our Network"
      subtitle="Collaborating with industry leaders across blockchain, finance, technology, and governmental sectors to drive the future of Web3."
    >
      <div className="relative z-10">
        {/* Deep space background effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010108] to-[#0a0d22]"></div>
          <div className="absolute w-full h-full opacity-30">
            <div className="absolute left-1/4 top-1/3 w-[600px] h-[600px] bg-[#6e00ff]/10 rounded-full blur-[120px]"></div>
            <div className="absolute right-1/4 bottom-1/3 w-[500px] h-[500px] bg-[#ff008a]/10 rounded-full blur-[120px]"></div>
          </div>
        </div>

        {/* Network grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 relative z-10">
          {networkPartners.map((partner) => (
            <a 
              key={partner.id} 
              href={partner.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center p-4 rounded-lg bg-[#0e0f1b]/50 border border-white/5 hover:border-white/20 transition-all duration-300 hover:bg-[#171830]/60 h-32"
            >
              <div className="flex-1 flex items-center justify-center w-full h-full relative">
                <OptimizedImage 
                  src={partner.logo} 
                  alt={partner.name} 
                  width={120} 
                  height={40}
                  className="max-h-10 w-auto max-w-[80%] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white/60 flex items-center gap-1">
                  <ExternalLink size={8} />
                  Visit
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Description */}
        <div className="mt-10 text-center">
          <p className="text-white/70 max-w-3xl mx-auto text-sm">
            Our network spans across blockchain pioneers, financial institutions, technology innovators, and governmental organizations. 
            We're proud to collaborate with these leading entities to shape the future of digital assets and Web3 technologies.
          </p>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Partners;
