
import React from 'react';

// React debugging utilities
export const validateReactEnvironment = () => {
  if (typeof window === 'undefined') {
    console.log('🔍 Running in server environment');
    return false;
  }

  // Check for React in global scope
  const hasReact = typeof window.React !== 'undefined';
  console.log('🔍 React in global scope:', hasReact);

  // Check for multiple React instances
  const reactInstances = [];
  if (window.React) reactInstances.push('window.React');
  
  try {
    // Check if React is available through module system
    if (React) reactInstances.push('imported React');
  } catch (e) {
    console.log('🔍 React import check failed:', e);
  }

  console.log('🔍 React instances found:', reactInstances);
  
  return {
    hasReact,
    instanceCount: reactInstances.length,
    instances: reactInstances
  };
};

// Component wrapper for debugging hooks
export const withHookDebugging = <P extends Record<string, any>>(
  Component: React.ComponentType<P>,
  componentName: string
): React.ComponentType<P> => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => {
    console.log(`🔍 Rendering ${componentName} with hooks`);
    
    try {
      return React.createElement(Component, { ...props, ref } as P & { ref?: any });
    } catch (error) {
      console.error(`❌ Hook error in ${componentName}:`, error);
      throw error;
    }
  });

  WrappedComponent.displayName = `withHookDebugging(${componentName})`;
  return WrappedComponent;
};
