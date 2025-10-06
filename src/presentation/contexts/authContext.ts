// Authentication context definition

import { createContext } from 'react';
import type { User, AuthCredentials, AuthResponse } from '../../shared/types';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (credentials: AuthCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);