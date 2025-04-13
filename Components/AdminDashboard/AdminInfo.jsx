import Image from "next/image";

// assets
import pic from "@/public/icons/curl.svg";
import { FaBell } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const AdminInfo = () => {
  return (
    <div className="container flex justify-between w-full mx-auto bg-white shadow-sm p-4">
      <div className=" font-rob flex flex-col gap-0.5">
        <h2 className=" font-bold text-md ">Hi, Panter W.</h2>
        <p className=" text-slate-400 font-semibold text-md ">Welcome Back</p>
      </div>

      <div className=" flex gap-4 md:gap-8 items-center">
        <FaBell className=" text-slate-400" />
        <article className=" flex flex-nowrap gap-1 items-center">
          <Image src={pic} alt="user pic" className=" w-8 md:w-12" />
          <span className=" font-bold hidden md:block"> Joshua K. </span>
        </article>
        <MdOutlineKeyboardArrowDown className="" />
      </div>
    </div>
  );
};

export default AdminInfo;
