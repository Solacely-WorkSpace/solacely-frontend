"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PaymentRecord from './Sections/PaymentRecord'
import AddPaymentMethod from './Sections/AddPaymentMethod'

// No need for external image imports as we'll use inline SVGs

function WalletPage() {
  const [showPaymentRecords, setShowPaymentRecords] = useState(false)
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  
  // Card form state
  const [cardForm, setCardForm] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvc: '',
    saveCard: true
  })
  
  // Sample payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'mastercard',
      number: '•••• 8464',
      expiration: '04/2021'
    },
    {
      id: 2,
      type: 'visa',
      number: '•••• 8002',
      expiration: '05/2026'
    }
  ])
  
  // Toggle payment records view
  const handleManagePayments = () => {
    setShowPaymentRecords(true)
  }
  
  // If showing payment records, render the PaymentRecord component
  if (showPaymentRecords) {
    return <PaymentRecord onBack={() => setShowPaymentRecords(false)} />
  }
  
  // Handle add new card
  const handleAddCard = (cardData) => {
    // Here you would typically send this data to your backend
    console.log('Adding new card:', cardData)
    
    // Add a new card to the UI (would be replaced with actual API response in real app)
    const newCard = {
      id: paymentMethods.length + 1,
      type: 'mastercard', // In a real app, you'd detect the card type from the number
      number: `•••• ${cardData.number.slice(-4)}`,
      expiration: cardData.expiry
    }
    
    setPaymentMethods([...paymentMethods, newCard])
  }
  
  // Otherwise render the main wallet page
  return (
    <main className="md:p-6">
      <div className="md:hidden mb-8">
        <h1 className="text-xl font-semibold">Wallet</h1>
      </div>
      
      {/* Payment Records Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Payments</h2>
        <p className="text-gray-500 text-sm mb-2">Record each payment and refund you get.</p>
        <div className="border-t border-gray-200 md:w-1/2 w-full pt-4">
          <button 
            onClick={handleManagePayments}
            className="bg-complementary text-white py-3 px-6 rounded-md text-base font-medium"
          >
            Manage payments
          </button>
        </div>
      </div>
      
      {/* Payment Method Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Payment Methods</h2>
        <p className="text-gray-500 text-sm mb-2">
          Get your future property after adding a payment method through our <br className='hidden md:block'/>safe payment system.
        </p>
        
        {/* Display existing payment methods */}
        <div className="mt-4 space-y-4 divide-y divide-gray-200 md:w-1/2 w-full">
          {paymentMethods.map(card => (
            <div key={card.id} className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-md overflow-hidden">
                  {card.type === 'mastercard' && (
                    <div className="h-full w-full flex items-center justify-center border rounded-md border-gray-200">
                      <Image
                        src="/icons/UserDashboard/mastercard.svg"
                        alt="Mastercard"
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                  {card.type === 'visa' && (
                    <div className="h-full w-full flex items-center justify-center border rounded-md border-gray-200">
                      <Image
                        src="/icons/UserDashboard/visa.svg"
                        alt="Visa"
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {card.type === 'mastercard' ? 'MasterCard' : 'Visa'} {card.number}
                  </p>
                  <p className="text-sm text-gray-400">Expiration: {card.expiration}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <Image
                  src="/icons/UserDashboard/Ico.svg"
                  alt="Remove"
                  width={20}
                  height={20}
                />
                <span>Remove</span>
              </button>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 md:w-1/2 w-full pt-4 mt-4">
          <button 
            onClick={() => setShowAddCardModal(true)}
            className="bg-complementary text-white py-3 px-6 rounded-md text-base font-medium"
          >
            Add payment Method
          </button>
        </div>
      </div>
      
      {/* Card Details Modal */}
      {showAddCardModal && (
        <AddPaymentMethod 
          isOpen={showAddCardModal}
          onClose={() => setShowAddCardModal(false)}
          onSave={handleAddCard}
        />
      )}
    </main>
  )
}



export default WalletPage