
// Cache management utilities for preventing stale content
export class CacheManager {
  private static readonly CACHE_VERSION_KEY = 'app_cache_version';
  private static readonly BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP || Date.now().toString();

  // Check if cache needs to be invalidated
  static shouldInvalidateCache(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const storedVersion = localStorage.getItem(this.CACHE_VERSION_KEY);
      return storedVersion !== this.BUILD_TIMESTAMP;
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
    } catch (error) {
      console.log('Cache version update failed:', error);
    }
  }

  // Force reload if cache is stale (use carefully to avoid breaking React)
  static checkAndReloadIfStale(): void {
    if (this.shouldInvalidateCache()) {
      console.log('Cache invalidation detected, updating cache version');
      this.updateCacheVersion();
      // Don't force reload immediately to avoid React issues
      // Instead, just update the version and let natural navigation handle it
    }
  }

  // Clear browser cache programmatically
  static async clearBrowserCache(): Promise<void> {
    if (typeof window === 'undefined') return;
    
    try {
      // Clear service worker caches if available
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }
      
      // Clear localStorage cache indicators
      localStorage.removeItem(this.CACHE_VERSION_KEY);
      
      console.log('Browser cache cleared successfully');
    } catch (error) {
      console.log('Cache clearing failed:', error);
    }
  }
}

// Initialize cache management on app start (safe for React)
export const initializeCacheManagement = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Check cache version without forcing reload to avoid React issues
  CacheManager.checkAndReloadIfStale();
};

