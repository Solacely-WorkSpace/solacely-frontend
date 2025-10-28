import { useState, useCallback } from 'react';
import apartmentService from '@/lib/api/services/apartmentService';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const searchApartments = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {};
      
      // Handle different search parameters
      if (searchParams.query) {
        params.search = searchParams.query;
      }
      if (searchParams.location) {
        params.location = searchParams.location;
      }
      if (searchParams.minPrice) {
        params.price_min = searchParams.minPrice;
      }
      if (searchParams.maxPrice) {
        params.price_max = searchParams.maxPrice;
      }
      if (searchParams.bedrooms) {
        params.bedrooms = searchParams.bedrooms;
      }
      if (searchParams.buildingType) {
        params.building_type = searchParams.buildingType;
      }
      if (searchParams.page) {
        params.page = searchParams.page;
      }

      const response = await apartmentService.getListings(params);
      
      const results = response?.results || response?.data || response || [];
      setSearchResults(results);
      setTotalResults(response?.count || results.length);
      
      return {
        results,
        count: response?.count || results.length,
        next: response?.next,
        previous: response?.previous
      };
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search apartments. Please try again.');
      setSearchResults([]);
      setTotalResults(0);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setTotalResults(0);
  }, []);

  return {
    searchResults,
    loading,
    error,
    totalResults,
    searchApartments,
    clearSearch
  };
};