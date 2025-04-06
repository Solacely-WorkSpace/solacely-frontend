import React from "react";
import Image from "next/image";

const Ad = () => {
  return (
    <section className="w-screen px-4 md:px-8">
      <div className=" landingpage-container bg-[rgba(81,18,130,0.8)] flex gap-16 items-end justify-between py-20 px-24 text-white font-sans rounded-4xl my-10  relative">
        <Image
          src="/icons/360.svg"
          width={120}
          height={120}
          alt="video icon"
          className=" absolute -bottom-8 -right-8 md:-top-8"
        />

        <article className="flex-1 flex flex-col gap-2 ">
          <h3 className=" text-4xl font-rob font-bold w-full">
            Solacely is coming soon all devices
          </h3>
          <p className="text-md  ">
            A Private Limited is the most . The limited liability is, in fact, the
            only company allowed by Companies.
          </p>
        </article>

        <article className="flex-1 flex gap-8 items-center">
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
    </section>
  );
};

export default Ad;
