
import React from "react";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionContainerProps {
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  contentClassName?: string;
  children: React.ReactNode;
  as?: "section" | "article" | "div";
  ariaLabel?: string;
  ariaLabelledBy?: string;
}

/**
 * A semantically structured section container with proper HTML5 markup
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  title,
  subtitle,
  className,
  contentClassName,
  children,
  as: Component = "section",
  ariaLabel,
  ariaLabelledBy
}) => {
  // Generate a unique ID for aria-labelledby if title exists but no custom ID is provided
  const headingId = title && !ariaLabelledBy ? `${id || Math.random().toString(36).substring(2, 9)}-heading` : undefined;
  
  return (
    <Component
      id={id}
      className={cn("py-16 md:py-24", className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy || headingId}
    >
      <Container className="w-full">
        {title && (
          <header className="mb-10">
            <h2 id={headingId} className="text-3xl md:text-4xl font-bold mb-3">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-200 max-w-3xl">
                {subtitle}
              </p>
            )}
          </header>
        )}
        <div className={cn("w-full", contentClassName)}>
          {children}
        </div>
      </Container>
    </Component>
  );
};

export default SectionContainer;
