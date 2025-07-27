"use client";
import Image from "next/image";
import { tour } from "@/Constant";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TourPairWithMe() {
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
          {tour["Pair With Me"].header}
        </h3>

        <p className=" mb-6">
          {tour["Pair With Me"].desc}
        </p>

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
            className="btn-primary"
          >
            Get Started
          </Link>
        )}
      </article>

      <figure className="flex-[3] w-full ">
        <Image
          src={tour["Pair With Me"].src}
          width={300}
          height={300}
          alt={tour["Pair With Me"].label}
          placeholder="blur"
          className=" aspect-[5/3] rounded-2xl"
        />
      </figure>
    </div>
  )
}
