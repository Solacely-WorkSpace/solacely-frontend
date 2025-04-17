import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-purple-950 px-4 pt-16">
      <div className="landingpage-container flex flex-col items-center md:items-start lg:flex-row gap-20 justify-between mb-8">
        <div className="flex-[2]  flex flex-col text-center items-center md:items-start md:text-left ">
          <article className="  flex flex-col gap-2">
            <p className=" text-white text-2xl font-rob font-semibold flex items-center gap-1 justify-center md:mr-auto pb-4">

              <Image
                src="/icons/lg-white.svg"
                width={25}
                height={25}
                alt="logo"
              />
              Solacely
            </p>

            <p className="md:max-w-[400px] text-slate-300 text-sm font-mont opacity-85  ">
              Our vision is to have everyone have an affordable place to call
              home. We are passionate about creating an accessible and
              transparent ecosystem that allows home seekers a way to explore
              real estate options, manage their rent payments, and build equity
              in their homes.
            </p>
          </article>

          <article>
            <p className=" text-white my-3 font-semibold pt-8"> Coming Soon</p>

            <div className=" flex gap-4">
              <button className=" download">
                <Image
                  src="/icons/app.svg"
                  width={20}
                  height={20}
                  alt="store"
                />

                <p className=" flex flex-col mt-2 gap-1.5">
                  <sub className=" font-mont font-light text-[7px] ">
                    IOS APP ON
                  </sub>

                  <span> App Store </span>
                </p>
              </button>

              <button className="download">
                <Image src="/icons/pl.svg" width={20} height={20} alt="store" />
                <p className=" flex flex-col gap-1.5 mt-2 ">
                  <sub className=" font-mont font-light text-[9px] tracking-tighter">
                    {" "}
                    ANDROID APP ON
                  </sub>
                  <span> Play Store </span>
                </p>
              </button>
            </div>
          </article>
        </div>

        <article className="flex-1 text-white font-sans mt-2.5 flex flex-col gap-3.5 text-xs text-center md:text-start ">
          <h3 className=" font-semibold text-sm"> Company </h3>
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
          <h3 className=" font-semibold text-sm mt-2.5 mb-8">Follow Us</h3>
          <div className=" mt-4 flex gap-3">
            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/gram.svg"
                  width={15}
                  height={15}
                  alt="insta"
                />
              </figure>
            </Link>

            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/in.svg"
                  width={15}
                  height={15}
                  alt="linkedin"
                />
              </figure>
            </Link>
            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/facebook.svg"
                  width={15}
                  height={15}
                  alt="facebook"
                  className=" aspect-square"
                />
              </figure>
            </Link>
            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/xt.svg"
                  width={15}
                  height={15}
                  alt="twitter"
                />
              </figure>
            </Link>
          </div>
        </article>
      </div>

      <div className="landingpage-container text-center py-4 text-white opacity-50 text-sm">
        <p className=" border-t-[0.1rem]  py-4">
          © 2025 Solacely. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
