import { BaseApiService } from './baseApiService';

class ApartmentService extends BaseApiService {
  constructor() {
    super('https://solacely-backend-4g.onrender.com/api/v1');
  }

  async getApartments(params) {
    try {
      const response = await this.get('/apart/listings', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching apartments:', error);
      throw error;
    }
  }

  async getApartmentById(id) {
    try {
      const response = await this.get(`/apart/listings/${id}`);
      // The API returns the data directly, not wrapped in a data property
      return response;
    } catch (error) {
      console.error('Error fetching apartment details:', error);
      throw error;
    }
  }

  async searchByLocation(location) {
    try {
      const response = await this.get('/apart/listings/', {
        params: { search: location }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching apartments by location:', error);
      throw error;
    }
  }
}

export const apartmentService = new ApartmentService();
