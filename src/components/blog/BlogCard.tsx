import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { BlogArticle } from "@/data/blogData";

interface BlogCardProps {
  article: BlogArticle;
}

const BlogCard = ({ article }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
      {article.featuredImage && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
        <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
          {article.category}
        </span>
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(article.publishDate)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{article.readingTime} min read</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
        <Link to={`/blog/${article.slug}/`}>
          {article.title}
        </Link>
      </h2>
      
      {article.subtitle && (
        <p className="text-pink-400 font-medium mb-3">
          {article.subtitle}
        </p>
      )}

      <p className="text-white/80 mb-4 line-clamp-3">
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {article.author.avatar && (
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-white/70 text-sm">
            By {article.author.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link 
            to={`/blog/${article.slug}/`}
            className="text-pink-400 hover:text-pink-300 transition-colors text-sm font-medium"
          >
            Read More →
          </Link>
          {article.substackUrl && (
            <a 
              href={article.substackUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white/80 transition-colors"
              title="View on Substack"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {article.tags.map((tag, index) => (
          <span 
            key={index}
            className="text-xs bg-white/5 text-white/60 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
};

export default BlogCard;