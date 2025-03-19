import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className=" relative flex flex-wrap-reverse gap-2.5 py-20 lg:py-32 px-4">
      <article className=" flex flex-col flex-1 gap-4">
        <h2 className=" text-4xl md:text-6xl font-bold font-sans w-screen md:w-lg">
          Find Your Perfect Home With AI-Powered Recommendations.
        </h2>
        <span className=" font-sans w-full md:w-sm text-xs tracking-tight">
          Live faster, fresher, and freer. Solacely helps you find your home
          with a simple walkthrough within minutes.
        </span>

        <button className=" w-fit">Get Started</button>

        <div className="">
          <h5 className=" font-sans text-sm mb-1.5">Our Partners</h5>
          <article className="flex gap-1.5">
            <Image src="/icons/meta.svg" width={30} height={30} alt="meta" />

            <Image
              src="/icons/crypto.svg"
              width={30}
              height={30}
              alt="crypto"
            />

            <Image
              src="/icons/codepen.svg"
              width={30}
              height={30}
              alt="codepen"
            />

            <Image src="/icons/mt.svg" width={30} height={30} alt="microsoft" />
          </article>
        </div>
      </article>

      <Image
        src="/images/hero.png"
        width={400}
        height={400}
        alt="hero-image"
        className=" shrink-0"
      />
    </section>
  );
};

export default Hero;
