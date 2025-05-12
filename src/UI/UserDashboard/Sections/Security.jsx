"use client"
import React from 'react'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'

function Security({ onBack }) {
  // State for tracking viewport width
  const [isDesktop, setIsDesktop] = useState(false)
  
  // Check if window is available (client-side) and set up resize listener
  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    
    // Initial check
    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
    }
    
    // Cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  
  // Sample data for device history
  const [deviceHistory, setDeviceHistory] = useState([
    { id: 1, device: 'Mac OS Safari', location: 'Abuja', date: '20 Oct 2022 at 04:32AM', currentSession: true },
    { id: 2, device: 'iOS 13.0 Safari', location: 'Lagos', date: '20 Oct 2022 at 04:32AM', currentSession: false },
    { id: 3, device: 'Windows 10 Chrome', location: 'Lagos', date: '20 Oct 2022 at 04:32AM', currentSession: false },
  ])

  // Sample data for social accounts
  const [socialAccounts, setSocialAccounts] = useState([
    { id: 1, platform: 'Facebook', connected: true },
    { id: 2, platform: 'Twitter', connected: false },
  ])

  const handleRemoveDevice = (deviceId) => {
    // Logic to remove device would go here
    console.log(`Removing device with ID: ${deviceId}`)
  }

  const handleConnectSocial = (platformId) => {
    // Logic to connect social account would go here
    console.log(`Connecting to platform with ID: ${platformId}`)
  }

  const handleRemoveSocial = (platformId) => {
    // Logic to remove social account would go here
    console.log(`Removing connection to platform with ID: ${platformId}`)
  }

  return (
    <div className="w-full md:p-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 md:mb-8 p-5 md:p-0 border-b border-gray-100 md:border-none">
        <button
          onClick={onBack}
          className="bg-gray-100 p-2 rounded-md"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-base font-semibold text-gray-800">Security</h1>
          <p className="text-xs text-gray-500">Your last activity and credentials</p>
        </div>
      </div>

      <div className="md:flex md:gap-8 px-5 md:px-0">
        <div className="flex-1">
          {/* Social Accounts - Only visible in mobile view */}
          <div className="md:hidden mb-6">
            <h2 className="font-semibold text-base mb-4">Social accounts</h2>
            <div className="space-y-3">
              {socialAccounts.map(account => (
                <div key={account.id} className="flex items-center justify-between py-3 border-b border-gray-300">
                  <div className="flex items-center gap-3">
                    {account.platform === 'Facebook' ? (
                      <div className="text-blue-600 w-5 h-5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width="16" height="16">
                          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="text-blue-400 w-5 h-5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
                          <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                        </svg>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500">{account.platform}</p>
                      <p className="text-sm text-gray-700 font-medium">{account.connected ? 'Connected' : 'Not connected'}</p>
                    </div>
                  </div>
                  {account.connected ? (
                    <button onClick={() => handleRemoveSocial(account.id)} className="text-gray-500 text-xs font-medium flex items-center gap-1">
                      <Image src="/icons/UserDashboard/Ico.svg" alt="Remove" width={16} height={16} />
                      Remove
                    </button>
                  ) : (
                    <button onClick={() => handleConnectSocial(account.id)} className="text-gray-500 text-xs font-medium flex items-center gap-1">
                      <Image src="/icons/UserDashboard/connect.svg" alt="Connect" width={16} height={16} />
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Device History */}
          <div className="mb-6 md:w-150">
            <h2 className="font-semibold mb-4 text-base">{isDesktop ? "" : "Device history"}</h2>
            <div className="space-y-4">
              {deviceHistory.map(device => (
                <div key={device.id} className="border-b border-gray-100 pb-4 md:border-b md:border-gray-200 md:rounded-lg md:p-4 md:mb-4">
                  <div className="flex items-start md:items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {device.device.includes('Mac') || device.device.includes('iOS') ? (
                        <Image src="/icons/UserDashboard/desktop.svg" alt="Remove" className="w-7 h-5" width={24} height={24} />
                      ) : device.device.includes('iOS') ? (
                        <Image src="/icons/UserDashboard/mobile.svg" alt="Remove" className="w-5 h-5" width={24} height={24} />
                      ) : (
                        <Image src="/icons/UserDashboard/mobile.svg" alt="Remove" className="w-5 h-9" width={24} height={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex md:flex-col flex-col-2 gap-2 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">{device.location} · {device.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-medium text-black ">{device.device}</p>
                            
                          </div>
                        </div>
                        <button 
                          onClick={() => handleRemoveDevice(device.id)} 
                          className="text-gray-500 text-xs font-medium flex items-center gap-1 mt-1 md:mt-0"
                        >
                          {device.currentSession && (
                              <span className="text-complementary text-xs font-medium relative bottom-5 left-25">Current session</span>
                            )}
                          <Image src="/icons/UserDashboard/Ico.svg" alt="Remove" className="w-5 h-5" width={24} height={24} />
                          Remove device
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons - Mobile Only */}
          <div className="flex gap-3 mt-8 md:hidden">
            <button className="flex-1 bg-complementary text-white py-3 rounded-md font-medium text-sm">
              Update Settings
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-md font-medium text-sm">
              Cancel
            </button>
          </div>
        </div>

        {/* Right Column (Desktop Only) */}
        <div className="hidden md:block md:w-1/3 max-w-xs">
          {/* Social Accounts - Desktop Only */}
          <div className="mb-6 md:hidden md:block">
            <h2 className="font-semibold mb-4">Social accounts</h2>
            <div className="space-y-3">
              {socialAccounts.map(account => (
                <div key={account.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {account.platform === 'Facebook' ? (
                        <div className="text-blue-600 w-5 h-5 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" width="16" height="16">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="text-blue-400 w-5 h-5 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
                            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500">{account.platform}</p>
                        <p className="text-sm font-medium">{account.connected ? 'Connected' : 'Not connected'}</p>
                      </div>
                    </div>
                    {account.connected ? (
                      <button onClick={() => handleRemoveSocial(account.id)} className="text-gray-500 text-xs font-medium">
                        Remove
                      </button>
                    ) : (
                      <button onClick={() => handleConnectSocial(account.id)} className="text-gray-500 text-xs font-medium flex items-center gap-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.33334 8H10.6667" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 10.6667L8 5.33334" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
                          <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33334 4.31811 1.33334 8.00001C1.33334 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#6B7280" strokeWidth="1.5"/>
                        </svg>
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Security Credentials Info Box */}
          <div className="hidden md:block md:w-80 absolute right-10">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4 p-3 bg-gray-200 rounded-lg w-12 h-10">
                <Image src="/icons/UserDashboard/security.svg" className='w-6 h-4' alt="Notifications" width={24} height={24} />
              </div>
              <h3 className="text-base font-medium mb-2">Security credentials</h3>
              <p className="text-gray-400 text-sm">
                There are many things that are important to catalog design. Your images must be sharp and appealing.
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Security