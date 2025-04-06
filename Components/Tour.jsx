"use client";
import React, { useState } from "react";
import Image from "next/image";
import { tour } from "@/Constant";

const Tour = () => {
  const [isActive, setIsActive] = useState(1);

  return (
    <section className="landingpage-container px-4 mt-16 w-full">
      <article className=" text-center mb-10 leading-20">
        <h5 className=" text-lg text-sub font-rob ">Our Unique Spaces</h5>

        <h1 className=" w-full font-extrabold font-mont text-4xl tracking-wide">
          Tour Homes and Surroundings Differently
        </h1>
      </article>

      <section className=" bg-light rounded-2xl px-4 md:px-8 py-4">
        <div className=" flex gap-4 flex-nowrap p-4 overflow-hidden">
          {tour.map((btn, index) => {
            return (
              <button
                key={index}
                onClick={() => setIsActive(index)}
                className={
                  isActive === index
                    ? " bg-primary scale-105 transition-all duration-300 min-w-[170px]"
                    : " bg-light shadow-none text-slate-500 transition-all duration-300 min-w-[170px] hover:border border-primary cursor-pointer"
                }
              >
                {index > 1 ? (
                  <Image
                    src="/icons/soon.svg"
                    height={30}
                    width={30}
                    alt="coming soon"
                    className={isActive ? " hidden" : " block ml-auto -mt-3"}
                  />
                ) : (
                  ""
                )}
                {btn.label}
              </button>
            );
          })}
        </div>

        <div className=" flex justify-between items-center flex-col-reverse md:flex-row mt-8 gap-4">
          <article className="flex-[2]">
            <h1 className=" text-4xl font-bold mb-6">
              {tour[isActive].header}{" "}
            </h1>
            <p className=" mb-6 font-rob text-sm w-1/2">
              {tour[isActive].desc}
            </p>

            {isActive === 0 ? (
              <div className=" flex justify-between p-3 rounded-sm ring-1 ring-slate-300 mb-6">
                <input
                  placeholder={`Enter a city or style`}
                  className=" outline-none w-full"
                />
                <Image
                  src="/icons/search.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </div>
            ) : isActive === 1 ? (
              <div className=" flex justify-between p-3 rounded-sm ring-1 ring-slate-300 mb-6">
                <input
                  placeholder={`Enter a city or co-working space`}
                  className=" outline-none w-full"
                />
                <Image
                  src="/icons/search.svg"
                  width={20}
                  height={20}
                  alt="search"
                />
              </div>
            ) : (
              ""
            )}

            {isActive === 0 ? (
              <button> Find an Apartment </button>
            ) : isActive === 1 ? (
              <button> Find a Co-Living Space </button>
            ) : (
              <button> Get Started </button>
            )}
          </article>

          <figure className="flex-[3] w-full ">
            <Image
              src={tour[isActive].src}
              width={300}
              height={300}
              alt={tour[isActive].label}
              className=" object-cover w-full rounded-2xl"
            />
          </figure>
        </div>
      </section>
    </section>
  );
};

export default Tour;
