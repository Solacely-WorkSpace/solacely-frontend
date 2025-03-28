"use client";
import Dropdown from "./Dropdown";
import Image from "next/image";
import useIsMobile from "@/Constant/useIsMobile";
import MobileNav from "./MobileNav";
import Link from "next/link";

import { btn, enterFrame } from "@/Constant";
import AnimateNav from "@/Animations/AnimateNav";
import AnimateBtn from "@/Animations/AnimateBtn";

const Nav = () => {
  const isMobile = useIsMobile();
  return (
    <AnimateNav animation={enterFrame}>
      <nav className=" flex justify-between px-4 md:px-20 py-2">
        <article className=" flex gap-1 justify-center items-center">
          <Image src="./icons/logo.svg" width={25} height={25} alt="logo" />
          <span className=" font-bold font-sans text-lg text-[#420F69]">
            Solacely
          </span>
        </article>

        {isMobile ? (
          <MobileNav />
        ) : (
          <section className=" ml-auto mr-20">
            <ul className=" flex justify-center items-center gap-1.5">
              <Dropdown />
              <li className=" font-medium text-sm ">
                <button className=" bg-transparent text-purple-950 cursor-pointer hover:opacity-85">
                  Become a Partner
                </button>
              </li>
            </ul>
          </section>
        )}
        <AnimateBtn animate={btn} style=" h-11 hidden md:block ml-auto">
          <Link href="/sign-up" className=" hidden md:block">
            Get Started
          </Link>
        </AnimateBtn>
      </nav>
    </AnimateNav>
  );
};

export default Nav;
