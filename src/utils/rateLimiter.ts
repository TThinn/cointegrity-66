// Basic client-side rate limiting for anti-scraping protection
interface RateLimitEntry {
  count: number;
  lastReset: number;
  firstRequest: number;
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;
  private readonly blockDurationMs: number;

  constructor(
    windowMs: number = 60000, // 1 minute window
    maxRequests: number = 100, // Increased for SEO crawlers
    blockDurationMs: number = 60000 // Reduced to 1 minute block
  ) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.blockDurationMs = blockDurationMs;
  }

  private getClientId(): string {
    // Create a semi-persistent client identifier
    let clientId = localStorage.getItem('client-rate-limit-id');
    if (!clientId) {
      clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('client-rate-limit-id', clientId);
    }
    return clientId;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.limits.entries()) {
      // Remove old entries that are beyond the block duration
      if (now - entry.lastReset > this.blockDurationMs) {
        this.limits.delete(key);
      }
    }
  }

  checkLimit(action: string = 'default'): { allowed: boolean; retryAfter?: number; reason?: string } {
    try {
      // Check if user agent suggests legitimate crawler
      const userAgent = navigator.userAgent?.toLowerCase() || '';
      const legitimateCrawlers = [
        'googlebot', 'bingbot', 'slurp', 'yandexbot', 'baiduspider', 
        'applebot', 'duckduckbot', 'perplexitybot', 'claude-web', 
        'chatgpt-user', 'searchgpt', 'claude-bot', 'twitterbot',
        'facebookexternalhit', 'linkedinbot'
      ];
      
      const isLegitmateCrawler = legitimateCrawlers.some(crawler => 
        userAgent.includes(crawler)
      );
      
      // Be more lenient with legitimate crawlers
      if (isLegitmateCrawler) {
        return { allowed: true };
      }
      
      this.cleanup();
      
      const clientId = this.getClientId();
      const key = `${clientId}-${action}`;
      const now = Date.now();
      
      let entry = this.limits.get(key);
      
      if (!entry) {
        entry = {
          count: 1,
          lastReset: now,
          firstRequest: now
        };
        this.limits.set(key, entry);
        return { allowed: true };
      }

      // Check if we're in a blocked state
      const timeSinceFirstRequest = now - entry.firstRequest;
      const isInBlockPeriod = timeSinceFirstRequest < this.blockDurationMs && entry.count > this.maxRequests;
      
      if (isInBlockPeriod) {
        const retryAfter = Math.ceil((this.blockDurationMs - timeSinceFirstRequest) / 1000);
        return { 
          allowed: false, 
          retryAfter,
          reason: 'Rate limit exceeded. Automated requests detected.' 
        };
      }

      // Reset window if enough time has passed
      if (now - entry.lastReset > this.windowMs) {
        entry.count = 1;
        entry.lastReset = now;
        entry.firstRequest = now;
      } else {
        entry.count++;
      }

      // Check if limit is exceeded
      if (entry.count > this.maxRequests) {
        const retryAfter = Math.ceil(this.blockDurationMs / 1000);
        return { 
          allowed: false, 
          retryAfter,
          reason: 'Too many requests. Please slow down your browsing speed.' 
        };
      }

      this.limits.set(key, entry);
      return { allowed: true };
    } catch (error) {
      console.error('Rate limit check failed:', error);
      return { allowed: true }; // Fail open for better UX
    }
  }

  // Method to check for suspicious activity patterns
  checkSuspiciousActivity(): { suspicious: boolean; patterns: string[] } {
    const clientId = this.getClientId();
    const patterns: string[] = [];
    let suspicious = false;

    // Check for rapid sequential requests
    const entry = this.limits.get(`${clientId}-default`);
    if (entry && entry.count > 20) {
      patterns.push('High frequency requests');
      suspicious = true;
    }

    // Check for multiple action types in short time
    const clientActions = Array.from(this.limits.keys()).filter(key => key.startsWith(clientId));
    if (clientActions.length > 5) {
      patterns.push('Multiple action types');
      suspicious = true;
    }

    return { suspicious, patterns };
  }
}

// More lenient rate limiter for SEO-friendly operation
export const globalRateLimiter = new RateLimiter(
  60000,  // 1 minute window
  200,    // 200 requests per minute (very generous for crawlers)
  30000   // 30 second block (much shorter)
);

// Export the rate limiter for direct use
export { globalRateLimiter as rateLimiter };