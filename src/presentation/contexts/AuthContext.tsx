// Authentication context for React components

import React from 'react';
import type { ReactNode } from 'react';
import { useAuth } from '../../application/hooks';
import { AuthContext } from './authContext';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuth();

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};