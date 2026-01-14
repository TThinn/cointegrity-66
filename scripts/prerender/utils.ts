import * as fs from 'fs';
import * as path from 'path';

/**
 * Base URL for the site
 */
export const BASE_URL = 'https://cointegrity.io';

/**
 * Convert a term to a URL-friendly slug
 */
export const generateSlug = (term: string): string => {
  return term.toLowerCase().replace(/[^a-z0-9]/g, '-');
};

/**
 * Escape HTML special characters
 */
export const escapeHtml = (text: string): string => {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
};

/**
 * Strip markdown formatting to get plain text
 */
export const stripMarkdown = (text: string): string => {
  return text
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove inline code
    .replace(/`([^`]+)`/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Clean up multiple spaces and newlines
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Convert markdown to basic HTML
 */
export const markdownToHtml = (markdown: string): string => {
  return markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // Links - convert glossary links
    .replace(/\[([^\]]+)\]\(\/glossary\/([^)]+)\)/g, '<a href="/glossary/$2/">$1</a>')
    // Regular links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Line breaks - convert double newlines to paragraphs
    .split('\n\n')
    .map(para => para.trim())
    .filter(para => para.length > 0)
    .map(para => {
      if (para.startsWith('<h')) return para;
      return `<p>${para.replace(/\n/g, '<br>')}</p>`;
    })
    .join('\n');
};

/**
 * Truncate text to a maximum length, preserving word boundaries
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + '...';
};

/**
 * Ensure a directory exists, creating it if necessary
 */
export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

/**
 * Generate a canonical URL for a path
 */
export const generateCanonicalUrl = (pagePath: string): string => {
  // Ensure trailing slash for directory-style URLs
  const normalizedPath = pagePath.endsWith('/') ? pagePath : `${pagePath}/`;
  return `${BASE_URL}${normalizedPath}`;
};

/**
 * Get the dist directory path
 */
export const getDistPath = (): string => {
  return path.join(process.cwd(), 'dist');
};

/**
 * Write a file to the dist directory
 */
export const writeDistFile = (relativePath: string, content: string): void => {
  const fullPath = path.join(getDistPath(), relativePath);
  const dir = path.dirname(fullPath);
  ensureDirectoryExists(dir);
  fs.writeFileSync(fullPath, content, 'utf-8');
};

/**
 * Format a date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
