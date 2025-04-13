"use client";

import Chart from "./Chart";
import Listing from "./Listing";

const View = () => {
  return (
    <section className=" container overflow-clip mx-auto flex flex-wrap-reverse items-baseline md:gap-36 gap-4">
      <Listing />
      <Chart />
    </section>
  );
};

export default View;
