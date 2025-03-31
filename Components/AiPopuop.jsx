import React from "react";
import AnimateNav from "@/Animations/AnimateNav";
import { slideInLeft } from "@/Constant";

const AiPopuop = () => {
  return (
    <AnimateNav animation={slideInLeft}>
      <div className=" flex justify-center mt-20">
        <button className=" bg-transparent ring ring-gray-300 text-black shadow-none mt-10">
          <span className=" ring ring-gray-300 px-1 rounded-2xl mr-4 text-xs font-light">
            New
          </span>
          Hi, i'm Solacely AI
        </button>
      </div>
    </AnimateNav>
  );
};

export default AiPopuop;
