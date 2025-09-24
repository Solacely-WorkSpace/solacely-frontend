"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import TourApartment from "../Components/TourApartment";
import TourSectionLinks from "../Components/TourSectionLinks";
import TourPairWithMe from "../Components/TourPairWithMe";
import TourRealEstate from "../Components/TourRealEstate";

const Tour = () => {
  const [isActive, setIsActive] = useState(0);

  return (
    <section className="bg-purple-50 px-4 w-full">
      <section className="landingpage-container rounded-2xl p-4 overflow-y-visible ">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 pt-8">
          At a Glance
        </h2>
        <p className="text-gray-600 mb-8">
          Solacely puts the essentials at your fingertips. See the bigger picture in seconds.
        </p>
        <div className="w-full h-fit overflow-x-auto pt-4 pb-0">
          <TourSectionLinks {...{ isActive, setIsActive }} />
        </div>

        {
          isActive === 0 &&
          <TourApartment />
        }

        {
          isActive === 2 &&
          <TourPairWithMe />
        }

        {
          isActive === 3 &&
          <TourRealEstate />
        }
      </section >
    </section >
  );
};

export default Tour;
