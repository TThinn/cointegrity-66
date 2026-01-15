import { blogArticles } from '../src/data/blogData';
import { generateBlogArticleHtml, generateBlogIndexHtml } from './prerender/templates';
import { writeDistFile, generateSlug } from './prerender/utils';

/**
 * Pre-render all blog articles to static HTML
 */
export const prerenderBlog = async (): Promise<void> => {
  console.log('\n📝 Pre-rendering blog articles...');
  
  let successCount = 0;
  let errorCount = 0;
  
  // Pre-render individual articles
  for (const article of blogArticles) {
    try {
      const html = generateBlogArticleHtml(article);
      const filePath = `blog/${article.slug}/index.html`;
      writeDistFile(filePath, html);
      successCount++;
      console.log(`  ✓ ${article.slug}`);
    } catch (error) {
      errorCount++;
      console.error(`  ✗ Failed to render ${article.slug}:`, error);
    }
  }
  
  // Pre-render blog index
  try {
    const indexHtml = generateBlogIndexHtml(blogArticles);
    writeDistFile('blog/index.html', indexHtml);
    console.log('  ✓ blog/index.html');
  } catch (error) {
    console.error('  ✗ Failed to render blog index:', error);
  }
  
console.log(`\n📊 Blog pre-rendering complete: ${successCount} articles, ${errorCount} errors`);
};
