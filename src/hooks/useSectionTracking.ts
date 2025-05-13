
import { useEffect, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLocation } from "react-router-dom";

export const useSectionTracking = () => {
  const { trackEvent } = useAnalytics();
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState(location.hash);
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    // Update the hash when location changes
    setCurrentHash(location.hash);
  }, [location]);

  useEffect(() => {
    // Only track sections on the homepage
    if (!isHomepage) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          // Update URL without triggering page reload (for better analytics tracking)
          if (sectionId) {
            window.history.replaceState({}, '', `#${sectionId}`);
            setCurrentHash(`#${sectionId}`);
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
  }, [isHomepage, trackEvent]);

  // Get the current URL path and hash
  const currentPath = location.pathname;

  return { currentPath, currentHash };
};
