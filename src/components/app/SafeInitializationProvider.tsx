
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface InitializationState {
  isReactReady: boolean;
  isRouterReady: boolean;
  hasInitialized: boolean;
}

interface InitializationContextType extends InitializationState {
  markRouterReady: () => void;
}

const InitializationContext = createContext<InitializationContextType | null>(null);

interface SafeInitializationProviderProps {
  children: ReactNode;
}

export const SafeInitializationProvider: React.FC<SafeInitializationProviderProps> = ({ children }) => {
  const [state, setState] = useState<InitializationState>({
    isReactReady: false,
    isRouterReady: false,
    hasInitialized: false
  });

  useEffect(() => {
    // Mark React as ready after first render
    setState(prev => ({ ...prev, isReactReady: true }));
    console.log('✅ React initialization ready');
  }, []);

  useEffect(() => {
    // Initialize performance monitoring only when both React and router are ready
    if (state.isReactReady && state.isRouterReady && !state.hasInitialized) {
      console.log('🚀 Starting safe initialization...');
      
      // Use setTimeout to ensure we're outside the render cycle
      setTimeout(() => {
        try {
          // Dynamic imports to avoid blocking
          Promise.all([
            import('../../utils/webVitalsInit'),
            import('../../utils/serviceWorkerInit')
          ]).then(([webVitals, serviceWorker]) => {
            webVitals.initWebVitals();
            serviceWorker.initServiceWorker();
            console.log('✅ Performance monitoring initialized');
          }).catch(error => {
            console.warn('⚠️ Performance monitoring failed to initialize:', error);
          });
        } catch (error) {
          console.error('❌ Initialization error:', error);
        }
      }, 100);

      setState(prev => ({ ...prev, hasInitialized: true }));
    }
  }, [state.isReactReady, state.isRouterReady, state.hasInitialized]);

  const markRouterReady = () => {
    setState(prev => ({ ...prev, isRouterReady: true }));
    console.log('✅ Router initialization ready');
  };

  const contextValue: InitializationContextType = {
    ...state,
    markRouterReady
  };

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
