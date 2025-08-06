import axios from 'axios';

// API Configuration
const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://solacely-backend-4g.onrender.com/api/v1',
  TIMEOUT: 10000,
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
    
    // Debug token issues
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Token Debug:', {
        tokenExists: !!token,
        tokenType: typeof token,
        tokenValue: token,
        tokenLength: token ? token.length : 0,
        isUndefinedString: token === 'undefined'
      });
    }
    
    if (token && token !== 'undefined' && token !== 'null') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        hasToken: !!token && token !== 'undefined',
        tokenPreview: token && token !== 'undefined' ? `${token.substring(0, 20)}...` : 'No valid token',
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
      console.log('✅ API Response:', {
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
          // Unauthorized - only auto-logout for auth-critical endpoints
          if (typeof window !== 'undefined') {
            const url = error.config?.url || '';
            
            // Auto-logout only for user-specific or auth-critical endpoints
            const authCriticalEndpoints = [
              '/auth/profile',
              '/auth/logout',
              '/user/',
              '/wallet/',
              '/bookings/',
              '/payments/'
            ];
            
            const shouldAutoLogout = authCriticalEndpoints.some(endpoint => 
              url.includes(endpoint)
            );
            
            if (shouldAutoLogout) {
              console.log('🚪 Auto-logout triggered for auth-critical endpoint:', url);
              localStorage.removeItem('authToken');
              window.location.href = '/sign-in';
            } else {
              console.log('🔒 401 received but not auto-logging out for:', url);
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
