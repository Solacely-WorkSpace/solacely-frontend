
import Image from "next/image";
import Link from "next/link";
import { AboutHeroBg } from '@/assets/images'
import { goal, film } from '@/assets/icons' 

export default function AboutHero() {
  return (
    <section className="aboutpage-container px-4 mt-16 w-full"> 
          <div className="aboutpage-container mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl text-black font-bold mb-6">About Us</h1>
              <p className="text-lg text-gray-600">
                We are an industry leader that places a premium on honesty, ethics, and
                efficiency. Since the outset, we have distinguished ourselves by
                developing high-quality products and providing excellent customer
                service.
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
                <p className="md:text-lg text-white">
                  &quot;We strive to collaborate closely with our customers in order to
                  solve their challenges.&quot; &quot;Honesty, integrity, and efficiency are
                  important to us.&quot;
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
                    We are an industry-leading company that values honesty, integrity,
                    and efficiency. Building quality products and caring for the users
                    are what made us stand out since the beginning.
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
                    We are an industry-leading company that values honesty, integrity,
                    and efficiency. Building quality products and caring for the users
                    are what made us stand out since the beginning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}
