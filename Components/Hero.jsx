import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className=" px-4  max-w-[90%] mx-auto">
      <div className="flex flex-wrap-reverse justify-center items-center gap-10 mt-10 ">
        <article className=" w-full md:w-1/2">
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
        <div className=" ">
          <div className=" flex justify-between ">
            <figure className=" -ml-16">
              <p className=" font-cav font-bold text-2xl text-txt">
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
            <figure className=" -mr-14">
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
            </figure>
          </div>
          <figure>
            <Image
              src="/images/hero.png"
              width={300}
              height={300}
              alt="hero-image"
              className=" object-contain"
            />
          </figure>
          <div className="flex ">
            <figure className=" -ml-16">
              <Image
                src="/icons/bottom-left.svg"
                width={80}
                height={80}
                alt="arrow"
              />
              <p className=" text-txt text-2xl font-cav font-bold">
                Secure <br />
                Savings
              </p>
            </figure>
            <figure className=" ml-auto -mr-25 ">
              <Image
                src="/icons/bottom-right.svg"
                width={80}
                height={80}
                alt="arrow"
              />
              <p className=" font-cav font-bold text-2xl text-txt">
                Seamless <br /> Management
              </p>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
