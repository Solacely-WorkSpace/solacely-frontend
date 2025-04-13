import Image from "next/image";
import React from "react";

// Assets
import { MdOutlineKeyboardArrowRight, MdLocationPin } from "react-icons/md";
import banana from "@/public/images/banana.png";
import island from "@/public/images/island.png";
import bn from "@/public/images/bnb.png";
import meterRule from "@/public/icons/ruler-fill.svg";
import bath from "@/public/icons/bath.svg";
import bed from "@/public/icons/bed.svg";

const Listing = () => {
  return (
    <section className="container overflow-clip flex-1 ring-1 ring-slate-400 rounded-md py-4 px-2 md:px-8">
      <div className=" flex flex-col gap-8">
        <div className=" flex justify-between font-rob">
          <h4 className=" font-bold "> Recently listed property </h4>
          <article className=" flex gap-4 ">
            <p className=" font-bold text-sm"> View all </p>
            <MdOutlineKeyboardArrowRight />
          </article>
        </div>

        <div className=" flex flex-col gap-8">
          <article className=" flex flex-wrap gap-12">
            <Image
              src={banana}
              alt="banana island"
              className=" w-full md:w-72 rounded-md"
            />
            <div className=" flex-1 flex flex-col gap-4 font-rob">
              <h5 className=" text-xs text-slate-400 "> Apartment | Lagos </h5>
              <h2 className=" font-bold text-lg">
                {" "}
                Luxury 3 Bedroom Apartment at Epicentrum{" "}
              </h2>
              <div className=" flex gap-8 items-start text-slate-400">
                <div className=" flex gap-2 ">
                  <Image src={bed} alt="bed" />
                  <p className=" text-sm font-semibold"> 3 Bed </p>
                </div>
                <div className=" flex gap-2">
                  <Image src={bath} alt="bath" />
                  <p className=" font-semibold text-sm"> 1 Bath</p>
                </div>
                <div className=" flex gap-2">
                  <Image src={meterRule} alt="meter" />
                  <p className=" font-semibold text-sm"> 8,725sqft </p>
                </div>
              </div>
              <div className=" flex gap-4 ">
                <MdLocationPin className=" text-slate-400" />
                <p className=" text-sm text-slate-400 font-semibold">
                  {" "}
                  1998 Wufma Minnessota, Festac{" "}
                </p>
              </div>
              <h3 className=" text-xl text-tertially font-bold mt-4">
                {" "}
                ₦24,000,000/ Year{" "}
              </h3>
            </div>
          </article>

          <article className=" flex flex-wrap gap-12 ">
            <Image
              src={bn}
              alt="banana island"
              className=" w-full md:w-72 rounded-md"
            />
            <div className=" flex-1 flex flex-col gap-4">
              <h5 className=" text-xs text-slate-400"> Apartment | Lagos </h5>
              <h2 className=" text-lg font-bold">
                {" "}
                Luxury 3 Bedroom Apartment at Epicentrum{" "}
              </h2>
              <div className=" flex items-start gap-8 text-slate-400 font-semibold">
                <div className=" text-sm flex gap-2">
                  <Image src={bed} alt="bed" />
                  <p> 3 Bed </p>
                </div>
                <div className=" flex gap-2 text-sm">
                  <Image src={bath} alt="bath" />
                  <p> 1 Bath</p>
                </div>
                <div className=" flex gap-2 text-sm">
                  <Image src={meterRule} alt="meter" />
                  <p> 8,725sqft </p>
                </div>
              </div>
              <div className=" flex gap-4 text-slate-400 font-semibold items-start">
                <MdLocationPin />
                <p className=" font-rob text-sm">
                  {" "}
                  1998 Wufma Minnessota, Festac{" "}
                </p>
              </div>
              <h3 className=" text-tertially text-xl font-bold mt-4">
                {" "}
                ₦24,000,000/ Year{" "}
              </h3>
            </div>
          </article>

          <article className=" flex flex-wrap gap-12">
            <Image
              src={island}
              alt="banana island"
              className=" w-full md:w-72 rounded-md"
            />
            <div className=" flex flex-col gap-4">
              <h5 className=" text-xs text-slate-400"> Apartment | Lagos </h5>
              <h2 className=" text-lg font-bold ">
                {" "}
                Luxury 3 Bedroom Apartment at Epicentrum{" "}
              </h2>
              <div className=" flex gap-8 text-slate-400 text-sm font-semibold">
                <div className=" flex gap-2">
                  <Image src={bed} alt="bed" />
                  <p> 3 Bed </p>
                </div>
                <div className=" flex gap-2">
                  <Image src={bath} alt="bath" />
                  <p> 1 Bath</p>
                </div>
                <div className=" flex gap-2">
                  <Image src={meterRule} alt="meter" />
                  <p> 8,725sqft </p>
                </div>
              </div>
              <div className=" flex gap-4 text-slate-400 font-semibold">
                <MdLocationPin />
                <p className=" text-sm font-rob">
                  {" "}
                  1998 Wufma Minnessota, Festac{" "}
                </p>
              </div>
              <h3 className=" text-xl text-tertially font-bold mt-4">
                {" "}
                ₦24,000,000/ Year{" "}
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Listing;
