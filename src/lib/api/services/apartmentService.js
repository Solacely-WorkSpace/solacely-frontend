import BaseApiService from '../baseService';

class ApartmentService extends BaseApiService {
  constructor() {
    super('/apart');
  }

  // Get all apartment listings
  async getListings(filters = {}) {
    return this.get('/listings/', filters);
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
}

// Create and export instance
const apartmentService = new ApartmentService();
export default apartmentService;
