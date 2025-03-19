import React from "react";
import Image from "next/image";

const Tour = () => {
  return (
    <section>
      <article className=" text-center mb-20">
        <h5 className=" text-sm font-light">Our Unique Homes</h5>
        <h1 className=" font-bold text-2xl">
          Tour Homes and Surroundings Differently
        </h1>
      </article>

      <section className=" bg-slate-200 p-10 rounded-2xl">
        <article className=" flex flex-wrap gap-8 items-center justify-centern lg:justify-baseline">
          <span className=" bg-purple-950 p-3 rounded-md text-white text-sm font-semibold">
            Apartment
          </span>
          <span className=" p-3 text-sm text-slate-400 ">Pair With Me</span>
          <span className=" p-3 text-sm text-slate-400 relative">
            <Image
              src="/icons/soon.svg"
              width={35}
              height={35}
              alt="coming soon"
              className=" absolute top-0 right-1.5"
            />
            Co-living Space
          </span>
          <span className="  p-3 text-xs lg:text-sm text-slate-400 relative">
            <Image
              src="/icons/soon.svg"
              width={35}
              height={35}
              alt="coming soon"
              className=" absolute top-0 right-1.5"
            />
            Real Estate
          </span>
        </article>

        <article className=" grid gird-cols-1 lg:grid-cols-2 place-items-center gap-4">
          <div>
            <h3 className=" font-bold text-2xl lg:text-5xl mb-3.5">
              Explore Apartments from anywhere you are through our Lens.
            </h3>
            <span className=" font-medium text-sm">
              Find and interact with an apartment, and its surroundings using
              Solacely on the go.
            </span>
            <input
              id="search"
              type="search"
              placeholder=" Enter City Or Style"
              className=" w-full ring ring-gray-200 p-3 rounded-sm mt-4 outline outline-slate-300"
            />
            <button className=" mt-4">Find an Apartment</button>
          </div>
          <figure className=" ">
            <Image
              src="/images/living1.jpg"
              width={400}
              height={400}
              alt="house"
              className=" w-full rounded-2xl"
            />
          </figure>
        </article>
      </section>
    </section>
  );
};

export default Tour;
