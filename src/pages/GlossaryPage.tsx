
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoryType } from "@/components/glossary/types";
import { GlossarySearch } from "@/components/glossary/GlossarySearch";
import { CategorySelector } from "@/components/glossary/CategorySelector";
import { AlphabeticalIndex } from "@/components/glossary/AlphabeticalIndex";
import { GlossaryTermsList } from "@/components/glossary/GlossaryTermsList";
import { ContactCTA } from "@/components/glossary/ContactCTA";
import { useGlossaryTerms } from "@/components/glossary/useGlossaryTerms";
import { toast } from "sonner";

const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const [activeTab, setActiveTab] = useState<string>("categories");
  const location = useLocation();
  
  const { filteredTerms, groupedTerms, letters, totalTermsCount } = useGlossaryTerms(searchTerm, activeCategory);

  // Notify on initial load about total terms
  useEffect(() => {
    console.log(`Displaying ${filteredTerms.length} terms out of ${totalTermsCount} total glossary terms`);
    if (totalTermsCount < 100) {
      console.warn("Warning: The glossary terms count seems low. Expected 335+ terms but found:", totalTermsCount);
    }
  }, [filteredTerms.length, totalTermsCount]);

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
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="lg:w-3/4">
              <div className="mb-4">
                <p className="text-muted-foreground">
                  Glossary contains {totalTermsCount} terms. 
                  {filteredTerms.length !== totalTermsCount && 
                    ` Currently showing ${filteredTerms.length} terms based on your filters.`}
                </p>
              </div>
            
              <GlossarySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

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

              {filteredTerms.length === 0 ? (
                <Card>
                  <div className="p-8 text-center">
                    <p>No terms match your search criteria.</p>
                    {searchTerm && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSearchTerm("")}
                        className="mt-4"
                      >
                        Clear search
                      </Button>
                    )}
                  </div>
                </Card>
              ) : (
                <GlossaryTermsList 
                  letters={letters} 
                  groupedTerms={groupedTerms} 
                />
              )}
            </div>

            <div className="lg:w-1/4">
              <AlphabeticalIndex 
                letters={letters}
                groupedTerms={groupedTerms}
                scrollToSection={scrollToSection}
              />
            </div>
          </div>
          
          <ContactCTA />
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
};

export default GlossaryPage;
