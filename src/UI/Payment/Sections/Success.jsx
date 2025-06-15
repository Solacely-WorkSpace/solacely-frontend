"use client"
import Navbar from "@/UI/Components/Nav";
import Image from 'next/image'
import { Congratulations } from '@/assets/images'


function SuccessPage() {
  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
          <div className="aboutpage-container px-4 mt-20 w-full">
            {/* Main Content Card */}
            <div className="mt-10 text-center justify-center items-center flex flex-col py-8 px-6 md:px-12 w-full h-fit md:w-96 mx-auto">
              <div>
                <Image
                  src={Congratulations}
                  alt='logo'
                  className='w-50 h-60 mb-8 mx-auto md:mx-0 md:mb-0'
                />  
              </div> 
              <div className=" justify-center items-center mb-6">

                <h1 className="text-3xl font-bold text-black my-4">Congratulations</h1>
                <p className="text-gray-500 mb-6 text-base">You are the latest home owner in town🎉.</p>
                <div className="items-center">
                    <p className="text-gray-500 text-sm mb-2">An email will be sent to you shortly.</p>
                    <p className="text-gray-500 text-sm">This email contains your receipt of payment for your new home and other home details. Click <span className="text-complementary font-semibold text-sm"><a href="#">here</a></span> to view</p>
                </div>
              </div>
              <a href="/user/dashboard">
                <button className="mb-10 bg-primary text-white px-16 py-3 rounded-lg hover:bg-primary/90 transition duration-300 text-base font-semibold">
                  Go to Dashboard
                </button>
              </a>
            </div>
          </div>
        </div>
    </>
  );
}

export default SuccessPage