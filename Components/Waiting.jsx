"use client";

import Image from "next/image";

// Components
import { Testimonial } from "@/Constant";
// Components End

// Packages
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
// Packages End

const Waiting = () => {
  //states

  return (
    <section className=" py-10 rounded-sm mt-10">
      <figure className="mb-4">
        <Image src="/icons/purple.svg" width={60} height={60} alt="heart" />
      </figure>
      <article className="font-rob md:w-1/2 mb-14">
        <h4 className=" font-extrabold text-3xl">
          10,000<span className=" font-extrabold">+ </span> People are Waiting
        </h4>
        <small className=" text-sm leading-6">
          Helping you in learning about new places and areas by allowing you to
          experience them as if you were there.
        </small>
      </article>
      <Swiper
        modules={{ Pagination, Navigation }}
        pagination={true}
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className=" py-10"
      >
        {Testimonial.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className=" bg-light rounded-2xl max-w-[300px] px-3 py-8 min-h-[300px] ring-1 ring-gray-200 "
            >
              <div>
                <div className=" flex justify-between items-center mb-6">
                  <figure className=" aspect-square rounded-full ring-1 ring-gray-300">
                    <Image
                      src={item.pic}
                      height={40}
                      width={40}
                      alt="Picture"
                      className=" object-cover w-full aspect-square rounded-full"
                    />
                  </figure>
                  <figure>
                    <Image
                      src={item.social}
                      height={25}
                      width={25}
                      alt="social"
                    />
                  </figure>
                </div>

                <p className=" font-rob font-semibold text-sm text-gray-500 mb-6">
                  {item.testimony}
                </p>

                <h4 className=" font-mont font-bold text-sm">
                  {" "}
                  {item.username}{" "}
                </h4>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Waiting;
