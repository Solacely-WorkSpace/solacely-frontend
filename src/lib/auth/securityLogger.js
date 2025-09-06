/**
 * Security Logger - Logs authentication events for security audits
 * Tracks token validation failures and suspicious activities
 */

class SecurityLogger {
  constructor() {
    this.LOG_KEY = 'security_audit_logs';
    this.MAX_LOGS = 100; // Keep last 100 logs
  }

  /**
   * Log security event
   */
  logEvent(eventType, details = {}) {
    if (typeof window === 'undefined') return;

    const logEntry = {
      timestamp: new Date().toISOString(),
      eventType,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      ...details
    };

    // Store log entry
    this.storeLogEntry(logEntry);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('🔒 Security Event:', logEntry);
    }

    // In production, you might want to send this to your backend
    if (process.env.NODE_ENV === 'production') {
      this.sendToBackend(logEntry);
    }
  }

  /**
   * Log token validation failure
   */
  logTokenValidationFailure(reason, tokenInfo = {}) {
    this.logEvent('TOKEN_VALIDATION_FAILURE', {
      reason,
      tokenInfo: {
        hasToken: !!tokenInfo.token,
        tokenLength: tokenInfo.token ? tokenInfo.token.length : 0,
        isExpired: tokenInfo.isExpired,
        expiresAt: tokenInfo.expiresAt
      }
    });
  }

  /**
   * Log session expiration
   */
  logSessionExpiration(reason) {
    this.logEvent('SESSION_EXPIRED', {
      reason,
      lastActivity: this.getLastActivity()
    });
  }

  /**
   * Log suspicious login attempt
   */
  logSuspiciousActivity(activityType, details = {}) {
    this.logEvent('SUSPICIOUS_ACTIVITY', {
      activityType,
      ...details
    });
  }

  /**
   * Log successful authentication
   */
  logSuccessfulAuth(method = 'login') {
    this.logEvent('AUTH_SUCCESS', {
      method,
      timestamp: Date.now()
    });
  }

  /**
   * Log failed authentication
   */
  logFailedAuth(reason, attemptCount = 0) {
    this.logEvent('AUTH_FAILURE', {
      reason,
      attemptCount,
      timestamp: Date.now()
    });
  }

  /**
   * Store log entry in localStorage
   */
  storeLogEntry(logEntry) {
    try {
      const existingLogs = this.getStoredLogs();
      existingLogs.push(logEntry);

      // Keep only the last MAX_LOGS entries
      if (existingLogs.length > this.MAX_LOGS) {
        existingLogs.splice(0, existingLogs.length - this.MAX_LOGS);
      }

      localStorage.setItem(this.LOG_KEY, JSON.stringify(existingLogs));
    } catch (error) {
      console.error('Failed to store security log:', error);
    }
  }

  /**
   * Get stored security logs
   */
  getStoredLogs() {
    try {
      const logs = localStorage.getItem(this.LOG_KEY);
      return logs ? JSON.parse(logs) : [];
    } catch (error) {
      console.error('Failed to retrieve security logs:', error);
      return [];
    }
  }

  /**
   * Get current user ID from stored user data
   */
  getCurrentUserId() {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        return user.id || user.email || 'unknown';
      }
    } catch (error) {
      // Ignore errors
    }
    return 'anonymous';
  }

  /**
   * Get session ID
   */
  getSessionId() {
    try {
      const sessionData = localStorage.getItem('session_token');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        return session.created || Date.now();
      }
    } catch (error) {
      // Ignore errors
    }
    return 'no_session';
  }

  /**
   * Get last activity timestamp
   */
  getLastActivity() {
    try {
      const sessionData = localStorage.getItem('session_token');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        return session.lastActivity;
      }
    } catch (error) {
      // Ignore errors
    }
    return null;
  }

  /**
   * Send log to backend (placeholder for production implementation)
   */
  async sendToBackend(logEntry) {
    try {
      
      console.log('Security log would be sent to backend:', logEntry);
    } catch (error) {
      console.error('Failed to send security log to backend:', error);
    }
  }

  /**
   * Clear all stored logs
   */
  clearLogs() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.LOG_KEY);
    }
  }

  /**
   * Get security summary
   */
  getSecuritySummary() {
    const logs = this.getStoredLogs();
    const last24Hours = Date.now() - (24 * 60 * 60 * 1000);
    
    const recentLogs = logs.filter(log => 
      new Date(log.timestamp).getTime() > last24Hours
    );

    const summary = {
      totalLogs: logs.length,
      recentLogs: recentLogs.length,
      failedAttempts: recentLogs.filter(log => 
        log.eventType === 'AUTH_FAILURE' || log.eventType === 'TOKEN_VALIDATION_FAILURE'
      ).length,
      sessionExpirations: recentLogs.filter(log => 
        log.eventType === 'SESSION_EXPIRED'
      ).length,
      suspiciousActivities: recentLogs.filter(log => 
        log.eventType === 'SUSPICIOUS_ACTIVITY'
      ).length
    };

    return summary;
  }
}

export default new SecurityLogger();