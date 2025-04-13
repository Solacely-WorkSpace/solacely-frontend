"use client";

// states
import { useState } from "react";

// Components

import Image from "next/image";
import Link from "next/link";
// assets

import { AdminDashboardConstant } from "@/Constant";
import { BiSolidRightArrow } from "react-icons/bi";
import { SidebarMenu, SidebarMenuButton } from "../ui/sidebar";
import { Button } from "../ui/button";

const SidebarInfo = () => {
  const [show, setShow] = useState(false);

  const [active, setActive] = useState(0);

  return (
    <>
      <SidebarMenu className="container mx-auto flex flex-col gap-6 py-8 px-2">
        {AdminDashboardConstant.map((item, index) => {
          return (
            <div key={index}>
              <Link href={`/admin/${item.url}`}>
                <SidebarMenuButton
                  onClick={() => {
                    if (index === 1) {
                      setShow(!show);
                      setActive(index);
                    } else {
                      setActive(index);
                    }
                  }}
                  className={
                    active === index
                      ? " bg-primary shadow-sm shadow-primary py-6 px-4 text-white fill-white hover:shadow-none transition-colors duration-300 hover:text-white hover:bg-primary"
                      : " flex items-center py-6 px-4 gap-4 bg-transparent shadow-none text-slate-400 fill-slate-400 cursor-pointer transition-colors duration-300 hover:text-slate-400 hover:bg-slate-200"
                  }
                >
                  {item.src}
                  <p>{item.label}</p>

                  {index === 1 ? (
                    <BiSolidRightArrow
                      className={`${
                        show ? "rotate-90" : "rotate-0"
                      } transition-transform duration-300 ml-auto `}
                    />
                  ) : (
                    ""
                  )}
                </SidebarMenuButton>
              </Link>
              {index === 1 ? (
                <div className={show ? " block" : " hidden"}> Hello World </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </SidebarMenu>
    </>
  );
};

export default SidebarInfo;
