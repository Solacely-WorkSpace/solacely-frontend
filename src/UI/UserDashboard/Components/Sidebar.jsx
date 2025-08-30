"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { X, Menu } from "lucide-react"
import { LogoName } from '@/assets/images' 
import { useLogout } from "@/hooks" 
import { 
  Dashboard, DashboardSelected,
  Heart, HeartSelected,
  Wallet, WalletSelected,
  Maintenance, MaintenanceSelected,
  Setting, SettingSelected, Logo,
  Logout, EarnTRCSelected
} from '@/assets/icons' 

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileHeaderVisible, setIsMobileHeaderVisible] = useState(true);
  const [userName, setUserName] = useState('');

  const formatUserName = (user) => {
    if (!user) return '';
    return user.full_name || 'User';
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsMobileHeaderVisible(!isMobileHeaderVisible);
  };

  useEffect(() => {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(formatUserName(user));
      }
    }, [])

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
    setIsMobileHeaderVisible(true);
  };


  const pathname = usePathname()

  

  // Close mobile sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
        setIsMobileHeaderVisible(true)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    { 
      name: "Dashboard", 
      href: "/dashboard", 
      icon: Dashboard,
      selectedIcon: DashboardSelected
    },
    { 
      name: "Wallet", 
      href: "/wallet", 
      icon: Wallet,
      selectedIcon: WalletSelected
    },
    { 
      name: "Earn TRC", 
      href: "/earntrc", 
      icon: Setting,
      selectedIcon: EarnTRCSelected
    },
    { 
      name: "Wishlist", 
      href: "/wishlist", 
      icon: Heart,
      selectedIcon: HeartSelected
    },
    
    { 
      name: "Maintenance", 
      href: "/maintenance", 
      icon: Maintenance,
      selectedIcon: MaintenanceSelected
    },
    
    { 
      name: "Profile Settings", 
      href: "/profile", 
      icon: Setting,
      selectedIcon: SettingSelected
    }
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40"
          style={{ background: 'rgba(14, 12, 12, 0.15)' }}
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-white border-r border-gray-200 w-[250px]">
          <div className="p-6 mt-5 flex justify-start items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image 
                src={Logo} 
                alt="logo" 
                width={40}
                height={40}
                className="w-8 h-8"
              />
              <Image 
                src={LogoName} 
                alt="logo"
                width={120}
                height={30}
                className="h-7 w-auto"
              />
            </Link>
          </div>

        <nav className="mt-8 flex-1 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md transition-colors ${
                    isActive(item.href) ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={isActive(item.href) ? item.selectedIcon : item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="w-5 h-4.5"
                  />
                  <span className="text-sm md:text-base">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Stay Updated Component */}
          <div className="mx-3 mt-10 p-4 rounded-lg bg-purple-200">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full  flex items-center justify-center">
                    <Image src="/icons/Bell.svg" alt="Bell Icon" width={14} height={14} />
                  </div>
                  <h3 className="text-primary font-semibold text-sm mb-3">Stay Updated</h3>
                </div>
                <p className="text-gray-600 text-xs mb-4">Enable notifications for important update on your account and properties</p>
                <button className="w-full bg-primary text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
                  Enable Notifications
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-full bg-white z-100 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 ">
          <Link href="/" onClick={handleLinkClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image 
                src={Logo} 
                alt="logo" 
                width={40}
                height={40}
                className="w-8 h-8"
              />
              <Image 
                src={LogoName} 
                alt="logo"
                width={120}
                height={30}
                className="h-6 w-auto"
              />
          </Link>
          <button onClick={toggleSidebar} className="p-1">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-md transition-colors ${
                    isActive(item.href) ? "bg-primary text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={isActive(item.href) ? item.selectedIcon : item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="w-5.5 h-5"
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/"
                onClick={() => {
                  localStorage.clear(); // Clear all localStorage data tokens
                }}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-md transition-colors text-left text-gray-500 hover:bg-gray-100"
              >
                <Image
                  src={Logout}
                  alt="Logout"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span>Logout</span>
              </Link>
            </li>
          </ul>

          {/* Stay Updated Component */}
          <div className="mx-3 mt-10 p-4 rounded-lg bg-purple-200">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 rounded-full  flex items-center justify-center">
                    <Image src="/icons/Bell.svg" alt="Bell Icon" width={14} height={14} />
                  </div>
                  <h3 className="text-primary font-semibold text-sm mb-3">Stay Updated</h3>
                </div>
                <p className="text-gray-600 text-xs mb-4">Enable notifications for important update on your account and properties</p>
                <button className="w-full bg-primary text-white py-2 px-4 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors">
                  Enable Notifications
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Header */}
      <header className={`md:hidden fixed top-0 left-0 right-0 bg-white z-[30] px-6 py-3 flex justify-between items-center transition-opacity duration-300 ${isMobileHeaderVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image 
                src={Logo} 
                alt="logo" 
                width={30}
                height={30}
                className="w-6 h-6"
              />
              <Image 
                src={LogoName} 
                alt="logo"
                width={80}
                height={30}
                className="h-5 w-auto"
              />
        </Link>
        <button onClick={toggleSidebar} className="p-1">
          <Menu size={24} />
        </button>
      </header>
    </>
  )
}
