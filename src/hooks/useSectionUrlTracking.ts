import { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UseSectionUrlTrackingProps {
  activeSection: string;
  isHomepage: boolean;
}

export const useSectionUrlTracking = ({ activeSection, isHomepage }: UseSectionUrlTrackingProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateUrlHash = useCallback((section: string) => {
    if (!isHomepage) return;
    
    const newHash = section ? `#${section}` : '';
    const currentHash = location.hash;
    
    // Only update if the hash actually changed
    if (currentHash !== newHash) {
      // Use replace to avoid adding to browser history for every scroll
      navigate({ hash: newHash }, { replace: true });
    }
  }, [isHomepage, location.hash, navigate]);

  // Update URL hash when active section changes
  useEffect(() => {
    if (isHomepage && activeSection) {
      updateUrlHash(activeSection);
    }
  }, [activeSection, isHomepage, updateUrlHash]);

  // Clear hash when no section is active (e.g., at top of page)
  useEffect(() => {
    if (isHomepage && !activeSection && location.hash) {
      navigate({ hash: '' }, { replace: true });
    }
  }, [activeSection, isHomepage, location.hash, navigate]);

  return {
    currentHash: location.hash,
    updateUrlHash
  };
};