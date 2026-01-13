import { prerenderBlog } from './prerender-blog';
import { prerenderGlossary } from './prerender-glossary';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Master pre-rendering script that orchestrates all pre-rendering tasks
 */
async function main() {
  const startTime = Date.now();
  
  console.log('🚀 Starting pre-rendering process...');
  console.log('━'.repeat(50));
  
  // Check if dist directory exists
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('❌ Error: dist/ directory not found. Run "npm run build" first.');
    process.exit(1);
  }
  
  try {
    // Pre-render blog articles
    await prerenderBlog();
    
    // Pre-render glossary terms (top 200)
    await prerenderGlossary(200);
    
    console.log('━'.repeat(50));
    
    // Summary
    const blogPath = path.join(distPath, 'blog');
    const glossaryPath = path.join(distPath, 'glossary');
    
    const blogFiles = fs.existsSync(blogPath) 
      ? fs.readdirSync(blogPath).filter(f => f.endsWith('.html')).length 
      : 0;
    const glossaryFiles = fs.existsSync(glossaryPath) 
      ? fs.readdirSync(glossaryPath).filter(f => f.endsWith('.html')).length 
      : 0;
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('\n✅ Pre-rendering complete!');
    console.log(`   📝 Blog articles: ${blogFiles} HTML files`);
    console.log(`   📖 Glossary terms: ${glossaryFiles} HTML files`);
    console.log(`   ⏱️  Duration: ${duration}s`);
    console.log(`   📁 Output: ${distPath}`);
    
  } catch (error) {
    console.error('\n❌ Pre-rendering failed:', error);
    process.exit(1);
  }
}

// Run the main function
main();
