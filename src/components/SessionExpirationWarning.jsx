/**
 * SessionExpirationWarning Component
 * Shows a warning when the session is about to expire
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/hooks/useSession';
import { useAuth } from '@/providers/AuthProvider';

const SessionExpirationWarning = () => {
  const { isSessionValid, isExpiringSoon, timeUntilExpiryFormatted, refreshSession } = useSession();
  const { isAuthenticated, logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    // Show warning if session is expiring soon and user is authenticated
    setShowWarning(isAuthenticated && isSessionValid && isExpiringSoon);
  }, [isAuthenticated, isSessionValid, isExpiringSoon]);

  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      // Refresh session by updating activity
      refreshSession();
      setShowWarning(false);
    } catch (error) {
      console.error('Failed to extend session:', error);
    } finally {
      setIsExtending(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (!showWarning) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-white p-4 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-medium">Session Expiring Soon</p>
            <p className="text-sm">
              Your session will expire in {timeUntilExpiryFormatted}. 
              Extend your session to continue working.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExtendSession}
            disabled={isExtending}
            className="bg-white text-yellow-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExtending ? 'Extending...' : 'Extend Session'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-700"
          >
            Logout
          </button>
          <button
            onClick={() => setShowWarning(false)}
            className="text-white hover:text-gray-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpirationWarning;