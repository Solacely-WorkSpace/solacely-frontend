"use client"
import { useState } from 'react';
import Image from 'next/image';
import { FiHeart, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { PropertyOne, PropertyTwo, PropertyThree, PropertyFour, Location } from '@/assets/images';
import MoreFilters from '../Sections/MoreFilters';

const SearchResults = ({ searchTerm, location, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(['Location', 'Price', 'Type', 'Bed']);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  // Sample data for the search results
  const listings = [
    {
      id: 1,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      period: "/month",
      image: PropertyOne,
      tag: "NEW",
      favorite: false
    },
    {
      id: 2,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      period: "/month",
      image: PropertyTwo,
      tag: "NEW",
      favorite: false
    },
    {
      id: 3,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      period: "/month",
      image: PropertyThree,
      tag: "NEW",
      favorite: false
    },
    {
      id: 4,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      period: "/month",
      image: PropertyFour,
      tag: "NEW",
      favorite: false
    }
  ];

  const toggleFavorite = (id) => {
    // In a real app, this would update state or call an API
    console.log(`Toggle favorite for listing ${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExplore = (id) => {
    // In a real app, this would navigate to the property details page
    console.log(`Explore property ${id}`);
  };

  return (
    <div className="container w-full mt-4 md:p-6 px-5 flex">
      {/* Left Side - Static Map */}
      <div className="hidden md:block w-full md:w-1/3 sticky top-16 left-0 overflow-hidden py-6 rounded-xl">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src={Location}
            alt='Map location'
            fill
            priority
            className='object-cover rounded-xl'
          />
          {/* Price indicators on map */}
          <div className="absolute top-1/4 left-1/4 bg-white px-2 py-1 rounded shadow text-sm">₦100,732</div>
          <div className="absolute top-1/3 right-1/3 bg-white px-2 py-1 rounded shadow text-sm">₦100,732</div>
          <div className="absolute bottom-1/4 left-1/3 bg-white px-2 py-1 rounded shadow text-sm">₦100,732</div>
          <div className="absolute bottom-1/3 right-1/4 bg-white px-2 py-1 rounded shadow text-sm">₦100,732</div>
          
          {/* Map controls */}
          <div className="absolute right-4 bottom-4 flex flex-col gap-2">
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <span className="text-2xl font-bold">+</span>
            </button>
            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
              <span className="text-2xl font-bold">-</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Right Side - Scrollable Listings */}
      <div className="w-full md:w-2/3 h-[calc(100vh-4rem)] overflow-y-auto pb-8 px-4 md:px-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-gray-100"
          aria-label="Close search results"
        >
          <FiX size={20} />
        </button>
        
        {/* Header with Location and Filters */}
        <div className="pt-4 pb-6">
          <div className="flex items-center gap-2 mb-4 pb-8">
            <a href="#" className="text-gray-500 hover:text-emerald-500 text-base">Home</a>
            <span className="text-gray-400">›</span>
            <a href="apartment" className="text-gray-900 hover:text-emerald-500 text-base">Apartment</a>
            <span className="text-gray-400">›</span>
            <span className="text-complementary text-base">Search Results</span>
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">4 listings in lekki, Lagos</h1>
              <p className="text-gray-500 text-base">Rent your next home at one of our properties.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 rounded-full mb-4">
            <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-2 border border-gray-200 w-full">
              <Image src="/icons/search.svg" className='w-6 h-6' width={20} height={20} alt="search" />
              <span className="text-gray-700 py-2">Lekki, Lagos</span>
            </div>
            <div className="w-[200px] hidden md:block">
            <button onClick={() => setIsMoreFiltersOpen(true)} className="bg-purple-700 text-white p-2 rounded-lg flex items-center gap-2 px-4">
              <Image src="/icons/Filter.svg" className='w-6 h-6' width={20} height={20} alt="filter" />
              <span className="hidden md:inline py-2">More Filters</span>
            </button>
            </div>
          </div>
          
          {/* Filter Pills */}
          <div className="flex md:flex-wrap lg:flex-wrap gap-3 mb-4 overflow-x-auto md:overflow-visible pb-2">
            <button onClick={() => setIsMoreFiltersOpen(true)} className="md:hidden flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg border border-gray-200 hover:border-emerald-500 flex items-center gap-2 text-gray-900">
              <Image src="/icons/Apartments/PurpleFilter.svg"  alt="Filter" className="w-8 h-8" width={24} height={24}/>
              </button>
            
            {activeFilters.map((filter) => (
              <button 
                key={filter}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:border-emerald-500"
              >
                <span>{filter}</span>
                <span>›</span>
              </button>
            ))}
          </div>
        </div>
        {/* Property Listings - Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative">
                <Image 
                  src={listing.image} 
                  alt={listing.title}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                />
                {listing.tag && (
                  <div className="absolute top-3 left-3 bg-white text-xs font-medium px-2 py-1 rounded">
                    {listing.tag}
                  </div>
                )}
                <button 
                  onClick={() => toggleFavorite(listing.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <FiHeart className={listing.favorite ? 'text-red-500' : 'text-gray-500'} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2">{listing.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center gap-1">
                    <span>{listing.beds}bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{listing.baths}bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{listing.area}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <p>{listing.location}</p>
                </div>
                <div className="font-semibold mb-2 text-emerald-700">
                  {listing.price}<span className="font-normal">{listing.period}</span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <button 
                    onClick={() => handleExplore(listing.id)}
                    className="bg-complementary text-white px-6 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors w-full"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8 mb-8">
            <button 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className="p-2 rounded-lg border border-gray-200 hover:border-emerald-500"
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentPage === page ? 'bg-complementary text-white' : 'border border-gray-200 hover:border-emerald-500'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-lg border border-gray-200 hover:border-emerald-500"
              disabled={currentPage === 3}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
      <MoreFilters 
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
      />
    </div>
  );
};

export default SearchResults;