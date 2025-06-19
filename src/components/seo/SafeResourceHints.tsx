
import React from "react";
import { ResourceHints } from "./ResourceHints";

export const SafeResourceHints = () => {
  // Simplified implementation without mounting state
  try {
    return <ResourceHints />;
  } catch (error) {
    console.warn('ResourceHints rendering error:', error);
    return null;
  }
};
