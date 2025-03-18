import Dropdown from "./Dropdown";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
  SheetClose,
  SheetTitle,
} from "./ui/sheet";

import Image from "next/image";

const MobileNav = () => {
  return (
    <Sheet className=" w-fit">
      <SheetTitle />
      <SheetTrigger className=" bg-transparent cursor-pointer">
        <Image
          src="/icons/hamburger.svg"
          width={25}
          height={25}
          alt="hanburger"
        />
      </SheetTrigger>
      <SheetContent>
        <ul className=" mt-20 flex flex-col gap-3.5 px-2">
          <li className=" w-full font-semibold text-center shadow-md hover:opacity-70">
            <Dropdown />
          </li>

          <li className=" w-full font-sans font-semibold text-sm bg-transparent p-2.5 cursor-pointer shadow-md hover:opacity-70">
            Become a Partner
          </li>
        </ul>

        <SheetFooter>
          <button>Get Started</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
