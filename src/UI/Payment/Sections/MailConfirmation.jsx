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
            <a href="/estateagreement">
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
                    <span className="font-semibold text-black border-l-4 border-complementary pl-6 py-2">Mail Confirmation</span>
                    <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Payment Review</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                </ul>
            </div>

            {/* Main Form Card */}
            <div className="bg-white md:rounded-xl md:shadow-sm md:p-8 px-3 flex-1 min-w-[320px]">
                <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">Mail Confirmation</span>  
                </div>
                <p className="text-gray-400 text-sm mb-8">Both the tenancy and the estate documents have been successfully agreed upon.</p>
                
                <div className="w-full flex items-center justify-center py-8">           
                    <Image 
                        src={MailConfirmation}
                        alt="Mail Confirmation"
                        className="w-70 h-40"
                    />
                </div>

                <div>

                    <p className="text-gray-700 mb-6 text-base">
                        Thank you for registering and signing the <span className="font-semibold text-primary">Agent Agreement Document</span>
                    </p>
                    <p className="text-gray-700 text-base">
                        An email will be sent to you shortly
                    </p>
                    <p className="text-gray-700 mb-6 text-base">
                        This email contains your agent agreement documents and invoice of payment.
                    </p>
                    <p className="text-gray-700 mb-4 text-base">
                        Click <span className="font-semibold text-complementary">here</span> to view the documents.
                    </p>
                </div>

                
                <a href="/paymentreview">
                    <button type="submit" className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition">Proceed to Payment</button>
                </a>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}