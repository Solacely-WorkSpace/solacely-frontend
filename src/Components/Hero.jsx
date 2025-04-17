import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="landingpage-container px-4 md:px-0 mt-20">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-10 mt-10 ">
        <article className="flex-1 w-full mt-16">
          <div className="  px-2 font-rob">
            <h2 className="text-3xl md:text-5xl font-bold md:leading-14">
              Find Your Perfect Home With AI-Powered Recommendations.
            </h2>

            <p className=" text-sm md:text-lg leading-6 mt-6 max-w-96 ">
              Live faster, fresher, and freer. Solacely helps you find your home
              with a simple walkthrough within minutes.
            </p>

            <div className=" flex justify-between md:flex-col gap-8 py-4 mt-6 items-center md:items-start">
              <Link
                href="/sign-up"
                className=" px-8 py-4 shadow-xl shadow-gray-400 text-white bg-primary rounded-sm whitespace-nowrap"
              >
                Get Started
              </Link>

              <article>
                <h5 className=" font-semibold font-rob text-sub text-sm tracking-tight md:w-1/2xt-sm mb-1.5 whitespace-nowrap">
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

        <div className="w-full flex-1">
          <Image
            src='/images/hero illustration.png'
            alt="hero illustration"
            width={2000}
            height={2000}
            className="w-full"
          />

        </div>

        {/* <div className="w-full px-4 md:px-0 flex-1 flex flex-col items-center justify-between">
          <div className="w-full flex justify-between items-center ">
            <figure className="flex items-start mt-12">
              <p className=" font-cav font-bold  md:text-2xl text-txt -mt-10 md:-mt-12">
                Smart
                <br />
                Renting
              </p>

              <div className="w-10 md:w-16">
                <Image
                  src="/icons/top-left.svg"
                  width={80}
                  height={80}
                  alt="arrow"
                  className="w-full"
                />
              </div>
            </figure>

            <figure className="flex items-start mt-12">
              <div className="w-10 md:w-16">
                <Image
                  src="/icons/top-right.svg"
                  width={80}
                  height={80}
                  alt="arrow"
                  className="w-full"
                />
              </div>

              <p className=" font-cav font-bold  md:text-2xl text-txt -mt-10 md:-mt-12">
                Value
                <br />
                For You
              </p>
            </figure>
          </div>

          <figure className="bg-yellow-400 w-fit">
            <Image
              src="/images/hero.png"
              width={300}
              height={300}
              alt="hero-image"
              className=" object-contain"
            />
          </figure>

          <div className="w-full flex justify-between items-center ">
            <figure className="flex items-start mb-12">
              <p className=" font-cav font-bold  md:text-2xl text-txt mt-10 md:mt-12">
                Secure <br />
                Savings
              </p>

              <div className="w-10 md:w-16">
                <Image
                  src="/icons/bottom-left.svg"
                  width={80}
                  height={80}
                  alt="arrow"
                  className="w-full"
                />
              </div>
            </figure>

            <figure className="flex items-start mb-12">
              <div className="w-10 md:w-16">
                <Image
                  src="/icons/bottom-right.svg"
                  width={80}
                  height={80}
                  alt="arrow"
                  className="w-full"
                />
              </div>

              <p className=" font-cav font-bold  md:text-2xl text-txt mt-10 md:mt-12">
                Seamless <br /> Management
              </p>
            </figure>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
