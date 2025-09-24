"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/api";
import LoginPromptModal from "../Components/LoginPromptModal";

import { useEffect, useState } from "react";
import { HeroIllustration, MetaImage } from '@/assets/images'

const Hero = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      // Check if user is logged in
      const checkLoginStatus = () => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
      };
  
      checkLoginStatus();
      // Add event listener for storage changes
      window.addEventListener('storage', checkLoginStatus);
      
      return () => {
        window.removeEventListener('storage', checkLoginStatus);
      };
    }, []);

    const handleFindApartment = () => {
        if (authService.isAuthenticated()) {
          router.push("/apartment");
        } else {
          setShowModal(true);
        }
      };


  return (  
    <section className="md:mt-30 mt-15 px-4 md:px-0 bg-purple-50">
      <div className="landingpage-container py-10 md:py-15">
      <div className="flex flex-col md:flex-row justify-between md:gap-6 md:mt-4">
        <div className="flex-1 w-full mt-16">
          <div className="  px-2 font-rob">
            <h1 className="text-3xl md:text-5xl font-bold md:leading-14">
              Homes Made Simple.
              <br />
              Renting Made Smarter.
            </h1>

            <p className=" text-sm md:text-lg leading-6 mt-6 max-w-96 ">
              Discover verified rentals with AI-powered recommendations.<br /> Pay Rent in flexible installemnets, enjoy secure trasactions and even earn rewards towards your next rent.
            </p>

            <div className="flex flex-col gap-4 py-4 mt-6">
              <div className="w-full flex justify-between py-1 px-4 rounded-sm ring-1 ring-slate-300 mb-6">
                <input
                  placeholder="Enter a city or style"
                  className=" outline-none w-full"
                />
              
                <Image
                  src="/icons/search.svg"
                  width={20}
                  height={20}
                  alt="search"
                  className="w-8 h-8"
                />
              </div>
              
              <button className="btn-primary w-fit" onClick={handleFindApartment}> Find an Apartment </button>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 block mt-5 relative"> 
          <Image
            src={HeroIllustration}
            alt="hero illustration"
            width={2000}
            height={2000}
            placeholder="blur"
            className="w-full h-auto"
            />
          
          {/* Animated 360 Icon */}
          <div className="absolute top-8 right-8 md:top-12 md:right-12 animate-pulse">
            <div className="animate-spin-slow">
              <img
                src="/icons/360.svg"
                alt="360 view"
                className="w-20 h-20 md:w-28 md:h-28 drop-shadow-lg"
              />
            </div>
          </div>

          {/* Chat Bubble */}
          {/* <div className="absolute top-36 right-8 md:top-78 md:right-12">
            <div className="bg-green-400 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:bg-green-500 transition-colors duration-200">
              <div className="relative">
                <div className="bg-green-400 text-white px-2 py-1 rounded text-sm font-bold border border-white border-3">
                  Hi
                </div>
                <div className="absolute -bottom-1 left-1">
                  <div className="w-2 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-white"></div>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>
      <LoginPromptModal open={showModal} onClose={() => setShowModal(false)} /> 
      </div>
    </section>
  );
};

export default Hero;
