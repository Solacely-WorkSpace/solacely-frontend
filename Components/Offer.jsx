import { whatWeOffer } from "@/Constant";
import Image from "next/image";
import AnimatedComponents from "@/Animations/AnimatedComponents";
import { slideInLeft } from "@/Constant";

const Offer = () => {
  return (
    <section className=" bg-slate-100 flex flex-wrap justify-between py-10">
      <figure className=" flex flex-col items-center justify-end py-12 md:pt-40">
        <h1 className=" text-center md:text-left text-3xl font-rob font-bold mb-7 md:w-1/2">
          The Excellent Luxury we Offer to all Potential{" "}
          <b className=" text-green-400">Home Owners </b>
        </h1>
        <Image
          src="/icons/home 1.svg"
          width={200}
          height={200}
          alt="3d design"
          className=" hidden lg:block"
        />
      </figure>

      <div className=" grid grid-cols-2">
        {whatWeOffer.map((item, index) => {
          return (
            <article
              key={index}
              className=" rounded-md p-3 max-w-[250px] h-50 mb-2 ml-2 hover:bg-white hover:scale-105"
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
    </section>
  );
};

export default Offer;
