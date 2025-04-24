"use client";
import { useState } from "react";
import Image from "next/image";
import { tour } from "@/Constants";
import clsx from "clsx";

const Tour = () => {
  const [isActive, setIsActive] = useState(0);

  return (
    <section className="landingpage-container px-4 mt-16 w-full">
      <div className=" text-center mb-10 leading-12">
        <small className="text-lg text-sub font-rob text-[#9EA0AB] ">Our Unique Spaces</small>

        <h2>
          Tour Homes and Surroundings Differently
        </h2>
      </div>

      <section className=" bg-[#F8F7FE] rounded-2xl p-4 md:p-16 overflow-y-visible ">
        <div className="w-full h-fit overflow-y-visible overflow-x-auto">
          <div className="w-fit flex gap-2 md:gap-4 flex-nowrap p-4 overflow-y-visible">
            {tour.map((btn, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setIsActive(index)}
                  className={clsx("py-3 px-6 rounded-xl font-semibold text-sm  cursor-pointer relative ",
                    {
                      "bg-primary text-white": isActive === index
                    }
                  )}
                >
                  {index > 1 ? (
                    <p
                      className={clsx("absolute -top-6 -right-6 bg-complementary text-white text-[10px] p-2 rounded-md z-40",
                        {
                          "block": isActive !== index,
                          "hidden": isActive === index
                        }
                      )}
                    >
                      Coming Soon
                    </p>
                  ) : (
                    ""
                  )}
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className=" flex justify-between items-center flex-col-reverse md:flex-row mt-8 gap-12">
          <article className="flex-[2]">
            <h3 className="mb-6">
              {tour[isActive].header}{" "}
            </h3>
            <p className=" mb-6 font-rob text-sm w-1/2">
              {tour[isActive].desc}
            </p>

            {
              isActive < 2 &&
              < div className=" flex justify-between py-3 px-4 rounded-sm ring-1 ring-slate-300 mb-6">
                <input
                  placeholder={
                    isActive === 0
                      ? `Enter a city or style`
                      : `Enter a city or co-working space`
                  }
                  className=" outline-none w-full"
                />

                <Image
                  src="/icons/search.svg"
                  width={20}
                  height={20}
                  alt="search"
                  className="w-8 h-8"
                />
              </div>
            }


            {
              isActive === 0 &&
              <button className="btn-primary"> Find an Apartment </button>
            }

            {
              isActive === 1 &&
              <button className="btn-primary"> Find a Co-Living Space </button>
            }

            {
              isActive > 1 &&
              <button className="btn-primary"> Get Started </button>
            }
          </article>

          <figure className="flex-[3] w-full ">
            <Image
              src={tour[isActive].src}
              width={300}
              height={300}
              alt={tour[isActive].label}
              placeholder="blur"
              className=" aspect-[5/3] rounded-2xl"
            />
          </figure>
        </div>
      </section >
    </section >
  );
};

export default Tour;
