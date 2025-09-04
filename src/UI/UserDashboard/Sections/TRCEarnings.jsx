import React, { useState, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Image from 'next/image';
import walletService from '../../../lib/api/services/walletService';

export default function TRCEarnings({ onBack }) {
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('Rent Savings');
  const [loading, setLoading] = useState(false);
  const [trcBalance, setTrcBalance] = useState(0);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchTrcBalance = async () => {
      try {
        const response = await walletService.getDashboardStats();
        setTrcBalance(response.trc_balance || 0);
      } catch (error) {
        console.error('Failed to fetch TRC balance:', error);
      }
    };
    fetchTrcBalance();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await walletService.trcTransfer(parseFloat(amount));
      setAmount('');
      setMessage({ type: 'success', text: 'Transfer completed successfully!' });
      // Refresh balance after successful transfer
      const response = await walletService.getDashboardStats();
      setTrcBalance(response.trc_balance || 0);
    } catch (error) {
      const errorMessage = error.data?.error || 'Transfer failed. Please try again.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:p-6 min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Go back */}
      <button
        className="flex items-center text-gray-400 text-sm mb-4 hover:text-gray-600"
        onClick={onBack}
      >
        <FiChevronLeft className="w-4 h-4 mr-2" /> Go back
      </button>
      {/* Header */}
      <h2 className="text-xl font-semibold mb-6">TRC Earnings</h2>

      {/* TRC Balance Card */}
      <div className="bg-purple-50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8 relative overflow-hidden w-[310px] md:w-full">
        <div className=" overflow-x-auto">
          <div className="text-gray-800 font-medium text-sm mb-1">TRC Balance</div>
          <div className="text-2xl font-bold mb-4 flex items-center gap-2">
            ₦{trcBalance.toLocaleString()}
          </div>
          <div className="flex gap-6 text-xs text-gray-500 overflow-x-auto md:overflow-x-visible md:scrollbar-none scrollbar-thin scrollbar-thumb-gray-300 px-1" style={{ WebkitOverflowScrolling: 'touch', overflowY: 'hidden', maxWidth: '100vw' }}>
            <div className="flex flex-col items-start min-w-[90px]">
              <div className="flex items-center gap-1">
                <span className="text-emerald-500 bg-emerald-100 p-1 rounded"><Image src="/icons/chart.svg" width={20} height={20} alt="surveys icon" className='w-4 h-4' /></span> <span>Surveys</span>
              </div>
              <span className="font-semibold text-gray-900 ml-6 mt-1">₦ 0</span>
            </div>
            <div className="flex flex-col items-start min-w-[90px]">
              <div className="flex items-center gap-1">
                <span className="text-emerald-500 bg-emerald-100 p-1 rounded"><Image src="/icons/calendar-circle.svg" width={20} height={20} alt="microtasks icon" className='w-4 h-4' /></span> <span>Microtasks</span>
              </div>
              <span className="font-semibold text-gray-900 ml-6 mt-1">₦ 0</span>
            </div>
            <div className="flex flex-col items-start min-w-[90px]">
              <div className="flex items-center gap-1">
                <span className="text-emerald-500 bg-emerald-100 p-1 rounded"><Image src="/icons/user-tick.svg" width={20} height={20} alt="referrals icon" className='w-4 h-4' /></span> <span>Referrals</span>
              </div>
              <span className="font-semibold text-gray-900 ml-6 mt-1">₦ 0</span>
            </div>
            <div className="flex flex-col items-start min-w-[120px]">
              <div className="flex items-center gap-1">
                <span className="text-emerald-500 bg-emerald-100 p-1 rounded"><Image src="/icons/UserDashboard/money.svg" width={20} height={20} alt="lifetime earnings icon" className='w-4 h-4' /></span> <span>Lifetime earnings</span>
              </div>
              <span className="font-semibold text-gray-900 ml-6 mt-1">₦ 0</span>
            </div>
            <div className="flex flex-col items-start min-w-[110px]">
              <div className="flex items-center gap-1">
                <span className="text-emerald-500 bg-emerald-100 p-1 rounded"><Image src="/icons/UserDashboard/walletMoney.svg" width={20} height={20} alt="withdrawable icon" className='w-4 h-4' /></span> <span>Withdrawable</span>
              </div>
              <span className="font-semibold text-gray-900 ml-6 mt-1">₦ 0</span>
            </div>
          </div>
        </div>
        <img src="/icons/UserDashboard/Coins.svg" alt="coins" className="w-34 h-32 absolute right-6 bottom-0 hidden md:block" style={{zIndex:0}} />
      </div> 

      {/* Transfer Earnings Card */}
      <div className="bg-white md:rounded-2xl md:border border-gray-200 md:p-6 mb-8 w-full max-w-full">
        <div className="font-semibold text-lg mb-1">Transfer Earnings</div>
        <div className="text-gray-400 text-sm mb-6">Use your TRC earnings to top up your wallet or rent savings balance</div>
        {message.text && (
          <div className={`p-3 rounded-lg mb-4 text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleTransfer} className="grid md:grid-cols-1 gap-6 items-end w-full max-w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-xs font-semibold text-gray-900">ENTER AMOUNT TO TRANSFER</label>
            <input
              type="text"
              className="border border-gray-200 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm w-full"
              placeholder="Enter amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className='md:grid-cols-2 grid grid-cols-1 gap-4 w-full'>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs font-semibold text-gray-900">CURRENT TRC BALANCE</label>
              <input
                type="text"
                className="border border-gray-200 rounded-lg px-4 py-4 bg-gray-50 text-sm w-full"
                value={`₦${trcBalance.toLocaleString()}`}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2 md:mt-0 mt-4 w-full">
              <label className="text-xs font-semibold text-gray-900">DESTINATION ACCOUNT</label>
              <select
                className="border border-gray-200 rounded-lg px-4 py-4 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-sm appearance-none w-full"
                value={destination}
                onChange={e => setDestination(e.target.value)}
              >
                <option value="Rent Savings">Rent Savings</option>
              </select>
            </div>
          </div>
          <div className="flex mt-4 md:mt-6 w-full">
            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) <= 0}
              className="bg-primary px-8 hover:bg-purple-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition w-full md:w-fit"
            >
              {loading ? 'Transferring...' : 'Transfer Now'}
            </button>
          </div>
        </form>
        <div className="flex items-center text-xs text-gray-400 mt-4 gap-2 w-full">
          <span className="text-lg text-primary rotate-180">ⓘ</span>
          Once transferred, this amount will be reflected in your Rent Savings balance.
        </div>
      </div>

      {/* Insights */}
      <h2 className="text-lg font-semibold mb-4">Insights</h2>
      <div className="grid md:grid-cols-3 gap-4 mt-8 w-full max-w-full">
        <div className="bg-purple-50 rounded-xl p-4 flex flex-col gap-2 w-full">
          <div className="flex items-center gap-3 font-semibold">
            <span className='bg-emerald-50 p-1 rounded'><Image src="/icons/UserDashboard/coin.svg" width={20} height={20} alt="surveys icon" className='w-6 h-6' /></span> 
            <div>
              <div className="text-base text-gray-900">Bonus</div>
              <div className="text-xs text-gray-500">Refer friends and earn bonus TRCs</div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 flex flex-col gap-2 w-full">
          <div className="flex items-center gap-3 font-semibold">
            <span className='bg-emerald-50 p-1 rounded'><Image src="/icons/UserDashboard/increase.svg" width={20} height={20} alt="surveys icon" className='w-6 h-6' /></span> 
            <div>
              <div className="text-base text-gray-900">Increase</div>
              <div className="text-xs text-gray-500">Your average monthly earnings grew by 6%</div>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 flex flex-col gap-2 w-full">
          <div className="flex items-center gap-3 font-semibold">
            <span className='bg-emerald-50 p-1 rounded'><Image src="/icons/UserDashboard/shield-tick.svg" width={20} height={20} alt="surveys icon" className='w-6 h-6' /></span> 
            <div>
              <div className="text-base text-gray-900">Security</div>
              <div className="text-xs text-gray-500">All transactions are protected with end-to-end encryption</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
