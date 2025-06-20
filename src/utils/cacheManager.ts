
// Enhanced cache management utilities for Phase 2 implementation
export class CacheManager {
  private static readonly CACHE_VERSION_KEY = 'app_cache_version';
  private static readonly LAST_CHECK_KEY = 'cache_last_check';
  private static readonly BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP || Date.now().toString();
  private static readonly CHECK_INTERVAL = 1000 * 60 * 15; // Check every 15 minutes

  // Check if cache needs to be invalidated
  static shouldInvalidateCache(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const storedVersion = localStorage.getItem(this.CACHE_VERSION_KEY);
      const lastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
      const now = Date.now();
      
      // If no stored version or build timestamp changed, invalidate
      if (!storedVersion || storedVersion !== this.BUILD_TIMESTAMP) {
        return true;
      }
      
      // If it's been too long since last check, invalidate to be safe
      if (lastCheck && (now - parseInt(lastCheck)) > this.CHECK_INTERVAL * 4) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Cache version check failed:', error);
      return true; // Invalidate if we can't check
    }
  }

  // Update cache version after successful load
  static updateCacheVersion(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.CACHE_VERSION_KEY, this.BUILD_TIMESTAMP);
      localStorage.setItem(this.LAST_CHECK_KEY, Date.now().toString());
    } catch (error) {
      console.log('Cache version update failed:', error);
    }
  }

  // Smart cache invalidation with version checking
  static async checkForUpdates(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    
    try {
      const lastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
      const now = Date.now();
      
      // Don't check too frequently
      if (lastCheck && (now - parseInt(lastCheck)) < this.CHECK_INTERVAL) {
        return false;
      }
      
      // Update last check timestamp
      localStorage.setItem(this.LAST_CHECK_KEY, now.toString());
      
      // In a real implementation, you might check a version endpoint
      // For now, we'll just check if our build timestamp has changed
      return this.shouldInvalidateCache();
    } catch (error) {
      console.log('Update check failed:', error);
      return false;
    }
  }

  // Enhanced cache clearing with selective strategies
  static async clearBrowserCache(strategy: 'all' | 'selective' = 'selective'): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear service worker caches if available
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        
        if (strategy === 'all') {
          // Clear all caches
          await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
          );
        } else {
          // Only clear our app caches, preserve third-party caches
          const appCaches = cacheNames.filter(name => 
            name.includes('cointegrity') || 
            name.includes('app-') ||
            name.includes('static-')
          );
          await Promise.all(
            appCaches.map(cacheName => caches.delete(cacheName))
          );
        }
      }
      
      // Clear relevant localStorage items
      if (strategy === 'all') {
        localStorage.removeItem(this.CACHE_VERSION_KEY);
        localStorage.removeItem(this.LAST_CHECK_KEY);
      }
      
      console.log(`Browser cache cleared (${strategy} strategy)`);
    } catch (error) {
      console.log('Cache clearing failed:', error);
    }
  }

  // Force cache refresh with user notification
  static async forceRefresh(): Promise<void> {
    try {
      await this.clearBrowserCache('all');
      
      // Add a small delay to ensure cache clearing completes
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.log('Force refresh failed:', error);
      // Fallback to simple reload
      window.location.reload();
    }
  }

  // Get cache status for debugging
  static async getCacheStatus(): Promise<{
    version: string | null;
    lastCheck: string | null;
    buildTimestamp: string;
    shouldInvalidate: boolean;
    cacheNames: string[];
  }> {
    const status = {
      version: null as string | null,
      lastCheck: null as string | null,
      buildTimestamp: this.BUILD_TIMESTAMP,
      shouldInvalidate: false,
      cacheNames: [] as string[]
    };

    if (typeof window === 'undefined') return status;

    try {
      status.version = localStorage.getItem(this.CACHE_VERSION_KEY);
      status.lastCheck = localStorage.getItem(this.LAST_CHECK_KEY);
      status.shouldInvalidate = this.shouldInvalidateCache();
      
      if ('caches' in window) {
        status.cacheNames = await caches.keys();
      }
    } catch (error) {
      console.log('Cache status check failed:', error);
    }

    return status;
  }
}

// Enhanced initialization with periodic update checking
export const initializeCacheManagement = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Initial cache check without forcing reload to avoid React issues
  if (CacheManager.shouldInvalidateCache()) {
    console.log('Cache invalidation detected, updating cache version');
    CacheManager.updateCacheVersion();
  }
  
  // Set up periodic update checking
  const checkInterval = setInterval(async () => {
    const hasUpdates = await CacheManager.checkForUpdates();
    if (hasUpdates) {
      console.log('App updates detected');
      // You could show a toast notification here instead of auto-reloading
      // For now, we'll just log it
    }
  }, 1000 * 60 * 30); // Check every 30 minutes
  
  // Clean up interval on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(checkInterval);
  });
};
