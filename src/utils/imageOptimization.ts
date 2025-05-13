
/**
 * Utility functions for image optimization
 */

/**
 * Generates responsive image sizes for srcset
 * @param basePath Base path of the image
 * @param widths Array of widths to generate
 * @param extension Image extension
 * @returns Object with srcset and sizes strings
 */
export const generateResponsiveSrcSet = (
  basePath: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
  extension: string = 'png'
): { srcset: string; sizes: string } => {
  if (!basePath.includes('.')) {
    // If no extension is included in base path, we assume it's a base path without extension
    basePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
    
    const srcset = widths
      .map(width => `${basePath}${width}.${extension} ${width}w`)
      .join(', ');
      
    const sizes = [
      '(max-width: 640px) 100vw',
      '(max-width: 1024px) 50vw',
      '33vw'
    ].join(', ');
    
    return { srcset, sizes };
  } else {
    // Handle case where basePath includes the full image path with extension
    const pathWithoutExtension = basePath.substring(0, basePath.lastIndexOf('.'));
    const originalExtension = basePath.substring(basePath.lastIndexOf('.') + 1);
    
    const srcset = widths
      .map(width => `${pathWithoutExtension}-${width}.${originalExtension} ${width}w`)
      .join(', ');
      
    const sizes = [
      '(max-width: 640px) 100vw',
      '(max-width: 1024px) 50vw',
      '33vw'
    ].join(', ');
    
    return { srcset, sizes };
  }
};

/**
 * Returns an appropriate image size based on viewport size
 * @param mobileSize Size for mobile devices
 * @param tabletSize Size for tablet devices
 * @param desktopSize Size for desktop devices
 * @returns The appropriate size based on viewport width
 */
export const getResponsiveImageSize = (
  mobileSize: number = 320,
  tabletSize: number = 768,
  desktopSize: number = 1280
): number => {
  // Use client width if available, otherwise return desktop size as default
  if (typeof window !== 'undefined') {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 640) return mobileSize;
    if (viewportWidth < 1024) return tabletSize;
    return desktopSize;
  }
  return desktopSize; // Default to desktop size for SSR
};

/**
 * Calculate aspect ratio from width and height
 * @param width Image width
 * @param height Image height
 * @returns Aspect ratio as a decimal number
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

/**
 * Check if image should be lazy loaded based on position
 * @param position Position of image in the page (e.g. 'above-fold', 'below-fold')
 * @returns Boolean indicating whether image should be lazy loaded
 */
export const shouldLazyLoad = (position: 'above-fold' | 'below-fold' | 'critical' | 'non-critical'): boolean => {
  return position !== 'above-fold' && position !== 'critical';
};

/**
 * Check if the browser supports WebP format
 * @returns Promise that resolves to a boolean
 */
export const supportsWebP = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  if ('createImageBitmap' in window && 'ImageDecoder' in window) {
    // Modern browsers that support ImageDecoder API
    return true;
  }
  
  // Fallback check using canvas
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    // Check if toDataURL with WebP produces a WebP string
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  }
  
  return false;
};

/**
 * Returns the WebP version of an image URL if supported
 * @param url Original image URL
 * @param quality WebP quality (0-100)
 * @returns WebP version of the URL if possible, original URL otherwise
 */
export const getWebPUrl = async (url: string, quality: number = 80): Promise<string> => {
  // Skip WebP conversion for already WebP, GIFs, or SVGs
  if (url.endsWith('.webp') || url.endsWith('.gif') || url.endsWith('.svg')) {
    return url;
  }
  
  const webpSupported = await supportsWebP();
  if (!webpSupported) return url;
  
  if (url.startsWith('/')) {
    // Local image
    return `${url}?format=webp&q=${quality}`;
  }
  
  // For remote URLs, we would need a CDN or backend that supports WebP conversion
  return url;
};
