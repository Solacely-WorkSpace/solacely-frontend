import React from "react";
import Image from "next/image";

const Ad = () => {
  return (
    <div className=" bg-[rgba(81,18,130,0.8)] flex flex-wrap justify-around py-36 px-6 text-white font-sans rounded-4xl my-10  relative">
      <Image
        src="/icons/360.svg"
        width={120}
        height={120}
        alt="video icon"
        className=" absolute -bottom-8 -right-8 md:-top-8"
      />
      <article className=" flex flex-col gap-2 mb-10">
        <h3 className=" text-4xl font-rob font-bold w-full">
          Solacely is coming soon all devices
        </h3>
        <p className="text-md md:w-1/2 ">
          A Private Limited is the most . The limited liabilityis, in fact, the
          only company allowed by Companies.
        </p>
      </article>

      <article className=" flex gap-3 flex-wrap justify-center">
        <button className=" adIcon">
          <Image src="/icons/app.svg" width={30} height={30} alt="apple" />
          <p className="adParagraph">
            <sub className=" font-light">Get it on</sub>
            <span>AppleStore</span>
          </p>
        </button>
        <button className=" adIcon">
          <Image
            src="/images/playstore.png"
            width={40}
            height={28}
            alt="playstore"
          />
          <p className=" adParagraph">
            <sub className=" font-light">Get it on</sub>
            <span>PlayStore</span>
          </p>
        </button>
      </article>
    </div>
  );
};

export default Ad;
