"use client";
import Dropdown from "./Dropdown";
import Image from "next/image";
import MobileNav from "./MobileNav";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className=" fixed w-full z-50 bg-white top-0 px-4 py-2">
      <div className="landingpage-container flex justify-between items-center">
        <article className=" flex gap-1.5 items-center">
          <Image src="./icons/logo.svg" width={30} height={30} alt="logo" />
          <span className=" font-extrabold font-sans text-xl text-[#420F69]">
            Solacely
          </span>
        </article>

        <section className=" hidden md:block">
          <ul className=" flex items-center gap-2">
            <Dropdown />
            <li className=" font-medium text-sm ">
              <Link href="#" className="font-bold">
                Become a Partner
              </Link>
            </li>
          </ul>
        </section>

        <div>
          <MobileNav />

          <Link
            href="/sign-up"
            className=" bg-primary py-3 px-6 rounded-sm shadow-md shadow-primary hidden md:block text-white font-bold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
