import { whatWeOffer } from "@/Constants";
import Image from "next/image";
import AnimatedComponents from "@/UI/Components/Animations/AnimatedComponents";
import { slideInLeft } from "@/Constants";
import { offerSectionImage } from "@/assets/images";

const Offer = () => {
  return (
    <section className=" bg-[url('/images/LandingPage/offer/Bg.png')] bg-left-top bg-fixed bg-cover w-screen p-2 md:px-8">
      <div className="landingpage-container flex gap-8 flex-col md:flex-row items-center justify-between py-10">
        <figure className="flex-1 flex flex-col justify-end md:pt-40">
          <h2 className=" text-center md:text-left">
            The Excellent Luxury we
            <br />
            Offer to all Potential{" "}
            <br />
            <b className="text-green-400">Home Owners </b>
          </h2>

          <Image
            src={offerSectionImage}
            width={200}
            height={200}
            alt="3d design"
            placeholder="blur"
            className=" hidden md:block w-64 h-64"
          />
        </figure>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          {whatWeOffer.map((item, index) => {
            return (
              <article
                key={index}
                className="h-fit hover:bg-white hover:scale-105 rounded-xl p-3 md:p-6 flex flex-col items-center md:items-start text-center md:text-start"
              >
                <Image
                  src={item.icon}
                  width={35}
                  height={35}
                  alt="icon"
                  className="w-10 "
                />

                <div className="">
                  <h4 className=" font-semibold my-3.5">{item.header}</h4>

                  <p className="">
                    {item.offer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Offer;
