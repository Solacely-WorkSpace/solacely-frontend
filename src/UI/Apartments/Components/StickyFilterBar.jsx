"use client"
import { FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const StickyFilterBar = ({ 
  locationDropdown,
  priceDropdown,
  typeDropdown,
  bedDropdown,
  setLocationDropdown,
  setPriceDropdown,
  setTypeDropdown,
  setBedDropdown,
  setIsMoreFiltersOpen,
  locationOptions,
  priceOptions,
  typeOptions,
  bedOptions,
  show
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setLocationDropdown(false);
        setPriceDropdown(false);
        setTypeDropdown(false);
        setBedDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setLocationDropdown, setPriceDropdown, setTypeDropdown, setBedDropdown]);

  if (!show) return null;


//   For now only appears on desktop view only
  return (
    <div className="fixed md:top-20 hidden md:block top-20 right-0 left-0 mx-auto z-50 w-fit transition-transform duration-300" ref={containerRef}>
      <div className="bg-white shadow-md rounded-xl py-2 px-4 border border-gray-300 shadow-sm">
        <div className="flex gap-4 items-center overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Location Filter */}
          <div className="relative w-[120px] md:w-[140px] flex-none">
            <select
              value={locationDropdown || ""}
              onChange={(e) => {
                setLocationDropdown(e.target.value);
                console.log(`Selected location: ${e.target.value}`);
              }}
              className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none"
            >
              <option value="">Location</option>
              {locationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-500" />
          </div>

          {/* Price Filter */}
          <div className="relative w-[120px] md:w-[140px] flex-none">
            <select
              value={priceDropdown || ""}
              onChange={(e) => {
                setPriceDropdown(e.target.value);
                console.log(`Selected price: ${e.target.value}`);
              }}
              className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none"
            >
              <option value="">Price</option>
              {priceOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-500" />
          </div>

          {/* Type Filter */}
          <div className="relative w-[120px] md:w-[140px] flex-none">
            <select
              value={typeDropdown || ""}
              onChange={(e) => {
                setTypeDropdown(e.target.value);
                console.log(`Selected type: ${e.target.value}`);
              }}
              className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none"
            >
              <option value="">Type</option>
              {typeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-500" />
          </div>

          {/* Bed Filter */}
          <div className="relative w-[120px] md:w-[140px] flex-none">
            <select
              value={bedDropdown || ""}
              onChange={(e) => {
                setBedDropdown(e.target.value);
                console.log(`Selected beds: ${e.target.value}`);
              }}
              className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none"
            >
              <option value="">Bed</option>
              {bedOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FiChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-gray-500" />
          </div>

          <button 
            onClick={() => setIsMoreFiltersOpen(true)}
            className="text-sm px-2.5 py-2 w-fit rounded-lg bg-purple-800 text-white hidden md:inline-flex items-center space-x-2 flex-none whitespace-nowrap"
          >
            <Image src="/icons/Filter.svg" alt="Filter" className="w-3 h-3" width={24} height={24}/>
            <span>More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyFilterBar;
