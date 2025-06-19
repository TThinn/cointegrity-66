
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useInitialization } from "./SafeInitializationProvider";

export const SafeRouteTracker = () => {
  const location = useLocation();
  const { pageView } = useAnalytics();
  const { markRouterReady, isReactReady } = useInitialization();

  useEffect(() => {
    // Mark router as ready on first location change, but only if React is ready
    if (isReactReady) {
      // Use a small delay to ensure stable initialization
      const timer = setTimeout(() => {
        markRouterReady();
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isReactReady, markRouterReady]);

  useEffect(() => {
    // Only track page views when initialization is complete
    if (isReactReady) {
      // Use setTimeout to avoid tracking during initial render
      const timer = setTimeout(() => {
        try {
          pageView(location.pathname);
          console.log(`📊 Safe page view tracked: ${location.pathname}`);
        } catch (error) {
          console.warn(`📊 Failed to track page view for ${location.pathname}:`, error);
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, pageView, isReactReady]);
  
  return null;
};
