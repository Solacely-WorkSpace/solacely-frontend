import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import maintenanceService from '../lib/api/services/maintenanceService';

// Query keys for consistent caching
export const MAINTENANCE_QUERY_KEYS = {
  all: ['maintenance'],
  lists: () => [...MAINTENANCE_QUERY_KEYS.all, 'list'],
  list: (filters) => [...MAINTENANCE_QUERY_KEYS.lists(), filters],
  details: () => [...MAINTENANCE_QUERY_KEYS.all, 'detail'],
  detail: (id) => [...MAINTENANCE_QUERY_KEYS.details(), id],
  status: (status) => [...MAINTENANCE_QUERY_KEYS.all, 'status', status],
  property: (propertyId) => [...MAINTENANCE_QUERY_KEYS.all, 'property', propertyId],
  stats: () => [...MAINTENANCE_QUERY_KEYS.all, 'stats'],
  technicians: () => [...MAINTENANCE_QUERY_KEYS.all, 'technicians'],
};

// Hook for getting all maintenance requests
export const useMaintenanceRequests = (filters = {}) => {
  return useQuery({
    queryKey: MAINTENANCE_QUERY_KEYS.list(filters),
    queryFn: () => maintenanceService.getMaintenanceRequests(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
    keepPreviousData: true,
  });
};

// Hook for getting a single maintenance request
export const useMaintenanceRequest = (id) => {
  return useQuery({
    queryKey: MAINTENANCE_QUERY_KEYS.detail(id),
    queryFn: () => maintenanceService.getMaintenanceRequest(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for getting maintenance requests by status
export const useMaintenanceRequestsByStatus = (status) => {
  return useQuery({
    queryKey: MAINTENANCE_QUERY_KEYS.status(status),
    queryFn: () => maintenanceService.getMaintenanceRequestsByStatus(status),
    enabled: !!status,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Hook for getting maintenance requests by property
export const useMaintenanceRequestsByProperty = (propertyId) => {
  return useQuery({
    queryKey: MAINTENANCE_QUERY_KEYS.property(propertyId),
    queryFn: () => maintenanceService.getMaintenanceRequestsByProperty(propertyId),
    enabled: !!propertyId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for maintenance statistics
export const useMaintenanceStats = () => {
  return useQuery({
    queryKey: MAINTENANCE_QUERY_KEYS.stats(),
    queryFn: () => maintenanceService.getMaintenanceStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for available technicians
export const useAvailableTechnicians = () => {
  return useQuery({
    queryKey: MAINTENANCE_QUERY_KEYS.technicians(),
    queryFn: () => maintenanceService.getAvailableTechnicians(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook for creating maintenance request
export const useCreateMaintenanceRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (requestData) => maintenanceService.createMaintenanceRequest(requestData),
    onSuccess: () => {
      // Invalidate and refetch maintenance requests
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.stats() });
    },
    onError: (error) => {
      console.error('Create maintenance request failed:', error.message);
    },
  });
};

// Hook for updating maintenance request
export const useUpdateMaintenanceRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updateData }) => 
      maintenanceService.updateMaintenanceRequest(id, updateData),
    onSuccess: (data, { id }) => {
      // Update the specific maintenance request cache
      queryClient.setQueryData(MAINTENANCE_QUERY_KEYS.detail(id), data);
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Update maintenance request failed:', error.message);
    },
  });
};

// Hook for deleting maintenance request
export const useDeleteMaintenanceRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => maintenanceService.deleteMaintenanceRequest(id),
    onSuccess: (data, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: MAINTENANCE_QUERY_KEYS.detail(id) });
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.stats() });
    },
    onError: (error) => {
      console.error('Delete maintenance request failed:', error.message);
    },
  });
};

// Hook for uploading maintenance images
export const useUploadMaintenanceImages = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ requestId, files }) => 
      maintenanceService.uploadMaintenanceImages(requestId, files),
    onSuccess: (data, { requestId }) => {
      // Refetch the maintenance request to get updated images
      queryClient.invalidateQueries({ 
        queryKey: MAINTENANCE_QUERY_KEYS.detail(requestId) 
      });
    },
    onError: (error) => {
      console.error('Upload maintenance images failed:', error.message);
    },
  });
};

// Hook for updating maintenance status
export const useUpdateMaintenanceStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ requestId, status }) => 
      maintenanceService.updateStatus(requestId, status),
    onSuccess: (data, { requestId, status }) => {
      // Update the specific maintenance request cache
      queryClient.setQueryData(
        MAINTENANCE_QUERY_KEYS.detail(requestId),
        (oldData) => oldData ? { ...oldData, status } : oldData
      );
      // Invalidate status-based queries
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.stats() });
    },
    onError: (error) => {
      console.error('Update maintenance status failed:', error.message);
    },
  });
};

// Hook for adding comments
export const useAddMaintenanceComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ requestId, comment }) => 
      maintenanceService.addComment(requestId, comment),
    onSuccess: (data, { requestId }) => {
      // Refetch comments or the entire maintenance request
      queryClient.invalidateQueries({ 
        queryKey: MAINTENANCE_QUERY_KEYS.detail(requestId) 
      });
    },
    onError: (error) => {
      console.error('Add comment failed:', error.message);
    },
  });
};

// Hook for rating maintenance service
export const useRateMaintenanceService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ requestId, rating, review }) => 
      maintenanceService.rateService(requestId, rating, review),
    onSuccess: (data, { requestId }) => {
      // Update the maintenance request with the new rating
      queryClient.invalidateQueries({ 
        queryKey: MAINTENANCE_QUERY_KEYS.detail(requestId) 
      });
      queryClient.invalidateQueries({ queryKey: MAINTENANCE_QUERY_KEYS.lists() });
    },
    onError: (error) => {
      console.error('Rate service failed:', error.message);
    },
  });
};
