"use client"
import Image from 'next/image'
import { Avatar } from '@/assets/images'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'  
import AccountInformation from './Sections/AccountInfo'
import PrivacySharing from './Sections/PrivacySharing'
import LoginDetails from './Sections/LoginDetails'
import Security from './Sections/Security'  
import Notification from './Sections/Notification'
import GlobalPreference from './Sections/GlobalPreference'

function ProfilePage() {
  const [showAccountInfo, setShowAccountInfo] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showLoginDetails, setShowLoginDetails] = useState(false)
  const [showSecurity, setShowSecurity] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showGlobalPreference, setShowGlobalPreference] = useState(false)

  const handleAccountInfo = () => {
    setShowAccountInfo(true)
  }
  if (showAccountInfo) {
    return <AccountInformation onBack={() => setShowAccountInfo(false)} />
  }
  const handlePrivacySharing = () => {
    setShowPrivacy(true)
  }
  if (showPrivacy) {
    return <PrivacySharing onBack={() => setShowPrivacy(false)} />
  }

  const handleLoginDetails = () => {
    setShowLoginDetails(true)
  }
  if (showLoginDetails) {
    return <LoginDetails onBack={() => setShowLoginDetails(false)} />
  }

  const handleSecurity = () => {
    setShowSecurity(true)
  }
  if (showSecurity) {
    return <Security onBack={() => setShowSecurity(false)} />
  }

  const handleNotification = () => {
    setShowNotification(true)
  }
  if (showNotification) {
    return <Notification onBack={() => setShowNotification(false)} />
  }

  const handleGlobalPreference = () => {
    setShowGlobalPreference(true)
  }
  if (showGlobalPreference) {
    return <GlobalPreference onBack={() => setShowGlobalPreference(false)} />
  }

  return (
    <main className='md:p-6'>
      {/* Page Title */}
      <div className="md:block mb-8">
        <h1 className="text-xl font-medium md:hidden block">Profile Settings</h1>
      </div>
      <div className=" mx-auto py-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={Avatar} // Replace with actual avatar path
              alt="Profile"
              layout="fill"
              className="rounded-full"
            />
            <div className="absolute bottom-3 right-0 bg-gray-200 p-1 rounded-full shadow cursor-pointer">
              <Image src="/icons/UserDashboard/edit.svg" alt="edit" width={24} height={24} />
            </div>
          </div>
          <h2 className="text-2xl font-semibold">Stella jonah</h2>
          <p className="text-gray-500 text-sm">
            j.stevens@gmail.com
          </p>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 hidden md:grid">
            <button
              onClick={handleAccountInfo}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-lg mb-2">
                  <Image src="/icons/UserDashboard/user.svg" alt="Account information" width={24} height={24} />
                </div>
                <div className='text-left'>
                  <h3 className="font-bold text-base">Account information</h3>
                  <p className="text-gray-500 text-sm">Profile photo, name & language</p>
                </div>
              </div>
            </button>

            <button
                onClick={handleNotification}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl bg-gray-100 p-2 rounded-lg mb-2">
                  <Image src="/icons/UserDashboard/notification.svg" alt="Notifications" width={24} height={24} />
                </div>
                <div className='text-left'>
                  <h3 className="font-bold text-base">Notifications</h3>
                  <p className="text-gray-500 text-sm">Set your email notifications</p>
                </div>
              </div>
            </button>

            <button
                onClick={handleLoginDetails}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition" 
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl bg-gray-100 p-2 rounded-lg mb-2">
                  <Image src="/icons/UserDashboard/password.svg" alt="Login details" width={24} height={24} />
                </div>
                <div className='text-left'>
                  <h3 className="font-bold text-base">Login details</h3>
                  <p className="text-gray-500 text-sm">Password & security questions</p>
                </div>
              </div>
            </button>

            <button
                onClick={handleSecurity}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl bg-gray-100 p-2 rounded-lg mb-2">
                  <Image src="/icons/UserDashboard/security.svg" alt="Security" width={24} height={24} />
                </div>
                <div className='text-left'>
                  <h3 className="font-bold text-base">Security</h3>
                  <p className="text-gray-500 text-sm">Your last activity and credentials</p>
                </div>
              </div>
            </button>

            <button
            onClick={handlePrivacySharing}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl bg-gray-100 p-2 rounded-lg mb-2">
                  <Image src="/icons/UserDashboard/privacy.svg" alt="Privacy Sharing" width={24} height={24} />
                </div>
                <div className='text-left'>
                  <h3 className="font-bold text-base">Privacy Sharing</h3>
                  <p className="text-gray-500 text-sm">Connected apps and services</p>
                </div>
              </div>
            </button>

            <button
                onClick={handleGlobalPreference}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center space-x-2">
                <div className="bg-gray-100 p-2 rounded-lg mb-2">
                  <Image src="/icons/UserDashboard/preference.svg" alt="Global preference" width={24} height={24} />
                </div>
                <div className='text-left'>
                  <h3 className="font-bold text-base">Global preference</h3>
                  <p className="text-gray-500 text-sm">Time zone, currency, and language.</p>
                </div>
              </div>
            </button>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
            <div
              onClick={handleAccountInfo}
              className="flex items-center justify-between bg-white p-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  <Image src="/icons/UserDashboard/user.svg" alt="Account information" width={24} height={24} />
                </span>
                <span className="font-bold text-base">Account information</span>
              </div>
              <ChevronRight className="text-gray-500"/>
            </div>

            <div
            onClick={handlePrivacySharing}
              className="flex items-center justify-between bg-white p-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  <Image src="/icons/UserDashboard/privacy.svg" alt="Privacy Sharing" width={24} height={24} />
                </span>
                <span className="font-bold text-base">Privacy Sharing</span>
              </div>
              <ChevronRight className="text-gray-500"/>
            </div>

            <div
                onClick={handleLoginDetails}
                className="flex items-center justify-between bg-white p-4"  
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  <Image src="/icons/UserDashboard/password.svg" alt="Login details" width={24} height={24} />
                </span>
                <span className="font-bold text-base">Login details</span>
              </div>
              <ChevronRight className="text-gray-500"/>
            </div>

            <div
                onClick={handleSecurity}
                className="flex items-center justify-between bg-white p-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  <Image src="/icons/UserDashboard/security.svg" alt="Security" width={24} height={24} />
                </span>
                <span className="font-bold text-base">Security</span>
              </div>
              <ChevronRight className="text-gray-500"/>
            </div>

            <div
                onClick={handleNotification}
                className="flex items-center justify-between bg-white p-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  <Image src="/icons/UserDashboard/notification.svg" alt="Notifications" width={24} height={24} />
                </span>
                <span className="font-bold text-base">Notifications</span>
              </div>
              <ChevronRight className="text-gray-500"/>
            </div>

            <div
                onClick={handleGlobalPreference}
              className="flex items-center justify-between bg-white p-4"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">
                  <Image src="/icons/UserDashboard/preference.svg" alt="Global preference" width={24} height={24} />
                </span>
                <span className="font-bold text-base">Global preference</span>
              </div>
              <ChevronRight className="text-gray-500"/>
            </div>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage