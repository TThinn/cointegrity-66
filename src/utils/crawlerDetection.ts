// Comprehensive crawler detection utility for SEO optimization
export interface CrawlerInfo {
  isLegitimate: boolean;
  crawlerName?: string;
  crawlerType: 'search-engine' | 'seo-tool' | 'social-media' | 'security' | 'monitoring' | 'unknown';
  shouldBypassSecurity: boolean;
  shouldServeStaticContent: boolean;
}

// Comprehensive list of legitimate SEO crawlers and bots
const LEGITIMATE_CRAWLERS = {
  // Major search engines
  'Googlebot': { type: 'search-engine' as const, priority: 'high' },
  'Bingbot': { type: 'search-engine' as const, priority: 'high' },
  'Slurp': { type: 'search-engine' as const, priority: 'high' }, // Yahoo
  'DuckDuckBot': { type: 'search-engine' as const, priority: 'high' },
  'Baiduspider': { type: 'search-engine' as const, priority: 'medium' },
  'YandexBot': { type: 'search-engine' as const, priority: 'medium' },
  'facebookexternalhit': { type: 'social-media' as const, priority: 'high' },
  'Twitterbot': { type: 'social-media' as const, priority: 'high' },
  'LinkedInBot': { type: 'social-media' as const, priority: 'high' },
  'WhatsApp': { type: 'social-media' as const, priority: 'medium' },
  
  // SEO and analytics tools
  'AhrefsBot': { type: 'seo-tool' as const, priority: 'medium' },
  'SemrushBot': { type: 'seo-tool' as const, priority: 'medium' },
  'MJ12bot': { type: 'seo-tool' as const, priority: 'low' }, // Majestic
  'DotBot': { type: 'seo-tool' as const, priority: 'low' }, // Moz
  'archive.org_bot': { type: 'monitoring' as const, priority: 'low' },
  'ia_archiver': { type: 'monitoring' as const, priority: 'low' },
  
  // Nightwatch.io specifically
  'nightwatch': { type: 'seo-tool' as const, priority: 'high' },
  'Nightwatch': { type: 'seo-tool' as const, priority: 'high' },
  'nightwatch.io': { type: 'seo-tool' as const, priority: 'high' },
  
  // Additional monitoring tools
  'UptimeRobot': { type: 'monitoring' as const, priority: 'low' },
  'Pingdom': { type: 'monitoring' as const, priority: 'low' },
  'StatusCake': { type: 'monitoring' as const, priority: 'low' },
  
  // Structured data crawlers
  'SchemaBot': { type: 'seo-tool' as const, priority: 'medium' },
  'RichSnippetsBot': { type: 'seo-tool' as const, priority: 'medium' },
};

// Patterns for legitimate crawler user agents
const CRAWLER_PATTERNS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /nightwatch/i,
  /googlebot/i,
  /bingbot/i,
  /slurp/i,
  /duckduckbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
  /whatsapp/i,
  /ahrefsbot/i,
  /semrushbot/i,
  /mj12bot/i,
  /dotbot/i,
  /archive\.org_bot/i,
  /ia_archiver/i,
  /uptimerobot/i,
  /pingdom/i,
  /statuscake/i,
];

// Check if user agent belongs to a legitimate crawler
export const detectCrawler = (userAgent?: string): CrawlerInfo => {
  if (!userAgent) {
    return {
      isLegitimate: false,
      crawlerType: 'unknown',
      shouldBypassSecurity: false,
      shouldServeStaticContent: false,
    };
  }

  const ua = userAgent.toLowerCase();
  
  // Check for specific crawler names
  for (const [crawlerName, info] of Object.entries(LEGITIMATE_CRAWLERS)) {
    if (ua.includes(crawlerName.toLowerCase())) {
      return {
        isLegitimate: true,
        crawlerName,
        crawlerType: info.type,
        shouldBypassSecurity: true,
        shouldServeStaticContent: info.priority === 'high',
      };
    }
  }
  
  // Check for crawler patterns
  const isPatternMatch = CRAWLER_PATTERNS.some(pattern => pattern.test(userAgent));
  
  if (isPatternMatch) {
    return {
      isLegitimate: true,
      crawlerType: 'unknown',
      shouldBypassSecurity: true,
      shouldServeStaticContent: false,
    };
  }
  
  return {
    isLegitimate: false,
    crawlerType: 'unknown',
    shouldBypassSecurity: false,
    shouldServeStaticContent: false,
  };
};

// Check if current request should bypass all security measures
export const shouldBypassSecurity = (userAgent?: string): boolean => {
  const crawlerInfo = detectCrawler(userAgent);
  return crawlerInfo.shouldBypassSecurity;
};

// Check if we should serve static content for better SEO
export const shouldServeStaticContent = (userAgent?: string): boolean => {
  const crawlerInfo = detectCrawler(userAgent);
  return crawlerInfo.shouldServeStaticContent;
};

// Enhanced crawler logging for debugging
export const logCrawlerDetection = (userAgent?: string, context?: string) => {
  if (!userAgent) return;
  
  const crawlerInfo = detectCrawler(userAgent);
  
  if (crawlerInfo.isLegitimate) {
    console.log(`[Crawler Detection${context ? ` - ${context}` : ''}] Legitimate crawler detected:`, {
      userAgent,
      crawlerName: crawlerInfo.crawlerName,
      type: crawlerInfo.crawlerType,
      bypassSecurity: crawlerInfo.shouldBypassSecurity,
      serveStatic: crawlerInfo.shouldServeStaticContent,
    });
  }
};