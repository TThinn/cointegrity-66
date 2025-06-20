
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SafeHelmetProps {
  children: React.ReactNode;
}

export const SafeHelmet: React.FC<SafeHelmetProps> = ({ children }) => {
  try {
    return <Helmet>{children}</Helmet>;
  } catch (error) {
    console.error('SafeHelmet error:', error);
    return null;
  }
};
