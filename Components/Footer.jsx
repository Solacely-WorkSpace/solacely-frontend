import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-purple-950 px-4">
      <div className="  px-2.5 md:px-10 lg:px-40 py-10 grid lg:grid-cols-2 grid-cols-1 gap-4 font-sans">
        <div className=" flex flex-col text-center items-center lg:items-start lg:text-left ">
          <article className="  flex flex-col gap-2">
            <p className=" text-white text-lg font-rob font-semibold flex items-center gap-1 justify-center lg:mr-auto">
              <Image
                src="/icons/lg-white.svg"
                width={25}
                height={25}
                alt="logo"
              />
              Solacely
            </p>
            <p className=" text-slate-300 text-sm font-mont opacity-85 w-full lg:w-1/2 ">
              Our vision is to have everyone have an affordable place to call
              home. We are passionate about creating an accessible and
              transparent ecosystem that allows home seekers a way to explore
              real estate options, manage their rent payments, and build equity
              in their homes.
            </p>
          </article>
          <article>
            <p className=" text-white my-3 font-semibold "> Coming Soon</p>

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

        <div className=" text-white font-sans flex gap-2 justify-evenly ">
          <article className=" mt-2.5 flex flex-col gap-3.5 text-xs ">
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

          <article className=" text-white font-sans">
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
      </div>
      <div className=" text-center py-4 text-white opacity-50 text-sm">
        <p className=" border-t-[0.1rem]  py-4">
          © 2025 Solacely. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
