import React from "react";
import Image from "next/image";
import AnimatedComponents from "@/Animations/AnimatedComponents";
import { slideInRight } from "@/Constant";

const Ad = () => {
  return (
    <AnimatedComponents animationVariants={slideInRight}>
      <div className=" bg-purple-950 text-center flex flex-wrap  justify-evenly py-20 text-white font-sans rounded-lg my-4">
        <article className=" flex flex-col gap-2  items-center mb-10">
          <h3 className=" text-2xl font-bold">
            Solacely is coming soon all devices
          </h3>
          <p className=" text-slate-300 text-xs w-1/2 text-center">
            A Private Limited is the most . The limited liabilityis, in fact,
            the only company allowed by Companies.
          </p>
        </article>

        <article className=" flex gap-1.5 flex-wrap">
          <button className=" adIcon">
            <Image src="/icons/apple.svg" width={30} height={30} alt="apple" />
            <p className="adParagraph">
              <sub>Get it on</sub>
              <span>AppleStore</span>
            </p>
          </button>
          <button className=" adIcon">
            <Image
              src="/icons/play.svg"
              width={30}
              height={30}
              alt="playstore"
            />
            <p className=" adParagraph">
              <sub>Get it on</sub>
              <span>PlayStore</span>
            </p>
          </button>
        </article>
      </div>
    </AnimatedComponents>
  );
};

export default Ad;
