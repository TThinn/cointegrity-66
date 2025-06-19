
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
    const importedReact = require('react');
    if (importedReact) reactInstances.push('imported React');
  } catch (e) {
    // Module systems might not support require
  }

  console.log('🔍 React instances found:', reactInstances);
  
  return {
    hasReact,
    instanceCount: reactInstances.length,
    instances: reactInstances
  };
};

// Component wrapper for debugging hooks
export const withHookDebugging = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.forwardRef<any, P>((props, ref) => {
    console.log(`🔍 Rendering ${componentName} with hooks`);
    
    try {
      return <Component {...props} ref={ref} />;
    } catch (error) {
      console.error(`❌ Hook error in ${componentName}:`, error);
      throw error;
    }
  });
};
