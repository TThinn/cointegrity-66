
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";

export const SafeRouteTracker = () => {
  const location = useLocation();
  const { pageView } = useAnalytics();

  useEffect(() => {
    // Simple page view tracking with minimal delay to ensure stable render
    const timer = setTimeout(() => {
      try {
        pageView(location.pathname);
        console.log(`📊 Page view tracked: ${location.pathname}`);
      } catch (error) {
        console.warn(`📊 Failed to track page view for ${location.pathname}:`, error);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, pageView]);
  
  return null;
};
