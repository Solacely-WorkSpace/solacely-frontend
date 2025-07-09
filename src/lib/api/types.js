// Common API response types and interfaces

export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Common response structure
export class ApiResponse {
  constructor(data, message = '', success = true, errors = null) {
    this.data = data;
    this.message = message;
    this.success = success;
    this.errors = errors;
    this.timestamp = new Date().toISOString();
  }
}

// Common error structure
export class ApiError extends Error {
  constructor(message, status = 500, errors = null, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

// Pagination types
export class PaginationMeta {
  constructor(currentPage, totalPages, totalItems, itemsPerPage) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.itemsPerPage = itemsPerPage;
    this.hasNextPage = currentPage < totalPages;
    this.hasPrevPage = currentPage > 1;
  }
}

export class PaginatedResponse extends ApiResponse {
  constructor(data, meta, message = '', success = true) {
    super(data, message, success);
    this.meta = meta;
  }
}

// User types
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  LANDLORD: 'landlord',
  TENANT: 'tenant',
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_VERIFICATION: 'pending_verification',
};

// Property types
export const PROPERTY_TYPES = {
  APARTMENT: 'apartment',
  HOUSE: 'house',
  CONDO: 'condo',
  STUDIO: 'studio',
  TOWNHOUSE: 'townhouse',
};

export const PROPERTY_STATUS = {
  AVAILABLE: 'available',
  RENTED: 'rented',
  MAINTENANCE: 'maintenance',
  UNAVAILABLE: 'unavailable',
};

// Maintenance request types
export const MAINTENANCE_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const MAINTENANCE_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// Payment types
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
};

export const PAYMENT_METHODS = {
  CARD: 'card',
  BANK_TRANSFER: 'bank_transfer',
  WALLET: 'wallet',
};

// Notification types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export const NOTIFICATION_CHANNELS = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app',
};
