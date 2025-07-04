/**
 * Scroll management utilities for navigation and section handling
 */

// Header height constant - should match the actual header height
export const HEADER_HEIGHT = 100;

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
 * Initialize scroll restoration and global navigation handler
 */
export const initializeScrollManager = (): void => {
  // Set scroll restoration to manual to prevent browser auto-scroll jumps
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Global navigation click handler for the entire application.
  // It listens for clicks on the body, but only acts on menu links.
  document.body.addEventListener('click', function(e) {
    // Only proceed if the clicked element is a link with a hash.
    const link = (e.target as HTMLElement).closest('a[href*="#"]') as HTMLAnchorElement;
    if (!link) return;

    const url = new URL(link.href);
    const currentPath = window.location.pathname;
    const targetPath = url.pathname;
    const targetHash = url.hash;

    // CASE 1: On a "Resources" page, clicking a link back to the one-pager (e.g., /#about).
    // The target path is different from the current one.
    if (targetPath !== currentPath) {
      // Let the browser handle the navigation. It will go to the home page
      // and automatically scroll to the hash. Do not prevent default behavior.
      return;
    }

    // CASE 2: On the one-pager, clicking a link to a section on the same page (e.g., #about).
    // The target path is the same, but there is a hash.
    e.preventDefault(); // Stop the browser's default jump
    const targetElement = document.querySelector(targetHash);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
};

/**
 * Initialize IntersectionObserver for URL hash updates
 */
export const initializeUrlUpdater = (): void => {
  // Wait for the entire page to load to ensure all sections are available
  window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length === 0) return; // Don't run if there are no sections to observe

    const observerOptions = {
      root: null, // observes intersections relative to the viewport
      // The rootMargin is set to find the section that is in the middle of the screen.
      // It creates a horizontal line at 45% from the top and 45% from the bottom.
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0 // Triggers as soon as a single pixel enters this zone
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newHash = `#${entry.target.id}`;
          // Only update the URL if the hash is different to prevent unnecessary history entries.
          if (window.location.hash !== newHash) {
            history.replaceState(null, null, newHash);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  });
};

/**
 * Gets the currently active section based on scroll position (for header highlighting)
 * @param sectionIds - Array of section IDs to check
 */
export const getActiveSection = (sectionIds: string[]): string => {
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

    // Check if the section is currently in the viewport
    if (scrollY + HEADER_HEIGHT + 50 >= elementTop && scrollY + HEADER_HEIGHT + 50 < elementBottom) {
      return sectionIds[i];
    }
  }

  return '';
};