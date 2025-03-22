import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className=" container mx-auto py-12 flex flex-wrap-reverse justify-between items-center">
      <article className=" px-4 md:w-1/2 md:ml-5">
        <h2 className=" text-3xl font-bold ">
          Find Your Perfect Home With AI-Powered Recommendations.
        </h2>
        <p className=" text-sm md:text-lg py-4">
          Live faster, fresher, and freer. Solacely helps you find your home
          with a simple walkthrough within minutes.
        </p>

        <div className=" flex flex-wrap items-center gap-8 py-4">
          <Link href="/sign-up">
            <button className=" w-fit">Get Started</button>
          </Link>

          <article>
            <h5 className=" font-mont text-sm mb-1.5">Our Partners</h5>
            <figure className=" flex gap-2">
              <Image src="/icons/meta.svg" width={20} height={20} alt="meta" />

              <Image
                src="/icons/crypto.svg"
                width={20}
                height={20}
                alt="crypto"
              />

              <Image
                src="/icons/codepen.svg"
                width={20}
                height={20}
                alt="codepen"
              />

              <Image
                src="/icons/mt.svg"
                width={20}
                height={20}
                alt="microsoft"
              />
            </figure>
          </article>
        </div>
      </article>
      <figure className=" mx-auto md:mr-16 py-2.5">
        <div className=" flex justify-between items-center">
          <figure className=" -ml-10">
            <p className=" font-cav font-bold text-md text-txt">
              Smart
              <br />
              Renting
            </p>
            <Image
              src="/icons/top-left.svg"
              width={40}
              height={40}
              alt="arrow"
            />
          </figure>
          <figure className=" -mr-10">
            <p className=" font-cav font-bold text-md text-txt">
              {" "}
              Value
              <br />
              For You
            </p>
            <Image
              src="/icons/top-right.svg"
              width={40}
              height={40}
              alt="arrow"
            />
          </figure>
        </div>
        <figure className=" shadow-md rounded-2xl">
          <Image
            src="/images/hero.png"
            width={350}
            height={350}
            alt="hero-image"
            className=" max-w-fit"
          />
        </figure>
        <div className=" flex justify-between items-center">
          <figure className=" -ml-10">
            <Image
              src="/icons/bottom-left.svg"
              width={40}
              height={40}
              alt="arrow"
            />
            <p className=" text-txt text-md font-cav font-bold">
              {" "}
              Secure Savings{" "}
            </p>
          </figure>
          <figure className=" -mr-14">
            <Image
              src="/icons/bottom-right.svg"
              width={40}
              height={40}
              alt="arrow"
            />
            <p className=" font-cav font-bold text-md text-txt">
              {" "}
              Seamless <br /> Management{" "}
            </p>
          </figure>
        </div>
      </figure>
    </section>
  );
};

export default Hero;
