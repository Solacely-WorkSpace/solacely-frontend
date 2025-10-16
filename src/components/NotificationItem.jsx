import { Building2, CreditCard, Clock, Gift, UserCheck, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const NotificationItem = ({ notification, onMarkAsRead, onNavigate }) => {
  const getIcon = (type) => {
    const iconMap = {
      'property_recommendation': Building2,
      'payment_success': CreditCard,
      'rent_due': Clock,
      'reward_earned': Gift,
      'verification_approved': CheckCircle,
      'verification_declined': XCircle,
      'system_update': AlertTriangle,
      'default': Building2
    };
    const Icon = iconMap[type] || iconMap.default;
    return <Icon className={`w-4 h-4 ${getIconColor(type)}`} />;
  };

  const getIconColor = (type) => {
    const colorMap = {
      'property_recommendation': 'text-blue-600',
      'payment_success': 'text-green-600',
      'rent_due': 'text-orange-600',
      'reward_earned': 'text-primary',
      'verification_approved': 'text-green-600',
      'verification_declined': 'text-red-600',
      'system_update': 'text-yellow-600'
    };
    return colorMap[type] || 'text-blue-600';
  };

  const handleClick = () => {
    if (!notification.is_read) {
      onMarkAsRead(notification.id);
    }
    if (notification.action_url && onNavigate) {
      onNavigate(notification.action_url);
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div 
      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-l-4 ${
        !notification.is_read ? 'bg-blue-50 border-l-blue-500' : 'border-l-transparent'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {getIcon(notification.type)}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{notification.title}</span>
            {!notification.is_read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
            )}
          </div>
          <div className="text-xs text-gray-600 mt-1">{notification.message}</div>
          {notification.metadata && (
            <div className="text-xs text-gray-500 mt-1">
              {notification.metadata.amount && `Amount: ${notification.metadata.amount}`}
              {notification.metadata.due_date && ` • Due: ${new Date(notification.metadata.due_date).toLocaleDateString()}`}
              {notification.metadata.points && ` • ${notification.metadata.points} TRC points`}
            </div>
          )}
          <div className="text-xs text-gray-400 mt-1">{formatTime(notification.created_at)}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;