
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
import { useGlossaryTermsDebug } from "@/components/glossary/useGlossaryTermsDebug";
import { glossaryTerms } from "@/data/glossaryTerms"; // Direct import for diagnostics
import { glossaryTermsNew } from "@/data/glossaryTermsNew"; // Import our new test data
import { glossaryTermsTemp } from "@/data/temp"; // Import the temp data
import { GlossaryDataTest } from "@/components/glossary/GlossaryDataTest"; // Import diagnostic component
import { GlossaryDiagnosticPage } from "@/components/glossary/GlossaryDiagnosticPage"; // Import our diagnostic page
import { toast } from "sonner";

// Add a version query parameter to bust cache
const VERSION = "1.0.1";

const GlossaryPage: React.FC = () => {
  // Get data source preference from localStorage
  const getInitialDataSource = (): "original" | "new" | "temp" => {
    const stored = localStorage.getItem("glossary_data_source");
    if (stored === "new" || stored === "temp") {
      return stored;
    }
    return "original";
  };
  
  const [useDebugMode, setUseDebugMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const [activeTab, setActiveTab] = useState<string>("categories");
  const [dataSource, setDataSource] = useState<"original" | "new" | "temp">(getInitialDataSource());
  const location = useLocation();
  
  // Get data from hooks
  const originalHookData = useGlossaryTerms(searchTerm, activeCategory);
  const debugHookData = useGlossaryTermsDebug(searchTerm, activeCategory);
  
  // Use either the original or debug hook data based on toggle
  const { filteredTerms, groupedTerms, letters, totalTermsCount } = 
    useDebugMode ? debugHookData : originalHookData;
  
  // Check URL parameters on load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Check for debug mode
    if (urlParams.has('debug')) {
      setUseDebugMode(true);
      toast.info("Debug mode enabled");
    }
    
    // Check for data source override
    const sourceParam = urlParams.get('source');
    if (sourceParam === 'new' || sourceParam === 'temp' || sourceParam === 'original') {
      setDataSource(sourceParam);
      localStorage.setItem("glossary_data_source", sourceParam);
      toast.info(`Using ${sourceParam} data source`);
    }
    
    // Direct check of the data sources - compare counts
    console.log("🔍 GlossaryPage - Comparing data sources:");
    console.log("🔍 Original glossaryTerms count:", glossaryTerms.length);
    console.log("🔍 New glossaryTermsNew count:", glossaryTermsNew.length);
    console.log("🔍 Temp glossaryTermsTemp count:", glossaryTermsTemp.length);
    
    // Verify if the full data is being loaded from any source
    if (glossaryTermsTemp.length > 300) {
      console.log("🔍 Full data available in temp source");
    } else if (glossaryTermsNew.length > 300) {
      console.log("🔍 Full data available in new source");
    } else if (glossaryTerms.length > 300) {
      console.log("🔍 Full data available in original source");
    } else {
      console.error("🔍 Critical - No data source has the full 335+ terms!");
      
      toast.error(
        "Critical data issue: None of the data sources contain the full 335+ glossary terms.",
        { duration: 5000 }
      );
    }
    
    // Check for module loading issues
    console.log("🔍 Module system information:");
    try {
      console.log("🔍 Import meta:", import.meta.url);
    } catch (e) {
      console.log("🔍 Error accessing import.meta:", e);
    }
    
    if (glossaryTerms.length < 100) {
      console.error("🔍 Critical - glossaryTerms direct import contains too few items!");
      
      toast.error(
        "Glossary data issue detected. Only showing a limited set of terms. Please check the diagnostic page.",
        { duration: 5000 }
      );
    }
  }, []);
  
  // Notify on initial load about total terms
  useEffect(() => {
    console.log(`Displaying ${filteredTerms.length} terms out of ${totalTermsCount} total glossary terms`);
    if (totalTermsCount < 100) {
      console.warn("Warning: The glossary terms count seems low. Expected 335+ terms but found:", totalTermsCount);
    }
  }, [filteredTerms.length, totalTermsCount]);

  // Change data source
  const switchDataSource = (source: "original" | "new" | "temp") => {
    setDataSource(source);
    localStorage.setItem("glossary_data_source", source);
    
    // Reload with the new source parameter
    const url = new URL(window.location.href);
    url.searchParams.set("source", source);
    url.searchParams.set("v", VERSION); // Add version to bust cache
    window.location.href = url.toString();
  };

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
          {/* Advanced diagnostic component */}
          <GlossaryDiagnosticPage />
          
          {/* Original diagnostic component */}
          <GlossaryDataTest />
          
          {/* Data source selection controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6 p-4 bg-gray-50 rounded-lg border">
            <div>
              <h3 className="font-bold mb-2">Current Data Source: <span className="text-primary">{dataSource}</span></h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={dataSource === "original" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => switchDataSource("original")}
                >
                  Use Original Data
                </Button>
                <Button 
                  variant={dataSource === "new" ? "default" : "outline"}
                  size="sm" 
                  onClick={() => switchDataSource("new")}
                >
                  Use New Data
                </Button>
                <Button 
                  variant={dataSource === "temp" ? "default" : "outline"}
                  size="sm" 
                  onClick={() => switchDataSource("temp")}
                >
                  Use Temp Data
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Debug Mode</h3>
              <Button 
                variant={useDebugMode ? "default" : "outline"}
                onClick={() => {
                  setUseDebugMode(!useDebugMode);
                  toast.info(useDebugMode ? 
                    "Switched to regular mode" : 
                    "Switched to debug mode"
                  );
                }}
              >
                {useDebugMode ? "Disable Debug" : "Enable Debug"}
              </Button>
            </div>
          </div>
          
          {/* Display a warning banner if data issue is detected */}
          {totalTermsCount < 100 && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
              <div className="flex">
                <div className="py-1">
                  <svg className="h-6 w-6 text-yellow-500 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">Data Loading Issue</p>
                  <p className="text-sm">
                    The glossary is currently displaying a limited set of {totalTermsCount} terms 
                    instead of the expected 335+ terms. This may be due to a data loading issue.
                    <br />
                    <span className="font-bold">
                      Current data source: {dataSource}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

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

              {/* Advanced troubleshooting actions */}
              <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
                <h3 className="font-bold mb-2">Troubleshooting Tools</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.reload();
                      toast.info("Refreshing page...");
                    }}
                  >
                    Refresh Page
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      const timestamp = new Date().getTime();
                      window.location.href = `${window.location.pathname}?nocache=${timestamp}`;
                      toast.info("Forcing cache refresh...");
                    }}
                  >
                    Clear Cache
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = window.location.pathname + "?debug=true";
                      toast.info("Loading with debug mode...");
                    }}
                  >
                    Debug Mode
                  </Button>
                  
                  <Button
                    variant="destructive"
                    onClick={() => {
                      localStorage.clear();
                      sessionStorage.clear();
                      caches.keys().then(names => {
                        for (let name of names) caches.delete(name);
                      });
                      window.location.reload();
                      toast.info("Clearing all caches...");
                    }}
                  >
                    Reset All
                  </Button>
                </div>
              </div>

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
