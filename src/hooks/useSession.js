/**
 * useSession Hook - Provides session management functionality
 * Monitors token expiration and session activity
 */

import { useState, useEffect, useCallback } from 'react';
import tokenManager from '@/lib/auth/tokenManager';
import securityLogger from '@/lib/auth/securityLogger';

export const useSession = () => {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState(null);

  // Update session information
  const updateSessionInfo = useCallback(() => {
    const tokenInfo = tokenManager.getTokenInfo();
    const isValid = tokenManager.isAuthenticated();
    
    setSessionInfo(tokenInfo);
    setIsSessionValid(isValid);
    
    if (tokenInfo?.session && !tokenInfo.session.isExpired) {
      setTimeUntilExpiry(Math.max(0, tokenInfo.session.timeUntilExpiry));
    } else {
      setTimeUntilExpiry(null);
    }
  }, []);

  // Force session refresh
  const refreshSession = useCallback(() => {
    tokenManager.updateLastActivity();
    updateSessionInfo();
  }, [updateSessionInfo]);

  // Get session security summary
  const getSecuritySummary = useCallback(() => {
    return securityLogger.getSecuritySummary();
  }, []);

  // Check if session is about to expire (within 5 minutes)
  const isSessionExpiringSoon = useCallback(() => {
    if (!timeUntilExpiry) return false;
    return timeUntilExpiry < 5 * 60 * 1000; // 5 minutes in milliseconds
  }, [timeUntilExpiry]);

  // Format time until expiry for display
  const formatTimeUntilExpiry = useCallback(() => {
    if (!timeUntilExpiry) return null;
    
    const minutes = Math.floor(timeUntilExpiry / (60 * 1000));
    const seconds = Math.floor((timeUntilExpiry % (60 * 1000)) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  }, [timeUntilExpiry]);

  useEffect(() => {
    // Initial session info update
    updateSessionInfo();

    // Update session info every 10 seconds
    const interval = setInterval(updateSessionInfo, 10000);

    // Listen for session expiration events
    const handleSessionExpired = (event) => {
      setIsSessionValid(false);
      setTimeUntilExpiry(null);
      console.log('Session expired:', event.detail?.reason);
    };

    window.addEventListener('sessionExpired', handleSessionExpired);

    return () => {
      clearInterval(interval);
      window.removeEventListener('sessionExpired', handleSessionExpired);
    };
  }, [updateSessionInfo]);

  return {
    sessionInfo,
    isSessionValid,
    timeUntilExpiry,
    timeUntilExpiryFormatted: formatTimeUntilExpiry(),
    isExpiringSoon: isSessionExpiringSoon(),
    refreshSession,
    getSecuritySummary,
    updateSessionInfo
  };
};

export default useSession;