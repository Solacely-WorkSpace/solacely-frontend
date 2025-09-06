import BaseApiService from '../baseService';
import loginAttemptService from './loginAttemptService';
import tokenManager from '../../auth/tokenManager';
import securityLogger from '../../auth/securityLogger';

class AuthService extends BaseApiService {
  constructor() {
    super(''); // Empty base path since we'll use full paths
  }

  // User registration
  async register(userData) {
    return this.post('/register/', userData);
  }

  // User login
  async login(credentials) {
    const email = credentials.email;
    
    // Check if account is locked before attempting login
    if (loginAttemptService.isAccountLocked(email)) {
      const remainingTime = loginAttemptService.getRemainingLockoutTime(email);
      throw {
        status: 423, // Locked status
        message: `Too many failed attempts. Please try again after ${remainingTime} minutes.`,
        data: { 
          locked: true, 
          remainingTime,
          type: 'account_locked'
        }
      };
    }

    try {
      const response = await this.post('/login/', credentials);
      
      // Debug the actual response structure
      console.log('Login response structure:', {
        response,
        hasSuccess: 'success' in response,
        hasData: 'data' in response,
        hasToken: 'token' in response,
        responseKeys: Object.keys(response),
        dataKeys: response.data ? Object.keys(response.data) : 'No data object'
      });
      
      // Store tokens using TokenManager
      let token = null;
      let refreshToken = null;
      
      if (response.tokens?.access) {
        token = response.tokens.access;
        refreshToken = response.tokens.refresh;
      } else if (response.tokens?.token) {
        token = response.tokens.token;
      } else if (response.success && response.data?.token) {
        token = response.data.token;
      } else if (response.token) {
        token = response.token;
      } else if (response.data?.access_token) {
        token = response.data.access_token;
      }
      
      if (token) {
        console.log('Storing tokens securely:', token.substring(0, 20) + '...');
        
        // Use TokenManager for secure storage with expiration
        tokenManager.storeTokens(
          token,
          refreshToken,
          response.user || response.data?.user || {}
        );
        
        // Log successful authentication
        securityLogger.logSuccessfulAuth('login');
        
        // Clear failed attempts on successful login
        loginAttemptService.recordSuccessfulLogin(email);
      } else {
        console.error('No token found in response!');
        console.log('Available keys in response.tokens:', response.tokens ? Object.keys(response.tokens) : 'No tokens object');
      }
      
      return response;
    } catch (error) {
      // Determine error type based on server response
      let errorMessage = 'Login failed. Please try again.';
      let errorType = 'general';
      let logReason = 'invalid_credentials';
      
      if (error.status === 401 || error.status === 400) {
        // Check if it's email not found or wrong password
        const serverMessage = error.data?.message || error.message || '';
        
        if (serverMessage.toLowerCase().includes('email') || 
            serverMessage.toLowerCase().includes('user') ||
            serverMessage.toLowerCase().includes('not found')) {
          errorMessage = 'This email address is not registered.';
          errorType = 'email_not_found';
          logReason = 'email_not_found';
        } else if (serverMessage.toLowerCase().includes('password') ||
                   serverMessage.toLowerCase().includes('credential') ||
                   serverMessage.toLowerCase().includes('invalid')) {
          errorMessage = 'Incorrect password.';
          errorType = 'wrong_password';
          logReason = 'wrong_password';
        }
      }
      
      // Log failed authentication for security audit
      securityLogger.logFailedAuth(logReason, loginAttemptService.getAttemptStatus(email).count + 1);
      
      // Record failed attempt with specific reason
      const attemptResult = loginAttemptService.recordFailedAttempt(email, logReason);
      
      // If this attempt caused a lockout, override the message
      if (attemptResult.isLocked) {
        errorMessage = 'Too many failed attempts. Please try again after 10 minutes.';
        errorType = 'account_locked';
        securityLogger.logSuspiciousActivity('account_locked', {
          email,
          attemptCount: attemptResult.count
        });
      }
      
      // Enhance error with attempt information
      const enhancedError = {
        ...error,
        message: errorMessage,
        data: {
          ...error.data,
          type: errorType,
          attemptCount: attemptResult.count,
          remainingAttempts: attemptResult.remainingAttempts,
          isLocked: attemptResult.isLocked
        }
      };
      
      throw enhancedError;
    }
  }

  // User logout
  async logout() {
    try {
      await this.post('/logout/');
    } finally {
      // Clear all tokens and session data
      tokenManager.clearTokens();
      console.log('Cleared all auth data and session');
    }
  }

  // Verify email/phone
  async verifyAccount(verificationData) {
    return this.post('/verify-email/', verificationData);
  }

  // Resend verification code
  async resendVerificationCode(data) {
    return this.post('/resend-otp/', data);
  }

  // Forgot password
  async forgotPassword(email) {
    return this.post('/password-reset/', { email });
  }

  // Reset password
  async resetPassword(resetData) {
    return this.post('/password-reset/confirm/', resetData);
  }

  // Change password
  async changePassword(passwordData) {
    return this.post('/change-password/', passwordData);
  }

  // Refresh token
  async refreshToken() {
    const refreshToken = tokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await this.post('/refresh-token/', { refresh: refreshToken });
      
      // Store new tokens
      if (response.access) {
        tokenManager.storeTokens(
          response.access,
          response.refresh || refreshToken,
          tokenManager.getStoredUser()
        );
      }
      
      return response;
    } catch (error) {
      // If refresh fails, clear all tokens
      tokenManager.clearTokens();
      throw error;
    }
  }

  // Get current user profile
  async getProfile() {
    return this.get('/profile/');
  }

  // Get login attempt status for an email
  getLoginAttemptStatus(email) {
    return loginAttemptService.getAttemptStatus(email);
  }

  // Update profile
  async updateProfile(profileData) {
    return this.put('/profile/', profileData);
  }

  // Upload profile image
  async uploadProfileImage(file) {
    const formData = new FormData();
    formData.append('image', file);
    return this.post('/profile/image/', formData);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return tokenManager.isAuthenticated();
  }

  // Get stored user data
  getStoredUser() {
    return tokenManager.getStoredUser();
  }

  // Get stored token
  getStoredToken() {
    return tokenManager.getAccessToken();
  }

  // Handle token expiration and auto-logout
  handleTokenExpiration() {
    tokenManager.handleTokenExpiration();
  }

  // Validate token format (basic check)
  isValidTokenFormat(token) {
    if (!token || typeof token !== 'string') return false;
    if (token === 'undefined' || token === 'null') return false;
    
    // Basic JWT format check (has 3 parts separated by dots)
    const parts = token.split('.');
    return parts.length === 3;
  }

  // Check if current token is valid
  validateStoredToken() {
    return tokenManager.isAuthenticated();
  }

  // Get token information for debugging
  getTokenInfo() {
    return tokenManager.getTokenInfo();
  }

  // Attempt to refresh token if expired
  async attemptTokenRefresh() {
    try {
      await this.refreshToken();
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      securityLogger.logTokenValidationFailure('token_refresh_failed', {
        error: error.message
      });
      this.handleTokenExpiration();
      return false;
    }
  }
}

export default new AuthService();
