
import { useEffect, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLocation } from "react-router-dom";

export const useSectionTracking = () => {
  const { trackEvent } = useAnalytics();
  const [currentHash, setCurrentHash] = useState('');
  const [currentPath, setCurrentPath] = useState('/');

  // Safely get location with fallback
  let location;
  try {
    location = useLocation();
  } catch (error) {
    console.warn('Router context not ready, using fallback values');
    location = { pathname: '/', hash: '' };
  }

  const isHomepage = location.pathname === '/';

  useEffect(() => {
    // Update the hash when location changes
    setCurrentHash(location.hash);
    setCurrentPath(location.pathname);
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

  return { currentPath, currentHash };
};
