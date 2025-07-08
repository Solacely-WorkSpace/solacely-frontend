import apiClient from './config';
import { ApiError } from './types';

// Generic API service class
class BaseApiService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  // GET request
  async get(url = '', params = {}) {
    try {
      const response = await apiClient.get(`${this.endpoint}${url}`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST request
  async post(url = '', data = {}) {
    try {
      const response = await apiClient.post(`${this.endpoint}${url}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT request
  async put(url = '', data = {}) {
    try {
      const response = await apiClient.put(`${this.endpoint}${url}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PATCH request
  async patch(url = '', data = {}) {
    try {
      const response = await apiClient.patch(`${this.endpoint}${url}`, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE request
  async delete(url = '') {
    try {
      const response = await apiClient.delete(`${this.endpoint}${url}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Handle errors consistently
  handleError(error) {
    console.log('🔍 Full error object:', error);
    
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      console.log('📄 Server error response:', {
        status,
        data,
        headers: error.response.headers
      });
      
      return new ApiError(
        data?.message || `HTTP ${status} Error`,
        status,
        data?.errors || null,
        data
      );
    } else if (error.request) {
      // Network error
      return new ApiError('Network error - please check your connection', 0);
    } else {
      // Request setup error
      return new ApiError(error.message || 'Request failed', 500);
    }
  }
}

export default BaseApiService;
