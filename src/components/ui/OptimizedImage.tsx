
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: number;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onClick?: () => void;
  quality?: number;
  useWebP?: boolean;
}

/**
 * Optimized image component for responsive images with lazy loading and WebP support
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  aspectRatio,
  priority = false,
  sizes = "100vw",
  fill = false,
  objectFit = "cover",
  onClick,
  quality = 80,
  useWebP = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Basic responsive sizing - can be expanded based on your needs
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  
  // Handle image loading complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Convert image URL to WebP if supported and requested
  const getOptimizedSrc = () => {
    if (!useWebP) return src;

    // Skip WebP conversion for GIFs or SVGs
    if (src.toLowerCase().endsWith('.gif') || src.toLowerCase().endsWith('.svg')) {
      return src;
    }

    // Handle various image formats
    if (src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:')) {
      // For remote images, we can't convert to WebP on the fly
      // In a production environment, you might use a CDN with WebP support
      return src;
    } else {
      // For local images in the public folder
      // In a real app, you'd have a server-side solution to convert images
      // Here we'll just add a query param to simulate WebP conversion
      return `${src}?format=webp&quality=${quality}`;
    }
  };

  const optimizedSrc = getOptimizedSrc();

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:')) {
      return undefined; // Skip srcset for remote or data URIs
    }

    const widths = [320, 640, 768, 1024, 1280, 1920];
    return widths
      .map(w => `${getOptimizedSrc()}&w=${w} ${w}w`)
      .join(', ');
  };

  const srcSet = generateSrcSet();

  const imageElement = (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "transition-opacity duration-300",
        !isLoaded && "opacity-0",
        isLoaded && "opacity-100",
        fill && "w-full h-full object-cover",
        className
      )}
      style={fill ? { objectFit } : {}}
      loading={priority ? "eager" : "lazy"}
      sizes={defaultSizes}
      onLoad={handleImageLoaded}
      onClick={onClick}
      srcSet={srcSet}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
    />
  );

  // If aspect ratio is provided, wrap in AspectRatio component
  if (aspectRatio) {
    return (
      <div className="w-full">
        <AspectRatio ratio={aspectRatio} className="overflow-hidden">
          {imageElement}
        </AspectRatio>
      </div>
    );
  }

  // Otherwise, return the image directly
  return imageElement;
};

export default OptimizedImage;
