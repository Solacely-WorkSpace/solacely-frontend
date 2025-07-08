// Export all API services from a central location
export { default as authService } from './services/authService';
export { default as propertyService } from './services/propertyService';
export { default as maintenanceService } from './services/maintenanceService';
export { default as paymentService } from './services/paymentService';
export { default as userService, NotificationService } from './services/userService';

// Export API utilities
export { default as apiClient, API_CONFIG } from './config';
export * from './types';
export { default as BaseApiService } from './baseService';

// Create a centralized API object
import authService from './services/authService';
import propertyService from './services/propertyService';
import maintenanceService from './services/maintenanceService';
import paymentService from './services/paymentService';
import userService, { NotificationService } from './services/userService';

const api = {
  auth: authService,
  properties: propertyService,
  maintenance: maintenanceService,
  payments: paymentService,
  users: userService,
  notifications: new NotificationService(),
};

export default api;
