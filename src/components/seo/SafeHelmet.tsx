
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SafeHelmetProps {
  children: React.ReactNode;
}

export const SafeHelmet: React.FC<SafeHelmetProps> = ({ children }) => {
  // Simple wrapper without try-catch to let errors bubble up for debugging
  return <Helmet>{children}</Helmet>;
};
