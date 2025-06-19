
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useInitialization } from "./SafeInitializationProvider";

export const SafeRouteTracker = () => {
  const location = useLocation();
  const { pageView } = useAnalytics();
  const { markRouterReady, isReactReady } = useInitialization();

  useEffect(() => {
    // Mark router as ready on first location change
    if (isReactReady) {
      markRouterReady();
    }
  }, [isReactReady, markRouterReady]);

  useEffect(() => {
    // Only track page views when initialization is complete
    if (isReactReady) {
      // Use setTimeout to avoid tracking during initial render
      setTimeout(() => {
        pageView(location.pathname);
        console.log(`📊 Safe page view tracked: ${location.pathname}`);
      }, 0);
    }
  }, [location.pathname, pageView, isReactReady]);
  
  return null;
};
