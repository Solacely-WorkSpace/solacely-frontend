import BaseApiService from '../baseService';
import loginAttemptService from './loginAttemptService';

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
      
      // Store token if login successful - try multiple possible structures
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
      
      if (token && typeof window !== 'undefined') {
        console.log('Storing token:', token.substring(0, 20) + '...');
        localStorage.setItem('authToken', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
        localStorage.setItem('user', JSON.stringify(response.user || response.data?.user || {}));
        
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
      
      // Record failed attempt with specific reason
      const attemptResult = loginAttemptService.recordFailedAttempt(email, logReason);
      
      // If this attempt caused a lockout, override the message
      if (attemptResult.isLocked) {
        errorMessage = 'Too many failed attempts. Please try again after 10 minutes.';
        errorType = 'account_locked';
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
      // Clear local storage regardless of API response
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        console.log('Cleared all auth data from localStorage');
      }
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
    return this.post('/refresh-token/');
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
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('authToken');
  }

  // Get stored user data
  getStoredUser() {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get stored token
  getStoredToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  }

  // Handle token expiration and auto-logout
  handleTokenExpiration() {
    console.log('Token expired, logging out user...');
    
    // Clear all auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      console.log('Cleared all auth data from localStorage');
      
      // You can customize this message or use a toast notification
      alert('Your session has expired. Please log in again.');
      
      // Redirect to login page
      window.location.href = '/sign-in';
    }
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
    const token = this.getStoredToken();
    
    if (!this.isValidTokenFormat(token)) {
      console.log('Invalid token format detected, cleaning up...');
      this.handleTokenExpiration();
      return false;
    }
    
    return true;
  }

  // Set up periodic token validation (call this in your app initialization)
  setupTokenValidation(intervalMs = 60000) { // Check every minute by default
    if (typeof window === 'undefined') return;

    return setInterval(() => {
      if (this.isAuthenticated()) {
        this.validateStoredToken();
      }
    }, intervalMs);
  }

  // JWT token expiration check (basic)
  isTokenExpired(token) {
    if (!this.isValidTokenFormat(token)) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Check if token has expired (exp claim)
      if (payload.exp && payload.exp < currentTime) {
        console.log('Token has expired');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error parsing token:', error);
      return true;
    }
  }
}

export default new AuthService();
