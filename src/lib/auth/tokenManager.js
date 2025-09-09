/**
 * Token Manager - Handles JWT tokens, session cookies, and refresh tokens
 * Implements secure token storage and expiration management
 */

import securityLogger from './securityLogger';

class TokenManager {
  constructor() {
    this.ACCESS_TOKEN_KEY = 'authToken';
    this.REFRESH_TOKEN_KEY = 'refreshToken';
    this.SESSION_COOKIE_KEY = 'session_token';
    this.USER_KEY = 'user';
    
    // Token lifespans (in milliseconds)
    this.ACCESS_TOKEN_LIFESPAN = 60 * 60 * 1000; // 1 hour
    this.SESSION_COOKIE_LIFESPAN = 30 * 60 * 1000; // 30 minutes
    this.REFRESH_TOKEN_LIFESPAN = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    this.lastActivity = Date.now();
    this.sessionCheckInterval = null;
    
    // Start session monitoring
    this.startSessionMonitoring();
  }

  /**
   * Store tokens securely after successful login
   */
  storeTokens(accessToken, refreshToken = null, userData = null) {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    
    // Store access token with expiration
    const accessTokenData = {
      token: accessToken,
      expiresAt: now + this.ACCESS_TOKEN_LIFESPAN,
      issuedAt: now
    };
    localStorage.setItem(this.ACCESS_TOKEN_KEY, JSON.stringify(accessTokenData));

    // Store refresh token if provided
    if (refreshToken) {
      const refreshTokenData = {
        token: refreshToken,
        expiresAt: now + this.REFRESH_TOKEN_LIFESPAN,
        issuedAt: now
      };
      localStorage.setItem(this.REFRESH_TOKEN_KEY, JSON.stringify(refreshTokenData));
    }

    // Store user data
    if (userData) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(userData));
    }

    // Create session cookie
    this.createSessionCookie();
    
    // Update last activity
    this.updateLastActivity();
    
    // Log successful authentication
    securityLogger.logSuccessfulAuth('token_storage');
  }

  /**
   * Create secure session cookie
   */
  createSessionCookie() {
    if (typeof window === 'undefined') return;

    const sessionData = {
      created: Date.now(),
      lastActivity: Date.now(),
      expiresAt: Date.now() + this.SESSION_COOKIE_LIFESPAN
    };

    // Store in localStorage (simulating HttpOnly cookie behavior)
    localStorage.setItem(this.SESSION_COOKIE_KEY, JSON.stringify(sessionData));
  }

  /**
   * Update session activity (rolling expiration)
   */
  updateLastActivity() {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    this.lastActivity = now;

    // Update session cookie with new expiration
    const sessionData = {
      created: this.getSessionCreatedTime() || now,
      lastActivity: now,
      expiresAt: now + this.SESSION_COOKIE_LIFESPAN
    };

    localStorage.setItem(this.SESSION_COOKIE_KEY, JSON.stringify(sessionData));
  }

  /**
   * Get access token if valid
   */
  getAccessToken() {
    if (typeof window === 'undefined') return null;

    try {
      const tokenData = localStorage.getItem(this.ACCESS_TOKEN_KEY);
      if (!tokenData) return null;

      const parsed = JSON.parse(tokenData);
      const now = Date.now();

      // Check if token is expired
      if (now >= parsed.expiresAt) {
        console.log('Access token expired');
        securityLogger.logTokenValidationFailure('access_token_expired', {
          token: parsed.token,
          isExpired: true,
          expiresAt: parsed.expiresAt
        });
        this.clearTokens();
        return null;
      }

      return parsed.token;
    } catch (error) {
      console.error('Error parsing access token:', error);
      securityLogger.logTokenValidationFailure('access_token_parse_error', {
        error: error.message
      });
      this.clearTokens();
      return null;
    }
  }

  /**
   * Get refresh token if valid
   */
  getRefreshToken() {
    if (typeof window === 'undefined') return null;

    try {
      const tokenData = localStorage.getItem(this.REFRESH_TOKEN_KEY);
      if (!tokenData) return null;

      const parsed = JSON.parse(tokenData);
      const now = Date.now();

      // Check if refresh token is expired
      if (now >= parsed.expiresAt) {
        console.log('Refresh token expired');
        securityLogger.logTokenValidationFailure('refresh_token_expired', {
          token: parsed.token,
          isExpired: true,
          expiresAt: parsed.expiresAt
        });
        this.clearTokens();
        return null;
      }

      return parsed.token;
    } catch (error) {
      console.error('Error parsing refresh token:', error);
      securityLogger.logTokenValidationFailure('refresh_token_parse_error', {
        error: error.message
      });
      this.clearTokens();
      return null;
    }
  }

  /**
   * Check if session is valid (not expired due to inactivity)
   */
  isSessionValid() {
    if (typeof window === 'undefined') return false;

    try {
      const sessionData = localStorage.getItem(this.SESSION_COOKIE_KEY);
      if (!sessionData) return false;

      const parsed = JSON.parse(sessionData);
      const now = Date.now();

      return now < parsed.expiresAt;
    } catch (error) {
      console.error('Error checking session validity:', error);
      securityLogger.logTokenValidationFailure('session_validation_error', {
        error: error.message
      });
      return false;
    }
  }

  /**
   * Get session created time
   */
  getSessionCreatedTime() {
    if (typeof window === 'undefined') return null;

    try {
      const sessionData = localStorage.getItem(this.SESSION_COOKIE_KEY);
      if (!sessionData) return null;

      const parsed = JSON.parse(sessionData);
      return parsed.created;
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if user is authenticated (has valid tokens and session)
   */
  isAuthenticated() {
    const hasValidToken = !!this.getAccessToken();
    const hasValidSession = this.isSessionValid();
    
    return hasValidToken && hasValidSession;
  }

  /**
   * Get stored user data
   */
  getStoredUser() {
    if (typeof window === 'undefined') return null;

    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  /**
   * Clear all tokens and session data
   */
  clearTokens() {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.SESSION_COOKIE_KEY);
    localStorage.removeItem(this.USER_KEY);
    
    this.stopSessionMonitoring();
  }

  /**
   * Handle token expiration - logout user
   */
  handleTokenExpiration(reason = 'Token expired') {
    console.log(`Token expiration handled: ${reason}`);
    
    // Log session expiration for security audit
    securityLogger.logSessionExpiration(reason);
    
    this.clearTokens();
    
    // Dispatch custom event for React components to listen
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sessionExpired', { detail: { reason } }));
      
      // Show user-friendly message
      alert('Your session has expired. Please log in again.');
      window.location.href = '/sign-in';
    }
  }

  /**
   * Start monitoring session activity
   */
  startSessionMonitoring() {
    if (typeof window === 'undefined') return;

    // Check session every 30 seconds
    this.sessionCheckInterval = setInterval(() => {
      if (this.getAccessToken() && !this.isSessionValid()) {
        this.handleTokenExpiration('Session expired due to inactivity');
      }
    }, 30000);

    // Update activity on user interactions
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const activityHandler = () => {
      if (this.isAuthenticated()) {
        this.updateLastActivity();
      }
    };
    
    events.forEach(event => {
      document.addEventListener(event, activityHandler, { passive: true });
    });
    
    // Store reference to remove listeners later
    this.activityHandler = activityHandler;
    this.activityEvents = events;
  }

  /**
   * Stop session monitoring
   */
  stopSessionMonitoring() {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
      this.sessionCheckInterval = null;
    }
    
    // Remove activity listeners
    if (this.activityHandler && this.activityEvents) {
      this.activityEvents.forEach(event => {
        document.removeEventListener(event, this.activityHandler);
      });
    }
  }

  /**
   * Get token expiration info for debugging
   */
  getTokenInfo() {
    if (typeof window === 'undefined') return null;

    const accessTokenData = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refreshTokenData = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const sessionData = localStorage.getItem(this.SESSION_COOKIE_KEY);

    const now = Date.now();

    return {
      accessToken: accessTokenData ? {
        ...JSON.parse(accessTokenData),
        timeUntilExpiry: JSON.parse(accessTokenData).expiresAt - now,
        isExpired: now >= JSON.parse(accessTokenData).expiresAt
      } : null,
      refreshToken: refreshTokenData ? {
        ...JSON.parse(refreshTokenData),
        timeUntilExpiry: JSON.parse(refreshTokenData).expiresAt - now,
        isExpired: now >= JSON.parse(refreshTokenData).expiresAt
      } : null,
      session: sessionData ? {
        ...JSON.parse(sessionData),
        timeUntilExpiry: JSON.parse(sessionData).expiresAt - now,
        isExpired: now >= JSON.parse(sessionData).expiresAt
      } : null
    };
  }
}

export default new TokenManager();