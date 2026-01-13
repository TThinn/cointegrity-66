/**
 * SSR/SSG Safe Utilities
 * These utilities help handle browser-only code during static site generation
 */

/**
 * Check if code is running in a browser environment
 */
export const isClient = typeof window !== 'undefined';

/**
 * Check if code is running on the server (during SSG build)
 */
export const isServer = !isClient;

/**
 * Safe localStorage wrapper that works during SSG
 */
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isClient) {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (isClient) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Storage might be full or disabled
      }
    }
  },
  
  removeItem: (key: string): void => {
    if (isClient) {
      try {
        localStorage.removeItem(key);
      } catch {
        // Ignore errors
      }
    }
  },
};

/**
 * Safe sessionStorage wrapper that works during SSG
 */
export const safeSessionStorage = {
  getItem: (key: string): string | null => {
    if (isClient) {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    }
    return null;
  },
  
  setItem: (key: string, value: string): void => {
    if (isClient) {
      try {
        sessionStorage.setItem(key, value);
      } catch {
        // Storage might be full or disabled
      }
    }
  },
  
  removeItem: (key: string): void => {
    if (isClient) {
      try {
        sessionStorage.removeItem(key);
      } catch {
        // Ignore errors
      }
    }
  },
};

/**
 * Safe window object - undefined during SSG
 */
export const safeWindow = isClient ? window : undefined;

/**
 * Safe document object - undefined during SSG
 */
export const safeDocument = isClient ? document : undefined;

/**
 * Safe navigator object - undefined during SSG
 */
export const safeNavigator = isClient ? navigator : undefined;

/**
 * Execute a function only on the client side
 */
export const onlyOnClient = <T>(fn: () => T): T | undefined => {
  if (isClient) {
    return fn();
  }
  return undefined;
};

/**
 * Get the current URL safely during SSG
 */
export const getSafeUrl = (): string => {
  if (isClient) {
    return window.location.href;
  }
  return 'https://cointegrity.io';
};

/**
 * Get user agent safely during SSG
 */
export const getSafeUserAgent = (): string => {
  if (isClient && navigator) {
    return navigator.userAgent;
  }
  return '';
};
