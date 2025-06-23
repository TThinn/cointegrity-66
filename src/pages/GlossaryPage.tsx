
import React, { useState, useRef, useEffect } from "react";
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
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

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
    totalTermsCount,
    transformationProgress
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
              {totalTermsCount}+ expert-curated terms covering blockchain, cryptocurrency, DeFi, NFTs and Web3
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              The most comprehensive Web3 terminology resource for developers, investors, and crypto enthusiasts. From basic blockchain concepts to advanced DeFi protocols.
            </p>
          </div>
          
          {/* Show transformation progress */}
          {transformationProgress > 0 && transformationProgress < 100 && (
            <Alert className="mb-6 bg-blue-900/20 border-blue-500/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Processing Terms</AlertTitle>
              <AlertDescription>
                Transforming glossary terms with questions: {transformationProgress}%
              </AlertDescription>
            </Alert>
          )}
          
          {/* Warning if fewer terms than expected */}
          {totalTermsCount !== 1414 && !isLoading && (
            <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-500/30">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Data Count Warning</AlertTitle>
              <AlertDescription>
                Expected 1414 terms but loaded {totalTermsCount} terms.
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

        {/* Scroll indicator */}
        <ScrollIndicator targetSection="contact-form" />
      </section>
      
      {/* Contact form - using the same component as the main page */}
      <ContactForm />
      
      <Footer />
    </div>
  );
};

export default GlossaryPage;
