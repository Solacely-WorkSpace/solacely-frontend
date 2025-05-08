"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, X, Camera } from "lucide-react"

const MaintenanceRequestDetails = ({ isOpen, onClose, requestData }) => {
  // Default data if no requestData is provided
  const defaultData = {
    type: "Drainage",
    phoneNumber: "+2348907556623",
    apartment: "55 Gbeni killa street",
    location: "Lagos, Nigeria",
    description: "Experiencing a stubborn clog in the bathroom sink drain? Water is pooling and taking forever to drain away. It's time to tackle this frustrating plumbing issue head-on to restore smooth, stress-free daily routines.",
    availableDates: [
      { date: "29 January 2022", time: "08:00 AM" },
      { date: "29 January 2022", time: "08:00 AM" },
      { date: "29 January 2022", time: "08:00 AM" }
    ],
    images: []
  }

  // Use provided data or default
  const data = requestData || defaultData

  // Handle mobile responsiveness
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      
      <div 
        className="absolute inset-0 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`fixed top-0 ${isMobile ? 'inset-0' : 'right-0'} h-full bg-white z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${isMobile ? 'w-full' : 'w-[450px]'} shadow-lg`}>
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="p-1">
              <ChevronLeft size={24} />
            </button>
            <h2 className="text-lg font-bold">Maintenance Request Details</h2>
          </div>
          <button onClick={onClose} className="p-1 md:hidden">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Details Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Details</h3>
              <button className="flex items-center gap-1 text-primary">
                <Image
                  src="/icons/Edit.svg"
                  alt="Edit"
                  width={20}
                  height={20}
                  className="w-4 h-4"
                />
                <span className="text-sm font-bold text-primary">Edit</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Maintenance Request</span>
                <span className="font-medium">Drainage</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Phone Number</span>
                <span className="font-medium">+2348907556623</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Apartment</span>
                <span className="font-medium">55 Gbeni killa street</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="font-medium">Lagos, Nigeria</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Images</span>
                <button className="flex items-center gap-1 text-primary">
                  <Image
                    src="/icons/pdf.svg"
                    alt="Edit"
                    width={20}
                    height={20}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-bold">View</span>
                </button>
              </div>
            </div>
          </div>

          {/* Request Description */}
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-sm">INFORMATION ABOUT YOUR REQUEST</h3>
            <div className="border border-gray-200 p-2 rounded-md">
              <p className="p-2 text-xs text-gray-400">Experiencing a stubborn clog in the bathroom sink drain? Water is pooling and taking forever to drain away. It's time to tackle this frustrating plumbing issue head-on to restore smooth, stress-free daily routines.</p>
            </div>
          </div>

          {/* Available Dates */}
          <div>
            <h3 className="font-bold mb-2 text-sm">AVAILABLE DATE AND TIME FOR VISIT</h3>
            <div className="space-y-3">
              <div className="py-2">
                <p className="font-bold text-sm">29 January 2022,</p>
                <p className="text-gray-500 text-sm">08:00 AM</p>
              </div>
              <div className="py-2">
                <p className="font-bold text-sm">29 January 2022,</p>
                <p className="text-gray-500 text-sm">08:00 AM</p>
              </div>
              <div className="py-2">
                <p className="font-bold text-sm">29 January 2022,</p>
                <p className="text-gray-500 text-sm">08:00 AM</p>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="mt-10 flex justify-end">
            <button 
              className="text-gray-500 font-medium py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
              onClick={onClose}
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MaintenanceRequestDetails