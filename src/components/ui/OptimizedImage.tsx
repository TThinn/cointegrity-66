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
}

/**
 * Optimized image component for responsive images with lazy loading
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
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Basic responsive sizing - can be expanded based on your needs
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
  
  // Handle image loading complete
  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  const imageElement = (
    <img
      src={src}
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
