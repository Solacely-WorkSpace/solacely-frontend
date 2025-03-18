"use client";

import { whatWeOffer } from "@/Constant";
import Image from "next/image";
import useIsMobile from "@/Constant/useIsMobile";
const Offer = () => {
  const isMobile = useIsMobile();
  return (
    <section className=" bg-slate-100 p-2 lg:p-10 my-6 lg:grid lg:grid-cols-3 gap-1.5">
      <figure className=" w-1/2 shrink-0 mt-auto hidden lg:block lg:col-span-2 ">
        <Image
          src="/icons/home 1.svg"
          width={200}
          height={200}
          alt="3d design"
        />
      </figure>
      <h1 className=" lg:hidden text-center text-lg font-sans font-semibold mb-7">
        The Excellent Luxury we Offer to all Potential{" "}
        <b className=" text-green-400">Home Owners </b>
      </h1>
      <div className=" grid grid-cols-2 gap-10 ">
        {whatWeOffer.map((item, index) => {
          return (
            <article
              key={index}
              className={
                index === 3
                  ? " bg-white rounded-md p-3"
                  : " rounded-md p-3 bg-slate-200"
              }
            >
              <figure>
                <Image src={item.icon} width={30} height={30} alt="icon" />
              </figure>
              <div className="">
                <h3 className=" font-semibold my-3.5">{item.header}</h3>
                <p className=" tracking-tighter  md:tracking-tight leading-4 text-xs text-justify">
                  {item.offer}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Offer;
