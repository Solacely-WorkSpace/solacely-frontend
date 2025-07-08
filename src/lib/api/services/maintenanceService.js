import BaseApiService from '../baseService';

class MaintenanceService extends BaseApiService {
  constructor() {
    super('/maintenance');
  }

  // Get all maintenance requests for a user
  async getMaintenanceRequests(filters = {}) {
    return this.get('', filters);
  }

  // Get single maintenance request
  async getMaintenanceRequest(id) {
    return this.get(`/${id}`);
  }

  // Create new maintenance request
  async createMaintenanceRequest(requestData) {
    return this.post('', requestData);
  }

  // Update maintenance request
  async updateMaintenanceRequest(id, updateData) {
    return this.put(`/${id}`, updateData);
  }

  // Delete maintenance request
  async deleteMaintenanceRequest(id) {
    return this.delete(`/${id}`);
  }

  // Get maintenance requests by status
  async getMaintenanceRequestsByStatus(status) {
    return this.get(`/status/${status}`);
  }

  // Get maintenance requests by property
  async getMaintenanceRequestsByProperty(propertyId) {
    return this.get(`/property/${propertyId}`);
  }

  // Upload maintenance request images
  async uploadMaintenanceImages(requestId, files) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return this.post(`/${requestId}/images`, formData);
  }

  // Add comment to maintenance request
  async addComment(requestId, comment) {
    return this.post(`/${requestId}/comments`, { comment });
  }

  // Get maintenance request comments
  async getComments(requestId) {
    return this.get(`/${requestId}/comments`);
  }

  // Update maintenance request status
  async updateStatus(requestId, status) {
    return this.patch(`/${requestId}/status`, { status });
  }

  // Assign maintenance request to technician
  async assignTechnician(requestId, technicianId) {
    return this.patch(`/${requestId}/assign`, { technicianId });
  }

  // Rate maintenance service
  async rateService(requestId, rating, review) {
    return this.post(`/${requestId}/rate`, { rating, review });
  }

  // Get maintenance statistics
  async getMaintenanceStats() {
    return this.get('/stats');
  }

  // Get available technicians
  async getAvailableTechnicians() {
    return this.get('/technicians');
  }
}

export default new MaintenanceService();
