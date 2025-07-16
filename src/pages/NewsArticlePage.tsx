import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, ArrowLeft, ExternalLink, Share2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import { SectionContainer } from '@/components/ui/SectionContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { NewsCard } from '@/components/news/NewsCard';
import { newsData } from '@/data/newsData';

export const NewsArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const article = newsData.find(item => item.id === id);
  
  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const relatedArticles = newsData
    .filter(item => 
      item.id !== article.id && 
      (item.category === article.category || 
       item.tags.some(tag => article.tags.includes(tag)))
    )
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      partnership: 'bg-primary text-primary-foreground',
      event: 'bg-accent text-accent-foreground',
      update: 'bg-secondary text-secondary-foreground',
      announcement: 'bg-muted text-muted-foreground'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Helmet>
        <title>{article.title} - Cointegrity News</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={`Cointegrity, ${article.tags.join(', ')}, blockchain intelligence, cryptocurrency compliance`} />
        <meta name="author" content={article.author} />
        
        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://cointegrity.com/news/${article.id}`} />
        {article.image && <meta property="og:image" content={article.image} />}
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:author" content={article.author} />
        <meta property="article:section" content={article.category} />
        {article.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        {article.image && <meta name="twitter:image" content={article.image} />}
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://cointegrity.com/news/${article.id}`} />
      </Helmet>

      <SectionContainer className="py-8">
        <Container>
          {/* Breadcrumb */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="pl-0">
              <Link to="/news" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Article */}
            <article className="lg:col-span-2">
              {/* Article Header */}
              <header className="space-y-6 mb-8">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className={getCategoryColor(article.category)}>
                    {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                  </Badge>
                  {article.featured && (
                    <Badge className="bg-gradient-primary text-white">
                      Featured
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {article.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{article.readingTime} min read</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                    {article.linkedinUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={article.linkedinUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          LinkedIn
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {article.image && (
                <div className="mb-8">
                  <OptimizedImage
                    src={article.image}
                    alt={article.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="font-semibold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-bold text-lg mb-6">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <NewsCard 
                        key={relatedArticle.id} 
                        news={relatedArticle} 
                        variant="compact" 
                      />
                    ))}
                  </div>
                </Card>
              )}

              {/* Newsletter Signup */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Follow us on LinkedIn for the latest news and updates from Cointegrity.
                </p>
                <Button className="w-full" asChild>
                  <a 
                    href="https://www.linkedin.com/company/cointegrity/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Follow on LinkedIn
                  </a>
                </Button>
              </Card>

              {/* Back to News */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">More News</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Explore more articles and updates from Cointegrity.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/news">
                    View All News
                  </Link>
                </Button>
              </Card>
            </aside>
          </div>
        </Container>
      </SectionContainer>
    </>
  );
};