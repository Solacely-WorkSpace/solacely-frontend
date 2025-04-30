"use client";
import Dropdown from "../../../Components/Dropdown";
import Image from "next/image";
import MobileNav from "../../../UI/AboutPage/Sections/MobileNav";
import Link from "next/link";
import { LogoName } from '@/assets/images'
import { LogoIcon } from '@/assets/icons'

const Nav = () => {
  return (
    <nav className=" fixed w-full z-50 bg-white top-0 px-4 py-2">
      <div className="landingpage-container flex justify-between items-center">
        <div className=" flex gap-0 md:gap-1.5 items-end">
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
        </div>

        <div className=" flex gap-0 md:gap-1.5 items-end">
            <div className=" hidden md:block">
                <ul className=" flex items-center gap-3">
                    <Dropdown />
                    <li className=" font-medium text-base ">
                    <Link href="#">
                        Explore Nearby
                    </Link>
                    </li><br />
                    <li className=" font-medium text-base ">
                    <Link href="#">
                        Become a Partner
                    </Link>
                    </li>
                </ul>
            </div>

            <div className="flex items-center gap-3">
            <MobileNav />

            <Link
                href="/sign-up"
                className="btn-primary px-6 hidden md:block"
            >
                Get Started
            </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
