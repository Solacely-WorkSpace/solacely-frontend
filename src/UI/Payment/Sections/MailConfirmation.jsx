"use client"
import { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/UI/Components/Nav";
import Image from 'next/image'
import { MailConfirmation } from '@/assets/images'
import emailService from '@/lib/api/services/emailService'

export default function MailConfirmationPage() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sending, setSending] = useState(false);
  const [userName, setUserName] = useState('User');

  const sendEmail = async () => {
    setSending(true);
    setEmailError('');
    
    try {
      const personalInfo = JSON.parse(localStorage.getItem('personalInfo') || '{}');
      const tenancyAgreement = JSON.parse(localStorage.getItem('tenancyAgreement') || '{}');
      const estateAgreement = JSON.parse(localStorage.getItem('estateAgreement') || '{}');
      
      await emailService.sendAgreementDocuments({
        email: userEmail,
        personalInfo,
        tenancyAgreement,
        estateAgreement,
        documentType: 'rental_agreements'
      });
      
      setEmailSent(true);
    } catch (error) {
      setEmailError('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || user.firstName || 'User');
    }
    
    const personalInfo = localStorage.getItem('personalInfo');
    if (personalInfo) {
      const info = JSON.parse(personalInfo);
      setUserEmail(info.email || '');
      
      // Auto-send email when component loads
      if (info.email) {
        sendEmail();
      }
    }
  }, []);

  const handleProceedToPayment = () => {
    localStorage.setItem('mailConfirmation', JSON.stringify({
      confirmed: true,
      emailSent: true,
      confirmedAt: new Date().toISOString()
    }));
    router.push('/paymentreview');
  };

  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
        <div className="aboutpage-container px-4 mt-20 w-full">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-500 text-sm md:mt-10 mt-3 mb-8 pl-2 hover:text-gray-700"
            >
                <FiChevronLeft className="mr-1 w-4 h-4" /> Go Back
            </button>
            <div className="hidden md:block">
                <h1 className="text-3xl font-bold text-black mb-4">
                    Rent Apartment
                </h1>
            </div>
                <p className="hidden md:block text-gray-500 mb-8">
                    Welcome {userName}, complete your registration by filling<br /> in the following details.
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
                        Thank you for registering and signing the <span className="font-semibold text-primary">Tenancy & Estate Agreement Documents</span>
                    </p>
                    
                    {emailError ? (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                        <p className="text-red-700 text-base mb-2">
                          {emailError}
                        </p>
                        <button 
                          onClick={sendEmail}
                          className="text-red-600 text-sm hover:underline"
                        >
                          Try again
                        </button>
                      </div>
                    ) : emailSent ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <p className="text-green-700 text-base mb-2">
                          Email sent successfully to: <span className="font-semibold">{userEmail}</span>
                        </p>
                        <p className="text-green-600 text-sm">
                          This email contains your agreement documents and payment invoice.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-blue-700 text-base">
                          Sending email to: <span className="font-semibold">{userEmail}</span>
                        </p>
                        <div className="flex items-center mt-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                          <span className="text-blue-600 text-sm">Please wait...</span>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-gray-700 mb-4 text-base">
                        Click <button className="font-semibold text-complementary hover:underline" onClick={() => window.open('#', '_blank')}>here</button> to view the documents.
                    </p>
                </div>

                <button 
                  onClick={handleProceedToPayment}
                  disabled={!emailSent || sending}
                  className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending Email...' : emailSent ? 'Proceed to Payment' : 'Preparing Email...'}
                </button>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}