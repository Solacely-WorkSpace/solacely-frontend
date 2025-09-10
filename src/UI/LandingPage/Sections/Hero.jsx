"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AiPopuop from "../Components/AiPopuop";
import { HeroIllustration, MetaImage } from '@/assets/images'
import { icon360 } from '@/assets/icons'
import PartnersCarousel from '../Components/PartnersCarousel';

const Hero = () => {
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


  return (
    <section className="landingpage-container px-4 md:px-0 mt-20">
      <AiPopuop />

      <div className="flex flex-col md:flex-row justify-between items-start md:gap-10 md:mt-4">
        <div className="flex-1 w-full mt-16 order-2 md:order-1">
          <div className="  px-2 font-rob">
            <h1 className="text-3xl md:text-5xl font-bold md:leading-14">
              Homes aren't found, they're revealed.
              <br />
              AI-Powered Recommendations.
            </h1>

            <p className=" text-sm md:text-lg leading-6 mt-6 max-w-96 ">
              Find verified rentals, pay in smaller, flexible installments, and enjoy secure, transparent transactions. Earn while you rent — and use it to pay towards your next rent. Solacely makes renting smarter and safer.
            </p>

            <div className=" flex justify-between md:flex-col gap-6 py-4 mt-6 items-center md:items-start">
              {isLoggedIn ? (
                <Link 
                  href="/dashboard" 
                  className="btn-primary"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/sign-up"
                  className="btn-primary min-w-[140px] text-center"
                >
                  Get Started
                </Link>
              )}

              <article>
                <h5 className="font-semibold font-rob text-[#9EA0AB] text-sub text-xs mb-1.5 whitespace-nowrap">
                  OUR ESTEEM PARTNERS
                </h5>
                <figure>
                  {/* Automatic scrolling carousel of partner images */}
                  <PartnersCarousel />
                </figure>

              </article>
            </div>
          </div>
        </div>

        <div className="w-full flex-1 block order-1 md:order-2 mt-5 relative"> 
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

        </div>
      </div>
    </section>
  );
};

export default Hero;
