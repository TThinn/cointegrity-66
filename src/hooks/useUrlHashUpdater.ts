import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getActiveSection } from '@/utils/scrollManager';

interface UseUrlHashUpdaterProps {
  isHomepage: boolean;
  sections: string[];
}

/**
 * Hook to update the URL hash based on the currently visible section
 */
export const useUrlHashUpdater = ({ isHomepage, sections }: UseUrlHashUpdaterProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isHomepage) return;

    const handleScroll = () => {
      const currentSection = getActiveSection(sections);
      const currentHash = location.hash.substring(1); // Remove the #
      
      // Only update URL if the section has changed and we're not already navigating
      if (currentSection && currentSection !== currentHash) {
        // Use replace to avoid adding to browser history on scroll
        navigate(`/#${currentSection}`, { replace: true });
      } else if (!currentSection && currentHash) {
        // Clear hash when no section is active (near top of page)
        navigate('/', { replace: true });
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isHomepage, sections, location.hash, navigate]);
};