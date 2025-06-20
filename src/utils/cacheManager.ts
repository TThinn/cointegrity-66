// Simplified cache management with standard browser caching
export class CacheManager {
  private static readonly CACHE_VERSION_KEY = 'app_cache_version';
  private static readonly BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP || Date.now().toString();

  // Simple cache version check
  static shouldInvalidateCache(): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      const storedVersion = localStorage.getItem(this.CACHE_VERSION_KEY);
      return storedVersion !== this.BUILD_TIMESTAMP;
    } catch (error) {
      console.log('Cache version check failed:', error);
      return true;
    }
  }

  // Simple cache version update
  static updateCacheVersion(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.CACHE_VERSION_KEY, this.BUILD_TIMESTAMP);
    } catch (error) {
      console.log('Cache version update failed:', error);
    }
  }

  // Simple cache status for debugging
  static async getCacheStatus(): Promise<{
    version: string | null;
    buildTimestamp: string;
    shouldInvalidate: boolean;
  }> {
    const status = {
      version: null as string | null,
      buildTimestamp: this.BUILD_TIMESTAMP,
      shouldInvalidate: false
    };

    if (typeof window === 'undefined') return status;

    try {
      status.version = localStorage.getItem(this.CACHE_VERSION_KEY);
      status.shouldInvalidate = this.shouldInvalidateCache();
    } catch (error) {
      console.log('Cache status check failed:', error);
    }

    return status;
  }
}

// Simple initialization
export const initializeCacheManagement = () => {
  if (typeof window === 'undefined') return;
  
  setTimeout(() => {
    try {
      if (CacheManager.shouldInvalidateCache()) {
        console.log('Cache invalidation detected, updating cache version');
      }
      CacheManager.updateCacheVersion();
    } catch (error) {
      console.log('Cache management initialization failed:', error);
    }
  }, 100);
};
