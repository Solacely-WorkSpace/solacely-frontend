import Image from "next/image";
import React from "react";
import { Testimonial } from "@/Constant";

const Waiting = () => {
  return (
    <section className=" px-3 py-10 rounded-sm mt-10">
      <figure className=" mb-2.5">
        <Image src="/icons/purple.svg" width={40} height={40} alt="heart" />
      </figure>
      <article className=" leading-11">
        <h4 className=" font-bold text-2xl font-sans">
          10,000<span className=" font-extrabold">+ </span> People are Waiting
        </h4>
        <small>
          Helping you in learning about new places and areas by allowing you to
          experience them as if you were there.
        </small>
      </article>

      <section className=" testimonial-container">
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
      </section>
    </section>
  );
};

export default Waiting;
