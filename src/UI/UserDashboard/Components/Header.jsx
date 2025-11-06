"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, LogOut, Menu, RefreshCw } from "lucide-react"
import Image from "next/image"
import { NotificationIcon } from "@/assets/icons"
import { Profile } from "@/assets/images"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import profileService from "@/lib/api/services/profileService"
import { useNotifications } from "@/hooks/useNotifications"
import NotificationItem from "@/components/NotificationItem"

function Header(props) {
  const formatUserName = (user) => {
    if (!user) return '';
    return user.full_name || 'User';
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [Name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const { notifications, unreadCount, loading, error, fetchNotifications, markAsRead, markAllAsRead } = useNotifications();
  const router = useRouter();
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const pathname = usePathname()

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setName(formatUserName(user));
    }
    // Fetch profile data
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile();
        setProfile(response);
      } catch (error) {
        // handle error
      }
    };
    fetchProfile();
  }, [])

  const getPageTitle = () => {
    if (pathname.includes('/dashboard')) return 'Dashboard'
    if (pathname.includes('/wishlist')) return 'Wishlist'
    if (pathname.includes('/wallet')) return 'Wallet'
    if (pathname.includes('/maintenance')) return 'Maintenance'
    if (pathname.includes('/profile')) return 'Profile Settings'
    return 'Dashboard' // Default
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <div className="pt-16 md:pt-0">
        <header className="hidden md:flex bg-white mt-5 py-3 px-6 items-center justify-between relative">
          <div className="ml-12 md:ml-0">
            {getPageTitle() === 'Dashboard' ? (
              <>
                <h1 className="pt-2 px-6 text-xl font-medium">Hi { Name || 'user'}</h1>
                <p className="px-6 text-xs text-gray-500">Welcome back!</p>
              </>
            ) : (
              <h1 className="pt-2 px-6 text-xl font-semibold">{getPageTitle()}</h1>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative" ref={notificationRef}>
              <button
                className="text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 p-2 rounded-full hover:bg-gray-200 relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Image src={NotificationIcon} alt="Notification" width={20} height={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 z-50 bg-white rounded-lg shadow-lg py-2 border border-gray-100 max-h-96 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
                    <span className="font-semibold">Notifications</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{unreadCount} unread</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  {error ? (
                    <div className="px-4 py-6 text-center">
                      <div className="text-red-500 text-sm mb-2">{error}</div>
                      <button 
                        onClick={fetchNotifications}
                        className="flex items-center gap-1 mx-auto text-blue-600 text-sm hover:underline"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Retry
                      </button>
                    </div>
                  ) : loading ? (
                    <div className="px-4 py-8 text-center text-gray-500">Loading...</div>
                  ) : notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-gray-500">No notifications</div>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onNavigate={(url) => {
                          setIsNotificationOpen(false);
                          router.push(url);
                        }}
                      />
                    ))
                  )}
                  {notifications.length > 0 && (
                    <div className="px-4 py-2 text-center border-t border-gray-300">
                      <Link 
                        href="/notifications"
                        className="text-primary text-sm font-medium hover:underline"
                        onClick={() => setIsNotificationOpen(false)}
                      >
                        View all notifications
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 py-1 px-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                  {profile?.profile_image ? (
                    <img
                      src={`https://solacely-backend-4g.onrender.com${profile.profile_image}`}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <Image
                    src={Profile}
                    alt="User avatar"
                    width={35}
                    height={35}
                    className="w-full h-full object-cover"
                    style={{ display: profile?.profile_image ? 'none' : 'block' }}
                  />
                </div>
                <span className="text-md font-medium hidden md:inline">{Name}</span>
                <ChevronDown
                  size={17}
                  className={`text-gray-600 hidden md:inline transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 z-50 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    href=""
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Help
                  </Link>
                  <Link
                    href="/"
                    onClick={() => {
                      localStorage.clear(); // Clear all localStorage data tokens
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    </>
  )
}
export default Header;
