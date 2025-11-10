
import React from "react";
import Container from "./ui/Container";
import { founders, allFoundersIncludingFormer } from "./founders/foundersData";
import FounderCard from "./founders/FounderCard";

const Founders = () => {
  return (
    <section id="founders" className="py-20 bg-gradient-to-b from-[#FEFCFD] to-[#FDF9FC] relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#cb46b3]">
            BLOCKCHAIN EXPERTISE & LEADERSHIP
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
            The Minds Behind Cointegrity
          </h3>
          <p className="mt-2 text-gray-600">
            Our blockchain-experienced team simplifies Web3 implementation and digital asset development, 
            allowing you to focus on business value creation. With expertise spanning regulatory compliance, 
            technical infrastructure, and strategic market positioning, we transform complex blockchain 
            challenges into practical solutions for enterprise and government.
          </p>
        </div>
        
        {/* Hidden content for search engines including all team members */}
        <div className="sr-only" data-bot-content="true" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="Cointegrity" />
          <div itemProp="employee" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Torstein W. Thinn</span>
            <span itemProp="jobTitle">Co-Founder & Chairman</span>
            <span itemProp="description">Financial innovator, cryptocurrency regulatory expert, former NBX CFO</span>
          </div>
          <div itemProp="employee" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Ruben Junger</span>
            <span itemProp="jobTitle">Co-Founder & Web3 Strategist</span>
            <span itemProp="description">Web3 strategist, tokenomics expert, former MetaGravity Global Head of Web3</span>
          </div>
          <div itemProp="employee" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Magnus Jones</span>
            <span itemProp="jobTitle">Regulatory Strategist</span>
            <span itemProp="description">MiCA regulation expert, former EY Nordic Blockchain & Innovation Lead, Web3 taxation specialist, DeFi compliance expert, INTERPOL Metaverse Expert Group member, UN Counter-Terrorism Crypto Group participant</span>
            <span itemProp="knowsAbout">MiCA Regulation</span>
            <span itemProp="knowsAbout">Web3 Taxation</span>
            <span itemProp="knowsAbout">DeFi Compliance</span>
            <span itemProp="knowsAbout">NFT Legal Frameworks</span>
            <span itemProp="knowsAbout">Blockchain Forensics</span>
            <span itemProp="knowsAbout">Government Blockchain Strategy</span>
          </div>
          <div itemProp="employee" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Feliks Olko</span>
            <span itemProp="jobTitle">Co-Founder & Technical Strategist</span>
            <span itemProp="description">Metaverse infrastructure pioneer, former MetaGravity VP</span>
          </div>
          <div itemProp="employee" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Michal A. Gromek</span>
            <span itemProp="jobTitle">Co-Founder & Financial Crime Advisor</span>
            <span itemProp="description">Virtual Asset Financial Crime Prevention expert, leads 120+ specialists</span>
          </div>
          <div itemProp="employee" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Felix Nordén</span>
            <span itemProp="jobTitle">Co-Founder & Tech Lead</span>
            <span itemProp="description">Former Amazon/Twitch AI scientist, Web3 developer with 150+ smart contracts</span>
          </div>
          <p>
            Our expert team includes Torstein W. Thinn (financial innovator and former NBX CFO), 
            Ruben Junger (Web3 strategist and former MetaGravity Global Head of Web3), 
            Magnus Jones (regulatory expert and former EY Nordic Blockchain & Innovation Lead specializing in MiCA regulation, Web3 taxation, DeFi and NFT compliance), 
            Feliks Olko (metaverse infrastructure pioneer), 
            Michal A. Gromek (financial crime prevention expert leading 120+ specialists), 
            and Felix Nordén (former Amazon/Twitch AI scientist and Web3 developer).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {founders.map((founder, index) => (
            <FounderCard key={index} founder={founder} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Founders;
