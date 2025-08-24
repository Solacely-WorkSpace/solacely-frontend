"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PaymentModal = ({ isOpen, onClose, amount = "₦10,000.00", onPaymentComplete }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Let parent component know payment is complete
      if (onPaymentComplete) onPaymentComplete();
      // Navigate to success page
      router.push('/apartmentview');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white md:rounded-3xl rounded-xl shadow-xl w-full max-w-md md:max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header for mobile */}
        <div className="p-4 bg-white md:hidden">
          <div className="mb-2 flex items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={onClose}>
              <path d="M15 18l-6-6 6-6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-base font-medium">Choose Payment Method</h2>
        </div>
        {/* Unified flex-row for all breakpoints */}
        <div className="flex flex-row h-full">
          {/* Tabs - always on the left */}
          <div className="w-[120px] md:w-[180px] border-r border-gray-100 flex flex-col bg-transparent py-2 md:py-8">
            <div 
              className={`flex items-center py-3 md:py-4 px-2 md:px-4 cursor-pointer ${
                activeTab === "card" 
                  ? "bg-primary text-white md:rounded-l-xl rounded-l-lg" 
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("card")}
            >
              <div className="mr-1 md:mr-2 text-purple-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 9h16M7 13h2M11 13h2M7 17h10c1.105 0 2-.895 2-2V7c0-1.105-.895-2-2-2H7c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium text-xs md:text-base">Card</span>
            </div>
            <div 
              className={`flex items-center py-3 md:py-4 px-2 md:px-4 cursor-pointer ${
                activeTab === "transfer" 
                  ? "bg-primary text-white md:rounded-l-xl rounded-l-lg" 
                  : "text-gray-700"
              }`}
              onClick={() => setActiveTab("transfer")}
            >
              <div className="mr-1 md:mr-2 text-purple-700">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9h12M8 13h2M14 13h2M9 17h6c1.105 0 2-.895 2-2V7c0-1.105-.895-2-2-2H9c-1.105 0-2 .895-2 2v8c0 1.105.895 2 2 2z" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-medium text-xs md:text-base">Transfer</span>
            </div>
          </div>
          {/* Content - always on the right */}
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {/* Desktop close button */}
            <div className="hidden md:flex justify-end mb-4">
              <div 
                className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200"
                onClick={onClose}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {/* Card Tab Content */}
            {activeTab === "card" && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 text-green-500 md:text-black">Pay with card</h2>
                <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">Enter your card details{typeof window !== 'undefined' && window.innerWidth >= 768 ? ' below' : ''}</p>
                <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="bg-gray-100 rounded-md p-1.5 md:p-2">
                    <Image src="/icons/UserDashboard/visa.svg" width={30} height={15} alt="Visa" className="h-4 md:h-5 w-auto object-contain" />
                  </div>
                  <div className="bg-gray-100 rounded-md p-1.5 md:p-2 flex items-center justify-center">
                    <span className="text-red-500 font-bold text-xs md:text-sm">Verve</span>
                  </div>
                  <div className="bg-gray-100 rounded-md p-1.5 md:p-2">
                    <Image src="/icons/UserDashboard/mastercard.svg" width={30} height={15} alt="MasterCard" className="h-4 md:h-5 w-auto object-contain" />
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="mb-4 md:mb-6">
                  <div className="mb-4 md:mb-5">
                    <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000"
                      className="w-full border border-gray-200 md:border-gray-300 rounded-lg p-3 md:p-3.5 focus:outline-primary text-sm md:text-base"
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setCardNumber(val);
                      }}
                      required
                    />
                  </div>
                  <div className="flex gap-4 md:gap-5 mb-4 md:mb-0">
                    <div className="w-1/2">
                      <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY"
                        className="w-full border border-gray-200 md:border-gray-300 rounded-lg p-3 md:p-3.5 focus:outline-primary text-sm md:text-base"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">CVV</label>
                      <input 
                        type="text" 
                        placeholder="123"
                        className="w-full border border-gray-200 md:border-gray-300 rounded-lg p-3 md:p-3.5 focus:outline-primary text-sm md:text-base"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </form>
                {/* Payment Button */}
                <button 
                  onClick={handleSubmit}
                  className="w-full py-3 md:py-4 bg-primary text-white rounded-lg font-medium text-base hover:bg-purple-700 disabled:opacity-70 mt-2"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay ${amount}`}
                </button>
              </div>
            )}
            {/* Transfer Tab Content */}
            {activeTab === "transfer" && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 text-green-500 md:text-black">Bank Transfer</h2>
                <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6">Make a direct bank transfer</p>
                <div className="bg-gray-100 md:bg-gray-50 p-3 md:p-5 rounded-lg md:rounded-xl mb-4 md:mb-6">
                  <div className="mb-2 md:mb-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-0 md:mb-1">Bank Name</p>
                    <p className="font-medium text-sm md:text-base">First Bank of Nigeria</p>
                  </div>
                  <div className="mb-2 md:mb-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-0 md:mb-1">Account Number</p>
                    <p className="font-medium text-sm md:text-base">1234567890</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-500 mb-0 md:mb-1">Account Name</p>
                    <p className="font-medium text-sm md:text-base">Solacely Properties Ltd</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 md:p-5 rounded-lg md:rounded-xl text-xs md:text-sm text-yellow-800 mb-4 md:mb-6">
                  <p>Please include your booking reference as payment description.</p>
                </div>
                {/* Payment Button */}
                <button 
                  onClick={onClose}
                  className="w-full py-3 md:py-4 bg-primary text-white rounded-lg font-medium text-base hover:bg-purple-700 mt-2"
                >
                  I've Made The Transfer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
