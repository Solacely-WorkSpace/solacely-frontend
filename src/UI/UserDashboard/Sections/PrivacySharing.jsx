"use client"
import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'

function PrivacySharing({ onBack }) {
  // Sample data for social accounts
  const [socialAccounts, setSocialAccounts] = useState([
    { id: 1, platform: 'Facebook', connected: true },
    { id: 2, platform: 'Twitter', connected: false },
  ])

  // Privacy settings with toggle states
  const [activitySharing, setActivitySharing] = useState(true)
  const [dataSharing, setDataSharing] = useState(true)

  const handleConnectSocial = (platformId) => {
    // Logic to connect social account would go here
    console.log(`Connecting to platform with ID: ${platformId}`)
    
    // Update the state
    setSocialAccounts(prev => prev.map(account => 
      account.id === platformId ? { ...account, connected: true } : account
    ))
  }

  const handleRemoveSocial = (platformId) => {
    // Logic to remove social account would go here
    console.log(`Removing connection to platform with ID: ${platformId}`)
    
    // Update the state
    setSocialAccounts(prev => prev.map(account => 
      account.id === platformId ? { ...account, connected: false } : account
    ))
  }

  const handleToggleChange = (setting, value) => {
    if (setting === 'activity') {
      setActivitySharing(value)
    } else if (setting === 'data') {
      setDataSharing(value)
    }
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
          <h1 className="text-base font-semibold text-gray-800">Privacy</h1>
          <p className="text-xs text-gray-500">Connected apps and services</p>
        </div>
      </div>

      <div className="md:flex flex-col md:gap-8 px-5 md:px-0">
        <div className="flex-1 w-full md:w-100">
          {/* Social Accounts */}
          <div className="mb-8">
            <div className="space-y-4">
              {socialAccounts.map(account => (
                <div key={account.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {account.platform === 'Facebook' ? (
                        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                          <Image src="/icons/UserDashboard/fb.svg" className='w-3 h-5' alt="Facebook" width={10} height={10} />
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md">
                          <Image src="/icons/UserDashboard/tw.svg" className='w-5 h-4' alt="Twitter" width={10} height={10} />
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-gray-500">{account.platform}</p>
                        <p className="text-xs font-medium text-gray-800">{account.connected ? 'Connected' : 'Not connected'}</p>
                      </div>
                    </div>
                    {account.connected ? (
                      <button 
                        onClick={() => handleRemoveSocial(account.id)} 
                        className="text-gray-500 text-xs font-medium flex items-center gap-1"
                      >
                        <Image src="/icons/UserDashboard/Ico.svg" alt="Remove" width={16} height={16} />
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleConnectSocial(account.id)} 
                        className="text-gray-500 text-xs font-medium flex items-center gap-1"
                      >
                        <Image src="/icons/UserDashboard/connect.svg" alt="Connect" width={16} height={16} />
                        Connect
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Sharing Section */}
          <div className="mb-6 md:hidden">
            <h2 className="font-semibold mb-4 text-base">Activity sharing</h2>
            <div className="border-b border-gray-200 pb-4 md:border md:border-gray-200 md:rounded-lg md:p-4 md:mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-black">Include my profile and listing in search engines</p>
                  <p className="text-xs text-gray-500 mt-1">Turning this on means search engines, like Google, will display your profile and listing pages in search results.</p>
                </div>
                <div className="relative">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      className="sr-only peer" 
                      checked={activitySharing}
                      onChange={(e) => handleToggleChange('activity', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-complementary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-complementary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Data Sharing Section */}
          <div className="mb-8 md:hidden">
            <h2 className="font-semibold mb-4 text-base">Data sharing</h2>
            <div className="border-b border-gray-200 pb-4 md:border md:border-gray-200 md:rounded-lg md:p-4 md:mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs">Include my profile and listing in search engines</p>
                </div>
                <div className="relative">
                  <label className="inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      value="" 
                      className="sr-only peer" 
                      checked={dataSharing}
                      onChange={(e) => handleToggleChange('data', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-complementary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-complementary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons - Mobile Only */}
          <div className="flex gap-3 mt-8">
            <button className="flex-1 bg-complementary text-white py-3 rounded-md font-medium text-sm">
              Update Settings
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-md font-medium text-sm">
              Cancel
            </button>
          </div>
        </div>

        {/* Right Column (Desktop Only) */}
        <div className="hidden md:block md:w-80 absolute right-10">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4 p-3 bg-gray-200 rounded-lg w-10 h-8">
              <span className="text-xl">
                <Image src="/icons/UserDashboard/privacy.svg" alt="Privacy Sharing" width={24} height={24} />
              </span>
            </div>
            <h3 className="text-base font-medium mb-2">Setup profiles</h3>
            <p className="text-gray-400 text-sm">
              The following tips on creating a direct mail advertising campaign have been street-tested and will bring you huge returns.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacySharing
