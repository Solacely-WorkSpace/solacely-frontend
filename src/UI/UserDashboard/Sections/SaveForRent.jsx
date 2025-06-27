import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'lucide-react';

export default function SaveForRent() {
  const [amount, setAmount] = useState('');
  const [goalOption, setGoalOption] = useState('');
  const [autoSave, setAutoSave] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const progress = 30; // Example progress
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center py-8 md:px-2">
    <div className='md:hidden block mb-6'>
        <button
            className="flex items-center text-gray-400 text-sm mb-6 hover:text-gray-600"
          >
            <a href='/wallet'>
              <div className='flex items-center'>
                <FiChevronLeft className="w-4 h-4 mr-2" /> Go back
              </div>
            </a>
          </button>
    </div>
      {/* Illustration and message on top for mobile */}
      <div className="md:hidden block flex flex-col items-center justify-center mb-4">
        <img
          src="/icons/savetime.svg"
          alt="Save for Rent Illustration"
          width={180}
          height={180}
          className="object-fit"
        />
        <p className="text-center text-gray-500 text-base mt-4">Save steadily, pay rent stress-free!</p>
      </div>
      <div className="bg-white md:rounded-2xl md:border md:border-gray-200 w-full flex flex-col md:flex-row md:p-6 md:p-10 gap-8 mt-3">
        {/* Left: Form */}
        <div className="flex-1 min-w-[260px]">
          <button
            className="flex items-center text-gray-400 text-sm mb-6 hover:text-gray-600 hidden md:block"
          >
            <a href='/wallet'>
              <div className='flex items-center'>
                <FiChevronLeft className="w-4 h-4 mr-2" /> Go back
              </div>
            </a>
          </button>
          <h2 className="text-xl font-semibold mb-4">Save for Rent</h2>
          <div className="mb-6">
            <div className="w-full h-2 bg-emerald-100 rounded-full">
              <div
                className="h-2 bg-complementary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-3">{progress}% of your rent goal saved</p>
          </div>

          <form className="space-y-7">
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">ENTER AMOUNT TO SAVE</label>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-200 text-base"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">GOAL OPTIONS</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-base appearance-none"
                value={goalOption}
                onChange={e => setGoalOption(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-pressed={autoSave}
                onClick={() => setAutoSave(v => !v)}
                className={`w-10 h-6 rounded-full border border-gray-200 bg-gray-100 flex items-center transition-colors duration-200 ${autoSave ? 'bg-primary border-purple-600' : ''}`}
              >
                <span
                  className={`block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ${autoSave ? 'translate-x-4' : 'translate-x-0'}`}
                />
              </button>
              <span className="text-xs text-gray-900 font-semibold">Auto-Save</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-900 mb-2">PAYMENT METHOD</label>
              <select
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 text-base appearance-none"
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="card">Card</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-fit bg-primary px-8 hover:bg-purple-800 text-white font-semibold rounded-lg py-3 mt-2 transition"
            >
              Save Now
            </button>
          </form>
        </div>
        {/* Right: Illustration (hidden on mobile) */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center">
          <div className="w-full flex justify-center mb-4">
            <img
              src="/icons/savetime.svg"
              alt="Save for Rent Illustration"
              width={180}
              height={180}
              className="object-fit"
            />
          </div>
          <p className="text-center text-gray-500 text-base">Save steadily, pay rent stress-free!</p>
        </div>
      </div>
    </div>
  );
}
