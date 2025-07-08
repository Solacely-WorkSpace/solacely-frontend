import BaseApiService from '../baseService';

class PropertyService extends BaseApiService {
  constructor() {
    super('/properties');
  }

  // Get all properties with filters
  async getProperties(filters = {}) {
    return this.get('', filters);
  }

  // Get single property by ID
  async getProperty(id) {
    return this.get(`/${id}`);
  }

  // Search properties
  async searchProperties(searchParams) {
    return this.get('/search', searchParams);
  }

  // Get featured properties
  async getFeaturedProperties() {
    return this.get('/featured');
  }

  // Get properties by location
  async getPropertiesByLocation(location, filters = {}) {
    return this.get(`/location/${location}`, filters);
  }

  // Get property recommendations
  async getRecommendations(userId) {
    return this.get(`/recommendations/${userId}`);
  }

  // Add property to favorites
  async addToFavorites(propertyId) {
    return this.post(`/${propertyId}/favorite`);
  }

  // Remove property from favorites
  async removeFromFavorites(propertyId) {
    return this.delete(`/${propertyId}/favorite`);
  }

  // Get user's favorite properties
  async getFavorites() {
    return this.get('/favorites');
  }

  // Get property images
  async getPropertyImages(propertyId) {
    return this.get(`/${propertyId}/images`);
  }

  // Get property amenities
  async getPropertyAmenities(propertyId) {
    return this.get(`/${propertyId}/amenities`);
  }

  // Get property reviews
  async getPropertyReviews(propertyId, params = {}) {
    return this.get(`/${propertyId}/reviews`, params);
  }

  // Add property review
  async addPropertyReview(propertyId, reviewData) {
    return this.post(`/${propertyId}/reviews`, reviewData);
  }

  // Get similar properties
  async getSimilarProperties(propertyId) {
    return this.get(`/${propertyId}/similar`);
  }

  // Book property viewing
  async bookViewing(propertyId, viewingData) {
    return this.post(`/${propertyId}/book-viewing`, viewingData);
  }

  // Get property availability
  async getAvailability(propertyId, dates) {
    return this.get(`/${propertyId}/availability`, { dates });
  }
}

export default new PropertyService();
