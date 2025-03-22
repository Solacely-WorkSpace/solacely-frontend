"use client";
import Image from "next/image";
import React from "react";
import { Testimonial } from "@/Constant";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Waiting = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className=" px-4 py-10 rounded-sm mt-10">
      <figure className=" px-8 py-4">
        <Image src="/icons/purple.svg" width={40} height={40} alt="heart" />
      </figure>
      <article className=" leading-10 md:w-1/2 px-8">
        <h4 className=" font-bold text-2xl font-sans">
          10,000<span className=" font-extrabold">+ </span> People are Waiting
        </h4>
        <small className=" leading-2">
          Helping you in learning about new places and areas by allowing you to
          experience them as if you were there.
        </small>
      </article>

      <section className=" px-10 py-4 ml-auto">
        <Slider {...settings}>
          {Testimonial.map((testimony, index) => {
            return (
              <article className="testimonial" key={index}>
                <div className=" flex justify-between p-3">
                  <figure>
                    <Image
                      src={testimony.pic}
                      width={35}
                      height={35}
                      alt="user-pic"
                      className=" rounded-full aspect-square object-cover"
                    />
                  </figure>
                  <figure>
                    <Image
                      src={testimony.social}
                      width={20}
                      height={20}
                      alt="user-pic"
                      className=" mt-3.5"
                    />
                  </figure>
                </div>

                <div className=" text-center">
                  <span className=" text-sm">{testimony.testimony}</span>
                  <address className=" text-left mt-7 font-bold text-sm ml-1.5">
                    {testimony.username}
                  </address>
                </div>
              </article>
            );
          })}
        </Slider>
      </section>
    </section>
  );
};

export default Waiting;
