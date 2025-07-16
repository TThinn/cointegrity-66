import React from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SeoHead } from "@/components/seo/SeoHead";
import { useSectionTracking } from "@/hooks/useSectionTracking";
import ArticleContent from "@/components/blog/ArticleContent";
import { getBlogArticleBySlug, type BlogArticle } from "@/data/blogData";

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentPath, currentHash } = useSectionTracking();
  
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-[#010822] overflow-x-hidden">
      <SeoHead 
        currentPath={currentPath} 
        currentHash={currentHash}
      />
      <Header />
      <ArticleContent article={article} />
      <Footer />
    </div>
  );
};

export default BlogArticlePage;