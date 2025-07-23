
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { CategoryType, DataSourceType } from "@/components/glossary/types";
import { GlossarySearch } from "@/components/glossary/GlossarySearch";
import { CategorySelector } from "@/components/glossary/CategorySelector";

import { GlossaryTermsList } from "@/components/glossary/GlossaryTermsList";
import ContactForm from "@/components/ContactForm";
import { useGlossaryData } from "@/components/glossary/useGlossaryData";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { RateLimitGuard } from "@/components/legal/RateLimitGuard";
import { AntiScrapingNotice } from "@/components/legal/AntiScrapingNotice";
import { CopyrightNotice } from "@/components/legal/CopyrightNotice";
import { LLMContentStructure } from "@/components/seo/ai/LLMContentStructure";

const GlossaryPage: React.FC = () => {
  // State for UI
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const location = useLocation();

  // Get initial data source preference from local storage
  const initialDataSource: DataSourceType = "original";
  
  // Get glossary data
  const { 
    dataSource, 
    changeDataSource,
    filteredTerms, 
    groupedTerms, 
    letters,
    isLoading,
    totalTermsCount,
    transformationProgress,
    isSearching
  } = useGlossaryData(searchTerm, activeCategory, initialDataSource);
  

  return (
    <RateLimitGuard action="glossary-access">
      <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead 
        currentPath={location.pathname} 
        currentHash={location.hash}
        totalTermsCount={totalTermsCount}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
      />
      
      {/* LLM-friendly content structure */}
      <LLMContentStructure 
        contentType="glossary"
        title={`World's Largest Web3 Glossary, Dictionary & Vocabulary (${totalTermsCount}+ Terms)`}
        description={`The ultimate Web3 glossary, dictionary and vocabulary with ${totalTermsCount}+ expert-curated terms covering blockchain terminology, cryptocurrency definitions, DeFi protocols, NFTs, DAOs, tokenomics, AI, and regulatory compliance. Your complete Web3 dictionary, vocabulary and glossary guide created by Europe's leading consultancy.`}
        keyTopics={['web3 glossary', 'web3 dictionary', 'web3 vocabulary', 'blockchain terminology', 'cryptocurrency definitions', 'crypto glossary', 'web3', 'defi', 'nft', 'tokenomics', 'regulatory compliance']}
        totalCount={totalTermsCount}
      />
      
      <Header />
      
      {/* Hero section with full height and scroll indicator */}
      <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate min-h-screen">
        {/* Background elements - using consistent color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
        </div>

        {/* Bottom edge gradient hint */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />

        {/* Content container with same styling as Hero */}
        <div className="hero-content relative z-8 text-lg font-normal flex flex-col justify-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto min-h-screen">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              World's Largest 
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Web3 Glossary</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4">
              {totalTermsCount}+ expert-curated terms in our comprehensive Web3 dictionary, vocabulary & glossary
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              The ultimate Web3 glossary, dictionary and vocabulary resource for developers, investors, and crypto enthusiasts. Your complete guide to blockchain terminology, cryptocurrency definitions, and DeFi protocols.
            </p>
          </div>

          <div className="w-full mb-8">
            {/* Search bar - now prominently displayed */}
            <GlossarySearch 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              totalCount={totalTermsCount}
              filteredCount={filteredTerms.length}
            />

            {/* Category selector - simplified, always visible */}
            <div className="mb-6">
              <CategorySelector 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                viewType={isSearching ? "list" : "grid"}
              />
              
              {activeCategory !== "all" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveCategory("all")}
                  className="mt-2 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  Clear filter
                </Button>
              )}
            </div>

            {/* Search results info */}
            {isSearching && (
              <div className="mb-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-purple-200">
                  📊 Two-Stage Search Results: {filteredTerms.length} terms found for "{searchTerm}"
                  {activeCategory !== "all" && ` in ${activeCategory} category`}
                </p>
              </div>
            )}

            {/* Glossary terms list */}
            <GlossaryTermsList 
              letters={letters} 
              groupedTerms={groupedTerms} 
              isLoading={isLoading}
              isSearching={isSearching}
              searchTerm={searchTerm}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <ScrollIndicator targetSection="contact-form" />
      </section>
      
      {/* Anti-scraping notice - moved below hero section */}
      <SectionContainer className="pt-8 pb-4">
        <AntiScrapingNotice />
      </SectionContainer>
      
      {/* Contact form - using the same component as the main page */}
      <ContactForm />
      
      <Footer />
      
      {/* Copyright watermark */}
      <CopyrightNotice variant="watermark" />
    </div>
    </RateLimitGuard>
  );
};

export default GlossaryPage;
