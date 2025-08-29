import apiClient from '../config';

export const inspectionService = {
  // Create inspection booking
  createBooking: async (bookingData) => {
    try {
      const response = await apiClient.post('/inspect/bookings/', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating inspection booking:', error);
      throw error;
    }
  }
};