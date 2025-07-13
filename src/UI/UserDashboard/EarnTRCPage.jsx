import React from 'react'
import { FiArrowLeft, FiUser, FiFileText, FiHelpCircle } from 'react-icons/fi'
import Image from 'next/image'

function EarnTRCPage() {
  return (
    <div className="md:p-6 w-full max-w-full overflow-hidden">

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
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Image src="/icons/Award.svg" width={16} height={16} alt="Redeem Icon" className='w-4 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-3 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
                Redeem Now
              </button>
            </div>

            {/* View History Card */}
            <div className="bg-white p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Image src="/icons/Document.svg" width={16} height={16} alt="View History Icon" className='w-6 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-3 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
                View History
              </button>
            </div>

            {/* How it Works Card */}
            <div className="bg-white p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Image src="/icons/FAQ Circle.svg" width={16} height={16} alt="Redeem Icon" className='w-6 h-6'/>
              </div>
              <button className="w-full border border-primary text-primary py-3 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-colors">
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
              <span className="text-gray-500 font-medium text-sm mr-4"> +25 TRC</span>
              <span className="text-gray-500 font-medium text-sm"> Expires in 1 day</span>
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
              <span className="text-gray-500 font-medium text-sm mr-4"> +500 TRC</span>
              <span className="text-gray-500 font-medium text-sm"> Expires in 2 day</span>
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
              <span className="text-gray-500 font-medium text-sm mr-4"> +50 TRC</span>
              <span className="text-gray-500 font-medium text-sm"> Ongoing</span>
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