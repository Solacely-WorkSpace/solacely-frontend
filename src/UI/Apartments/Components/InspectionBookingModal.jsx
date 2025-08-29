"use client";
import { useState } from "react";
import Image from "next/image";
import PaymentModal from "./PaymentModal";

const InspectionBookingModal = ({ isOpen, onClose, onProceed, onShowSuccess }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleProceedToPay = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    setShowPaymentModal(false);
    // Proceed with the next step after payment
    if (onProceed) onProceed();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-6 animate-in fade-in zoom-in duration-300">
        <div className="flex items-start mb-6">
          <div className="bg-blue-100 rounded-full p-3 mr-4">
            <div className="text-blue-700 font-bold text-xl border-2 border-blue-800 rounded-full w-8 h-8 flex items-center justify-center">!</div>
          </div>
          
          <div className="flex-1">
            <div className="text-purple-900 font-semibold text-lg mb-4">
              You are allowed to inspect a maximum of three apartments
              for N10,000 and one apartment for N5,000.
            </div>
            
            <div className="text-purple-900 font-medium">
              This payment is non-refundable.
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-10">
          <button 
            onClick={onClose}
            className="px-8 py-4 border border-primary rounded-lg text-primary font-medium hover:bg-gray-50"
          >
            Back
          </button>
          
          <button 
            onClick={handleProceedToPay}
            className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-purple-700"
          >
            Proceed to pay
          </button>
        </div>

        {/* Payment Modal */}
        <PaymentModal 
          isOpen={showPaymentModal} 
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
          onShowSuccess={onShowSuccess}
          amount="N10,000.00"
        />
      </div>
    </div>
  );
};

export default InspectionBookingModal;
