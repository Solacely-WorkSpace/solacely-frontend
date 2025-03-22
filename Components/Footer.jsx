import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" bg-purple-950 px-2.5 md:px-10 lg:px-40 py-10 grid lg:grid-cols-2 grid-cols-1 gap-4 font-sans">
      <div className=" flex flex-col text-center items-center lg:items-start lg:text-left ">
        <article className="  flex flex-col gap-2">
          <p className=" text-white font-semibold flex gap-1 justify-center lg:mr-auto">
            <Image
              src="/icons/lg-white.svg"
              width={20}
              height={20}
              alt="logo"
            />
            Solacely
          </p>
          <p className=" text-slate-300 text-xs  font-light w-full lg:w-1/2 ">
            Our vision is to have everyone have an affordable place to call
            home. We are passionate about creating an accessible and transparent
            ecosystem that allows home seekers a way to explore real estate
            options, manage their rent payments, and build equity in their
            homes.
          </p>
        </article>
        <article>
          <p className=" text-white mt-4 font-semibold "> Coming Soon</p>

          <div className=" flex gap-4">
            <button className=" download">
              <Image
                src="/icons/apple.svg"
                width={30}
                height={30}
                alt="store"
              />
              App Store
            </button>

            <button className="download">
              <Image
                src="/icons/store.svg"
                width={20}
                height={20}
                alt="store"
              />
              Play Store
            </button>
          </div>
        </article>
      </div>

      <div className=" text-white font-sans flex gap-2 justify-evenly mt-1.5 lg:mt-0 items-center">
        <article className=" mt-2.5 flex flex-col gap-3.5 text-xs ">
          <h3 className=" font-semibold text-sm"> Solacely </h3>
          <Link href="#"> About Us </Link>
          <Link href="#"> Our Partner </Link>
          <Link href="#"> Contact Us </Link>
          <Link href="#"> FAQS </Link>
          <Link href="#">Terms and Privacy </Link>
        </article>

        <article className=" text-white font-sans">
          <h3 className=" font-semibold text-sm">Follow Us</h3>
          <div className=" mt-4 flex gap-3">
            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/insta.svg"
                  width={30}
                  height={30}
                  alt="insta"
                />
              </figure>
            </Link>

            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/lnk.svg"
                  width={30}
                  height={30}
                  alt="linkedin"
                />
              </figure>
            </Link>
            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/fb.svg"
                  width={30}
                  height={30}
                  alt="facebook"
                />
              </figure>
            </Link>
            <Link href="#">
              <figure className=" ftIcon">
                <Image
                  src="/icons/x.svg"
                  width={30}
                  height={30}
                  alt="twitter"
                />
              </figure>
            </Link>
          </div>
        </article>
      </div>
    </footer>
  );
};

export default Footer;
