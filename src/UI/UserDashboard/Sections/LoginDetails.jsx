
"use client"
import React, { useState } from 'react';
import { IoLockClosed } from 'react-icons/io5';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';

function LoginDetails({ onBack }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
    console.log('Password update submitted');
  };

  return (
    <div className="w-full md:p-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
          <button 
            onClick={onBack} 
            className="bg-gray-100 p-2 rounded-md"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-base font-semibold text-gray-800">Login details</h1>
            <p className="text-xs text-gray-500">Your last activity and credentials</p>
          </div>
      </div>

      {/* Change Password Section */}
      <div className="md:flex flex-col-2">
        <div className="">
          <h3 className="text-base font-semibold mb-4">Change password</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 md:w-100 max-w-md">
            {/* Current Password */}
            <div className="relative">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="w-full border border-gray-200 text-sm rounded-md p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoLockClosed className="text-gray-700" />
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="w-full border border-gray-200 text-sm rounded-md p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <IoMdCheckmarkCircleOutline className="text-green-500" />
              </div>
            </div>

            {/* Password Information and Help Section - Desktop Only */}
            <div className="hidden md:flex md:items-start md:gap-10 my-8">
              <div className="flex-1">
                {/* Form buttons will be on the left side for desktop */}
                <div className="flex gap-3">
                  <button 
                    type="submit" 
                    className="px-5 py-3 bg-complementary text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Update Settings
                  </button>
                  <button 
                    type="button" 
                    className="px-5 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            {/* Buttons - Mobile Only */}
            <div className="flex gap-3 md:hidden">
              <button 
                type="submit" 
                className="px-5 py-3 bg-complementary text-white rounded-md hover:bg-green-600 transition-colors flex-1"
              >
                Update Settings
              </button>
              <button 
                type="button" 
                className="px-5 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Password info on the right side */}
        <div className="hidden md:block md:w-60 absolute right-10">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-4 p-3 bg-gray-200 rounded-lg w-10 h-10">
              <Image src="/icons/UserDashboard/password.svg" className='w-5 h-5' alt="Notifications" width={24} height={24} />
            </div>
            <h4 className="font-medium mb-2 text-sm">Password and questions</h4>
            <p className="text-gray-400 text-xs">
              From ads that dance or sing to MTV like commercials, online advertisers are now using a new type of technology called media
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginDetails;