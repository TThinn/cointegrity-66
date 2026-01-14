import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGlossaryData } from '@/components/glossary/hooks/useGlossaryData';
import { GlossaryEnhancedSEO } from '@/components/seo/GlossaryEnhancedSEO';
import ContactForm from '@/components/ContactForm';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const GlossaryTermPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { filteredTerms, isLoading } = useGlossaryData('', 'all', 'original');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Container className="py-24">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  // Find the term by slug
  const term = filteredTerms.find(t => 
    t.term.toLowerCase().replace(/[^a-z0-9]/g, '-') === slug
  );

  if (!term) {
    return <Navigate to="/glossary/" replace />;
  }

  const termSlug = term.term.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const canonicalUrl = `https://cointegrity.io/glossary/${termSlug}/`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{term.term} | Web3 Glossary | Cointegrity</title>
        <meta 
          name="description" 
          content={`Learn about ${term.term}: ${term.definition.substring(0, 150)}...`} 
        />
        <meta name="keywords" content={`${term.term}, ${term.categories?.join(', ')}, Web3, blockchain, cryptocurrency, glossary`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${term.term} | Web3 Glossary | Cointegrity`} />
        <meta property="og:description" content={`Learn about ${term.term}: ${term.definition.substring(0, 150)}...`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${term.term} | Web3 Glossary`} />
        <meta name="twitter:description" content={`Learn about ${term.term}: ${term.definition.substring(0, 150)}...`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "DefinedTerm",
            "name": term.term,
            "description": term.definition,
            "inDefinedTermSet": {
              "@type": "DefinedTermSet",
              "name": "Cointegrity Web3 Glossary",
              "description": "Comprehensive Web3 and blockchain terminology",
              "url": "https://cointegrity.io/glossary/"
            },
            "url": canonicalUrl,
            "category": term.categories?.[0] || "Web3",
            "mainEntity": {
              "@type": "Article",
              "headline": term.term,
              "description": term.definition,
              "author": {
                "@type": "Organization",
                "name": "Cointegrity",
                "url": "https://cointegrity.io"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Cointegrity",
                "url": "https://cointegrity.io"
              }
            }
          })}
        </script>
      </Helmet>

      <GlossaryEnhancedSEO currentPath={`/glossary/${termSlug}`} totalTermsCount={filteredTerms.length} />
      
      <Header />
      
      <main className="py-24">
        <Container>
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              to="/glossary/" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Glossary
            </Link>
          </nav>

          {/* Term Content */}
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-foreground">
                      {term.term}
                    </h1>
                    {term.categories?.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="prose prose-lg max-w-none text-foreground">
                    <p className="text-xl leading-relaxed mb-6">
                      {term.definition}
                    </p>
                  </div>
                </div>

                {/* Additional Context */}
                <div className="border-t pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Related Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Categories</h3>
                      <p className="text-muted-foreground">{term.categories?.join(', ') || 'Web3'}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Key Concepts</h3>
                      <p className="text-muted-foreground">
                        This term is part of our comprehensive Web3 and blockchain glossary.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Share Section */}
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-semibold mb-3">Share this definition</h3>
                  <div className="flex items-center gap-4">
                    <a 
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Learn about ${term.term}: ${term.definition.substring(0, 100)}...`)}&url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      Share on Twitter
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                    >
                      Share on LinkedIn
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Terms */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Explore More Terms</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTerms
                    .filter(t => t.categories?.some(cat => term.categories?.includes(cat)) && t.term !== term.term)
                    .slice(0, 6)
                    .map((relatedTerm) => {
                      const relatedSlug = relatedTerm.term.toLowerCase().replace(/[^a-z0-9]/g, '-');
                      return (
                        <Link
                          key={relatedTerm.term}
                          to={`/glossary/${relatedSlug}/`}
                          className="block p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                        >
                          <h3 className="font-semibold mb-2">{relatedTerm.term}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedTerm.definition.substring(0, 100)}...
                          </p>
                        </Link>
                      );
                    })}
                </div>
                
                <div className="mt-6 text-center">
                  <Link 
                    to="/glossary/"
                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                  >
                    View all terms in our glossary
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </main>

      <ContactForm />
      <Footer />
    </div>
  );
};

export default GlossaryTermPage;