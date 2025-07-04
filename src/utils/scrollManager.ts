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
 * Initialize scroll restoration and smooth scroll functionality
 */
export const initializeScrollManager = (): void => {
  // Set scroll restoration to manual to prevent browser auto-scroll jumps
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Set up smooth scroll click handlers for anchor links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (!link || link.getAttribute('href') === '#') return;
    
    e.preventDefault();
    const targetId = link.getAttribute('href')?.substring(1);
    if (!targetId) return;
    
    const targetElement = document.getElementById(targetId);
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
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Update the URL without adding to browser history
        history.replaceState(null, '', `#${entry.target.id}`);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
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