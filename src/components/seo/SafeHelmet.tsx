
import React, { useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface SafeHelmetProps {
  children: React.ReactNode;
}

export const SafeHelmet: React.FC<SafeHelmetProps> = ({ children }) => {
  try {
    // Check if HelmetProvider context is available
    const context = useContext(HelmetProvider.canUseDOM ? HelmetProvider.Context : {} as any);
    
    if (!context && typeof window !== 'undefined') {
      console.warn('Helmet context not available, skipping render');
      return null;
    }

    return <Helmet>{children}</Helmet>;
  } catch (error) {
    console.error('SafeHelmet error:', error);
    return null;
  }
};
