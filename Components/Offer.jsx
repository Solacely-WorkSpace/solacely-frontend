import { whatWeOffer } from "@/Constant";
import Image from "next/image";
import AnimatedComponents from "@/Animations/AnimatedComponents";
import { slideInLeft } from "@/Constant";

const Offer = () => {
  return (
    <section className=" bg-slate-100 w-screen p-2 md:px-8">
      <div className="landingpage-container flex gap-8 flex-col md:flex-row items-center justify-between py-10">
        <figure className="flex-1 flex flex-col justify-end md:pt-40">
          <h1 className=" text-center md:text-left text-3xl md:text-4xl font-rob font-bold ">
            The Excellent Luxury we
            <br />
            Offer to all Potential{" "}
            <br />
            <b className="text-green-400">Home Owners </b>
          </h1>

          <Image
            src="/icons/home 1.svg"
            width={200}
            height={200}
            alt="3d design"
            className=" hidden md:block"
          />
        </figure>

        <div className="flex-1 grid grid-cols-2 gap-2 md:gap-4">
          {whatWeOffer.map((item, index) => {
            return (
              <article
                key={index}
                className="h-50 hover:bg-white hover:scale-105 rounded-xl p-3 md:p-6 grid place-content-center"
              >
                <figure>
                  <Image src={item.icon} width={35} height={35} alt="icon" />
                </figure>

                <div className="">
                  <h3 className=" font-semibold my-3.5">{item.header}</h3>

                  <p className=" tracking-tighter  md:tracking-tight leading-4 text-xs text-justify">
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
