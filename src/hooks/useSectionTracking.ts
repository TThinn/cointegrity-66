
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

export const useSectionTracking = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Update URL without triggering page reload (for better analytics tracking)
          if (sectionId) {
            window.history.replaceState({}, '', `#${sectionId}`);
            trackEvent('section_view', {
              category: 'Navigation',
              label: sectionId,
              nonInteraction: true
            });
          }
        }
      });
    }, { threshold: 0.3 });

    // Observe all sections for visibility
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [trackEvent]);

  // Get the current URL path and hash
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  return { currentPath, currentHash };
};
