
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Creates a properly formatted JSON-LD script element for structured data
 * @param data The structured data object
 * @returns A string containing the JSON-LD script
 */
export function createJsonLd(data: Record<string, any>): string {
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

/**
 * Validates structured data for common errors
 * @param data The structured data object to validate
 * @returns An object containing validation results
 */
export function validateStructuredData(data: Record<string, any>) {
  const errors = [];
  
  // Check for required context
  if (!data["@context"]) {
    errors.push("Missing @context property");
  }
  
  // Check for required type
  if (!data["@type"]) {
    errors.push("Missing @type property");
  }
  
  // Additional schema-specific validation could be added here
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
