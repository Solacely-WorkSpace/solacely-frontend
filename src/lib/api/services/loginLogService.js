class LoginLogService {
  constructor() {
    this.storageKey = 'loginLogs';
  }

  // Get user's IP address (simplified for frontend)
  async getUserIP() {
    try {
      // In a real application, you might want to use a service like ipapi.co
      // For now, we'll use a placeholder
      return 'client-ip';
    } catch (error) {
      return 'unknown';
    }
  }

  // Log a failed login attempt
  async logFailedAttempt(email, reason = 'invalid_credentials') {
    if (typeof window === 'undefined') return;

    const ip = await this.getUserIP();
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      email,
      ip,
      timestamp,
      type: 'failed_login',
      reason,
      userAgent: navigator.userAgent
    };

    // Get existing logs
    const existingLogs = this.getLogs();
    existingLogs.push(logEntry);

    // Keep only last 100 entries to prevent storage bloat
    const recentLogs = existingLogs.slice(-100);
    
    localStorage.setItem(this.storageKey, JSON.stringify(recentLogs));
    
    console.log('Failed login attempt logged:', logEntry);
  }

  // Log an account lockout
  async logAccountLockout(email) {
    if (typeof window === 'undefined') return;

    const ip = await this.getUserIP();
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      email,
      ip,
      timestamp,
      type: 'account_lockout',
      reason: 'max_attempts_exceeded',
      userAgent: navigator.userAgent
    };

    const existingLogs = this.getLogs();
    existingLogs.push(logEntry);
    
    const recentLogs = existingLogs.slice(-100);
    localStorage.setItem(this.storageKey, JSON.stringify(recentLogs));
    
    console.log('Account lockout logged:', logEntry);
  }

  // Log a successful login
  async logSuccessfulLogin(email) {
    if (typeof window === 'undefined') return;

    const ip = await this.getUserIP();
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      email,
      ip,
      timestamp,
      type: 'successful_login',
      reason: 'valid_credentials',
      userAgent: navigator.userAgent
    };

    const existingLogs = this.getLogs();
    existingLogs.push(logEntry);
    
    const recentLogs = existingLogs.slice(-100);
    localStorage.setItem(this.storageKey, JSON.stringify(recentLogs));
    
    console.log('Successful login logged:', logEntry);
  }

  // Get all logs
  getLogs() {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  // Get logs for a specific email
  getLogsForEmail(email) {
    return this.getLogs().filter(log => log.email === email);
  }

  // Get recent failed attempts for an email
  getRecentFailedAttempts(email, timeWindowMs = 10 * 60 * 1000) {
    const now = Date.now();
    const cutoff = now - timeWindowMs;
    
    return this.getLogs().filter(log => 
      log.email === email && 
      log.type === 'failed_login' && 
      new Date(log.timestamp).getTime() > cutoff
    );
  }

  // Clear logs (for admin use)
  clearLogs() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(this.storageKey);
  }

  // Export logs for admin review
  exportLogs() {
    const logs = this.getLogs();
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `login-logs-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
}

export default new LoginLogService();