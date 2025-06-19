
import React from "react";
import { ResourceHints } from "./ResourceHints";

export const SafeResourceHints = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    // Ensure component is mounted before rendering Helmet content
    setIsMounted(true);
  }, []);

  // Don't render anything during SSR or initial hydration
  if (!isMounted) {
    return null;
  }

  try {
    return <ResourceHints />;
  } catch (error) {
    console.warn('ResourceHints rendering error:', error);
    return null;
  }
};
