
import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
import { ContactCTA } from "@/components/glossary/ContactCTA";
import { DataSourceSelector } from "@/components/glossary/DataSourceSelector";
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
    <>
      <SeoHead currentPath={location.pathname} currentHash={location.hash} />
      <Helmet>
        <title>Web3, Blockchain & AI Glossary | Cointegrity</title>
        <meta 
          name="description" 
          content="Comprehensive glossary of Web3, Blockchain, AI, and Tokenomics terms. Learn about MiCA regulations, tokenization in gaming, and AI in Web3 from Cointegrity's experts."
        />
        <meta 
          name="keywords" 
          content="blockchain glossary, web3 terms, AI definitions, tokenomics, cryptocurrency, MiCA regulation, blockchain consulting"
        />
        <link rel="canonical" href="https://cointegrity.io/glossary" />
      </Helmet>
      
      <main className="min-h-screen pt-16 bg-background">
        <SectionContainer 
          title="Web3, Blockchain & AI Glossary" 
          subtitle="A comprehensive guide to terminology in the Web3, Blockchain, and AI space"
          className="py-12"
        >
          {/* Data source selector */}
          <DataSourceSelector 
            dataSource={dataSource}
            onChangeDataSource={changeDataSource}
            disabled={isLoading}
          />
          
          {/* Warning if fewer terms than expected */}
          {totalTermsCount < 100 && !isLoading && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Data Source Warning</AlertTitle>
              <AlertDescription>
                Only {totalTermsCount} terms loaded. Expected 300+ terms.
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
                <TabsList className="mb-4">
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="all">All Terms</TabsTrigger>
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
                      className="mt-2"
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
          
          {/* Contact CTA */}
          <ContactCTA />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
};

export default GlossaryPage;
