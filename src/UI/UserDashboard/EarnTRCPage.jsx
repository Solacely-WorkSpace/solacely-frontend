"use client"
import React, { useState } from 'react'
import { FiArrowLeft, FiUser, FiFileText, FiHelpCircle } from 'react-icons/fi'
import Image from 'next/image'
import TRCActivityHistory from './Sections/TRCActivityHistory'

function EarnTRCPage() {
  const [showHistory, setShowHistory] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)
  if (showHistory) {
    return <TRCActivityHistory onBack={() => setShowHistory(false)} />
  }

  return (
    <div className="p-2 md:p-4 w-full max-w-full overflow-x-hidden">
      {/* How It Works Popup */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F296333]">
          <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 max-w-md w-full text-center relative text-xs sm:text-sm md:text-base">
            <button className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-primary text-xl sm:text-2xl" onClick={() => setShowHowItWorks(false)}>&times;</button>
            <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">How to Earn and Use TRC</h2>
            <p className="text-gray-600 mb-2 sm:mb-4">Earn TRC by completing tasks like surveys, referrals, or learning modules. 1 TRC = ₦10</p>
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Examples of Tasks</h3>
            <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
              <div className="flex flex-col items-center mx-1 sm:mx-2">
                <Image src="/icons/SurveyChart.svg" width={36} height={36} alt="Quick Survey" className='w-9 h-9 sm:w-13 sm:h-12' />
                <span className="text-xs sm:text-sm mt-1 sm:mt-2">Quick Survey</span>
              </div>
              <div className="flex flex-col items-center mx-1 sm:mx-2">
                <Image src="/icons/Learning.svg" width={36} height={36} alt="Financial Literacy" className='w-9 h-10 sm:w-13 sm:h-14'/>
                <span className="text-xs sm:text-sm mt-1 sm:mt-2">Financial Literacy</span>
              </div>
              <div className="flex flex-col items-center mx-1 sm:mx-2">
                <Image src="/icons/Megaphone.svg" width={36} height={36} alt="Invite Friends" className='w-10 h-9 sm:w-14 sm:h-12'/>
                <span className="text-xs sm:text-sm mt-1 sm:mt-2">Invite Friends</span>
              </div>
            </div>
            <button className="bg-primary text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-base" onClick={() => setShowHowItWorks(false)}>Explore</button>
          </div>
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-base md:text-lg font-medium text-gray-900 mb-4 md:mb-8">TRC Overview</h1>

      {/* TRC Balance and Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-12">
        {/* TRC Balance Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl py-6 px-2 md:p-4">
          <h2 className="text-sm md:text-lg font-medium text-gray-900 mb-2 md:mb-2">TRC Balance</h2>
          <div>
            <p className="text-base md:text-lg font-medium text-gray-900 mb-2 md:mb-2">You have 1250 TRC = ₦ 12,500</p>
            <p className="text-xs md:text-sm text-gray-600">TRC is your tenant reward contribution. 1 TRC = ₦ 10</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="lg:col-span-3 border border-purple-200 rounded-xl p-2 md:p-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {/* Redeem Now Card */}
            <div className="bg-white py-2 md:py-3 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-10">
                <Image src="/icons/Award.svg" width={14} height={14} alt="Redeem Icon" className='w-4 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-3 md:py-2 px-1 md:px-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors text-sm md:text-base">
                Redeem Now
              </button>
            </div>

            {/* View History Card */}
            <div className="bg-white p-2 md:p-3 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-10">
                <Image src="/icons/Document.svg" width={14} height={14} alt="View History Icon" className='w-6 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-3 md:py-2 px-1 md:px-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors text-sm md:text-base" onClick={() => setShowHistory(true)}>
                View History
              </button>
            </div>

            {/* How it Works Card */}
            <div className="bg-white p-2 md:p-3 text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 md:mb-10">
                <Image src="/icons/FAQ Circle.svg" width={14} height={14} alt="Redeem Icon" className='w-6 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-3 md:py-2 px-1 md:px-3 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors text-sm md:text-base" onClick={() => setShowHowItWorks(true)}>
                How it Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mb-4 md:mb-8">
        <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-3 md:mb-6">Tasks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {/* Quick Survey Task */}
          <div className="bg-white border border-primary/80 rounded-xl p-2 md:p-4 pt-4 mb-4 md:mb-0">
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-3">Quick Survey</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Share your opinion in a short 3-mins survey and earn instantly
            </p>
            <div className="flex items-center mb-2 md:mb-4">
              <div className='flex items-center'>
                <Image src="/icons/Trophy.svg" width={16} height={16} alt="Survey Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-xs md:text-sm mr-1 md:mr-4"> +25 TRC</span>
              </div>
              <div className='flex items-center'>
                <Image src="/icons/Timer.svg" width={16} height={16} alt="Clock Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-xs md:text-sm"> Expires in 1 day</span>
              </div>
            </div>
            <button className="w-1/2 md:w-fit bg-primary text-white py-2 md:py-2 px-3 md:px-6 rounded-lg font-medium hover:bg-purple-800 transition-colors mt-1 md:mt-3 text-xs md:text-base">
              Start Survey
            </button>
          </div>

          {/* Financial Literacy Task */}
          <div className="bg-white border border-primary rounded-xl p-2 md:p-4 mb-4 md:mb-0">
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-3">Financial Literacy</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Watch a short video and answer 2 questions correctly (learn & earn)
            </p>
            <div className="flex items-center mb-2 md:mb-4">
              <div className='flex items-center mr-1 md:mr-4'>
                <Image src="/icons/Trophy.svg" width={16} height={16} alt="Video Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-xs md:text-sm mr-1 md:mr-4"> +500 TRC</span>
              </div>
              <div className="flex items-center">
                <Image src="/icons/Timer.svg" width={16} height={16} alt="Clock Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-xs md:text-sm"> Expires in 2 days</span>
              </div>
            </div>
            <button className="w-1/2 md:w-fit bg-primary text-white py-2 md:py-2 px-3 md:px-6 rounded-lg font-medium hover:bg-purple-800 transition-colors mt-1 md:mt-3 text-xs md:text-base">
              Start Learning
            </button>
          </div>

          {/* Refer a Friend Task */}
          <div className="bg-white border border-primary rounded-xl p-2 md:p-4 pt-4 mb-10 md:mb-0">
            <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 md:mb-3">Refer a Friend</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Invite a friend and get rewarded when they verify (referral)
            </p>
            <div className="flex items-center mb-2 md:mb-4">
              <div className='flex items-center mr-1 md:mr-4'>
                <Image src="/icons/Trophy.svg" width={16} height={16} alt="Refer Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-xs md:text-sm mr-1 md:mr-4">+50 TRC</span>
              </div>
              <div className="flex items-center">
                <Image src="/icons/Timer.svg" width={16} height={16} alt="Clock Icon" className='w-4 h-4 mr-1 ' />
                <span className="text-gray-500 font-medium text-xs md:text-sm"> Ongoing</span>
              </div>
            </div>
            <button className="w-1/2 md:w-fit bg-primary text-white py-2 md:py-2 px-3 md:px-6 rounded-lg font-medium hover:bg-purple-800 transition-colors mt-1 md:mt-3 text-xs md:text-base">
              Refer Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarnTRCPage