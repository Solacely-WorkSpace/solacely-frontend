"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, LogOut, Menu } from "lucide-react"
import Image from "next/image"
import { NotificationIcon } from "@/assets/icons"
import { Profile } from "@/assets/images"
import Link from "next/link"
import { usePathname } from "next/navigation"
import profileService from "@/lib/api/services/profileService"

const formatUserName = (user) => {
  if (!user) return '';
  return user.full_name || 'User';
};

export default function Header({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [Name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const dropdownRef = useRef(null);
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
        console.log('Profile data:', response);
        console.log('Profile image URL:', response?.profile_image);
        setProfile(response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [])

  // Get the current page title based on the pathname
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
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <Image src={NotificationIcon} alt="Notification" width={20} height={20} />
            </button>

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
                        console.log('Image failed to load:', profile.profile_image);
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
                  className={`text-gray-600 hidden md:inline transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                    }`}
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
