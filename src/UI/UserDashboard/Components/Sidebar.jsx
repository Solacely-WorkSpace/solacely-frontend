"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { LogoName } from '@/assets/images' 
import { 
  Dashboard, DashboardSelected,
  Heart, HeartSelected,
  Wallet, WalletSelected,
  Maintenance, MaintenanceSelected,
  Setting, SettingSelected, LogoIcon
} from '@/assets/icons' 

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Close mobile sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const navItems = [
    { 
      name: "Dashboard", 
      href: "/user/dashboard", 
      icon: Dashboard,
      selectedIcon: DashboardSelected
    },
    { 
      name: "Wishlist", 
      href: "/user/wishlist", 
      icon: Heart,
      selectedIcon: HeartSelected
    },
    { 
      name: "Wallet", 
      href: "/user/wallet", 
      icon: Wallet,
      selectedIcon: WalletSelected
    },
    { 
      name: "Maintenance", 
      href: "/user/maintenance", 
      icon: Maintenance,
      selectedIcon: MaintenanceSelected
    },
    { 
      name: "Profile Settings", 
      href: "/user/profile", 
      icon: Setting,
      selectedIcon: SettingSelected
    }
  ]

  const isActive = (path) => pathname === path

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0k bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-white border-r border-gray-200 w-[250px]">
        <div className="p-6 mt-5 flex justify-start items-center">
          <div className="flex items-center gap-3">
            <Image 
              src={LogoIcon} 
              alt="logo" 
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <Image 
              src={LogoName} 
              alt="logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </div>
        </div>

        <nav className="mt-8 flex-1 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-md transition-colors ${
                    isActive(item.href) ? "bg-purple-800 text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={isActive(item.href) ? item.selectedIcon : item.icon}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
