"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import PaymentCard from '@/../public/images/UserDashboard/paymentcard.png'
import { ChevronLeft } from 'lucide-react'
import PaymentSummary from './PaymentSummary'

const PaymentRecord = ({ onBack }) => {
  // Add state to track if there are payment records (for demo purposes)
  const [hasPaymentRecords, setHasPaymentRecords] = useState(true)
  const [viewingPayment, setViewingPayment] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  
  // Sample payment history data
  const paymentRecords = [
    {
      id: "2762732928",
      property: "Home in Coral Gables",
      propertyType: "Apartment Building",
      date: "Jan 29, 2022",
      time: "at 08.00 PM",
      location: "Lagos",
      amount: "₦4,000,000",
      period: "Annual",
      status: "Paid"
    },
    {
      id: "2762732973",
      property: "Home in Coral Gables",
      propertyType: "Apartment Building",
      date: "Jan 29, 2022",
      time: "at 08.00 PM",
      location: "Lagos",
      amount: "₦9,000,000",
      period: "Annual",
      status: "Failed"
    }
  ]
  // Function to handle viewing a specific payment
  const handleViewPayment = (payment) => {
    // Convert the payment record to the format expected by PaymentSummary
    const formattedPayment = {
      ...payment,
      propertyImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
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
    
    setSelectedPayment(formattedPayment)
    setViewingPayment(true)
  }
  
  // Function to handle going back from payment summary
  const handleBackFromSummary = () => {
    setViewingPayment(false)
    setSelectedPayment(null)
  }

  // This component shows the payment history/records
  return (
    <div className="md:p-6 relative">
      {/* Payment Summary Sidebar */}
      {viewingPayment && selectedPayment && (
        <PaymentSummary onBack={handleBackFromSummary} paymentDetails={selectedPayment} />
      )}
      
      {/* Main Content */}
      <div className={viewingPayment ? 'opacity-50 pointer-events-none' : ''}>
        {/* Header with Back Button */}
        <div className="flex items-center gap-2 mb-8">
          <button 
            onClick={onBack} 
            className="bg-gray-100 p-2 rounded-md"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-base font-medium text-gray-800">Payment record</h1>
            <p className="text-sm text-gray-500">View payment history</p>
          </div>
        </div>

        {/* Conditional rendering based on payment history */}
        {!hasPaymentRecords ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 w-40 h-40 flex items-center justify-center">
              <Image 
                src={PaymentCard} 
                alt="No payment history" 
                width={100}
                height={100}    
                className="object-contain"
              />
            </div>
            <h2 className="font-bold text-gray-800 mb-2">No Payment History</h2>
            <p className="text-center text-gray-500 text-lg">
              You do not have any payment history yet
            </p>
          </div>
        ) : (
          /* Payment History Table */
          <div className="relative -mx-4 sm:mx-0">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full py-2 align-middle sm:px-0 px-4">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-purple-50">
                      <tr>
                        <th scope="col" className="px-6 py-6 text-left text-lg font-bold text-black tracking-wider">
                          <div className="flex items-center gap-2">
                            InvoiceID
                            <Image
                              src="/icons/Group.svg"
                              alt="Invoice ID"
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-6 text-left text-lg font-bold text-black tracking-wider">
                          <div className="flex items-center gap-2">
                            Property
                            <Image
                              src="/icons/Group.svg"
                              alt="Property"
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-6 text-left text-lg font-bold text-black tracking-wider">
                          <div className="flex items-center gap-2">
                            Time
                            <Image
                              src="/icons/Group.svg"
                              alt="Time"
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-6 text-left text-lg font-bold text-black tracking-wider">
                          <div className="flex items-center gap-2">
                            Location
                            <Image
                              src="/icons/Group.svg"
                              alt="Location"
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-6 text-left text-lg font-bold text-black tracking-wider">
                          <div className="flex items-center gap-2">
                            Amount
                            <Image
                              src="/icons/Group.svg"
                              alt="Amount"
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-4 py-6 text-left text-lg font-bold text-black tracking-wider">
                          <div className="flex items-center gap-2">
                            Status
                            <Image
                              src="/icons/Group.svg"
                              alt="Status"
                              width={20}
                              height={20}
                              className="w-4 h-4"
                            />
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-6 text-right text-lg font-bold text-black tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {paymentRecords.map(record => (
                        <tr key={record.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                            #{record.id}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-base font-medium text-gray-900">{record.property}</div>
                            <div className="text-sm text-gray-500">{record.propertyType}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-base font-medium text-gray-900">{record.date}</div>
                            <div className="text-sm text-gray-500">{record.time}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-base text-black">
                            {record.location}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-base font-medium text-gray-900">{record.amount}</div>
                            <div className="text-sm text-gray-500">{record.period}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className={`px-4 py-2 inline-flex text-xs leading-5 rounded-lg ${
                              record.status === 'Paid' 
                                ? 'bg-green-50 text-green-700' 
                                : 'bg-red-50 text-red-800'
                            }`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                            <button 
                              onClick={() => handleViewPayment(record)} 
                              className="text-primary hover:text-primary border border-primary rounded-md px-4 py-2"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination */}
                  <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Showing 1 to 2 of 6 results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                        Previous
                      </button>
                      <button className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-500 hover:bg-gray-50">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentRecord