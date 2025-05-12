import React, { useState } from 'react'
import Image from 'next/image'

const AddPaymentMethod = ({ isOpen, onClose, onSave }) => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [saveCard, setSaveCard] = useState(true)
  
  if (!isOpen) return null
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      number: cardNumber,
      holder: cardHolder,
      expiry: expiryDate,
      cvc: cvc,
      saveCard: saveCard
    })
    onClose()
  }
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }
  
  return (
    <div 
      className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-50 rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-all duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add Card Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Rest of your card form content remains the same */}
        <div className="flex items-center gap-4 mb-6">
          <Image src="/icons/UserDashboard/mastercard.svg" className="w-10 h-6" width={20} height={20} alt="Mastercard" />
          <Image src="/icons/UserDashboard/visa.svg" className="w-18 h-6" width={20} height={20} alt="Visa" />
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Card Number */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">card number</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="9224 1111 2222 3333"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border border-gray-200 rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Card Holder */}
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">card holder</label>
            <input 
              type="text" 
              placeholder="TRAN MAU TRI TAM"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>
          
          {/* Expiry and CVC */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">EXPIRATION DATE</label>
              <input 
                type="text" 
                placeholder="MM / YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full border border-gray-200 rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-1">CVC</label>
              <input 
                type="text" 
                placeholder=""
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full border border-gray-200 rounded-md py-3 px-4 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
          
          {/* Save Card Checkbox */}
          <div className="flex items-center mb-6">
            <button 
              type="button"
              onClick={() => setSaveCard(!saveCard)}
              className={`w-6 h-6 rounded mr-2 flex items-center justify-center ${saveCard ? 'bg-complementary text-white' : 'border border-gray-300'}`}
            >
              {saveCard && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <label className="text-gray-600">Save Card</label>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose} 
              className="flex-1 py-3 px-4 rounded-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-3 px-4 rounded-md bg-complementary text-white hover:bg-opacity-90 transition-colors"
            >
              Add card
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPaymentMethod