import { useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UseSectionUrlTrackingProps {
  activeSection: string;
  isHomepage: boolean;
}

export const useSectionUrlTracking = ({ activeSection, isHomepage }: UseSectionUrlTrackingProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const updateUrl = useCallback((section: string) => {
    if (!isHomepage) return;
    
    if (section) {
      // For any section, navigate to /#section
      const targetPath = `/#${section}`;
      if (location.pathname + location.hash !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    } else {
      // For hero section (no active section), navigate to /web3-consulting
      const targetPath = '/web3-consulting';
      if (location.pathname !== targetPath || location.hash) {
        navigate(targetPath, { replace: true });
      }
    }
  }, [isHomepage, location.pathname, location.hash, navigate]);

  // Update URL when active section changes
  useEffect(() => {
    if (isHomepage) {
      updateUrl(activeSection);
    }
  }, [activeSection, isHomepage, updateUrl]);

  return {
    currentHash: location.hash,
    updateUrl
  };
};