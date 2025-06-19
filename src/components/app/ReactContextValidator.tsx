
import React, { createContext, useContext, useEffect } from 'react';

interface ReactValidationContextType {
  isValidContext: boolean;
  validateHook: (hookName: string) => boolean;
}

const ReactValidationContext = createContext<ReactValidationContextType | null>(null);

export const ReactValidationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const validateHook = (hookName: string): boolean => {
    try {
      // Simple validation that we're in a React component context
      const reactInternals = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      const hasValidDispatcher = reactInternals?.ReactCurrentDispatcher?.current !== null;
      
      if (!hasValidDispatcher) {
        console.warn(`⚠️ ${hookName} called outside of component context`);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn(`⚠️ Hook validation failed for ${hookName}:`, error);
      return false;
    }
  };

  const contextValue: ReactValidationContextType = {
    isValidContext: true,
    validateHook
  };

  useEffect(() => {
    console.log('🔍 React validation context initialized');
  }, []);

  return (
    <ReactValidationContext.Provider value={contextValue}>
      {children}
    </ReactValidationContext.Provider>
  );
};

export const useReactValidation = (): ReactValidationContextType => {
  const context = useContext(ReactValidationContext);
  
  if (!context) {
    console.warn('⚠️ useReactValidation called outside of ReactValidationProvider');
    return {
      isValidContext: false,
      validateHook: () => false
    };
  }
  
  return context;
};
