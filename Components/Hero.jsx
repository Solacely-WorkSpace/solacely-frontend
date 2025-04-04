import Image from "next/image";
import Link from "next/link";
import AiPopuop from "./AiPopuop";

const Hero = () => {
  return (
    <section className="landingpage-container flex flex-wrap-reverse justify-between items-end gap-10 mt-10">
      <article className=" w-full md:w-1/2">
        <div className="px-2 mb-2">
          <AiPopuop />
        </div>

        <div className="  px-2 font-rob">
          <h2 className=" text-4xl font-bold md:leading-16">
            Find Your Perfect Home With AI-Powered Recommendations.
          </h2>
          <p className=" text-sm md:text-lg leading-6 mt-6 max-w-96 ">
            Live faster, fresher, and freer. Solacely helps you find your home
            with a simple walkthrough within minutes.
          </p>

          <div className=" flex justify-between md:flex-col gap-8 py-4 mt-6 items-center md:items-start">
            <Link
              href="/sign-up"
              className=" px-8 py-4 shadow-xl shadow-gray-400 text-white bg-primary rounded-sm"
            >
              Get Started
            </Link>

            <article>
              <h5 className=" font-semibold font-rob text-sub text-sm tracking-tight md:w-1/2xt-sm mb-1.5">
                OUR ESTEEM PARTNER
              </h5>
              <figure className=" flex items-center">
                <Image
                  src="/icons/meta.svg"
                  width={30}
                  height={30}
                  alt="meta"
                />
                <span className=" text-md text-black font-bold ml-2">
                  Meta
                </span>
              </figure>
            </article>
          </div>
        </div>
      </article>

      <div className="flex-1 flex px-4 ">
        <div className=" flex flex-col justify-between ">
          <figure className="flex items-start ">
            <p className="-mt-12 font-cav font-bold text-2xl text-txt">
              Smart
              <br />
              Renting
            </p>

            <Image
              src="/icons/top-left.svg"
              width={80}
              height={80}
              alt="arrow"
            />
          </figure>

          <figure className="flex items-start -mb-20 ">
            <p className="pt-12 text-txt text-2xl font-cav font-bold">
              Secure <br />
              Savings
            </p>

            <Image
              src="/icons/bottom-left.svg"
              width={80}
              height={80}
              alt="arrow"
            />
          </figure>

          {/* <figure className=" -mr-14">
            <p className=" font-cav font-bold text-2xl text-txt">
              Value
              <br />
              For You
            </p>
            <Image
              src="/icons/top-right.svg"
              width={80}
              height={80}
              alt="arrow"
            />
          </figure> */}
        </div>

        <figure className="flex-1 mt-12 shadow-2xl rounded-2xl overflow-hidden">
          <Image
            src="/images/hero.png"
            width={2000}
            height={2000}
            alt="hero-image"
            className=" object-center"
          />
        </figure>

        <div className=" flex flex-col justify-between ">
          <figure className="flex items-start ">
            <Image
              src="/icons/bottom-left.svg"
              width={80}
              height={80}
              alt="arrow"
            />
            <p className="-mt-12 text-txt text-2xl font-cav font-bold">
              Secure <br />
              Savings
            </p>
          </figure>

          <figure className="flex items-start -mb-24">
            <Image
              src="/icons/bottom-right.svg"
              width={80}
              height={80}
              alt="arrow"
            />

            <p className="pt-12 font-cav font-bold text-2xl text-txt">
              Seamless <br /> Management
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;
