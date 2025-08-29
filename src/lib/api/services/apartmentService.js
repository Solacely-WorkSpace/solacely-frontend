import BaseApiService from '../baseService';

class ApartmentService extends BaseApiService {
  constructor() {
    super('/apart');
  }

  // Get all apartment listings
  async getListings(filters = {}) {
    try {
      // First try with authentication if available
      return await this.get('/listings/', filters);
    } catch (error) {
      // If 401 and we have a token, the token might be invalid
      if (error.status === 401) {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token && token !== 'undefined' && token !== 'null') {
          // Token exists but is invalid, clean it up
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            console.log('Removed invalid auth token');
          }
          // Try again without the invalid token
          return await this.get('/listings/', filters);
        }
      }
      // Re-throw the original error
      throw error;
    }
  }

  // Get public apartment listings (no auth required)
  async getPublicListings(filters = {}) {
    try {
      // Temporarily remove auth header for this request
      const originalToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
      }
      
      const result = await this.get('/listings/', filters);
      
      // Restore the token if it existed
      if (originalToken && typeof window !== 'undefined') {
        localStorage.setItem('authToken', originalToken);
      }
      
      return result;
    } catch (error) {
      // Restore the token even if request failed
      const originalToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
      if (originalToken && typeof window !== 'undefined') {
        localStorage.setItem('authToken', originalToken);
      }
      throw error;
    }
  }


  // Get single apartment by ID
  async getApartment(id) {
    return this.get(`/listings/${id}`);
  }

  // Search apartments
  async searchApartments(searchParams) {
    return this.get('/listings/search', searchParams);
  }

  // Get apartments by location
  async getApartmentsByLocation(location, filters = {}) {
    return this.get(`/listings/location/${location}`, filters);
  }

  // Get apartment types
  async getApartmentTypes() {
    return this.get('/types');
  }

  // Get apartments by price range
  async getApartmentsByPriceRange(minPrice, maxPrice, filters = {}) {
    return this.get('/listings', { 
      ...filters, 
      minPrice, 
      maxPrice 
    });
  }

  // Get user's rented apartments
  async getUserRentedApartments() {
    return this.get('/user/rented');
  }

  // Get apartment amenities
  async getApartmentAmenities(id) {
    return this.get(`/listings/${id}/amenities`);
  }

  // Get apartment by ID
  async getApartmentById(id) {
    try {
      console.log('Fetching apartment details for ID:', id);
      const response = await this.get(`/listings/${id}/`);
      return response;
    } catch (error) {
      console.error('Error fetching apartment details:', error);
      throw error;
    }
  }

  // Search apartments by location
  async searchByLocation(location) {
    try {
      const response = await this.get('/listings/', {
        search: location
      });
      return response;
    } catch (error) {
      console.error('Error searching apartments by location:', error);
      throw error;
    }
  }

  // Get unique locations from apartments
  async getLocations() {
    try {
      const response = await this.get('/listings/');
      const apartments = response?.data || response || [];
      const locations = [...new Set(apartments.map(apt => apt.location).filter(Boolean))];
      return locations;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  }

  // Search apartments by price range
  async searchByPriceRange(minPrice, maxPrice) {
    try {
      const params = {};
      if (minPrice) params.price_min = minPrice;
      if (maxPrice) params.price_max = maxPrice;
      
      const response = await this.get('/listings/', params);
      return response;
    } catch (error) {
      console.error('Error searching apartments by price range:', error);
      throw error;
    }
  }
}

// Create and export instance
const apartmentService = new ApartmentService();
export default apartmentService;
