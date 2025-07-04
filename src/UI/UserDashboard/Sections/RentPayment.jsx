import React, { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Image from 'next/image';
import { Property } from '@/assets/images';
import dynamic from 'next/dynamic';
const AddPaymentMethod = dynamic(() => import('./AddPaymentMethod'), { ssr: false });
const PaymentPinModal = dynamic(() => import('./PaymentPinModal'), { ssr: false });


export default function RentPayment({ onBack }) {
  const [method, setMethod] = useState('wallet');
  const [showAddCard, setShowAddCard] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const paymentOptions = [
    { key: 'wallet', label: 'Wallet Balance', amount: '₦700,000' },
    { key: 'savings', label: 'Rent Savings', amount: '₦150,000' },
    { key: 'trc', label: 'TRC Earnings', amount: '₦12,500' },
  ];

  return (
    <div className="min-h-screen bg-white md:p-6">
      {/* Go back */}
      <button className="flex items-center text-gray-400 text-sm mb-4 hover:text-gray-600" onClick={onBack}>
        <FiChevronLeft className="w-4 h-4 mr-2" /> Go back
      </button>
      <div className='flex flex-col md:flex-row items-center mb-6'>
        {/* Title & Subtitle */}
        <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-semibold mb-1 text-gray-900">Rent Payment</h2>
            <p className="text-gray-400 text-sm mb-4">Pay directly from your wallet, savings, or TRC earnings</p>
        </div>
        {/* Escrow Info */}
        <div className='justify-end flex'>
            <div className=" bg-emerald-50 border border-emerald-100 rounded-lg flex items-center gap-3 p-3 mb-6 max-w-xl">
                <span className="text-emerald-500 text-xl"><Image src="/icons/UserDashboard/lock.svg" width={20} height={20} alt="info icon" className='md:w-6 w-10 h-5' /></span>
                <span className="text-xs md:text-xs text-emerald-900">Your rent will be paid into escrow. It will only be released once the property is verified as safe and accurate.</span>
            </div>
        </div>
      </div>
      {/* Apartment Card */}
      <div className="bg-purple-50 rounded-2xl flex md:flex-col flex-col md:flex-row md:items-center md:justify-between p-4 md:p-4 mb-8 gap-4">
        <div className="flex md:flex-row flex-col items-center gap-4 w-full md:w-auto md:border-r-3 border-complementary md:pr-10">
          <div className="w-full h-40 md:w-70 md:h-32 rounded-xl overflow-hidden flex-shrink-0 pr-">
            <Image src={Property} width={160} height={112} alt="Apartment" className="object-cover w-full h-full" />
          </div>
          <div className=' text-left justify-start'>
            <div className="text-lg md:text-xl font-semibold text-gray-800">Northwest Studio Apartment</div>
            <div className="text-xs md:text-sm text-gray-500 mt-1">Due Date: <span className="text-gray-700 font-medium">June 10, 2025.</span></div>
            <div className="text-xs md:text-sm text-gray-500">Agent Name: <span className="text-gray-700 font-medium">Mr. John Femi</span></div>
          </div>
        </div>
        <div className="flex items-center md:justify-center justify-start mt-4 md:mt-0">
          <span className="text-primary text-lg md:text-2xl font-semibold">₦500,000<span className="text-base font-normal">/month</span></span>
        </div>
      </div>
      {/* Payment Method Card */}
      <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 md:p-8 mb-8 mx-auto">
        <div className="font-semibold text-lg mb-1">Payment Method</div>
        <div className="text-gray-400 text-sm mb-6">Choose where to pay from</div>
        <div className="flex flex-col gap-4 mb-4 md:w-1/2 text-sm">
          {paymentOptions.map(opt => (
            <label key={opt.key} className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${method === opt.key ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-center gap-3">
                <span className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${method === opt.key ? 'border-emerald-500' : 'border-gray-300'}`}> 
                  {method === opt.key && <span className="w-3 h-3 bg-emerald-500 rounded-full block"></span>}
                </span>
                <span className="font-semibold text-gray-900">{opt.label}</span>
              </div>
              <span className="font-semibold text-gray-900">{opt.amount}</span>
              <input type="radio" name="payment-method" value={opt.key} checked={method === opt.key} onChange={() => setMethod(opt.key)} className="hidden" />
            </label>
          ))}
        </div>
        <button className="flex items-center text-complementary text-xs font-semibold mb-6" type="button" onClick={() => setShowAddCard(true)}>
          <span className="text-lg mr-1 text-white bg-complementary rounded-md w-4 h-4 flex items-center justify-center">+</span> Add bank card?
        </button>
      {showAddCard && (
        <AddPaymentMethod
          isOpen={showAddCard}
          onClose={() => setShowAddCard(false)}
          onSave={() => setShowAddCard(false)}
        />
      )}
        <button
          className="w-fit px-10 bg-complementary hover:bg-emerald-600 text-white font-semibold rounded-lg py-3 mt-2 transition text-base"
          type="button"
          onClick={() => setShowPinModal(true)}
        >
          Proceed
        </button>
      {showPinModal && (
        <PaymentPinModal
          isOpen={showPinModal}
          onClose={() => setShowPinModal(false)}
          onBiometrics={() => {}}
          onForgot={() => {}}
        />
      )}
      </div>
    </div>
  );
}
