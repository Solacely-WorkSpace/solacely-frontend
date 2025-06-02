"use client"
import { FiChevronLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/UI/Components/Nav";
import Image from 'next/image'
import { MailConfirmation } from '@/assets/images'



 export default function EstateAgreementPage() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
        <div className="aboutpage-container px-4 mt-20 w-full">
            <a href="/mailconfirmation">
                <button className="flex items-center text-gray-500 text-sm md:mt-10 mt-3 mb-8 pl-2">
                    <FiChevronLeft className="mr-1 w-4 h-4" /> Go Back
                </button>
            </a>
            <div className="hidden md:block">
                <h1 className="text-3xl font-bold text-black mb-4">
                    Rent Apartment
                </h1>
            </div>
                <p className="hidden md:block text-gray-500 mb-8">
                    Welcome Ben, complete your registration by filling<br /> in the following details.
                </p>
            <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm py-8 pr-8 w-full h-fit md:w-80 mb-6 md:mb-0">
              <ul className="py-4 space-y-6">
                  <li className="flex items-center justify-between" >
                  <a href="/personalinformation">
                    <span className="font-semibold text-black pl-6">Personal Information</span>
                  </a>
                  <FaCheckCircle className="text-complementary text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                    <a href="/tenancyagreement">
                      <span className="font-semibold text-black pl-6">Tenancy Agreement</span>
                    </a>
                    <FaCheckCircle className="text-complementary text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                    <a href="/estateagreement">
                      <span className="font-semibold text-black pl-6">Estate Agreement</span>
                    </a>
                    <FaCheckCircle className="text-complementary text-lg" />
                  </li>
                  <li className="flex items-center justify-between">
                    <a href="/mailconfirmation">
                        <span className="font-semibold text-black pl-6">Mail Confirmation</span>
                    </a>
                    <FaCheckCircle className="text-complementary text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="font-semibold text-black border-l-4 border-complementary pl-6 py-2">Payment Review</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                </ul>
            </div>

            {/* Main Form Card */}
            <div className="bg-white md:rounded-xl md:shadow-sm md:p-8 px-3 flex-1 min-w-[320px]">
                <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">Payment Review</span>  
                </div>
                <p className="text-gray-400 text-sm mb-4">You are about to make a payment, please double-check the information to avoid making a mistake.</p>
                
                <div className="w-full py-6">           
                    <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 text-primary">Order Summary</h3>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Light fee:</label>
                        <p className="text-gray-600 text-sm font-medium">₦50,000.00<span className="text-emerald-600">/year</span></p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Security fee:</label>
                        <p className="text-gray-600 text-sm font-medium">₦50,000.00<span className="text-emerald-600">/year</span></p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Estate Due:</label>
                        <p className="text-gray-600 text-sm font-medium">₦50,000.00<span className="text-emerald-600">/year</span></p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Bin Contribution:</label>
                        <p className="text-gray-600 text-sm font-medium">₦50,000.00<span className="text-emerald-600">/year</span></p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">House Rent:</label>
                        <p className="text-gray-600 text-sm font-medium">₦1,500,000.00<span className="text-emerald-600">/year</span></p>
                    </div>

                    <div className="flex flex-row gap-4 mb-2 border-t border-b border-gray-200 pt-4">
                        <label className="font-semibold text-base text-gray-600">Total Amount:</label>
                        <p className="text-complementary text-base font-bold">₦2,500,000.00</p>
                    </div>
                </div>

                <div className="w-full py-4">           
                    <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 text-primary">Billing Details</h3>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Name:</label>
                        <p className="text-gray-600 text-sm font-medium">Simon Heather</p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Gender:</label>
                        <p className="text-gray-600 text-sm font-medium">Male</p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Phone Number:</label>
                        <p className="text-gray-600 text-sm font-medium">0803316822</p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Address:</label>
                        <p className="text-gray-600 text-sm font-medium">234 Harvey Road</p>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <label className="font-semibold text-sm">Location:</label>
                        <p className="text-gray-600 text-sm font-medium">Lagos, Nigeria</p>
                    </div>
                </div>

                <div className="w-full py-4">           
                    <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 text-primary">Payment Method</h3>
                    <div className="flex flex-row gap-4 mb-2">
                        <input type="radio" name="paymentMethod" value="card" className="mr-2" />
                        <label className="font-semibold text-sm">Rave by Flutterwave (MPESA/Mastercard/Verve)</label>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <input type="radio" name="paymentMethod" value="card" className="mr-2" />
                        <label className="font-semibold text-sm">Paystack (MPESA/Mastercard/Verve)</label>
                    </div>
                    <div className="flex flex-row gap-4 mb-2">
                        <input type="radio" name="paymentMethod" value="card" className="mr-2" />
                        <label className="font-semibold text-sm">Interswitch (MPESA/Mastercard/Verve)</label>
                    </div>
                </div>

               

                
                <a href="/success">
                    <button type="submit" className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition">Make Payment</button>
                </a>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}