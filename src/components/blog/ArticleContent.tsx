import React from "react";
import { Calendar, Clock, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogArticle } from "@/data/blogData";
import NewsletterCTA from "./NewsletterCTA";
import { linkGlossaryTerms } from "@/utils/glossaryLinking";

interface ArticleContentProps {
  article: BlogArticle;
}

const ArticleContent = ({ article }: ArticleContentProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((paragraph, index) => {
        if (paragraph.trim() === '') return null;
        
        // Handle headers
        if (paragraph.startsWith('## ')) {
          const headerText = linkGlossaryTerms(paragraph.substring(3));
          return (
            <h2 
              key={index} 
              className="text-2xl font-bold text-white mt-8 mb-4"
              dangerouslySetInnerHTML={{ __html: headerText }}
            />
          );
        }
        
        if (paragraph.startsWith('### ')) {
          const headerText = linkGlossaryTerms(paragraph.substring(4));
          return (
            <h3 
              key={index} 
              className="text-xl font-bold text-white mt-6 mb-3"
              dangerouslySetInnerHTML={{ __html: headerText }}
            />
          );
        }
        
        // Handle blockquotes
        if (paragraph.startsWith('> ')) {
          const quoteText = linkGlossaryTerms(paragraph.substring(2));
          return (
            <blockquote 
              key={index} 
              className="border-l-4 border-pink-500 pl-4 my-4 text-white/90 italic bg-white/5 p-4 rounded-r-lg"
              dangerouslySetInnerHTML={{ __html: quoteText }}
            />
          );
        }
        
        // Handle bold text
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          const boldText = linkGlossaryTerms(paragraph.substring(2, paragraph.length - 2));
          return (
            <p 
              key={index} 
              className="text-white/90 mb-4 font-bold"
              dangerouslySetInnerHTML={{ __html: boldText }}
            />
          );
        }
        
        // Handle horizontal rules
        if (paragraph.trim() === '---') {
          return <hr key={index} className="border-white/20 my-8" />;
        }
        
        // Handle italics
        if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
          const italicText = linkGlossaryTerms(paragraph.substring(1, paragraph.length - 1));
          return (
            <p 
              key={index} 
              className="text-white/80 mb-4 italic text-center"
              dangerouslySetInnerHTML={{ __html: italicText }}
            />
          );
        }
        
        // Regular paragraphs with glossary linking
        const linkedText = linkGlossaryTerms(paragraph);
        return (
          <p 
            key={index} 
            className="text-white/90 mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: linkedText }}
          />
        );
      })
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-[#010822] pt-24">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back navigation */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Article header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-white/70">
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

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          
          {article.subtitle && (
            <p className="text-xl text-pink-400 font-medium mb-6">
              {article.subtitle}
            </p>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {article.author.avatar && (
                <img 
                  src={article.author.avatar} 
                  alt={article.author.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="text-white font-medium">
                  {article.author.name}
                </p>
                <p className="text-white/60 text-sm">
                  Cointegrity Expert
                </p>
              </div>
            </div>

            {article.substackUrl && (
              <a 
                href={article.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View on Substack
              </a>
            )}
          </div>

          {article.featuredImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={article.featuredImage} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          )}
        </header>

        {/* Article content */}
        <div className="prose prose-lg prose-invert max-w-none">
          {formatContent(article.content)}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/20">
          {article.tags.map((tag, index) => (
            <span 
              key={index}
              className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Newsletter CTA */}
        <NewsletterCTA />
      </div>
    </div>
  );
};

export default ArticleContent;