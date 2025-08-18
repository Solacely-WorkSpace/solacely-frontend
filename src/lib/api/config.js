import axios from 'axios';

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
    // Get token from localStorage or your preferred storage
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    // Validate token format before using it
    if (token && token !== 'undefined' && token !== 'null') {
      // Basic JWT format validation
      const parts = token.split('.');
      if (parts.length === 3) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('🚫 Invalid token format detected, removing...');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
      }
    }
    
    // Debug token issues in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Token Debug:', {
        tokenExists: !!token,
        tokenType: typeof token,
        tokenLength: token ? token.length : 0,
        isValidFormat: token ? token.split('.').length === 3 : false,
        isUndefinedString: token === 'undefined'
      });
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        hasToken: !!config.headers.Authorization,
        tokenPreview: config.headers.Authorization ? `${config.headers.Authorization.substring(0, 20)}...` : 'No token',
        headers: config.headers,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

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
          // Unauthorized - handle token expiration
          if (typeof window !== 'undefined') {
            const url = error.config?.url || '';
            
            console.log('401 Unauthorized received for:', url);
            
            // Check if we have a token that might be expired
            const token = localStorage.getItem('authToken');
            if (token && token !== 'undefined' && token !== 'null') {
              console.log('Token exists but request was unauthorized - token likely expired');
              
              // Clear invalid auth data
              localStorage.removeItem('authToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('user');
              
              // Show user-friendly message
              alert('Your session has expired. Please log in again.');
              
              // Redirect to login page
              window.location.href = '/sign-in';
            } else {
              console.log('No token found, user needs to login');
              
              // Only redirect if this is a protected endpoint
              const protectedEndpoints = [
                '/auth/profile',
                '/auth/logout',
                '/user/',
                '/wallet/',
                '/bookings/',
                '/payments/',
                '/apart/user/'
              ];
              
              const isProtectedEndpoint = protectedEndpoints.some(endpoint => 
                url.includes(endpoint)
              );
              
              if (isProtectedEndpoint) {
                window.location.href = '/sign-in';
              }
            }
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
