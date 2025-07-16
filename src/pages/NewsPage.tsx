import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/ui/Container';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { NewsCard } from '@/components/news/NewsCard';
import { NewsFilters } from '@/components/news/NewsFilters';
import { Button } from '@/components/ui/button';
import { ExternalLink, Rss } from 'lucide-react';
import { newsData, NewsItem } from '@/data/newsData';

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from news data
  const availableTags = useMemo(() => {
    const allTags = newsData.flatMap(item => item.tags);
    return Array.from(new Set(allTags)).sort();
  }, []);

  // Filter news based on search, category, and tags
  const filteredNews = useMemo(() => {
    return newsData.filter((item: NewsItem) => {
      // Search filter
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.content.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => item.tags.includes(tag))) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedTags]);

  const featuredNews = filteredNews.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <>
      <Helmet>
        <title>News & Updates - Cointegrity | Latest Blockchain Intelligence News</title>
        <meta 
          name="description" 
          content="Stay updated with the latest news from Cointegrity. Read about our partnerships, product updates, events, and industry insights in blockchain intelligence and cryptocurrency compliance."
        />
        <meta name="keywords" content="Cointegrity news, blockchain intelligence updates, cryptocurrency compliance news, fintech partnerships, blockchain events" />
        
        {/* Open Graph */}
        <meta property="og:title" content="News & Updates - Cointegrity" />
        <meta property="og:description" content="Stay updated with the latest news from Cointegrity. Read about our partnerships, product updates, events, and industry insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cointegrity.com/news" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News & Updates - Cointegrity" />
        <meta name="twitter:description" content="Stay updated with the latest news from Cointegrity. Read about our partnerships, product updates, events, and industry insights." />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://cointegrity.com/news" />
      </Helmet>

      <SectionContainer className="py-12">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">News & Updates</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stay informed about the latest developments at Cointegrity, including partnerships, 
              product updates, industry events, and thought leadership in blockchain intelligence.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild>
                <a 
                  href="https://www.linkedin.com/company/cointegrity/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Follow on LinkedIn
                </a>
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Rss className="h-4 w-4" />
                Subscribe to Updates
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <NewsFilters
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  selectedTags={selectedTags}
                  onSearchChange={setSearchQuery}
                  onCategoryChange={setSelectedCategory}
                  onTagToggle={handleTagToggle}
                  onClearFilters={handleClearFilters}
                  availableTags={availableTags}
                />
              </div>
            </div>

            {/* News Content */}
            <div className="lg:col-span-3">
              {filteredNews.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No news found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms to find more articles.
                  </p>
                  <Button onClick={handleClearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="space-y-12">
                  {/* Featured News */}
                  {featuredNews.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold mb-6">Featured</h2>
                      <div className="grid gap-8">
                        {featuredNews.map((item) => (
                          <NewsCard key={item.id} news={item} variant="featured" />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Regular News */}
                  {regularNews.length > 0 && (
                    <section>
                      <h2 className="text-2xl font-bold mb-6">
                        {featuredNews.length > 0 ? 'Latest News' : 'All News'}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {regularNews.map((item) => (
                          <NewsCard key={item.id} news={item} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </SectionContainer>
    </>
  );
};

export default NewsPage;