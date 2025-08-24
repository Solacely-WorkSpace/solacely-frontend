"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function InspectionPaymentPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment process
    setTimeout(() => {
      router.push('/payment/success?type=inspection');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6">
        <h1 className="text-2xl font-bold text-primary mb-6">Inspection Payment</h1>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-4">Select Inspection Package</h2>
          
          <div className="space-y-4">
            <div className="border border-purple-200 rounded-lg p-4 flex items-center">
              <input 
                type="radio" 
                name="package" 
                id="singleInspection"
                className="h-5 w-5 text-purple-800"
                defaultChecked
              />
              <label htmlFor="singleInspection" className="ml-3 flex flex-1 justify-between">
                <span className="font-medium">Single Apartment Inspection</span>
                <span className="font-bold">₦5,000</span>
              </label>
            </div>
            
            <div className="border border-purple-200 rounded-lg p-4 flex items-center">
              <input 
                type="radio" 
                name="package" 
                id="multipleInspection"
                className="h-5 w-5 text-purple-800" 
              />
              <label htmlFor="multipleInspection" className="ml-3 flex flex-1 justify-between">
                <span className="font-medium">Multiple Apartment Inspection (up to 3)</span>
                <span className="font-bold">₦10,000</span>
              </label>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-gray-600">
            <p>* Inspection fee is non-refundable</p>
            <p>* Booking confirmation will be sent to your email</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Payment Method</h2>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                name="paymentMethod" 
                id="card"
                className="h-5 w-5 text-purple-800"
                defaultChecked
              />
              <label htmlFor="card" className="ml-3 flex items-center">
                <span className="font-medium mr-2">Card Payment</span>
                <div className="flex space-x-2">
                  <div className="w-10 h-6 bg-gray-100 rounded"></div>
                  <div className="w-10 h-6 bg-gray-100 rounded"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-70"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
