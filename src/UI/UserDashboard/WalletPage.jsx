"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import { IoArrowBack } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import SaveForRent from './Sections/SaveForRent'
import TRCEarnings from './Sections/TRCEarnings'

function WalletPage() {
  // Sample data to match the design
  const walletBalance = '₦700,000'
  const rentSavingsGoal = '₦500,000'
  const currentSavings = '₦150,000'
  const savingsPercentage = 30
  const trcEarnings = '₦12,500'
  const rentPayment = '₦500,000'
  
  // Transaction data
  const transactions = [
    {
      id: 1,
      title: 'Rent payment',
      amount: '₦ 100,000',
      date: 'May 10, 2025',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Rent payment',
      amount: '₦ 100,000',
      date: 'May 10, 2025',
      status: 'failed'
    },
    {
      id: 3,
      title: 'Savings deposit',
      amount: '₦ 100,000',
      date: 'May 10, 2025',
      status: 'pending'
    },
    {
      id: 4,
      title: 'TRC earnings',
      amount: '₦ 100,000',
      date: 'May 10, 2025',
      status: 'success'
    },
    {
      id: 5,
      title: 'Rent payment',
      amount: '₦ 100,000',
      date: 'May 10, 2025',
      status: 'success'
    },
  ]

  // State for the savings view mode
  const [savingsView, setSavingsView] = useState('weekly')
  
  // State for auto-save toggle
  const [autoSave, setAutoSave] = useState(true)

  // Sample earnings data
  const earningsData = {
    surveys: '₦5,000',
    microtasks: '₦4,000',
    referrals: '₦3,500'
  }

  const router = useRouter()

  // State to control the visibility of the SaveForRent section
  const [showSaveForRent, setShowSaveForRent] = useState(false)
  const [showTRCEarnings, setShowTRCEarnings] = useState(false)

  if (showSaveForRent) {
    return <SaveForRent onBack={() => setShowSaveForRent(false)} />;
  }
  if (showTRCEarnings) {
    return <TRCEarnings onBack={() => setShowTRCEarnings(false)} />;
  }

  return (
    <div className="min-h-screen w-full md:p-6">
      {/* Header with back button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="md:hidden text-2xl md:text-3xl font-bold text-gray-800">Wallet</h1>
        </div>
        
        <div className="flex gap-2 md:gap-3 w-full md:w-auto">
          <button
            className="bg-complementary text-white py-2.5 px-3 md:px-4 rounded-lg border border-gray-200 hover:bg-complementary-dark text-sm md:text-base flex-1 md:flex-none md:w-[200px]"
            onClick={() => setShowSaveForRent(true)}
          >
            Save for Rent
          </button>
          <button className="bg-purple-50 text-black font-semibold border border-gray-200 py-2.5 px-3 md:px-4 rounded-lg text-sm md:text-base flex-1 md:flex-none md:w-[200px]">
            Pay Rent
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Wallet Balance Card */}
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200">
          <h3 className="text-black text-sm mb-2">Wallet Balance</h3>
          <h2 className="text-lg font-bold mb-2">{walletBalance}</h2>
          
          <div className="mt-4">
            <p className="text-sm text-gray-400 font-semibold">Rent Progress</p>
            <div className="bg-emerald-100 h-3 rounded-full mt-1">
              <div 
                className="mt-4 bg-complementary h-full rounded-full"
                style={{ width: `${savingsPercentage}%` }}
              ></div>
            </div>
            <p className="mt-4 text-xs text-gray-500">{currentSavings} of {rentSavingsGoal} saved</p>
          </div>
        </div>

        {/* Rent Savings Card */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-black text-sm">Rent Savings</h3>
            <FiChevronRight className="text-gray-400" />
          </div>
          
          {/* Toggle buttons */}
          <div className="flex mb-4">
            <button 
              className={`md:px-3 px-1 md:py-1 py-0.5 rounded-l-xl md:text-sm text-xs ${
                savingsView === 'weekly' 
                  ? 'bg-purple-900 text-white' 
                  : 'bg-white text-gray-600 border'
              }`}
              onClick={() => setSavingsView('weekly')}
            >
              Weekly
            </button>
            <button 
              className={`md:px-3 px-1 md:py-1 py-0.5 rounded-r-xl md:text-sm text-xs ${
                savingsView === 'monthly' 
                  ? 'bg-purple-900 text-white' 
                  : 'bg-white text-primary border'
              }`}
              onClick={() => setSavingsView('monthly')}
            >
              Monthly
            </button>
          </div>
          
          <p className="text-sm text-gray-400 mb-1 mt-4 font-semibold">Rent Goal</p>
          <div className=" mt-4 mb-3 flex">
            <div className="flex w-[20%] justify-between text-xs md:text-sm mb-1">
              <span>{savingsPercentage}%</span>
            </div>
            <div className="w-[85%] bg-emerald-100 h-3 rounded-full">
              <div 
                className="bg-complementary h-full rounded-full"
                style={{ width: `${savingsPercentage}%` }}
              ></div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 mt-4 md:flex-row flex-col">
            <div className="flex items-center gap-2 cursor-pointer flex-1">
              <div 
                onClick={() => setAutoSave(!autoSave)} 
                className="relative w-8 h-4 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out"
                style={{ backgroundColor: autoSave ? '#6b21a8' : '#e5e7eb' }}
              >
                <div 
                  className="absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full shadow transition-transform duration-300 ease-in-out"
                  style={{ transform: autoSave ? 'translateX(15px)' : 'translateX(0)' }}
                ></div>
              </div>
              <span className="text-xs">Auto-Save</span>
            </div>
            <button className="flex justify-start  gap-2 rounded-md px-3 py-2 text-xs flex-1 text-primary font-semibold">
              <div className="bg-primary text-white rounded-md w-4 h-4 flex items-center justify-center">+</div>
              Add Funds
            </button>
          </div>
        </div>

        {/* TRC Earnings Card */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-black text-sm">TRC Earnings</h3>
            <button className="hidden md:block bg-purple-900 text-white rounded-md text-xs px-3 py-2"
              onClick={() => setShowTRCEarnings(true)}>
              Transfer to Rent
            </button>
          </div>
          
          <h2 className="text-lg font-bold mb-4">{trcEarnings}</h2>
          <p className="text-sm text-gray-400 font-semibold mt-4">Total Earnings</p>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="w-3 h-3 rounded-full bg-green-100">
                  <Image src="/icons/chart.svg" width={20} height={20} alt="surveys icon" className='w-3 h-3' />
                </div>
                <span className="text-xs text-gray-600  font-medium">Surveys</span>
              </div>
              <span className="text-xs font-medium text-center mt-2">{earningsData.surveys}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="w-3 h-3 rounded-full">
                  <Image src="/icons/calendar-circle.svg" width={20} height={20} alt="microtasks icon" className='w-3 h-3' />
                </div>
                <span className="text-xs text-gray-600 font-medium">Microtasks</span>
              </div>
              <span className="text-xs font-medium text-center mt-2">{earningsData.microtasks}</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="w-3 h-3 rounded-full">
                  <Image src="/icons/user-tick.svg" width={20} height={20} alt="referrals icon" className='w-3 h-3' />
                </div>
                <span className="text-xs text-gray-600  font-medium">Referrals</span>
              </div>
              <span className="text-xs font-medium text-center mt-2">{earningsData.referrals}</span>
            </div>
          </div>

          {/* For mobile, add a visible button as well */}
          <button className="md:hidden w-full bg-purple-900 text-white rounded-md text-xs px-3 py-2 mt-2"
            onClick={() => setShowTRCEarnings(true)}>
            Transfer to Rent
          </button>
        </div>

        {/* Rent Payment Card */}
        <div className="bg-purple-50 p-4 rounded-lg border border-gray-200 items-center flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-black text-sm">Rent Payment</h3>
          </div>
          
          <h2 className="text-xl font-bold mb-4 mt-4">{rentPayment}</h2>
          <p className="text-sm text-gray-400 font-medium italic mb-4">Due in 15 days</p>
          
          <button className="bg-purple-900 text-xs md:text-sm text-white w-full py-3 px-2 rounded-md mt-auto flex items-center justify-center gap-2">
            Pay to Escrow
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-lg md:text-xl font-medium">Transaction History</h3>
          <Link href="#" className="text-primary text-sm font-medium md:hidden">
            View all
          </Link>
        </div>
        
        {/* Search and filter controls - hidden on mobile, visible on md+ screens */}
        <div className="hidden md:flex justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className='relative'>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-60"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div>
              <button className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-600">
                Filter by
                <FiChevronRight className="text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-complementary text-white rounded-md px-4 py-2 font-bold text-sm">
              Download Statement
            </button>
          </div>
        </div>
        
        {/* Transaction Table - Desktop view */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-black text-base bg-purple-50">
                <th className="text-left font-medium px-4 py-4 rounded-tl-lg">Title</th>
                <th className="text-left font-medium px-4 py-4">Amount</th>
                <th className="text-left font-medium px-4 py-4">Date</th>
                <th className="text-left font-medium px-4 py-4">Status</th>
                <th className="text-left font-medium px-4 py-4 rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map(transaction => (
                <tr key={transaction.id} className="bg-white border-b border-gray-200">
                  <td className="px-4 py-4 text-sm text-gray-00">{transaction.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{transaction.amount}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{transaction.date}</td>
                  <td className="px-4 py-4">
                    <span 
                      className={`text-sm px-4 py-2 rounded-lg ${
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        transaction.status === 'success' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}
                    >
                      {transaction.status === 'pending' ? 'Pending' :
                       transaction.status === 'success' ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="border border-primary hover:bg-primary hover:text-white text-primary px-4 py-2 rounded-md text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Transaction List */}
        <div className="md:hidden">
          {transactions.slice(0, 3).map(transaction => (
            <div key={transaction.id} className="mb-3 border-b border-gray-100 pb-3">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium text-sm text-gray-600">{transaction.title}</div>
                <div className="text-sm font-bold">{transaction.amount}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">{transaction.date}</div>
                <div>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                      transaction.status === 'success' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.status === 'pending' ? 'Pending' :
                     transaction.status === 'success' ? 'Success' : 'Failed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WalletPage