// PHASE 3: Advanced cache management with smart invalidation and monitoring
export class CacheManager {
  private static readonly CACHE_VERSION_KEY = 'app_cache_version';
  private static readonly LAST_CHECK_KEY = 'cache_last_check';
  private static readonly CACHE_STRATEGY_KEY = 'cache_strategy';
  private static readonly BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP || Date.now().toString();
  private static readonly CHECK_INTERVAL = 1000 * 60 * 15; // 15 minutes
  private static readonly FORCE_REFRESH_THRESHOLD = 1000 * 60 * 60 * 4; // 4 hours

  // Enhanced cache invalidation logic
  static shouldInvalidateCache(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const storedVersion = localStorage.getItem(this.CACHE_VERSION_KEY);
      const lastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
      const now = Date.now();
      
      // If no stored version, this is a first visit
      if (!storedVersion) {
        console.log('First visit - no cache invalidation needed');
        return false;
      }
      
      // If build timestamp changed, invalidate
      if (storedVersion !== this.BUILD_TIMESTAMP) {
        console.log('Build timestamp changed - invalidating cache');
        return true;
      }
      
      // If it's been too long since last check, invalidate for safety
      if (lastCheck && (now - parseInt(lastCheck)) > this.FORCE_REFRESH_THRESHOLD) {
        console.log('Cache too old - invalidating for freshness');
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Cache version check failed:', error);
      return true; // Invalidate if we can't check
    }
  }

  // Update cache version with enhanced metadata
  static updateCacheVersion(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const metadata = {
        version: this.BUILD_TIMESTAMP,
        timestamp: Date.now(),
        userAgent: navigator.userAgent.substring(0, 100), // Truncate for storage
        url: window.location.href
      };
      
      localStorage.setItem(this.CACHE_VERSION_KEY, this.BUILD_TIMESTAMP);
      localStorage.setItem(this.LAST_CHECK_KEY, Date.now().toString());
      localStorage.setItem('cache_metadata', JSON.stringify(metadata));
    } catch (error) {
      console.log('Cache version update failed:', error);
    }
  }

  // Smart update checking with network awareness
  static async checkForUpdates(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    try {
      const lastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
      const now = Date.now();
      
      // Don't check too frequently
      if (lastCheck && (now - parseInt(lastCheck)) < this.CHECK_INTERVAL) {
        return false;
      }
      
      // Check network connection if available
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection && connection.effectiveType === 'slow-2g') {
          console.log('Slow connection detected - skipping update check');
          return false;
        }
      }
      
      // Update last check timestamp
      localStorage.setItem(this.LAST_CHECK_KEY, now.toString());
      
      // Check if cache should be invalidated
      return this.shouldInvalidateCache();
    } catch (error) {
      console.log('Update check failed:', error);
      return false;
    }
  }

  // Advanced cache clearing with selective strategies
  static async clearBrowserCache(strategy: 'all' | 'selective' | 'assets-only' = 'selective'): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear service worker caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        
        switch (strategy) {
          case 'all':
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            break;
          case 'selective':
            const appCaches = cacheNames.filter(name => 
              name.includes('cointegrity') || 
              name.includes('app-') ||
              name.includes('static-') ||
              name.includes('dynamic-')
            );
            await Promise.all(appCaches.map(name => caches.delete(name)));
            break;
          case 'assets-only':
            const assetCaches = cacheNames.filter(name => 
              name.includes('static-') || name.includes('assets')
            );
            await Promise.all(assetCaches.map(name => caches.delete(name)));
            break;
        }
      }
      
      // Clear relevant localStorage items based on strategy
      if (strategy === 'all') {
        localStorage.removeItem(this.CACHE_VERSION_KEY);
        localStorage.removeItem(this.LAST_CHECK_KEY);
        localStorage.removeItem(this.CACHE_STRATEGY_KEY);
        localStorage.removeItem('cache_metadata');
      }
      
      console.log(`Browser cache cleared (${strategy} strategy)`);
    } catch (error) {
      console.log('Cache clearing failed:', error);
    }
  }

  // Enhanced force refresh with user feedback
  static async forceRefresh(showNotification: boolean = true): Promise<void> {
    try {
      if (showNotification) {
        console.log('Forcing app refresh...');
      }
      
      await this.clearBrowserCache('all');
      
      // Add build timestamp to URL to force cache bypass
      const url = new URL(window.location.href);
      url.searchParams.set('v', this.BUILD_TIMESTAMP);
      url.searchParams.set('refresh', Date.now().toString());
      
      // Use replace to avoid adding to history
      window.location.replace(url.toString());
    } catch (error) {
      console.log('Force refresh failed:', error);
      // Fallback to simple reload
      window.location.reload();
    }
  }

  // Comprehensive cache status for debugging
  static async getCacheStatus(): Promise<{
    version: string | null;
    lastCheck: string | null;
    buildTimestamp: string;
    shouldInvalidate: boolean;
    cacheNames: string[];
    serviceWorkerStatus: boolean;
    storageUsage: number;
    metadata: any;
  }> {
    const status = {
      version: null as string | null,
      lastCheck: null as string | null,
      buildTimestamp: this.BUILD_TIMESTAMP,
      shouldInvalidate: false,
      cacheNames: [] as string[],
      serviceWorkerStatus: false,
      storageUsage: 0,
      metadata: null as any
    };

    if (typeof window === 'undefined') return status;

    try {
      status.version = localStorage.getItem(this.CACHE_VERSION_KEY);
      status.lastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
      status.shouldInvalidate = this.shouldInvalidateCache();
      status.serviceWorkerStatus = 'serviceWorker' in navigator && navigator.serviceWorker.controller !== null;
      
      // Get cache names
      if ('caches' in window) {
        status.cacheNames = await caches.keys();
      }
      
      // Get storage usage if available
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        status.storageUsage = estimate.usage || 0;
      }
      
      // Get metadata
      try {
        const metadataStr = localStorage.getItem('cache_metadata');
        status.metadata = metadataStr ? JSON.parse(metadataStr) : null;
      } catch (e) {
        status.metadata = null;
      }
      
    } catch (error) {
      console.log('Cache status check failed:', error);
    }

    return status;
  }

  // Monitor cache performance
  static startCacheMonitoring(): void {
    if (typeof window === 'undefined') return;
    
    // Monitor cache hit/miss ratios
    const originalFetch = window.fetch;
    let cacheHits = 0;
    let cacheMisses = 0;
    
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      
      // Check if response came from cache (using proper cache detection)
      if (response.headers.get('x-cache') === 'HIT') {
        cacheHits++;
      } else {
        cacheMisses++;
      }
      
      // Log cache performance every 50 requests
      if ((cacheHits + cacheMisses) % 50 === 0) {
        const hitRate = (cacheHits / (cacheHits + cacheMisses)) * 100;
        console.log(`Cache hit rate: ${hitRate.toFixed(1)}%`);
      }
      
      return response;
    };
  }
}

// React-safe initialization with comprehensive error handling
export const initializeCacheManagement = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Wait for React to be ready to avoid hydration issues
  setTimeout(() => {
    try {
      // Initial cache check
      if (CacheManager.shouldInvalidateCache()) {
        console.log('Cache invalidation detected, updating cache version');
        CacheManager.updateCacheVersion();
      } else {
        // Just update the check timestamp
        CacheManager.updateCacheVersion();
      }
      
      // Start cache monitoring
      CacheManager.startCacheMonitoring();
      
      // Set up periodic update checking
      const checkInterval = setInterval(async () => {
        try {
          const hasUpdates = await CacheManager.checkForUpdates();
          if (hasUpdates) {
            console.log('App updates detected');
            // Dispatch event for React components to handle
            window.dispatchEvent(new CustomEvent('cache-update-available'));
          }
        } catch (error) {
          console.log('Periodic cache check failed:', error);
        }
      }, 1000 * 60 * 30); // Check every 30 minutes
      
      // Clean up interval on page unload
      window.addEventListener('beforeunload', () => {
        clearInterval(checkInterval);
      });
      
      // Listen for online/offline events
      window.addEventListener('online', () => {
        console.log('Connection restored - checking for updates');
        CacheManager.checkForUpdates();
      });
      
    } catch (error) {
      console.log('Cache management initialization failed:', error);
    }
  }, 200); // Small delay to ensure React is ready
};
