"use client"

import { useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from '@/components/NotificationItem';
import { RefreshCw, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const { notifications, unreadCount, loading, error, fetchNotifications, markAsRead, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.is_read;
    if (filter === 'read') return n.is_read;
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-primary text-white rounded hover:bg-purple-700"
            >
              <CheckCircle className="w-4 h-4" />
              Mark all read
            </button>
          )}
          <button
            onClick={fetchNotifications}
            className="flex items-center gap-1 px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        {['all', 'unread', 'read'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-sm rounded ${
              filter === f ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-purple-900'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        {error ? (
          <div className="p-8 text-center">
            <div className="text-red-500 mb-4">{error}</div>
            <button 
              onClick={fetchNotifications}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded hover:bg-purple-900"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        ) : loading ? (
          <div className="p-8 text-center text-gray-500">Loading notifications...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {filter === 'unread' ? 'No unread notifications' : 
             filter === 'read' ? 'No read notifications' : 'No notifications'}
          </div>
        ) : (
          <div className="divide-y">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onNavigate={(url) => router.push(url)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}