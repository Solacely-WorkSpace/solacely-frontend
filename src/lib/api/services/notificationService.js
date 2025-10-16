import BaseApiService from '../baseService';

class NotificationService extends BaseApiService {
  constructor() {
    super('/notify');
  }

  // Get user notifications
  async getNotifications() {
    return this.get('/');
  }

  // Mark notification as read
  async markAsRead(notificationId) {
    return this.patch(`/${notificationId}/read/`);
  }

  // Mark all notifications as read
  async markAllAsRead() {
    return this.patch('/mark-all-read/');
  }

  // Get unread count
  async getUnreadCount() {
    return this.get('/unread-count/');
  }
}

export default new NotificationService();