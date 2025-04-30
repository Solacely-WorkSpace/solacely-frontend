import Link from "next/link";
import Dropdown from "@/UI/Components/Dropdown";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../../Components/ui/sheet";
import { HamburgerSVG } from "@/assets/SVGAssets";


const MobileNav = () => {
  return (
    <Sheet>
      <SheetTitle />
      <SheetTrigger className="bg-transparent cursor-pointer md:hidden shadow-none px-0">
        <HamburgerSVG />
      </SheetTrigger>
      <SheetContent>
        <ul className=" pt-20 flex flex-col gap-6">
          <li className=" font-semibold text-sm">
            <Dropdown />
          </li>

          <li className=" font-bold px-6 ">
            <Link href="#">Explore Nearby</Link>
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
