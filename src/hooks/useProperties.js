import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import propertyService from '../lib/api/services/propertyService';

// Query keys for consistent caching
export const PROPERTY_QUERY_KEYS = {
  all: ['properties'],
  lists: () => [...PROPERTY_QUERY_KEYS.all, 'list'],
  list: (filters) => [...PROPERTY_QUERY_KEYS.lists(), filters],
  details: () => [...PROPERTY_QUERY_KEYS.all, 'detail'],
  detail: (id) => [...PROPERTY_QUERY_KEYS.details(), id],
  featured: () => [...PROPERTY_QUERY_KEYS.all, 'featured'],
  favorites: () => [...PROPERTY_QUERY_KEYS.all, 'favorites'],
  search: (query) => [...PROPERTY_QUERY_KEYS.all, 'search', query],
  recommendations: (userId) => [...PROPERTY_QUERY_KEYS.all, 'recommendations', userId],
  location: (location) => [...PROPERTY_QUERY_KEYS.all, 'location', location],
};

// Hook for getting all properties with filters
export const useProperties = (filters = {}) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.list(filters),
    queryFn: () => propertyService.getProperties(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true,
  });
};

// Hook for getting a single property
export const useProperty = (id) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.detail(id),
    queryFn: () => propertyService.getProperty(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for searching properties
export const useSearchProperties = (searchParams) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.search(searchParams),
    queryFn: () => propertyService.searchProperties(searchParams),
    enabled: !!searchParams && Object.keys(searchParams).length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for featured properties
export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.featured(),
    queryFn: () => propertyService.getFeaturedProperties(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hook for user's favorite properties
export const useFavoriteProperties = () => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.favorites(),
    queryFn: () => propertyService.getFavorites(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for property recommendations
export const usePropertyRecommendations = (userId) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.recommendations(userId),
    queryFn: () => propertyService.getRecommendations(userId),
    enabled: !!userId,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Hook for properties by location
export const usePropertiesByLocation = (location, filters = {}) => {
  return useQuery({
    queryKey: PROPERTY_QUERY_KEYS.location(location),
    queryFn: () => propertyService.getPropertiesByLocation(location, filters),
    enabled: !!location,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for adding to favorites
export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (propertyId) => propertyService.addToFavorites(propertyId),
    onSuccess: (data, propertyId) => {
      // Update favorites list
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEYS.favorites() });
      
      // Update property detail if it's cached
      queryClient.setQueryData(
        PROPERTY_QUERY_KEYS.detail(propertyId),
        (oldData) => oldData ? { ...oldData, isFavorite: true } : oldData
      );
    },
    onError: (error) => {
      console.error('Add to favorites failed:', error.message);
    },
  });
};

// Hook for removing from favorites
export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (propertyId) => propertyService.removeFromFavorites(propertyId),
    onSuccess: (data, propertyId) => {
      // Update favorites list
      queryClient.invalidateQueries({ queryKey: PROPERTY_QUERY_KEYS.favorites() });
      
      // Update property detail if it's cached
      queryClient.setQueryData(
        PROPERTY_QUERY_KEYS.detail(propertyId),
        (oldData) => oldData ? { ...oldData, isFavorite: false } : oldData
      );
    },
    onError: (error) => {
      console.error('Remove from favorites failed:', error.message);
    },
  });
};

// Hook for booking property viewing
export const useBookViewing = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ propertyId, viewingData }) => 
      propertyService.bookViewing(propertyId, viewingData),
    onSuccess: () => {
      // You might want to invalidate user bookings here
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
    onError: (error) => {
      console.error('Booking viewing failed:', error.message);
    },
  });
};

// Hook for property reviews
export const usePropertyReviews = (propertyId, params = {}) => {
  return useQuery({
    queryKey: [...PROPERTY_QUERY_KEYS.detail(propertyId), 'reviews', params],
    queryFn: () => propertyService.getPropertyReviews(propertyId, params),
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for adding property review
export const useAddPropertyReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ propertyId, reviewData }) => 
      propertyService.addPropertyReview(propertyId, reviewData),
    onSuccess: (data, { propertyId }) => {
      // Invalidate reviews for this property
      queryClient.invalidateQueries({ 
        queryKey: [...PROPERTY_QUERY_KEYS.detail(propertyId), 'reviews'] 
      });
    },
    onError: (error) => {
      console.error('Add review failed:', error.message);
    },
  });
};
