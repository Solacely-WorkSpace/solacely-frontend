"use client"

import { useState, useEffect, useRef } from 'react'
import Tooltip from '../../components/Tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { FiChevronRight } from 'react-icons/fi'
import { IoArrowBack } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import SaveForRent from './Sections/SaveForRent'
import TRCEarnings from './Sections/TRCEarnings'
import RentPayment from './Sections/RentPayment'
import EscrowPopup from './Sections/EscrowPopup'
import TransactionDetailsPopup from './Sections/TransactionDetailsPopup'
import walletService from '../../lib/api/services/walletService'

function WalletPage() {
  // API data state
  const [dashboardStats, setDashboardStats] = useState({
    total_wallet_balance: 0,
    total_rent_savings: 0,
    total_trc_circulating: 0,
    total_escrow_balance: 0,
    total_trc_redeemed: 0,
    auto_save_enabled_count: 0
  })
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState([])
  const [transactionsLoading, setTransactionsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const filterDropdownRef = useRef(null)

  // Fetch dashboard stats
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const statsData = await walletService.getDashboardStats()
        console.log('Wallet Dashboard Stats Response:', statsData)
        setDashboardStats(statsData)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardStats()
  }, [])

  // Fetch transactions with filters
  const fetchTransactions = async () => {
    setTransactionsLoading(true)
    try {
      const params = {}
      if (searchQuery) params.search = searchQuery
      if (statusFilter) params.status = statusFilter
      if (typeFilter) params.type = typeFilter
      
      const transactionsData = await walletService.getTransactions(params)
      console.log('Wallet Transactions Response:', transactionsData)
      setTransactions(transactionsData)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setTransactionsLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [searchQuery, statusFilter, typeFilter])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setShowFilterDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Format currency
  const formatCurrency = (amount) => `₦${amount?.toLocaleString() || '0'}`
  
  // Calculate savings percentage (assuming a rent goal of 500,000)
  const rentSavingsGoal = 500000
  const savingsPercentage = dashboardStats.total_rent_savings > 0 
    ? Math.min((dashboardStats.total_rent_savings / rentSavingsGoal) * 100, 100) 
    : 0
  


  // State for the savings view mode
  const [savingsView, setSavingsView] = useState('weekly')
  
  // State for auto-save toggle (based on API data)
  const [autoSave, setAutoSave] = useState(dashboardStats.auto_save_enabled_count > 0)

  // Sample earnings data
  const earningsData = {
    surveys: '₦ 0',
    microtasks: '₦ 0',
    referrals: '₦ 0'
  }

  const router = useRouter()

  // State to control the visibility of the SaveForRent section
  const [showSaveForRent, setShowSaveForRent] = useState(false)
  const [showTRCEarnings, setShowTRCEarnings] = useState(false)
  const [showRentPayment, setShowRentPayment] = useState(false)
  const [showEscrowPopup, setShowEscrowPopup] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showTransactionDetails, setShowTransactionDetails] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  // Tooltip state
  const [tooltipStep, setTooltipStep] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  // Reminder: change state of tooltip to true after full implementation

  const handleEscrowPayment = () => {
    // Add your escrow payment logic here
    console.log('Processing escrow payment...')
  }

  const handleViewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction)
    setShowTransactionDetails(true)
  }

  if (showSaveForRent) {
    return <SaveForRent onBack={() => setShowSaveForRent(false)} />;
  }
  if (showTRCEarnings) {
    return <TRCEarnings onBack={() => setShowTRCEarnings(false)} />;
  }
  if (showRentPayment) {
    return <RentPayment onBack={() => setShowRentPayment(false)} />;
  }

  return (
    <div className="min-h-screen w-full md:p-6 relative">
      {/* Gray overlay when tooltip is visible */}
      {showTooltip && (
        <div className="fixed inset-0 bg-[#0A0A2499] hidden md:block bg-opacity-90 z-40"></div>
      )}
      {/* Escrow Popup */}
      <EscrowPopup 
        isOpen={showEscrowPopup}
        onClose={() => setShowEscrowPopup(false)}
        onAllow={handleEscrowPayment}
      />

      {/* Transaction Details Popup */}
      <TransactionDetailsPopup 
        isOpen={showTransactionDetails}
        onClose={() => setShowTransactionDetails(false)}
        transaction={selectedTransaction}
      />

      {/* Header with back button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 relative">
        <div>
          <h1 className="md:hidden text-2xl md:text-3xl font-bold text-gray-800">Wallet</h1>
        </div>
        <div className="flex gap-2 md:gap-3 w-full md:w-auto relative">
          {/* Tooltip for Save for Rent button (Step 1) */}
          <div className="relative flex-1 md:flex-none md:w-[200px]">
            <div className="hidden md:block">
              <Tooltip
                visible={showTooltip && tooltipStep === 1}
                title="Save for Rent"
                description="Add funds to your rent savings goal manually or automatically."
                step={1}
                totalSteps={3}
                onNext={() => setTooltipStep(2)}
                onSkip={() => setShowTooltip(false)}
              />
            </div>
            <button
              className="bg-complementary text-white py-2.5 px-3 md:px-4 rounded-lg border border-gray-200 hover:bg-complementary-dark text-sm md:text-base w-full"
              onClick={() => setShowSaveForRent(true)}
            >
              Save for Rent
            </button>
          </div>
          {/* Tooltip for Pay Rent button (Step 2) */}
          <div className="relative flex-1 md:flex-none md:w-[200px]">
            <div className="hidden md:block">
              <Tooltip
                visible={showTooltip && tooltipStep === 2}
                title="Pay Rent"
                description="Use your savings, TRC, or wallet balance to pay your rent securely."
                step={2}
                totalSteps={3}
                onNext={() => setTooltipStep(3)}
                onSkip={() => setShowTooltip(false)}
              />
            </div>
            <button className="bg-purple-50 text-black font-semibold border border-gray-200 py-2.5 px-3 md:px-4 rounded-lg text-sm md:text-base w-full"
              onClick={() => setShowRentPayment(true)}>
              Pay Rent
            </button>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Wallet Balance Card */}
        <div className="bg-white p-3 md:p-4 rounded-lg border border-gray-200 relative">
          {/* Tooltip for Wallet Balance (Step 3) */}
          <div className="hidden md:block">
            <div className="absolute top-1/2 right-[-340px] z-50 transform -translate-y-1/2">
              <Tooltip
                visible={showTooltip && tooltipStep === 3}
                title="Wallet Balance"
                description="This is your total balance across TRC, rent savings, and wallet funds."
                step={3}
                totalSteps={3}
                onNext={() => setShowTooltip(false)}
                onSkip={() => setShowTooltip(false)}
              />
            </div>
          </div>
          <h3 className="text-black text-sm mb-2">Wallet Balance</h3>
          <h2 className="text-lg font-bold mb-2">
            {loading ? '₦0' : formatCurrency(dashboardStats.total_wallet_balance)}
          </h2>
          <div className="mt-4">
            <p className="text-sm text-gray-400 font-semibold">Rent Progress</p>
            <div className="bg-emerald-100 h-3 rounded-full mt-1">
              <div 
                className="mt-4 bg-complementary h-full rounded-full"
                style={{ width: `${savingsPercentage}%` }}
              ></div>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              {loading ? '₦0' : formatCurrency(dashboardStats.total_rent_savings)} of {formatCurrency(rentSavingsGoal)} saved
            </p>
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
                className="relative w-6 h-4 bg-gray-200 rounded-full transition-colors duration-300 ease-in-out"
                style={{ backgroundColor: (autoSave || dashboardStats.auto_save_enabled_count > 0) ? '#6b21a8' : '#e5e7eb' }}
              >
                <div 
                  className="absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full shadow transition-transform duration-300 ease-in-out"
                  style={{ transform: (autoSave || dashboardStats.auto_save_enabled_count > 0) ? 'translateX(8px)' : 'translateX(0)' }}
                ></div>
              </div>
              <span className="text-xs">Auto-Save</span>
            </div>
            <button className="flex justify-start md:justify-center items-center  gap-2 rounded-md px-3 py-2 text-xs flex-1 text-primary font-semibold">
              <div className="bg-primary text-white rounded-md w-3 h-3 flex text-sm items-center justify-center">+</div>
              Add Funds
            </button>
          </div>
        </div>

        {/* TRC Earnings Card */}
        <div className="bg-white p-3 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-black text-xs md:text-sm">TRC Earnings</h3>
            <button className="hidden md:block bg-purple-900 text-white rounded-md text-xs px-2 py-2"
              onClick={() => setShowTRCEarnings(true)}>
              Transfer to Rent
            </button>
          </div>
          
          <h2 className="text-lg font-bold mb-4">
            {loading ? '₦0' : formatCurrency(dashboardStats.total_trc_circulating)}
          </h2>
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
          
          <h2 className="text-xl font-bold mb-4 mt-4">
            {loading ? '₦0' : formatCurrency(dashboardStats.total_escrow_balance)}
          </h2>
          <p className="text-sm text-gray-400 font-medium italic mb-4">Due in 15 days</p>
          
          <button 
            onClick={() => setShowEscrowPopup(true)}
            className="bg-purple-900 text-xs md:text-sm text-white w-full py-3 px-2 rounded-md mt-auto flex items-center justify-center gap-2"
          >
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
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-60"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            <div className="relative" ref={filterDropdownRef}>
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="border border-gray-300 rounded-md px-4 py-2 flex items-center gap-2 text-gray-600"
              >
                Filter by
                <FiChevronRight className={`text-gray-400 transition-transform ${showFilterDropdown ? 'rotate-90' : ''}`} />
              </button>
              
              {/* Filter Dropdown */}
              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="p-2">
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full mb-2 p-2 border border-gray-300 rounded text-sm text-black bg-purple-100"
                    >
                      <option value="">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="successful">Successful</option>
                      <option value="failed">Failed</option>
                    </select>
                    <select 
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full mb-2 p-2 border border-gray-300 rounded text-sm text-black bg-purple-100"
                    >
                      <option value="">All Types</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                      <option value="trc_transfer">TRC Transfer</option>
                      <option value="rent_payment">Rent Payment</option>
                    </select>
                  </div>
                </div>
              )}
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
              {transactionsLoading ? (
                <tr><td colSpan="5" className="px-4 py-4 text-center">Loading...</td></tr>
              ) : transactions.length === 0 ? (
                <tr><td colSpan="5" className="px-4 py-4 text-center">No transactions found</td></tr>
              ) : (
                transactions.map(transaction => (
                  <tr key={transaction.id} className="bg-white border-b border-gray-200">
                    <td className="px-4 py-4 text-sm text-gray-700">{transaction.title || transaction.description}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{formatCurrency(transaction.amount)}</td>
                    <td className="px-4 py-4 text-sm text-gray-700">{new Date(transaction.date || transaction.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <span 
                        className={`text-sm px-4 py-2 rounded-lg ${
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                          transaction.status === 'successful' ? 'bg-green-100 text-green-600' :
                          'bg-red-100 text-red-600'
                        }`}
                      >
                        {transaction.status === 'pending' ? 'Pending' :
                         transaction.status === 'successful' ? 'Success' : 'Failed'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button 
                        onClick={() => handleViewTransactionDetails(transaction)}
                        className="border border-primary hover:bg-primary hover:text-white text-primary px-4 py-2 rounded-md text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Transaction List */}
        <div className="md:hidden">
          {transactionsLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-4">No transactions found</div>
          ) : (
            transactions.slice(0, 3).map(transaction => (
              <div 
                key={transaction.id} 
                className="mb-3 border-b border-gray-100 pb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
                onClick={() => handleViewTransactionDetails(transaction)}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium text-sm text-gray-600">{transaction.title || transaction.description}</div>
                  <div className="text-sm font-bold">{formatCurrency(transaction.amount)}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">{new Date(transaction.date || transaction.created_at).toLocaleDateString()}</div>
                  <div>
                    <span 
                      className={`text-xs px-2 py-1 rounded-full ${
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        transaction.status === 'successful' ? 'bg-green-100 text-green-600' :
                        'bg-red-100 text-red-600'
                      }`}
                    >
                      {transaction.status === 'pending' ? 'Pending' :
                       transaction.status === 'successful' ? 'Success' : 'Failed'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default WalletPage