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
    <div className="md:p-6 w-full max-w-full overflow-hidden">
      {/* How It Works Popup */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F296333]">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center relative">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl" onClick={() => setShowHowItWorks(false)}>&times;</button>
            <h2 className="text-xl font-bold mb-2">How to Earn and Use TRC</h2>
            <p className="text-gray-600 mb-4">Earn TRC by completing tasks like surveys, referrals, or learning modules. 1 TRC = ₦10</p>
            <h3 className="text-lg font-semibold mb-4">Examples of Tasks</h3>
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col items-center mx-2">
                <Image src="/icons/SurveyChart.svg" width={48} height={48} alt="Quick Survey" className='w-13 h-12' />
                <span className="text-sm mt-2">Quick Survey</span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <Image src="/icons/Learning.svg" width={48} height={48} alt="Financial Literacy" className='w-13 h-14'/>
                <span className="text-sm mt-2">Financial Literacy</span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <Image src="/icons/Megaphone.svg" width={48} height={48} alt="Invite Friends" className='w-14 h-12'/>
                <span className="text-sm mt-2">Invite Friends</span>
              </div>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold" onClick={() => setShowHowItWorks(false)}>Explore</button>
          </div>
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-xl font-medium text-gray-900 mb-8">TRC Overview</h1>

      {/* TRC Balance and Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {/* TRC Balance Card */}
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-8">TRC Balance</h2>
          <div className="mb-4">
            <p className="text-xl font-medium text-gray-900 mb-8">You have 1250 TRC = ₦ 12,500</p>
            <p className="text-sm text-gray-600">TRC is your tenant reward contribution. 1 TRC = ₦ 10</p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="lg:col-span-3 border border-purple-200 rounded-2xl p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Redeem Now Card */}
            <div className="bg-white p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-10">
                <Image src="/icons/Award.svg" width={16} height={16} alt="Redeem Icon" className='w-4 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-4 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
                Redeem Now
              </button>
            </div>

            {/* View History Card */}
            <div className="bg-white p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-10">
                <Image src="/icons/Document.svg" width={16} height={16} alt="View History Icon" className='w-6 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-4 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors" onClick={() => setShowHistory(true)}>
                View History
              </button>
            </div>

            {/* How it Works Card */}
            <div className="bg-white p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-10">
                <Image src="/icons/FAQ Circle.svg" width={16} height={16} alt="Redeem Icon" className='w-6 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-4 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors" onClick={() => setShowHowItWorks(true)}>
                How it Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Tasks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Survey Task */}
          <div className="bg-white border border-primary rounded-2xl p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3">Quick Survey</h3>
            <p className="text-sm text-gray-600 mb-4">
              Share your opinion in a short 3-mins survey and earn instantly
            </p>
            
            <div className="flex items-center mb-4">
              <div className='flex items-center'>
                <Image src="/icons/Trophy.svg" width={20} height={20} alt="Survey Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-sm mr-4"> +25 TRC</span>
              </div>
              <div className='flex items-center'>
                <Image src="/icons/Timer.svg" width={20} height={20} alt="Clock Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-sm"> Expires in 1 day</span>
              </div>
            </div>
            
            <button className="w-fit bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-purple-700 transition-colors mt-3">
              Start Survey
            </button>
          </div>

          {/* Financial Literacy Task */}
          <div className="bg-white border border-primary rounded-2xl p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3">Financial Literacy</h3>
            <p className="text-sm text-gray-600 mb-4">
              Watch a short video and answer 2 questions correctly (learn & earn)
            </p>
            
            <div className="flex items-center mb-4">
              <div className='flex items-center mr-4'>
                <Image src="/icons/Trophy.svg" width={20} height={20} alt="Video Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-sm mr-4"> +500 TRC</span>
              </div>
              <div className="flex items-center">
                <Image src="/icons/Timer.svg" width={20} height={20} alt="Clock Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-sm"> Expires in 2 days</span>
              </div>
            </div>
            
            <button className="w-fit bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-purple-700 transition-colors mt-3">
              Start Learning
            </button>
          </div>

          {/* Refer a Friend Task */}
          <div className="bg-white border border-primary rounded-2xl p-4">
            <h3 className="text-base font-bold text-gray-900 mb-3">Refer a Friend</h3>
            <p className="text-sm text-gray-600 mb-4">
              Invite a friend and get rewarded when they verify (referral)
            </p>
            
            <div className="flex items-center mb-4">
              <div className='flex items-center mr-4'>
                <Image src="/icons/Trophy.svg" width={20} height={20} alt="Refer Icon" className='w-4 h-4 mr-1' />
                <span className="text-gray-500 font-medium text-sm mr-4">+50 TRC</span>
              </div>
              <div className="flex items-center">
                <Image src="/icons/Timer.svg" width={20} height={20} alt="Clock Icon" className='w-4 h-4 mr-1 ' />
                <span className="text-gray-500 font-medium text-sm"> Ongoing</span>
              </div>
            </div>
            
            <button className="w-fit bg-primary text-white py-2 px-6 rounded-xl font-medium hover:bg-purple-700 transition-colors mt-3">
              Refer Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EarnTRCPage