import BaseApiService from '../baseService';

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
    const response = await this.post('/login/', credentials);
    
    // Store token if login successful
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response;
  }

  // User logout
  async logout() {
    try {
      await this.post('/logout/');
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
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
    return !!localStorage.getItem('authToken');
  }

  // Get stored user data
  getStoredUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Get stored token
  getStoredToken() {
    return localStorage.getItem('authToken');
  }
}

export default new AuthService();
