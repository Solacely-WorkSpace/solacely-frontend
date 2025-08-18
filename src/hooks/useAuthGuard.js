import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/api/services/authService';

/**
 * Hook to guard routes that require authentication
 * Automatically redirects to login if user is not authenticated or token is invalid
 */
export const useAuthGuard = (redirectTo = '/sign-in') => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (!authService.isAuthenticated()) {
        console.log('User not authenticated, redirecting to login...');
        router.push(redirectTo);
        return false;
      }

      // Validate token format
      if (!authService.validateStoredToken()) {
        console.log('Invalid token detected, redirecting to login...');
        router.push(redirectTo);
        return false;
      }

      return true;
    };

    checkAuth();
  }, [router, redirectTo]);

  return {
    isAuthenticated: authService.isAuthenticated(),
    user: authService.getStoredUser(),
  };
};

/**
 * Hook to check authentication status without redirecting
 * Useful for components that show different content based on auth status
 */
export const useAuthStatus = () => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getStoredUser();
  const hasValidToken = authService.validateStoredToken();

  return {
    isAuthenticated: isAuthenticated && hasValidToken,
    user,
    hasValidToken,
  };
};

/**
 * Hook to handle logout with cleanup
 */
export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always redirect to login after logout
      router.push('/sign-in');
    }
  };

  return logout;
};

export default useAuthGuard;
