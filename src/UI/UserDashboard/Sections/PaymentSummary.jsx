"use client"

import React from 'react'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import Property2 from "@/../public/images/UserDashboard/property2.png"

const PaymentSummary = ({ onBack, paymentDetails }) => {
  // If no payment details are provided, use some default/sample data
  const payment = paymentDetails || {
    id: "2762732928",
    property: "Home in Coral Gables",
    propertyType: "Apartment",
    date: "Jan 29, 2022",
    time: "at 08.00 PM",
    location: "Lagos",
    amount: "₦4,000,000",
    period: "Annual",
    status: "Paid",
    propertyImage: Property2,
    fees: {
      light: "₦50,000.00/year",
      security: "₦50,000.00/year",
      estate: "₦50,000.00/year",
      bin: "₦50,000.00/year",
      rent: "₦1,500,000.00/year"
    },
    userDetails: {
      firstName: "Benita",
      lastName: "James",
      dateOfBirth: "12-12-1996",
      gender: "Female",
      phoneNumber: "+234890755623",
      designation: "Student"
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-opacity-50 transition-opacity"
        onClick={onBack}
      ></div>
      
      {/* Sidebar */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[450px] max-w-2xl bg-white shadow-xl overflow-y-auto transform transition-transform duration-300 ease-in-out">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 flex items-center gap-2">
          <button 
            onClick={onBack} 
            className="bg-gray-100 p-2 rounded-md"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-medium text-gray-800">Payment Summary</h1>
        </div>
        
        {/* Content */}
        <div className="p-6">

      {/* Content Card */}
      <div className="max-w-5xl mx-auto">
        {/* Property Image and Title */}
        <div className="mb-6">
          <div className="relative w-full h-50">
            <Image 
              src={Property2} 
              alt={payment.property}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="py-2">
            <h3 className="font-medium text-lg text-gray-800">{payment.property}</h3>
          </div>
        </div>

          {/* Order Summary Section */}
          <div className="border border-gray-300 p-6 rounded-lg bg-gray-50 flex-1">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-base">Status</span>
              <span className={`px-4 py-2 rounded-lg text-base ${payment.status === 'Paid' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-800'}`}>
                {payment.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base ">Name</span>
              <span className="text-gray-800 py-2 text-base font-bold">3 Bedroom Flat</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Space Type</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.propertyType}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Light Fee</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.fees.light}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Security Fee</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.fees.security}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Estate Due</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.fees.estate}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Bin Contribution</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.fees.bin}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">House Rent:</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.fees.rent}</span>
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="text-gray-800 py-2 font-medium text-base">Total Amount</span>
              <span className="text-complementary font-bold text-xl">{payment.amount}</span>
            </div>
          </div>
          </div>

          {/* My Details Section */}
          <div className="border border-gray-300 bg-gray-50 mt-6 p-6 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-4">My Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">First Name</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.userDetails.firstName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Last Name</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.userDetails.lastName}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Date of Birth</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.userDetails.dateOfBirth}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Gender</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.userDetails.gender}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Phone Number</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.userDetails.phoneNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Work ID/Student ID</span>
              <span className="flex items-center">
                <Image
                  src="/icons/pdf.svg"
                  alt="pdf"
                  width={20}
                  height={20}
                />
                <span className="text-primary px-2 py-1 text-base font-bold rounded">View</span>
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 py-2 text-base">Designation</span>
              <span className="text-gray-800 py-2 text-base font-bold">{payment.userDetails.designation}</span>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSummary
