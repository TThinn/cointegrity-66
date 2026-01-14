import { BlogArticle } from "@/data/blogData";

export const getBlogArticleStructuredData = (article: BlogArticle) => {
  const baseUrl = "https://cointegrity.io";
  const articleUrl = `${baseUrl}/blog/${article.slug}/`;
  
  // Convert content to plain text for articleBody
  const plainTextContent = article.content
    .replace(/#{1,6}\s/g, '') // Remove markdown headers
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\*/g, '') // Remove italic markers
    .replace(/>\s/g, '') // Remove blockquote markers
    .replace(/---/g, '') // Remove horizontal rules
    .trim();
  
  // Calculate word count
  const wordCount = plainTextContent.split(/\s+/).length;
  
  // Article structured data
  const article_schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "alternativeHeadline": article.subtitle || article.title,
    "description": article.excerpt,
    "articleBody": plainTextContent,
    "author": {
      "@type": "Person",
      "name": article.author.name,
      ...(article.author.avatar && { "image": article.author.avatar }),
      "jobTitle": "Web3 Expert",
      "worksFor": {
        "@type": "Organization",
        "name": "Cointegrity"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cointegrity",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/lovable-uploads/9ca9c0de-2ebc-43b5-a35f-f02844a4d3da.png`
      },
      "description": "Leading Web3 consultancy in Europe with global reach"
    },
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    ...(article.featuredImage && {
      "image": {
        "@type": "ImageObject",
        "url": article.featuredImage,
        "caption": article.title
      }
    }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    },
    "url": articleUrl,
    "keywords": article.tags.join(', '),
    "articleSection": article.category,
    "wordCount": wordCount,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "isPartOf": {
      "@type": "Blog",
      "@id": `${baseUrl}/blog/`,
      "name": "Cointegrity Blog - The Crypto Circuit",
      "description": "Leading Web3 insights from European market leaders"
    },
    ...(article.substackUrl && {
      "sameAs": article.substackUrl
    })
  };
  
  // Breadcrumb structured data
  const breadcrumb_schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl}/blog/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": articleUrl
      }
    ]
  };
  
  return {
    article: article_schema,
    breadcrumb: breadcrumb_schema
  };
};
