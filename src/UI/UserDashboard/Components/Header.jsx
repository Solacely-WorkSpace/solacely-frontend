"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, LogOut, Menu, Building2, CreditCard, UserCheck, Wrench } from "lucide-react"
import Image from "next/image"
import { NotificationIcon } from "@/assets/icons"
import { Profile } from "@/assets/images"
import Link from "next/link"
import { usePathname } from "next/navigation"
import profileService from "@/lib/api/services/profileService"

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
                className="text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Image src={NotificationIcon} alt="Notification" width={20} height={20} />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 z-50 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-300 flex justify-between items-center">
                    <span className="font-semibold">Notifications</span>
                    <span className="text-xs text-gray-500">2 unread</span>
                  </div>
                  <div className="px-4 py-2 bg-blue-50 rounded mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="text-blue-600 w-4 h-4" />
                      <span className="font-medium">New Property Listed</span>
                      <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                    <div className="text-xs text-gray-600">A new apartment has been added in Victoria Island</div>
                    <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
                  </div>
                  <div className="px-4 py-2 bg-blue-50 rounded mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-green-600 w-4 h-4" />
                      <span className="font-medium">Payment Received</span>
                      <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                    <div className="text-xs text-gray-600">Rent payment of ₦2,500,000 received from John Doe</div>
                    <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
                  </div>
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <UserCheck className="text-purple-600 w-4 h-4" />
                      <span className="font-medium">User Verification</span>
                    </div>
                    <div className="text-xs text-gray-600">Sarah Johnson has completed profile verification</div>
                    <div className="text-xs text-gray-400 mt-1">3 hours ago</div>
                  </div>
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <Wrench className="text-orange-600 w-4 h-4" />
                      <span className="font-medium">System Update</span>
                    </div>
                    <div className="text-xs text-gray-600">Platform maintenance scheduled for tonight</div>
                    <div className="text-xs text-gray-400 mt-1">1 day ago</div>
                  </div>
                  <div className="px-4 py-2 text-center border-t border-gray-300">
                    <button className="text-primary text-sm font-medium hover:underline">View all notifications</button>
                  </div>
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
