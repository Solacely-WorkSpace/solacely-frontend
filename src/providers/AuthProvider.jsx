'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/api/services/authService';
import tokenManager from '@/lib/auth/tokenManager';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check initial authentication status
    const checkAuth = () => {
      const storedUser = tokenManager.getStoredUser();
      const isAuth = tokenManager.isAuthenticated();
      
      if (storedUser && isAuth) {
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken' && !e.newValue) {
        // Token was removed
        setUser(null);
        setIsAuthenticated(false);
        router.push('/sign-in');
      }
    };

    // Listen for session expiration events
    const handleSessionExpired = () => {
      setUser(null);
      setIsAuthenticated(false);
      router.push('/sign-in');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('sessionExpired', handleSessionExpired);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, [router]);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const storedUser = tokenManager.getStoredUser();
      
      if (storedUser && tokenManager.isAuthenticated()) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      
      return response;
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      router.push('/sign-in');
    }
  };

  // Method to check and refresh authentication status
  const refreshAuthStatus = () => {
    const storedUser = tokenManager.getStoredUser();
    const isAuth = tokenManager.isAuthenticated();
    
    setUser(storedUser);
    setIsAuthenticated(isAuth);
    
    return isAuth;
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshAuthStatus,
    getTokenInfo: () => tokenManager.getTokenInfo(),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
