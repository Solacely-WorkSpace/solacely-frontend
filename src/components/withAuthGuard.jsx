import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/api/services/authService';

/**
 * Higher-order component to protect routes that require authentication
 * Wraps components and redirects to login if user is not authenticated
 */
const withAuthGuard = (WrappedComponent, redirectTo = '/sign-in') => {
  const AuthGuardedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
          console.log('User not authenticated, redirecting to login...');
          router.push(redirectTo);
          return;
        }

        // Validate token format
        if (!authService.validateStoredToken()) {
          console.log('Invalid token detected, redirecting to login...');
          router.push(redirectTo);
          return;
        }
      };

      checkAuth();
    }, [router]);

    // Show loading or the component based on auth status
    if (!authService.isAuthenticated() || !authService.validateStoredToken()) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">Checking authentication...</div>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  AuthGuardedComponent.displayName = `withAuthGuard(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthGuardedComponent;
};

export default withAuthGuard;
