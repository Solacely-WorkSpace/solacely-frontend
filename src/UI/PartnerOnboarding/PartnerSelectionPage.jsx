"use client";

import Image from "next/image";
import Link from "next/link";
import AuthIllustration from "../Onboarding/components/AuthIllustration";

const LogoIcon = "/images/logo-icon.svg"; 
const LogoName = "/images/logo-name.svg";

const partnerTypes = [
  {
    id: 'agency',
    title: 'Apply as an Agency',
    description: "Connect with us. Every step of the journey, we'll be here for you.",
    route: '/partner/agency',
    illustration: '/images/PartnersOnboarding/bro1.png' 
  },
  {
    id: 'agent',
    title: 'Apply as an Agent',
    description: "Connect with us. Every step of the journey, we'll be here for you.",
    route: '/partner/agent',
    illustration: '/images/PartnersOnboarding/bro.png' 
  },
  {
    id: 'landlord',
    title: 'Apply as a Landlord',
    description: "Connect with us. Every step of the journey, we'll be here for you.",
    route: '/partner/landlord',
    illustration: '/images/PartnersOnboarding/illustration.png' 
  }
];

const PartnerSelectionPage = () => {
  return (
    <div className="min-h-screen flex bg-white">
      {/* LEFT: Illustration */}
      <div className="hidden md:block w-1/3 relative">
        <AuthIllustration />
      </div>

      {/* RIGHT: Content panel */}
      <div className="w-full md:w-2/3 flex flex-col p-6 sm:p-8 md:p-12">
        {/* Header: logo + sign in */}
        <div className="flex justify-end items-center mb-12">
          <p className="text-sm text-gray-600">
            Already a partner?{" "}
            <Link href="/partner/signin" className="font-semibold text-complementary hover:text-complementary-dark">
              Sign in
            </Link>
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col justify-center flex-1">
            {/* Hero: centered heading + subtext */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Open the door to collaboration
              </h1>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                Becoming a partner allowed me to become an entrepreneur and laid down a path to financial freedom.
              </p>
            </div>

            {/* Cards: 3 column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partnerTypes.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-purple-50 rounded-lg border border-gray-200 p-6 flex flex-col text-left transition-shadow hover:shadow-md"
                >
                  {/* Card Content */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {partner.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">
                      {partner.description}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="mb-4">
                    <Link
                      href={partner.route}
                      className="inline-block text-sm font-medium text-primary border border-purple-200 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      Get started
                    </Link>
                  </div>

                  {/* Illustration Container */}
                  <div className="flex-1 flex items-end justify-center pt-4">
                    <div className="relative w-full h-40">
                       <Image
                        src={partner.illustration}
                        alt={`${partner.title} illustration`}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center bottom"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerSelectionPage;