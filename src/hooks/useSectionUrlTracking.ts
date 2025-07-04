import { useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleHashNavigation } from "@/utils/scrollManager";

interface UseSectionUrlTrackingProps {
  activeSection: string;
  isHomepage: boolean;
}

export const useSectionUrlTracking = ({ activeSection, isHomepage }: UseSectionUrlTrackingProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastHashRef = useRef<string>('');

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

  // Handle hash navigation with debouncing to prevent conflicts
  useEffect(() => {
    if (isHomepage && location.hash && location.hash !== lastHashRef.current) {
      lastHashRef.current = location.hash;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounced scroll to prevent conflicts
      scrollTimeoutRef.current = setTimeout(() => {
        handleHashNavigation(location.hash);
      }, 50);
    }
  }, [isHomepage, location.hash]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    currentHash: location.hash,
    updateUrl
  };
};