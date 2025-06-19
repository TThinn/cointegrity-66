
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface InitializationState {
  isReady: boolean;
}

interface InitializationContextType extends InitializationState {
  markReady: () => void;
}

const InitializationContext = createContext<InitializationContextType | null>(null);

interface SafeInitializationProviderProps {
  children: ReactNode;
}

export const SafeInitializationProvider: React.FC<SafeInitializationProviderProps> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simple ready state management with minimal delay
    const timer = setTimeout(() => {
      setIsReady(true);
      console.log('✅ Initialization ready');
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const markReady = React.useCallback(() => {
    setIsReady(true);
  }, []);

  const contextValue: InitializationContextType = React.useMemo(() => ({
    isReady,
    markReady
  }), [isReady, markReady]);

  return (
    <InitializationContext.Provider value={contextValue}>
      {children}
    </InitializationContext.Provider>
  );
};

export const useInitialization = () => {
  const context = useContext(InitializationContext);
  if (!context) {
    throw new Error('useInitialization must be used within SafeInitializationProvider');
  }
  return context;
};
