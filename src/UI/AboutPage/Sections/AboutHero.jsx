
import Image from "next/image";
import Link from "next/link";
import { AboutHeroBg } from '@/assets/images'
import { goal, film } from '@/assets/icons' 

export default function AboutHero() {
  //comment to test git
  return (
    <section className="aboutpage-container px-4 mt-16 w-full"> 
          <div className="aboutpage-container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl text-black font-bold mb-6">About Us</h1>
              <p className="text-lg text-gray-600">
                At Solacely, we’re transforming how people rent, list, and manage homes — starting 
                with underserved communities. We believe finding a home should be easy, 
                transparent, and tailored to you.

              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden mb-20">
              <Image
                src={AboutHeroBg}
                alt="Modern living space"
                width={1400}
                height={700}
                className="w-full object-cover h-[600px] md:h-auto aspect-[2/1] bg-gray-100" 
                priority
              />
              <div className="absolute bottom-0 left-0 bg-primary text-white p-6 md:max-w-xl h-1/4 md:h-auto md:rounded-tr-3xl">
                <p className="md:text-lg text-sm text-white">
                  &quot;We’re building a smarter, AI-powered platform that empowers tenants, landlords, and agents with seamless 
                  tools to access affordable housing, flexible payment options, and verified listings — all from the comfort of their device.&quot;
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Mission Card */}
              <div className="flex flex-col items-center md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <Image
                      src={goal}
                      alt="Mission goal icon"
                      width={50}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-bold mb-4 text-left">Mission</h2>
                  <p className="text-gray-600 text-left">
                    To make renting and managing real estate simpler, smarter, and more accessible — using 
                    technology to empower users with flexibility, financial tools, and verified housing options.
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="w-24 h-24 flex items-center justify-center">
                    <Image
                      src={film}
                      alt="Vision film icon"
                      className="object-contain"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-bold mb-4 text-left">Vision</h2>
                  <p className="text-gray-600 text-left">
                    To redefine the real estate experience — creating a world where anyone can find and rent a home 
                    on their own terms, with zero stress, total transparency, and the tools they need to thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}
