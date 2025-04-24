"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  ctaImageOne,
  ctaImageTwo,
  ctaImageThree,
  ctaImageFour,
  ctaImageFive,
  ctaImageSix
} from '@/assets/images'

const Cta = () => {
  let [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (!window) return
    console.log('in')

    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect()
      console.log({ width })
      setContainerWidth(width)
    }
  }, [])

  const containerRef = useRef(null)

  return (
    <section
      className="relative  overflow-hidden "
      style={{ height: containerWidth / 2 }}
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-square border border-[#EAD6F9] rounded-full overflow-visible grid place-content-center "
      >
        <Image
          src={ctaImageTwo}
          width={1000}
          height={1000}
          alt="black"
          placeholder="blur"
          className="absolute aspect-square rounded-full w-32 border-2 border-white shadow-lg "
          style={{ top: `${containerWidth / 100 * 20}px`, left: `${containerWidth / 100 * 2}px` }}
        />

        <Image
          src={ctaImageOne}
          width={1000}
          height={1000}
          alt="black"
          placeholder="blur"
          className="absolute aspect-square rounded-full w-20 border-2 border-white shadow-lg "
          style={{ top: `${containerWidth / 100 * 2}px`, left: `${containerWidth / 100 * 25}px` }}
        />

        <Image
          src={ctaImageThree}
          width={1000}
          height={1000}
          alt="black"
          placeholder="blur"
          className="absolute aspect-square rounded-full w-20 border-2 border-white shadow-lg "
          style={{ top: `${containerWidth / 100 * 2}px`, right: `${containerWidth / 100 * 25}px` }}
        />

        <Image
          src={ctaImageFour}
          width={1000}
          height={1000}
          alt="black"
          placeholder="blur"
          className="absolute aspect-square rounded-full w-28 border-2 border-white shadow-lg "
          style={{ top: `${containerWidth / 100 * 17}px`, right: `${containerWidth / 100 * 5}px` }}
        />

        <div
          className="relative w-full aspect-square border border-[#EAD6F9] rounded-full overflow-visible grid place-content-center "
          style={{ width: `${containerWidth - 320}px` }}
        >
          <Image
            src={ctaImageFive}
            width={1000}
            height={1000}
            alt="black"
            placeholder="blur"
            className="absolute aspect-square rounded-full w-22 border-2 border-white shadow-lg "
            style={{ top: `${containerWidth / 100 * 20}px`, left: `${containerWidth / 100 * 0}px` }}
          />
          <div className="text-center z-30 absolute top-10 left-[50%] -translate-x-[50%]  whitespace-nowrap">
            <p className=" text-2xl md:text-5xl mb-10">
              <b className=" text-green-400"> Solacely </b>is for Everyone.
              <br />
              Easy and Free
            </p>

            <button className="btn-primary">Get Started</button>
          </div>

          <div
            className="relative w-full aspect-square border border-[#EAD6F9] rounded-full overflow-visible grid place-content-center "
            style={{ width: `${containerWidth - 320 * 2}px` }}
          >

            <Image
              src={ctaImageSix}
              width={1000}
              height={1000}
              alt="black"
              placeholder="blur"
              className="absolute aspect-square rounded-full w-20 border-2 border-white shadow-lg "
              style={{ top: `${containerWidth / 100 * 15}px`, right: `${containerWidth / 100 * -2}px` }}
            />

            <div
              className="relative w-full aspect-square border border-[#EAD6F9] rounded-full overflow-visible grid place-content-center "
              style={{ width: `${containerWidth - 320 * 3}px` }}
            >
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Cta;




{/* <section className=" px-3 py-20 md:p-20 my-16 lg:p-36 relative">
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
</section> */}