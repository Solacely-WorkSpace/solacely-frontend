import Image from "next/image";
import React from "react";
import { Link } from "next/link";

const Cta = () => {
  return (
    <section className=" px-3 py-20 md:p-20 lg:p-36 relative">
      <figure className=" absolute left-0 top-1/3 aspect-square rounded-full p-1">
        <Image
          src="/images/black.jpg"
          width={100}
          height={100}
          alt="black"
          className=" aspect-square rounded-full"
        />
      </figure>
      <figure className=" absolute bottom-0 lg:bottom-6 right-1/5 aspect-square rounded-full p-1">
        <Image
          src="/images/african.jpg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full"
        />
      </figure>
      <figure className=" absolute -top-2 left-1/5 aspect-square rounded-full p-1">
        <Image
          src="/images/curly.jpg"
          width={80}
          height={80}
          alt="black"
          className=" aspect-square rounded-full"
        />
      </figure>
      <figure className=" absolute right-0 bottom-1/4 aspect-square rounded-full p-1">
        <Image
          src="/images/afro.jpg"
          width={100}
          height={100}
          alt="black"
          className=" aspect-square rounded-full"
        />
      </figure>
      <figure className=" absolute right-1/10 top-1 aspect-square rounded-full p-1">
        <Image
          src="/images/curly-female.jpg"
          width={70}
          height={70}
          alt="black"
          className=" aspect-square rounded-full"
        />
      </figure>
      <figure className=" absolute bottom-0 left-1/10 aspect-square rounded-full p-1 z-0">
        <Image
          src="/images/headphone.jpg"
          width={80}
          height={80}
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
