import { 
  escapeHtml, 
  stripMarkdown, 
  markdownToHtml, 
  truncateText, 
  generateCanonicalUrl,
  formatDate,
  generateSlug,
  BASE_URL
} from './utils';

interface BlogArticle {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishDate: string;
  category: string;
  readingTime: number;
  tags: string[];
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface GlossaryTerm {
  term: string;
  definition: string;
  categories: string[];
  related?: string[];
  trending?: number;
}

/**
 * Generate the HTML document wrapper
 */
const generateHtmlWrapper = (
  title: string,
  description: string,
  canonicalUrl: string,
  structuredData: object,
  bodyContent: string,
  redirectPath: string,
  ogType: string = 'article',
  additionalMeta: string = ''
): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(truncateText(description, 155))}">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(truncateText(description, 155))}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Cointegrity">
  <meta property="og:image" content="${BASE_URL}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(truncateText(description, 155))}">
  <meta name="twitter:image" content="${BASE_URL}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png">
  
  ${additionalMeta}
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; color: #333; }
    h1 { color: #1a1a2e; margin-bottom: 0.5em; }
    h2 { color: #16213e; margin-top: 1.5em; }
    h3 { color: #0f3460; }
    a { color: #00cc88; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .meta { color: #666; font-size: 0.9em; margin-bottom: 2em; }
    .related { margin-top: 2em; padding-top: 1em; border-top: 1px solid #eee; }
    .related ul { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 10px; }
    .related li a { background: #f0f0f0; padding: 5px 12px; border-radius: 20px; font-size: 0.9em; }
    .cta { margin-top: 3em; padding: 20px; background: linear-gradient(135deg, #00cc88, #00a070); color: white; border-radius: 8px; text-align: center; }
    .cta a { color: white; font-weight: bold; }
  </style>
</head>
<body>
  <header>
    <a href="/" aria-label="Cointegrity Home">
      <img src="/lovable-uploads/Cointegrity_Logo_White_Header.png" alt="Cointegrity" width="150" height="40" style="background: #1a1a2e; padding: 10px; border-radius: 4px;">
    </a>
  </header>
  
  <main>
${bodyContent}
  </main>
  
  <footer style="margin-top: 3em; padding-top: 2em; border-top: 1px solid #eee; text-align: center; color: #666;">
    <p>&copy; ${new Date().getFullYear()} Cointegrity. All rights reserved.</p>
    <p><a href="/glossary/">Web3 Glossary</a> | <a href="/blog/">Blog</a> | <a href="/#contact">Contact</a></p>
  </footer>
  
  <!-- Redirect JS-enabled browsers to React app for full experience -->
  <script>
    if (typeof window !== 'undefined') {
      window.location.replace('${redirectPath}' + window.location.hash);
    }
  </script>
  
  <noscript>
    <div class="cta">
      <p>For the best experience with interactive features, <a href="${redirectPath}">view this page</a> with JavaScript enabled.</p>
    </div>
  </noscript>
</body>
</html>`;
};

/**
 * Generate HTML for a blog article
 */
export const generateBlogArticleHtml = (article: BlogArticle): string => {
  const title = article.seoTitle || `${article.title} | Cointegrity`;
  const description = article.seoDescription || article.excerpt;
  const canonicalUrl = generateCanonicalUrl(`/blog/${article.slug}`);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Person",
      "name": article.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cointegrity",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`
      }
    },
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": article.tags.join(", "),
    "articleSection": article.category
  };
  
  const additionalMeta = `
  <meta property="article:published_time" content="${article.publishDate}">
  <meta property="article:author" content="${escapeHtml(article.author.name)}">
  <meta property="article:section" content="${escapeHtml(article.category)}">
  ${article.tags.map(tag => `<meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n  ')}`;
  
  const bodyContent = `
    <article itemscope itemtype="https://schema.org/Article">
      <header>
        <h1 itemprop="headline">${escapeHtml(article.title)}</h1>
        ${article.subtitle ? `<p style="font-size: 1.2em; color: #666;">${escapeHtml(article.subtitle)}</p>` : ''}
        <div class="meta">
          <span itemprop="author" itemscope itemtype="https://schema.org/Person">
            By <span itemprop="name">${escapeHtml(article.author.name)}</span>
          </span>
          &bull;
          <time itemprop="datePublished" datetime="${article.publishDate}">${formatDate(article.publishDate)}</time>
          &bull;
          <span>${article.readingTime} min read</span>
          &bull;
          <span itemprop="articleSection">${escapeHtml(article.category)}</span>
        </div>
      </header>
      
      <div itemprop="articleBody">
        ${markdownToHtml(article.content)}
      </div>
      
      <div class="related">
        <h3>Topics Covered</h3>
        <ul>
          ${article.tags.map(tag => `<li><a href="/glossary/${generateSlug(tag)}/">${escapeHtml(tag)}</a></li>`).join('\n          ')}
        </ul>
      </div>
      
      <div class="cta">
        <p>Want more Web3 insights? <a href="/#contact">Get in touch</a> with our experts.</p>
      </div>
    </article>`;
  
  return generateHtmlWrapper(
    title,
    description,
    canonicalUrl,
    structuredData,
    bodyContent,
    `/blog/${article.slug}/`,
    'article',
    additionalMeta
  );
};

/**
 * Generate HTML for a glossary term
 */
export const generateGlossaryTermHtml = (term: GlossaryTerm): string => {
  const slug = generateSlug(term.term);
  const title = `${term.term} - Web3 Glossary | Cointegrity`;
  const description = stripMarkdown(term.definition);
  const canonicalUrl = generateCanonicalUrl(`/glossary/${slug}`);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.term,
    "description": stripMarkdown(term.definition),
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Cointegrity Web3 Glossary",
      "url": `${BASE_URL}/glossary/`
    }
  };
  
  const relatedTermsHtml = term.related && term.related.length > 0
    ? `
      <div class="related">
        <h2>Related Terms</h2>
        <ul>
          ${term.related.map(r => `<li><a href="/glossary/${generateSlug(r)}/">${escapeHtml(r)}</a></li>`).join('\n          ')}
        </ul>
      </div>`
    : '';
  
  const categoriesHtml = term.categories.length > 0
    ? `
      <div style="margin-top: 1em;">
        <strong>Categories:</strong> ${term.categories.map(c => c.replace(/_/g, ' ')).join(', ')}
      </div>`
    : '';
  
  const bodyContent = `
    <article itemscope itemtype="https://schema.org/DefinedTerm">
      <nav style="margin-bottom: 1em; font-size: 0.9em;">
        <a href="/">Home</a> &gt; <a href="/glossary/">Glossary</a> &gt; <span>${escapeHtml(term.term)}</span>
      </nav>
      
      <h1 itemprop="name">${escapeHtml(term.term)}</h1>
      
      <div itemprop="description">
        <p>${escapeHtml(term.definition)}</p>
      </div>
      
      ${categoriesHtml}
      ${relatedTermsHtml}
      
      <div class="cta">
        <p>Need help navigating Web3? <a href="/#contact">Contact our experts</a> for guidance.</p>
      </div>
    </article>`;
  
  return generateHtmlWrapper(
    title,
    description,
    canonicalUrl,
    structuredData,
    bodyContent,
    `/glossary/${slug}/`,
    'article'
  );
};

/**
 * Generate HTML for the blog index page
 */
export const generateBlogIndexHtml = (articles: BlogArticle[]): string => {
  const title = 'Web3 Blog - Crypto Circuit Weekly | Cointegrity';
  const description = 'Expert analysis and insights on blockchain, cryptocurrency, and Web3 developments. Weekly intelligence reports on regulation, infrastructure, and market trends.';
  const canonicalUrl = generateCanonicalUrl('/blog');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Cointegrity Web3 Blog",
    "description": description,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Cointegrity",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/lovable-uploads/68d5ee22-66d4-4e4d-b0dc-e03f0a45adab.png`
      }
    },
    "blogPost": articles.slice(0, 10).map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "url": `${BASE_URL}/blog/${article.slug}/`,
      "datePublished": article.publishDate
    }))
  };
  
  const articlesHtml = articles.map(article => `
    <article style="margin-bottom: 2em; padding-bottom: 2em; border-bottom: 1px solid #eee;">
      <h2><a href="/blog/${article.slug}/">${escapeHtml(article.title)}</a></h2>
      ${article.subtitle ? `<p style="color: #666; font-style: italic;">${escapeHtml(article.subtitle)}</p>` : ''}
      <div class="meta">
        <time datetime="${article.publishDate}">${formatDate(article.publishDate)}</time>
        &bull; ${article.readingTime} min read
        &bull; ${escapeHtml(article.category)}
      </div>
      <p>${escapeHtml(article.excerpt)}</p>
      <a href="/blog/${article.slug}/" style="font-weight: bold;">Read more →</a>
    </article>
  `).join('\n');
  
  const bodyContent = `
    <h1>Web3 Blog</h1>
    <p style="font-size: 1.1em; color: #666;">Expert analysis and insights on blockchain, cryptocurrency, and Web3 developments.</p>
    
    <div style="margin-top: 2em;">
      ${articlesHtml}
    </div>
    
    <div class="cta">
      <p>Stay informed with our weekly intelligence reports. <a href="/#contact">Subscribe</a> for updates.</p>
    </div>`;
  
  return generateHtmlWrapper(
    title,
    description,
    canonicalUrl,
    structuredData,
    bodyContent,
    '/blog/',
    'website'
  );
};

/**
 * Generate HTML for the glossary index page
 */
export const generateGlossaryIndexHtml = (terms: GlossaryTerm[]): string => {
  const title = 'Web3 & Cryptocurrency Glossary | Cointegrity';
  const description = `Comprehensive glossary of ${terms.length}+ Web3, blockchain, and cryptocurrency terms. From Bitcoin to Zero-Knowledge Proofs, understand the language of decentralized finance.`;
  const canonicalUrl = generateCanonicalUrl('/glossary');
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Cointegrity Web3 Glossary",
    "description": description,
    "url": canonicalUrl,
    "hasPart": terms.slice(0, 50).map(term => ({
      "@type": "DefinedTerm",
      "name": term.term,
      "url": `${BASE_URL}/glossary/${generateSlug(term.term)}/`
    }))
  };
  
  // Group terms by first letter
  const groupedTerms: Record<string, GlossaryTerm[]> = {};
  terms.forEach(term => {
    const letter = term.term[0].toUpperCase();
    if (!groupedTerms[letter]) groupedTerms[letter] = [];
    groupedTerms[letter].push(term);
  });
  
  const letters = Object.keys(groupedTerms).sort();
  
  const alphabetNav = `
    <nav style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 2em;">
      ${letters.map(letter => `<a href="#letter-${letter}" style="padding: 5px 10px; background: #f0f0f0; border-radius: 4px; font-weight: bold;">${letter}</a>`).join('')}
    </nav>`;
  
  const termsHtml = letters.map(letter => `
    <section id="letter-${letter}" style="margin-bottom: 2em;">
      <h2 style="color: #00cc88; border-bottom: 2px solid #00cc88; padding-bottom: 0.3em;">${letter}</h2>
      <ul style="list-style: none; padding: 0; columns: 2; column-gap: 2em;">
        ${groupedTerms[letter].map(term => `<li style="margin-bottom: 0.5em;"><a href="/glossary/${generateSlug(term.term)}/">${escapeHtml(term.term)}</a></li>`).join('')}
      </ul>
    </section>
  `).join('\n');
  
  const bodyContent = `
    <h1>Web3 & Cryptocurrency Glossary</h1>
    <p style="font-size: 1.1em; color: #666;">
      Your comprehensive guide to ${terms.length}+ blockchain, crypto, and Web3 terms. 
      From foundational concepts to cutting-edge innovations.
    </p>
    
    ${alphabetNav}
    
    ${termsHtml}
    
    <div class="cta">
      <p>Need personalized guidance on Web3? <a href="/#contact">Contact our experts</a>.</p>
    </div>`;
  
  return generateHtmlWrapper(
    title,
    description,
    canonicalUrl,
    structuredData,
    bodyContent,
    '/glossary/',
    'website'
  );
};
