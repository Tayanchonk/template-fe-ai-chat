// Custom hook for authentication

import { useState, useEffect } from 'react';
import type { User, AuthCredentials } from '../../shared/types';
import { appService } from '../services';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const currentUser = await appService.getCurrentUserUseCase.execute();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: AuthCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const authResponse = await appService.loginUseCase.execute(credentials);
      setUser(authResponse.user);
      return authResponse;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await appService.logoutUseCase.execute();
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user?.isAuthenticated,
  };
};