
import { useEffect, useState } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLocation } from "react-router-dom";

export const useSectionTracking = () => {
  const { trackEvent } = useAnalytics();
  const location = useLocation();
  const [currentHash, setCurrentHash] = useState(location.hash);
  
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    setCurrentHash(location.hash);
  }, [location]);

  // Simplified section tracking - only update hash when location changes
  useEffect(() => {
    if (!isHomepage) return;

    // Simple hash tracking without intersection observer
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setCurrentHash(hash);
        trackEvent('section_view', {
          category: 'Navigation',
          label: hash.replace('#', ''),
          nonInteraction: true
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isHomepage, trackEvent]);

  return { currentPath: location.pathname, currentHash };
};
