/**
 * Scroll management utilities for navigation and section handling
 */

// Header height constant - should match the actual header height
export const HEADER_HEIGHT = 80;

/**
 * Scrolls to the top of the page instantly (for navigation)
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });
};

/**
 * Scrolls to the top of the page smoothly (for UI interactions)
 */
export const scrollToTopSmooth = (): void => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * Scrolls to a specific section with header offset instantly (for navigation)
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Additional offset (defaults to HEADER_HEIGHT)
 */
export const scrollToSection = (sectionId: string, offset: number = HEADER_HEIGHT): void => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section with ID "${sectionId}" not found`);
    return;
  }

  const elementTop = element.offsetTop;
  const scrollPosition = elementTop - offset;

  window.scrollTo({
    top: Math.max(0, scrollPosition),
    left: 0,
    behavior: 'auto'
  });
};

/**
 * Scrolls to a specific section with header offset smoothly (for UI interactions)
 * @param sectionId - The ID of the section to scroll to
 * @param offset - Additional offset (defaults to HEADER_HEIGHT)
 */
export const scrollToSectionSmooth = (sectionId: string, offset: number = HEADER_HEIGHT): void => {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.warn(`Section with ID "${sectionId}" not found`);
    return;
  }

  const elementTop = element.offsetTop;
  const scrollPosition = elementTop - offset;

  window.scrollTo({
    top: Math.max(0, scrollPosition),
    left: 0,
    behavior: 'smooth'
  });
};

/**
 * Gets the currently active section based on scroll position
 * @param sectionIds - Array of section IDs to check
 * @param offset - Offset for determining active section (defaults to HEADER_HEIGHT + 50)
 */
export const getActiveSection = (sectionIds: string[], offset: number = HEADER_HEIGHT + 50): string => {
  const scrollY = window.scrollY;
  
  // If we're near the top, no active section
  if (scrollY < 200) {
    return '';
  }

  for (let i = 0; i < sectionIds.length; i++) {
    const element = document.getElementById(sectionIds[i]);
    if (!element) continue;

    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.offsetHeight;

    // Check if the section is currently in the viewport considering the offset
    if (scrollY + offset >= elementTop && scrollY + offset < elementBottom) {
      return sectionIds[i];
    }
  }

  return '';
};

/**
 * Restores scroll position for navigation
 */
export const restoreScrollPosition = (): void => {
  // For most cases, we want to scroll to top
  // This can be enhanced later if we need to restore specific positions
  scrollToTop();
};

/**
 * Handles hash-based navigation with proper offset and timing (instant for navigation)
 * @param hash - The hash string (including #)
 */
export const handleHashNavigation = (hash: string): void => {
  if (!hash || hash === '#') {
    scrollToTop();
    return;
  }

  // Remove the # symbol
  const sectionId = hash.substring(1);
  
  // Add a small delay to ensure the DOM is ready
  setTimeout(() => {
    scrollToSection(sectionId);
  }, 100);
};