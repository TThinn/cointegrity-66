
import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { CategoryType, DataSourceType } from "@/components/glossary/types";
import { GlossarySearch } from "@/components/glossary/GlossarySearch";
import { CategorySelector } from "@/components/glossary/CategorySelector";
import { AlphabeticalIndex } from "@/components/glossary/AlphabeticalIndex";
import { GlossaryTermsList } from "@/components/glossary/GlossaryTermsList";
import ContactForm from "@/components/ContactForm";
import { useGlossaryData } from "@/components/glossary/useGlossaryData";

const GlossaryPage: React.FC = () => {
  // State for UI
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const [activeTab, setActiveTab] = useState<string>("categories");
  const location = useLocation();

  // Get initial data source preference from local storage
  // This will now always be "original" as it's the only available source
  const initialDataSource: DataSourceType = "original";
  
  // Get glossary data
  const { 
    dataSource, 
    changeDataSource,
    filteredTerms, 
    groupedTerms, 
    letters,
    isLoading,
    totalTermsCount 
  } = useGlossaryData(searchTerm, activeCategory, initialDataSource);
  
  // For smooth scrolling to sections
  const scrollToSection = (letter: string) => {
    const element = document.getElementById(`section-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead 
        currentPath={location.pathname} 
        currentHash={location.hash}
        totalTermsCount={totalTermsCount}
        searchTerm={searchTerm}
        activeCategory={activeCategory}
      />
      <Helmet>
        <title>World's Largest Web3 Glossary ({totalTermsCount}+ Terms) | Cointegrity</title>
        <meta 
          name="description" 
          content={`World's largest Web3 glossary with ${totalTermsCount}+ expert-curated terms covering blockchain, cryptocurrency, DeFi, NFTs, DAOs, tokenomics, AI integration, and MiCA regulatory compliance. The most comprehensive Web3 dictionary available.`}
        />
        <meta 
          name="keywords" 
          content="largest Web3 glossary, biggest blockchain dictionary, comprehensive crypto terms, DeFi definitions, NFT terminology, DAO governance, tokenomics glossary, MiCA regulation terms, AI blockchain, Web3 education"
        />
        <link rel="canonical" href="https://cointegrity.io/glossary" />
        
        {/* Enhanced glossary meta tags */}
        <meta name="glossary-claim" content={`World's largest Web3 glossary with ${totalTermsCount}+ terms`} />
        <meta name="educational-resource" content="Comprehensive Web3 and blockchain terminology guide" />
        <meta name="content-type" content="Educational Glossary" />
        <meta name="subject-matter" content="Web3, Blockchain, Cryptocurrency, DeFi, NFTs, DAOs, Tokenomics, AI, Regulatory Compliance" />
        <meta name="expertise-level" content="Beginner to Advanced" />
        <meta name="resource-scope" content="Global Web3 Terminology" />
      </Helmet>
      
      <Header />
      
      {/* Hero section with consistent background color */}
      <section className="hero-section pt-32 pb-16 lg:pt-40 lg:pb-24 relative overflow-hidden bg-[#010822] isolate">
        {/* Background elements - using consistent color */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#010822] to-[#010822]" />
        </div>

        {/* Content container with same styling as Hero */}
        <div className="hero-content relative z-8 text-lg font-normal flex flex-col justify-center gap-6 max-w-[90vw] xl:max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              World's Largest 
              <span className="bg-gradient-to-r from-[#d946ef] to-[#9333ea] bg-clip-text text-transparent"> Web3 Glossary</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-4">
              {totalTermsCount}+ expert-curated terms covering Web3, Blockchain, AI, and Cryptocurrency
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              The most comprehensive Web3 terminology resource available online, featuring definitions for blockchain technology, DeFi protocols, NFT standards, DAO governance, tokenomics, MiCA regulatory compliance, and emerging AI integration.
            </p>
          </div>
          
          {/* Warning if fewer terms than expected */}
          {totalTermsCount < 100 && !isLoading && (
            <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-500/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Data Source Warning</AlertTitle>
              <AlertDescription>
                Only {totalTermsCount} terms loaded. Expected 1000+ terms.
                This may indicate a data source issue.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="lg:w-3/4">
              {/* Search bar */}
              <GlossarySearch 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                totalCount={totalTermsCount}
                filteredCount={filteredTerms.length}
              />

              {/* Tabs for navigation */}
              <Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="mb-4 bg-white/5 backdrop-blur-sm border border-white/20">
                  <TabsTrigger value="categories" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">Categories</TabsTrigger>
                  <TabsTrigger value="all" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">All Terms</TabsTrigger>
                </TabsList>
                
                <TabsContent value="categories" className="space-y-6">
                  <CategorySelector 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    viewType="grid"
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
                </TabsContent>
                
                <TabsContent value="all">
                  <CategorySelector 
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    viewType="list"
                  />
                </TabsContent>
              </Tabs>

              {/* Glossary terms list */}
              <GlossaryTermsList 
                letters={letters} 
                groupedTerms={groupedTerms} 
                isLoading={isLoading}
              />
            </div>

            <div className="lg:w-1/4">
              {/* Alphabetical index sidebar */}
              <AlphabeticalIndex 
                letters={letters}
                groupedTerms={groupedTerms}
                scrollToSection={scrollToSection}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact form - using the same component as the main page */}
      <ContactForm />
      
      <Footer />
    </div>
  );
};

export default GlossaryPage;
