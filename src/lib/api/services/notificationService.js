import BaseApiService from '../baseService';

class NotificationService extends BaseApiService {
  constructor() {
    super('/notify');
  }

  // Get user notifications
  async getNotifications() {
    return this.get('/');
  }

  // Mark notification as read (local state only)
  markAsRead(notificationId) {
    // Since API doesn't support mark as read, handle locally
    return Promise.resolve();
  }

  // Mark all notifications as read (local state only)
  markAllAsRead() {
    // Since API doesn't support mark all as read, handle locally
    return Promise.resolve();
  }

  // Get unread count
  async getUnreadCount() {
    return this.get('/unread-count/');
  }
}

export default new NotificationService();