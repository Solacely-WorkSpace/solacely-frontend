"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Bell, User, LogOut } from "lucide-react"
import Image from "next/image"
import {NotificationIcon} from "@/assets/icons"
import { Profile } from "@/assets/images"
import Link from "next/link"

export default function Header({ user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

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
    <header className="bg-white mt-5 py-3 px-6 flex items-center justify-between relative">
      <div className="ml-12 md:ml-0"> {/* Added margin for mobile menu button */}
        <h1 className="text-base font-medium">Hi Alesia K.</h1>
        <p className="text-xs text-gray-500">Welcome back!</p>
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
              <Image
                src= {Profile}
                alt="User avatar"
                width={35}
                height={35}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-md font-medium hidden md:inline">Alesia K.</span>
            <ChevronDown 
              size={17} 
              className={`text-gray-600 hidden md:inline transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
              <Link 
                href="/user/profile" 
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
                href="/sign-in" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
