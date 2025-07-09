import BaseApiService from '../baseService';

class NotificationService extends BaseApiService {
  constructor() {
    super('/notifications');
  }

  // Get all notifications
  async getNotifications(filters = {}) {
    return this.get('', filters);
  }

  // Get unread notifications count
  async getUnreadCount() {
    return this.get('/unread-count');
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    return this.patch(`/${notificationId}/read`);
  }

  // Mark all notifications as read
  async markAllAsRead() {
    return this.patch('/mark-all-read');
  }

  // Delete notification
  async deleteNotification(notificationId) {
    return this.delete(`/${notificationId}`);
  }

  // Get notification settings
  async getNotificationSettings() {
    return this.get('/settings');
  }

  // Update notification settings
  async updateNotificationSettings(settings) {
    return this.put('/settings', settings);
  }

  // Subscribe to push notifications
  async subscribeToPush(subscription) {
    return this.post('/push/subscribe', subscription);
  }

  // Unsubscribe from push notifications
  async unsubscribeFromPush() {
    return this.delete('/push/unsubscribe');
  }

  // Test notification
  async testNotification(type) {
    return this.post('/test', { type });
  }
}

class UserService extends BaseApiService {
  constructor() {
    super('/users');
  }

  // Get user dashboard data
  async getDashboardData() {
    return this.get('/dashboard');
  }

  // Get user properties
  async getUserProperties() {
    return this.get('/properties');
  }

  // Get user bookings
  async getUserBookings(filters = {}) {
    return this.get('/bookings', filters);
  }

  // Update user preferences
  async updatePreferences(preferences) {
    return this.put('/preferences', preferences);
  }

  // Get user preferences
  async getPreferences() {
    return this.get('/preferences');
  }

  // Update user settings
  async updateSettings(settings) {
    return this.put('/settings', settings);
  }

  // Get user settings
  async getSettings() {
    return this.get('/settings');
  }

  // Delete user account
  async deleteAccount(confirmation) {
    return this.delete('/account', confirmation);
  }

  // Get user activity log
  async getActivityLog(filters = {}) {
    return this.get('/activity', filters);
  }

  // Update user verification documents
  async updateVerificationDocuments(documents) {
    const formData = new FormData();
    Object.keys(documents).forEach(key => {
      formData.append(key, documents[key]);
    });
    return this.post('/verification-documents', formData);
  }

  // Get verification status
  async getVerificationStatus() {
    return this.get('/verification-status');
  }
}

export { NotificationService, UserService };
export default new UserService();
