"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Congratulations } from '@/assets/images'

function EscrowPopup({ isOpen, onClose, onAllow }) {
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    let timer
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 3000) // Close after 3 seconds
    }
    return () => clearTimeout(timer)
  }, [showSuccess, onClose])

  // Reset success state when popup is closed
  useEffect(() => {
    if (!isOpen) {
      setShowSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1F296333] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
        {!showSuccess ? (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Send Funds to Escrow Account</h2>
            
            {/* Money Illustration */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Money stacks illustration */}
                <Image src="/icons/UserDashboard/money-stack.svg" width={100} height={100} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => {
                  onAllow();
                  setShowSuccess(true);
                }}
                className="flex-1 px-6 py-3 bg-purple-900 text-white rounded-xl font-medium hover:bg-purple-800 transition-colors"
              >
                Allow
              </button>
            </div>
          </>
        ) : (
          <>
            
            {/* Success Illustration */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                  {/* Hands illustration */}
                  <div className="flex items-center justify-center">
                    <Image src={Congratulations} width={100} height={100} alt="Hands" />
                  </div>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Congratulations!!!</h2>

            <p className="text-gray-500 font-medium">Funds sent successfully</p>
          </>
        )}
      </div>
    </div>
  );
}

export default EscrowPopup;
