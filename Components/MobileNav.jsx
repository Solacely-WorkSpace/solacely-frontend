import Link from "next/link";
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
    <Sheet>
      <SheetTitle />
      <SheetTrigger className=" bg-transparent cursor-pointer md:hidden shadow-none px-0">
        <Image
          src="/icons/hamburger.svg"
          width={30}
          height={30}
          alt="hanburger"
        />
      </SheetTrigger>
      <SheetContent>
        <ul className=" pt-20 flex flex-col gap-6">
          <li className=" font-semibold text-sm">
            <Dropdown />
          </li>

          <li className=" font-bold px-6 ">
            <Link href="#">Become a Partner</Link>
          </li>
        </ul>

        <Link
          href="/sign-up"
          className=" mt-6 ml-6 bg-primary text-white font-bold py-4 px-8 w-fit rounded-sm shadow-lg shadow-primary "
        >
          Get Started
        </Link>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
