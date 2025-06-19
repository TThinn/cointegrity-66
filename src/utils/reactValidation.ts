
import React from 'react';

/**
 * Validates that React is properly imported and available
 * Helps debug React module duplication issues
 */
export const validateReactImport = () => {
  if (!React) {
    console.error('❌ React is not available');
    throw new Error('React module not found - possible import issue');
  }

  if (!React.useState) {
    console.error('❌ React hooks are not available');
    throw new Error('React hooks not available - possible React version mismatch');
  }

  if (!React.createElement) {
    console.error('❌ React.createElement is not available');
    throw new Error('React.createElement not available - possible React corruption');
  }

  console.log('✅ React validation passed');
  return true;
};

/**
 * Enhanced React context validator for debugging
 */
export const validateReactContext = () => {
  try {
    // Check if we can create a simple component
    const TestComponent = React.createElement('div', null, 'test');
    
    // Check if useState hook works
    const [state, setState] = React.useState('test');
    
    console.log('✅ React context validation passed');
    return true;
  } catch (error) {
    console.error('❌ React context validation failed:', error);
    return false;
  }
};

/**
 * Debug React module status
 */
export const debugReactModule = () => {
  console.group('🔍 React Module Debug Info');
  console.log('React object:', React);
  console.log('React version:', React.version || 'Unknown');
  console.log('useState available:', !!React.useState);
  console.log('useEffect available:', !!React.useEffect);
  console.log('createElement available:', !!React.createElement);
  console.groupEnd();
};
