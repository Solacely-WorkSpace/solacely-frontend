"use client";
import Dropdown from "./Dropdown";
import Image from "next/image";
import MobileNav from "./MobileNav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoName } from '@/assets/images'
import { LogoIcon } from '@/assets/icons'
import CountryDropdown from "./CountryDropdown";
import Announcement from "./Announcement";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount and when localStorage changes
  useEffect(() => {
    // Initial check
    setIsLoggedIn(typeof window !== "undefined" && !!localStorage.getItem("authToken"));

    // Listen for login/logout events from other tabs/windows
    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("authToken"));
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <nav className=" fixed w-full z-50 bg-white top-0">
      <Announcement />
      <div className="landingpage-container pt-2 flex justify-between items-center px-4 py-2">
        <div className="flex items-center gap-10">
          <Link
            href={'/'}
            className=" flex gap-0 md:gap-1.5 items-end"
          >
            <div className="w-8">
              <Image
                src={LogoIcon}
                alt="LogoName"
                width={200}
                height={200}
                className="w-6 md:w-8"
              />
            </div>

            <div className="">
              <Image
                src={LogoName}
                alt="LogoName"
                width={200}
                height={200}
                className="h-4 md:h-6"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Dropdown />
            <Link href="#" className="text-black hover:text-primary font-medium">
              Become a partner
            </Link>
            <Link href="/about" className="text-black hover:text-primary font-medium">
              About Us
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <MobileNav />
          
          {isLoggedIn ? (
            <div className="hidden md:flex items-center gap-4">
              <CountryDropdown />
              <Link
                href="/dashboard"
                className="btn-primary px-6"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/sign-in" className="text-gray-700 hover:text-white hover:bg-primary px-6 py-2 rounded-lg font-medium">
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="bg-primary hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Sign up
              </Link>
              <CountryDropdown />
            </div>
          )}
        </div>
      </div >
    </nav >
  );
};

export default Nav;