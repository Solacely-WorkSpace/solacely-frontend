import { useState, useEffect } from 'react';
import authService from '@/lib/api/services/authService';

export const useLoginAttempts = (email) => {
  const [attemptStatus, setAttemptStatus] = useState({
    count: 0,
    isLocked: false,
    remainingAttempts: 5,
    remainingLockoutTime: 0
  });

  useEffect(() => {
    if (email) {
      updateAttemptStatus();
    }
  }, [email]);

  const updateAttemptStatus = () => {
    if (email) {
      const status = authService.getLoginAttemptStatus(email);
      setAttemptStatus(status);
    }
  };

  const checkLockoutStatus = () => {
    updateAttemptStatus();
    return attemptStatus.isLocked;
  };

  return {
    attemptStatus,
    updateAttemptStatus,
    checkLockoutStatus,
    isLocked: attemptStatus.isLocked,
    remainingAttempts: attemptStatus.remainingAttempts,
    remainingLockoutTime: attemptStatus.remainingLockoutTime
  };
};