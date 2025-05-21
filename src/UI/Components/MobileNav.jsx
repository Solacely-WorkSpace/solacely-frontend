import Link from "next/link";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "./ui/sheet";
import { HamburgerSVG } from "@/assets/SVGAssets";
import { ChevronDown } from "lucide-react";


const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger button */}
      <button 
        onClick={toggleMenu} 
        className="bg-transparent cursor-pointer md:hidden shadow-none px-0"
        aria-label="Toggle mobile menu"
      >
        <HamburgerSVG />
      </button>

      {/* Overlay menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30" 
            onClick={toggleMenu}
          />
          
          {/* Menu panel */}
          <div className="relative w-3/4 max-w-xs bg-white h-fit shadow-lg overflow-y-auto rounded-b-2xl">
            {/* Close button */}
            <button 
              onClick={toggleMenu}
              className="absolute top-4 right-4 p-2"
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Menu items */}
            <div className="pt-16 px-6 pb-8">
              <ul className="flex flex-col space-y-4">
                <li className="py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium">Spaces</span>
                    <ChevronDown size={18} />
                  </div>
                </li>
                <li className="py-2">
                  <Link href="#" className="block text-base font-medium">Become a Partner</Link>
                </li>
                <li className="py-2">
                  <Link href="/sign-up" className="block text-base font-medium">Get Started</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
