'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/api/services/authService';

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
      const storedUser = authService.getStoredUser();
      const hasValidToken = authService.validateStoredToken();
      
      if (storedUser && hasValidToken) {
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Set up periodic token validation
    const validationInterval = authService.setupTokenValidation(30000); // Check every 30 seconds

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'authToken' && !e.newValue) {
        // Token was removed
        setUser(null);
        setIsAuthenticated(false);
        router.push('/sign-in');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      if (validationInterval) {
        clearInterval(validationInterval);
      }
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [router]);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const storedUser = authService.getStoredUser();
      
      if (storedUser) {
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

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
