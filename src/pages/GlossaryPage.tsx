
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SeoHead } from "@/components/seo/SeoHead";
import { useLocation } from "react-router-dom";
import { glossaryTerms } from "@/data/glossaryTerms";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Define category types for proper filtering - this should match your glossaryTerms.ts type
type CategoryType = 
  | "blockchain" 
  | "web3" 
  | "ai" 
  | "regulatory" 
  | "tokenomics" 
  | "gaming" 
  | "strategy"
  | "defi"
  | "nft"
  | "dao"
  | "identity"
  | "infrastructure"
  | "security"
  | "metaverse";

// Category metadata for display
const categoryMeta = [
  { value: "all", label: "All Terms", description: "Browse all glossary terms" },
  { value: "blockchain", label: "Blockchain", description: "Core blockchain concepts" },
  { value: "web3", label: "Web3", description: "Decentralized web concepts" },
  { value: "ai", label: "AI", description: "Artificial intelligence concepts" },
  { value: "regulatory", label: "Regulatory", description: "Compliance and regulation" },
  { value: "tokenomics", label: "Tokenomics", description: "Token economics" },
  { value: "gaming", label: "Gaming", description: "Blockchain gaming" },
  { value: "strategy", label: "Strategy", description: "Strategic implementation" },
  { value: "defi", label: "DeFi", description: "Decentralized finance" },
  { value: "nft", label: "NFTs", description: "Non-fungible tokens" },
  { value: "dao", label: "DAOs", description: "Decentralized organizations" },
  { value: "identity", label: "Identity", description: "Digital identity solutions" },
  { value: "infrastructure", label: "Infrastructure", description: "Web3 infrastructure" },
  { value: "security", label: "Security", description: "Blockchain security" },
  { value: "metaverse", label: "Metaverse", description: "Virtual worlds" }
];

const GlossaryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "all">("all");
  const [activeTab, setActiveTab] = useState<string>("categories");
  const location = useLocation();
  
  // Sort terms alphabetically
  const sortedTerms = [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));

  // Filter terms based on search and category
  const filteredTerms = sortedTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || term.categories.includes(activeCategory as CategoryType);
    return matchesSearch && matchesCategory;
  });

  // Group terms by first letter for alphabetical index
  const groupedTerms = filteredTerms.reduce((acc, term) => {
    const firstLetter = term.term.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, typeof glossaryTerms>);

  // Extract all letters that have terms
  const letters = Object.keys(groupedTerms).sort();

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
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>

              <Tabs defaultValue="categories" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="categories">Categories</TabsTrigger>
                  <TabsTrigger value="all">All Terms</TabsTrigger>
                </TabsList>
                
                <TabsContent value="categories" className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {categoryMeta.map((category) => (
                      <Card 
                        key={category.value} 
                        className={cn(
                          "cursor-pointer transition-all",
                          activeCategory === category.value ? "border-primary" : "hover:border-primary/50"
                        )}
                        onClick={() => setActiveCategory(category.value as CategoryType | "all")}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{category.label}</h3>
                          {category.value !== "all" && (
                            <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
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
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categoryMeta.slice(1).map((category) => (
                      <Button
                        key={category.value}
                        variant={activeCategory === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category.value as CategoryType)}
                        className="rounded-full"
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {searchTerm && filteredTerms.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p>No terms match your search criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {letters.map((letter) => (
                    <div key={letter} id={`section-${letter}`} className="mb-8">
                      <div className="sticky top-0 bg-background z-10 py-2">
                        <h2 className="text-2xl font-bold">{letter}</h2>
                        <Separator className="my-2" />
                      </div>
                      
                      <div className="space-y-4">
                        {groupedTerms[letter].map((term, index) => (
                          <Card key={`${term.term}-${index}`}>
                            <CardHeader className="pb-2">
                              <div className="flex justify-between items-start flex-wrap">
                                <CardTitle className="text-xl" id={term.term.toLowerCase().replace(/\s+/g, '-')}>
                                  {term.term}
                                </CardTitle>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {term.categories.map((category) => (
                                    <Badge key={category} variant="outline" className="text-xs">
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="text-sm pb-4">
                              <p dangerouslySetInnerHTML={{ __html: term.definition }} />
                              {term.related && term.related.length > 0 && (
                                <div className="mt-3">
                                  <span className="text-xs font-semibold">Related terms: </span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {term.related.map((relatedTerm) => (
                                      <a 
                                        key={relatedTerm} 
                                        href={`#${relatedTerm.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-xs text-primary hover:underline"
                                      >
                                        {relatedTerm}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="lg:w-1/4">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Alphabetical Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => {
                        const hasTerms = letters.includes(letter);
                        return (
                          <Button
                            key={letter}
                            variant={hasTerms ? "outline" : "ghost"}
                            size="sm"
                            disabled={!hasTerms}
                            onClick={() => hasTerms && scrollToSection(letter)}
                            className={cn(
                              "w-8 h-8 p-0",
                              !hasTerms && "opacity-30"
                            )}
                          >
                            {letter}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-1 px-1">
                      {letters.map((letter) => (
                        <div key={`nav-${letter}`} className="mb-2">
                          <div className="font-bold mb-1">{letter}</div>
                          <div className="pl-2 space-y-1">
                            {groupedTerms[letter].map((term) => (
                              <a
                                key={`link-${term.term}`}
                                href={`#${term.term.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block text-sm hover:text-primary truncate"
                              >
                                {term.term}
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Need Expert Guidance on Web3, Blockchain or AI?</h3>
            <p className="mb-6">Our consultants specialize in translating complex concepts into actionable strategies for your business.</p>
            <Button size="lg" asChild>
              <a href="/contact">Contact Our Experts</a>
            </Button>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
};

export default GlossaryPage;
