import { LinkedinSVG } from "@/assets/SVGAssets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-purple-950 px-4 pt-20 ">
      <div className="landingpage-container flex flex-col items-center md:items-start lg:flex-row gap-20 justify-between mb-8">
        <div className="flex-[2]  flex flex-col text-center items-center md:items-start md:text-left ">
          <div className="  flex flex-col gap-2">

            <Image
              src="/images/LandingPage/footer/logo white.png"
              width={1000}
              height={1000}
              alt="logo"
              className="w-36"
            />

            <p className="text-white/50">
              Our vision is to have everyone have an affordable place to call
              home. We are passionate about creating an accessible and
              transparent ecosystem that allows home seekers a way to explore
              real estate options, manage their rent payments, and build equity
              in their homes.
            </p>
          </div>

          <article>
            <p className=" text-white my-3 font-semibold pt-8"> Coming Soon</p>

            <div className=" flex gap-4">
              <button className="h-fit py-3 px-6 rounded-md bg-[#212121] border border-white/70">
                <Image
                  src="/images/LandingPage/footer/Group 8.png"
                  width={1000}
                  height={1000}
                  alt="store"
                  className="w-24 "
                />
              </button>

              <button className="h-fit py-3 px-6 rounded-md bg-[#212121] border border-white/70">
                <Image
                  src="/images/LandingPage/footer/Group 9.png"
                  width={1000}
                  height={1000}
                  alt="store"
                  className="w-24 "
                />
              </button>
            </div>
          </article>
        </div>

        <article className="flex-1 text-white font-sans mt-2.5 flex flex-col gap-3.5 text-xs text-center md:text-start ">
          <h3 className=" font-semibold text-sm text-white"> Company </h3>
          <Link href="#" className=" opacity-70">
            About Us
          </Link>
          <Link href="#" className=" opacity-70">
            Our Partner
          </Link>
          <Link href="#" className=" opacity-70">
            Contact Us
          </Link>
          <Link href="#" className=" opacity-70">
            FAQS
          </Link>
          <Link href="#" className=" opacity-70">
            Terms and Privacy
          </Link>
        </article>

        <article className="flex-1 block text-white font-sans text-center md:text-start">
          <h3 className=" font-semibold text-sm text-white mt-2.5 mb-8">Follow Us</h3>
          <div className=" mt-4 flex gap-3">
            <Link href="#">
              <LinkedinSVG />
            </Link>

            <Link href="#">
              <LinkedinSVG />
            </Link>

            <Link href="#">
              <LinkedinSVG />
            </Link>

            <Link href="#">
              <LinkedinSVG />
            </Link>
          </div>
        </article>
      </div>

      <div className="landingpage-container text-center py-4 opacity-50  text-sm">
        <p className=" border-t-[0.1rem] text-white py-4">
          © 2025 Solacely. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
