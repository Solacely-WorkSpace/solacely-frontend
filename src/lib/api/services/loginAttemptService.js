import loginLogService from './loginLogService';

class LoginAttemptService {
  constructor() {
    this.storageKey = 'loginAttempts';
    this.lockoutDuration = 10 * 60 * 1000; // 10 minutes in milliseconds
    this.maxAttempts = 5;
  }

  // Get stored attempts for an email
  getAttempts(email) {
    if (typeof window === 'undefined') return null;
    
    const stored = localStorage.getItem(`${this.storageKey}_${email}`);
    return stored ? JSON.parse(stored) : null;
  }

  // Store attempts for an email
  setAttempts(email, attempts) {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem(`${this.storageKey}_${email}`, JSON.stringify(attempts));
  }

  // Clear attempts for an email
  clearAttempts(email) {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(`${this.storageKey}_${email}`);
  }

  // Check if account is locked
  isAccountLocked(email) {
    const attempts = this.getAttempts(email);
    
    if (!attempts || attempts.count < this.maxAttempts) {
      return false;
    }

    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
    
    // If lockout period has passed, clear attempts
    if (timeSinceLastAttempt >= this.lockoutDuration) {
      this.clearAttempts(email);
      return false;
    }

    return true;
  }

  // Get remaining lockout time in minutes
  getRemainingLockoutTime(email) {
    const attempts = this.getAttempts(email);
    
    if (!attempts || attempts.count < this.maxAttempts) {
      return 0;
    }

    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
    const remainingTime = this.lockoutDuration - timeSinceLastAttempt;
    
    return remainingTime > 0 ? Math.ceil(remainingTime / (60 * 1000)) : 0;
  }

  // Record a failed attempt
  recordFailedAttempt(email, reason = 'invalid_credentials') {
    const attempts = this.getAttempts(email) || { count: 0, lastAttempt: 0 };
    
    attempts.count += 1;
    attempts.lastAttempt = Date.now();
    
    this.setAttempts(email, attempts);
    
    // Log the failed attempt
    loginLogService.logFailedAttempt(email, reason);
    
    const isLocked = attempts.count >= this.maxAttempts;
    
    // Log account lockout if this attempt caused it
    if (isLocked) {
      loginLogService.logAccountLockout(email);
    }
    
    return {
      count: attempts.count,
      isLocked,
      remainingAttempts: Math.max(0, this.maxAttempts - attempts.count)
    };
  }

  // Clear attempts on successful login
  recordSuccessfulLogin(email) {
    this.clearAttempts(email);
    // Log successful login
    loginLogService.logSuccessfulLogin(email);
  }

  // Get current attempt status
  getAttemptStatus(email) {
    const attempts = this.getAttempts(email);
    
    if (!attempts) {
      return {
        count: 0,
        isLocked: false,
        remainingAttempts: this.maxAttempts,
        remainingLockoutTime: 0
      };
    }

    const isLocked = this.isAccountLocked(email);
    
    return {
      count: attempts.count,
      isLocked,
      remainingAttempts: Math.max(0, this.maxAttempts - attempts.count),
      remainingLockoutTime: isLocked ? this.getRemainingLockoutTime(email) : 0
    };
  }
}

export default new LoginAttemptService();