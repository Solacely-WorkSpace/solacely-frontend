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

  async getListings(params = {}) {
    try {
      const response = await this.get('/apart/listings/', { params });
      return response;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  }

  async getLocations() {
    try {
      // This would typically be a separate endpoint, but for now return common locations
      return ['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Kaduna'];
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  }

  async searchByPriceRange(minPrice, maxPrice) {
    try {
      const response = await this.get('/apart/listings/', {
        params: { min_price: minPrice, max_price: maxPrice }
      });
      return response;
    } catch (error) {
      console.error('Error searching by price range:', error);
      throw error;
    }
  }

  async searchByBedrooms(bedrooms) {
    try {
      const response = await this.get('/apart/listings/', {
        params: { bedrooms }
      });
      return response;
    } catch (error) {
      console.error('Error searching by bedrooms:', error);
      throw error;
    }
  }

  async searchByType(type) {
    try {
      const response = await this.get('/apart/listings/', {
        params: { property_type: type }
      });
      return response;
    } catch (error) {
      console.error('Error searching by type:', error);
      throw error;
    }
  }

  async searchWithFilters(filters) {
    try {
      const params = {};
      
      if (filters.type) params.property_type = filters.type;
      if (filters.minPrice) params.min_price = filters.minPrice;
      if (filters.maxPrice) params.max_price = filters.maxPrice;
      if (filters.bedrooms) params.bedrooms = filters.bedrooms;
      if (filters.bathrooms) params.bathrooms = filters.bathrooms;
      if (filters.location) params.search = filters.location;
      
      const response = await this.get('/apart/listings/', { params });
      return response;
    } catch (error) {
      console.error('Error searching with filters:', error);
      throw error;
    }
  }
}

export const apartmentService = new ApartmentService();
export default apartmentService;
