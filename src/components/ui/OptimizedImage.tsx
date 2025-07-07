
import React, { useState, useEffect, useRef } from "react";
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
  lazy?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  style?: React.CSSProperties;
  title?: string;
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
  lazy = true,
  placeholder = "empty",
  blurDataURL,
  style,
  title,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority || !lazy);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);
  
  // Basic responsive sizing - can be expanded based on your needs
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  
  // Handle image loading complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleImageError = () => {
    setHasError(true);
  };

  // Convert image URL to WebP if supported and requested
  const getOptimizedSrc = () => {
    if (!isInView) return '';
    if (!useWebP) return src;

    // Skip WebP conversion for GIFs or SVGs
    if (src.toLowerCase().endsWith('.gif') || src.toLowerCase().endsWith('.svg')) {
      return src;
    }

    // Handle various image formats
    if (src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:')) {
      return src;
    } else {
      // Create optimized URL with WebP format and quality
      const url = new URL(src, window.location.origin);
      url.searchParams.set('format', 'webp');
      url.searchParams.set('quality', quality.toString());
      if (width) url.searchParams.set('w', width.toString());
      return url.toString();
    }
  };

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!isInView || src.startsWith('http') || src.startsWith('blob:') || src.startsWith('data:')) {
      return undefined;
    }

    const widths = [320, 640, 768, 1024, 1280, 1920];
    const baseUrl = new URL(src, window.location.origin);
    baseUrl.searchParams.set('format', 'webp');
    baseUrl.searchParams.set('quality', quality.toString());
    
    return widths
      .map(w => {
        const url = new URL(baseUrl);
        url.searchParams.set('w', w.toString());
        return `${url.toString()} ${w}w`;
      })
      .join(', ');
  };

  const srcSet = generateSrcSet();
  const optimizedSrc = getOptimizedSrc();

  // Show error placeholder if image failed to load
  if (hasError) {
    return (
      <div 
        ref={imgRef}
        className={cn(
          "flex items-center justify-center bg-gray-200 text-gray-400",
          fill && "w-full h-full",
          className
        )}
        style={style}
      >
        <span className="text-xs">Failed to load</span>
      </div>
    );
  }

  // Placeholder while loading
  const placeholderElement = placeholder === "blur" && blurDataURL ? (
    <img
      src={blurDataURL}
      alt=""
      className={cn(
        "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
        isLoaded ? "opacity-0" : "opacity-100"
      )}
    />
  ) : null;

  const imageElement = isInView ? (
    <div className="relative w-full h-full">
      {placeholderElement}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          !isLoaded && "opacity-0",
          isLoaded && "opacity-100",
          fill && "w-full h-full",
          className
        )}
        style={{ objectFit: fill ? objectFit : undefined, ...style }}
        loading={priority ? "eager" : "lazy"}
        sizes={defaultSizes}
        onLoad={handleImageLoaded}
        onError={handleImageError}
        onClick={onClick}
        srcSet={srcSet}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        title={title}
      />
    </div>
  ) : (
    <div 
      ref={imgRef}
      className={cn(
        "bg-gray-100 animate-pulse",
        fill && "w-full h-full",
        className
      )}
      style={style}
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
