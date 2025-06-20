
import { useLocation } from "react-router-dom";

export const useSectionTracking = () => {
  const location = useLocation();
  
  return {
    currentPath: location.pathname,
    currentHash: location.hash,
  };
};
