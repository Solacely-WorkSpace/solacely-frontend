"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { tour } from "@/Constant";

export default function TourRealEstate() {
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
    <div className=" flex justify-between items-center flex-col-reverse md:flex-row mt-8 gap-12">
      <article className="flex-[2]">
        <h3 className="mb-3">
          {tour["Real Estate"].header}
        </h3>

        <p className=" mb-6">
          {tour["Real Estate"].desc}
        </p>
        {/* {isLoggedIn ? (
          <Link 
            href="/dashboard" 
          >
            <button className="btn-primary">Dashboard</button>
          </Link>
        ) : ( */}
          <Link
            href="/#"
          >
            <button className="btn-primary">Get Started</button>
          </Link>
        {/* )} */}
      </article>

      <figure className="flex-[3] w-full ">
        <Image
          src={tour["Real Estate"].src}
          width={300}
          height={300}
          alt={tour["Real Estate"].label}
          placeholder="blur"
          className=" aspect-[5/3] rounded-2xl"
        />
      </figure>
    </div>
  )
}
