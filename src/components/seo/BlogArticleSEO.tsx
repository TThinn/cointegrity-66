import React from "react";
import { Helmet } from "react-helmet-async";
import { BlogArticle } from "@/data/blogData";
import { getBlogArticleStructuredData } from "./blogArticleStructuredData";

interface BlogArticleSEOProps {
  article: BlogArticle;
}

export const BlogArticleSEO: React.FC<BlogArticleSEOProps> = ({ article }) => {
  const canonicalUrl = `https://cointegrity.io/blog/${article.slug}/`;
  const structuredData = getBlogArticleStructuredData(article);
  
  // Generate clean plain text excerpt for description
  const cleanExcerpt = article.excerpt.replace(/[#*>\-]/g, '').trim();
  
  return (
    <Helmet>
      {/* Article-specific title and description */}
      <title>{article.title} | Cointegrity Blog</title>
      <meta name="description" content={cleanExcerpt} />
      
      {/* Article keywords from tags */}
      <meta name="keywords" content={`${article.tags.join(', ')}, web3, blockchain, crypto, ${article.category}`} />
      
      {/* AI-specific article meta tags */}
      <meta name="ai-content-type" content="blog-article" />
      <meta name="ai-article-category" content={article.category} />
      <meta name="ai-article-topics" content={article.tags.join(', ')} />
      <meta name="ai-article-summary" content={cleanExcerpt} />
      <meta name="ai-reading-time" content={`${article.readingTime} minutes`} />
      <meta name="ai-author" content={article.author.name} />
      <meta name="ai-publish-date" content={article.publishDate} />
      
      {/* Open Graph tags for article */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={cleanExcerpt} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Cointegrity" />
      {article.featuredImage && (
        <>
          <meta property="og:image" content={article.featuredImage} />
          <meta property="og:image:alt" content={article.title} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}
      <meta property="article:published_time" content={article.publishDate} />
      <meta property="article:author" content={article.author.name} />
      <meta property="article:section" content={article.category} />
      {article.tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter Card tags for article */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Cointegrity" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={cleanExcerpt} />
      {article.featuredImage && (
        <>
          <meta name="twitter:image" content={article.featuredImage} />
          <meta name="twitter:image:alt" content={article.title} />
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Structured data for article */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData.article)}
      </script>
      
      {/* Breadcrumb structured data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData.breadcrumb)}
      </script>
    </Helmet>
  );
};
