import { Link } from 'react-router-dom';
import { Calendar, Clock, ExternalLink, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { NewsItem } from '@/data/newsData';

interface NewsCardProps {
  news: NewsItem;
  variant?: 'default' | 'featured' | 'compact';
}

export const NewsCard = ({ news, variant = 'default' }: NewsCardProps) => {
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

  if (variant === 'featured') {
    return (
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="relative">
          {news.image && (
            <div className="relative h-64 overflow-hidden">
              <OptimizedImage
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <Badge className={`absolute top-4 left-4 ${getCategoryColor(news.category)}`}>
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </Badge>
              {news.featured && (
                <Badge className="absolute top-4 right-4 bg-gradient-primary text-white">
                  Featured
                </Badge>
              )}
            </div>
          )}
        </div>
        
        <CardHeader className="space-y-4">
          <h2 className="text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {news.title}
          </h2>
          <p className="text-muted-foreground line-clamp-3 text-base leading-relaxed">
            {news.excerpt}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {news.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between items-center pt-6 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(news.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{news.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{news.author}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            {news.linkedinUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={news.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  LinkedIn
                </a>
              </Button>
            )}
            <Button asChild>
              <Link to={`/news/${news.id}`}>Read More</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow group">
        <div className="flex gap-4">
          {news.image && (
            <div className="flex-shrink-0">
              <OptimizedImage
                src={news.image}
                alt={news.title}
                className="w-24 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className={`${getCategoryColor(news.category)} text-xs`}>
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">{formatDate(news.publishedAt)}</span>
            </div>
            <Link to={`/news/${news.id}`}>
              <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {news.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {news.excerpt}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {news.image && (
        <div className="relative h-48 overflow-hidden">
          <OptimizedImage
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <Badge className={`absolute top-3 left-3 ${getCategoryColor(news.category)}`}>
            {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
          </Badge>
          {news.featured && (
            <Badge className="absolute top-3 right-3 bg-gradient-primary text-white">
              Featured
            </Badge>
          )}
        </div>
      )}
      
      <CardHeader>
        <Link to={`/news/${news.id}`}>
          <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {news.title}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {news.excerpt}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1">
          {news.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center text-xs text-muted-foreground border-t pt-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(news.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{news.readingTime} min</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          {news.linkedinUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a href={news.linkedinUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link to={`/news/${news.id}`}>Read</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};