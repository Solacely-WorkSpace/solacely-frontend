"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import { LinkedinSVG } from "@/assets/SVGAssets";
import { Testimonial } from "@/Constants";

const Waiting = () => {
  return (
    <section className="px-4 py-10 rounded-sm mt-10">
      <div className="landingpage-container overflow-visible">
        <figure className="mb-4 w-20 h-20">
          <Image src="/icons/purple.svg" width={60} height={60} alt="heart" />
        </figure>

        <div className="font-rob md:w-1/2 mb-14">
          <h3 className="mb-3">
            10,000<span className=" font-extrabold">+ </span> People are Waiting
          </h3>

          <p className="">
            Helping you in learning about new places and areas by allowing you to
            experience them as if you were there.
          </p>
        </div>

        {/* <div className="w-full"> */}
        <Swiper
          modules={{ Pagination, Navigation }}
          pagination={true}
          spaceBetween={24}
          slidesPerView={3}
          // breakpoints={{
          //   320: {
          //     slidesPerView: 1,
          //     spaceBetween: 10,
          //   },
          //   640: {
          //     slidesPerView: 2,
          //     spaceBetween: 20,
          //   },
          //   768: {
          //     slidesPerView: 3,
          //     spaceBetween: 30,
          //   },
          // }}
          className="py-12 w-fit"
          style={{ overflow: 'visible' }}
        >
          {Testimonial.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                className=" bg-[#F8F7FE] rounded-2xl max-w-[300px] p-6 border border-gray-200 "
              >
                <div className=" flex justify-between items-center mb-6">
                  <figure className=" aspect-square rounded-full overflow-hidden">
                    <Image
                      src={item.pic}
                      height={40}
                      width={40}
                      alt="Picture"
                      className=" inset-shadow"
                    />
                  </figure>

                  <LinkedinSVG />
                </div>

                <p className=" text-sm text-gray-500 mb-6">
                  {item.testimony}
                </p>

                <h4 className="font-mont font-bold text-sm">
                  {" "}
                  {item.username}{" "}
                </h4>

              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* </div> */}
      </div>
    </section>
  );
};

export default Waiting;
