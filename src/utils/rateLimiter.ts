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
    maxRequests: number = 30, // 30 requests per minute
    blockDurationMs: number = 300000 // 5 minute block
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

// Global rate limiter instance
export const globalRateLimiter = new RateLimiter();

// Export the rate limiter for direct use
export { globalRateLimiter as rateLimiter };