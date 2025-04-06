import Image from "next/image";
import React from "react";
import { Link } from "next/link";
import AnimatedComponents from "@/Animations/AnimatedComponents";
import { slideInLeft } from "@/Constant";

const Cta = () => {
  return (
    <section className=" px-3 py-20 md:p-20 my-16 lg:p-36 relative">
      <figure className=" max-w-[15%] ring-1 ring-slate-300 absolute left-6 top-1/2 aspect-square rounded-full p-1">
        <Image
          src="/icons/black.svg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full object-cover w-full"
        />
      </figure>

      <figure className=" max-w-[15%] absolute bottom-0 lg:bottom-6  right-1/5 aspect-square rounded-full p-1 ring-1 ring-slate-300">
        <Image
          src="/icons/african.svg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full object-cover w-full"
        />
      </figure>

      <figure className=" absolute -top-2 left-1/5 aspect-square rounded-full max-w-[15%] ring-1 ring-slate-200">
        <Image
          src="/icons/curl.svg"
          width={70}
          height={70}
          alt="black"
          className=" object-cover w-full "
        />
      </figure>

      <figure className=" max-w-[15%] ring-1 ring-slate-300 absolute right-6 bottom-1/4 aspect-square rounded-full p-1">
        <Image
          src="/icons/afro.svg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full object-cover w-full"
        />
      </figure>

      <figure className=" absolute right-1/10 top-1 aspect-square rounded-full p-1 ring-1 ring-slate-200 max-w-[15%]">
        <Image
          src="/icons/fcurls.svg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full object-cover w-full"
        />
      </figure>

      <figure className=" max-w-[15%] ring-1 ring-slate-300 absolute bottom-0 left-1/10 aspect-square rounded-full p-1 z-0">
        <Image
          src="/icons/hd.svg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full "
        />
      </figure>

      <div className="text-center z-50">
        <p className=" text-2xl md:text-4xl mb-10">
          <b className=" text-green-400"> Solacely </b>is for Everyone.
          <br />
          Easy and Free
        </p>
        <button>Get Started</button>
      </div>
    </section>
  );
};

export default Cta;
