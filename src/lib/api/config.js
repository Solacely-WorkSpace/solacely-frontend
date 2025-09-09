import axios from 'axios';
import tokenManager from '../auth/tokenManager';

// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://solacely-backend-4g.onrender.com/api/v1',
  TIMEOUT: 36000000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

// Create axios instance
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get valid token from TokenManager
    const token = tokenManager.getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Update activity on API requests
      tokenManager.updateLastActivity();
    }
    
    // Debug token issues in development
    if (process.env.NODE_ENV === 'development') {
      const tokenInfo = tokenManager.getTokenInfo();
      console.log('🔍 Token Debug:', {
        hasValidToken: !!token,
        isAuthenticated: tokenManager.isAuthenticated(),
        tokenInfo: tokenInfo?.accessToken ? {
          timeUntilExpiry: Math.round(tokenInfo.accessToken.timeUntilExpiry / 1000 / 60) + ' minutes',
          isExpired: tokenInfo.accessToken.isExpired
        } : 'No token',
        sessionInfo: tokenInfo?.session ? {
          timeUntilExpiry: Math.round(tokenInfo.session.timeUntilExpiry / 1000 / 60) + ' minutes',
          isExpired: tokenInfo.session.isExpired
        } : 'No session'
      });
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        hasToken: !!config.headers.Authorization,
        tokenPreview: config.headers.Authorization ? `${config.headers.Authorization.substring(0, 20)}...` : 'No token'
      });
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Token refresh queue to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Response interceptor - Handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - handle token expiration with automatic refresh
          if (typeof window !== 'undefined') {
            const originalRequest = error.config;
            const url = originalRequest?.url || '';
            
            console.log('401 Unauthorized received for:', url);
            
            // Don't retry refresh token requests
            if (url.includes('/refresh-token/')) {
              console.log('Refresh token request failed - clearing all tokens');
              tokenManager.handleTokenExpiration('Refresh token expired');
              return Promise.reject(error);
            }
            
            // Don't retry if already retried
            if (originalRequest._retry) {
              console.log('Request already retried, logging out');
              tokenManager.handleTokenExpiration('Token refresh failed');
              return Promise.reject(error);
            }
            
            // Check if we have a refresh token
            const refreshToken = tokenManager.getRefreshToken();
            if (!refreshToken) {
              console.log('No refresh token available - logging out');
              tokenManager.handleTokenExpiration('No refresh token available');
              return Promise.reject(error);
            }
            
            // Handle concurrent requests during token refresh
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              }).then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return apiClient(originalRequest);
              }).catch(err => {
                return Promise.reject(err);
              });
            }
            
            originalRequest._retry = true;
            isRefreshing = true;
            
            // Attempt to refresh the token
            return new Promise((resolve, reject) => {
              axios.post(`${API_CONFIG.BASE_URL}/refresh-token/`, {
                refresh: refreshToken
              })
              .then(({ data }) => {
                const newAccessToken = data.access;
                
                // Store new tokens
                tokenManager.storeTokens(
                  newAccessToken,
                  data.refresh || refreshToken,
                  tokenManager.getStoredUser()
                );
                
                // Update the original request with new token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                
                // Process queued requests
                processQueue(null, newAccessToken);
                
                // Retry the original request
                resolve(apiClient(originalRequest));
              })
              .catch((refreshError) => {
                console.error('Token refresh failed:', refreshError);
                processQueue(refreshError, null);
                tokenManager.handleTokenExpiration('Token refresh failed');
                reject(refreshError);
              })
              .finally(() => {
                isRefreshing = false;
              });
            });
          }
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Internal server error');
          break;
        default:
          console.error('API Error:', data?.message || 'Unknown error');
      }
      
      // Log errors in development
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ API Error:', {
          status,
          url: error.config?.url,
          method: error.config?.method?.toUpperCase(),
          message: data?.message || error.message,
          data,
          willAutoLogout: status === 401 && typeof window !== 'undefined' && (() => {
            const url = error.config?.url || '';
            const authCriticalEndpoints = [
              '/auth/profile',
              '/auth/logout', 
              '/user/',
              '/wallet/',
              '/bookings/',
              '/payments/'
            ];
            return authCriticalEndpoints.some(endpoint => url.includes(endpoint));
          })()
        });
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      // Request setup error
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export { apiClient, API_CONFIG };
export default apiClient;
