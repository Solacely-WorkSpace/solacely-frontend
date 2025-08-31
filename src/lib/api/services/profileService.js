import BaseApiService from '../baseService';
import apiClient from '../config';

class ProfileService extends BaseApiService {
  constructor() {
    super('');
  }

  async getProfile() {
    return this.get('/profile/');
  }

  async updateProfile(profileData) {
    return this.patch('/profile/', profileData);
  }

  async uploadProfileImage(file) {
    const formData = new FormData();
    formData.append('profile_image', file);
    return this.postFormData('/profile/', formData);
  }

  async postFormData(url = '', formData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}${url}`, formData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export default new ProfileService();