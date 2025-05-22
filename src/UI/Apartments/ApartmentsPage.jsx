"use client"
import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { ApartmentBg, WishlistHeart, Property, Bedroom, PurpleFilter } from '@/assets/images'
import Image from 'next/image'
import MoreFilters from './Sections/MoreFilters';
import SearchResults from './Components/SearchResults';
import PopUpModal from './Components/PopUpModal';


const ApartmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  
  // Close the welcome modal
  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  // Sample apartment data
  const rentedApartment = {
    title: "Northwest Studio Apartment",
    type: "Apartment",
    location: "1998 Wufma Minnessota, Festac",
    rent: "₦85,000/month",
    rentLabel: "Monthly Rent",
    contractType: "Contract",
    contractLabel: "Rental Agreement"
  }
  
  const apartments = [
    {
      id: 1,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      image: Property,
      tag: "NEW"
    },
    {
      id: 2,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      image: Property,
      tag: "RECOMMENDED"
    },
    {
      id: 3,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8,725sqft",
      location: "1998 Wufma Minnessota, Festac",
      price: "₦24,000,000",
      image: Property,
      tag: "NEW"
    },
    {
      id: 4,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month",
      image: Property,
      tag: "RECOMMENDED"
    },
    {
      id: 5,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month",
      image: Property,
      tag: "NEW"
    },
    {
      id: 6,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Lasdo",
      price: "₦24,000,000/month",
      image: Property,
      tag: "NEW"
    }
  ]

  const handleExplore = (id) => {
    console.log(`Explore property ${id}`);
  };



  // If search results should be shown, render the SearchResults component
  if (showSearchResults) {
    return (
      <div className="w-full h-screen overflow-hidden pt-16"> 
        <SearchResults 
          searchTerm={searchTerm} 
          location={searchLocation} 
          onClose={() => setShowSearchResults(false)}
        />
      </div>
    );
  }

  // Otherwise, render the main apartments page
  return (
    <div className="landingpage-container px-4 md:px-0 mt-20">
      {/* Welcome PopUp Modal */}
      {showWelcomeModal && <PopUpModal onClose={handleCloseWelcomeModal} />}
      {/* Hero Section */}
      <div className="relative mb-12 overflow-hidden bg-gradient-to-r from-[#E3F3F3] via-[#EAF5F5] to-[#F0F8F8] pt-14 pb-12 rounded-b-[40px] md:rounded-b-[50px]">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1500px] mx-auto">
          <div className="w-full md:w-1/2 px-5">
            <h1 className="text-4xl md:text-5xl font-bold text-center md:text-left text-emerald-900 mb-6">Apartment</h1>
            
            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto md:mx-0">
              <div className="bg-white rounded-2xl md:rounded-lg p-6 md:p-0 shadow-sm md:shadow-none">
                <input
                  type="text"
                  placeholder="Enter address, zip, city"
                  className="w-full px-4 md:px-5 py-3 md:py-3 text-lg md:text-base text-gray-600 bg-transparent md:bg-white focus:outline-none md:rounded-lg md:border md:border-gray-200 md:focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  onClick={() => {
                    if (searchTerm.trim()) {
                      setSearchLocation(searchTerm);
                      setShowSearchResults(true);
                    }
                  }}
                  className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 mt-3 md:mt-0 bg-[#40D1B3] text-white py-2 md:py-2 px-6 md:px-5 rounded-3xl md:rounded-3xl text-lg md:text-base font-medium hover:bg-[#35B095] transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 md:gap-4 mt-6 overflow-x-auto md:overflow-visible pb-2 px-4 md:px-0 md:flex-wrap">
              <button onClick={() => setIsMoreFiltersOpen(true)} className="md:hidden flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg border border-gray-700 hover:shadow-md flex items-center gap-2 text-gray-900">
              <Image src={PurpleFilter} alt="Filter" className="w-8 h-8" width={24} height={24}/>
              </button>
              <button className="flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md flex items-center gap-2 text-gray-900">
                Location <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md flex items-center gap-2 text-gray-900">
                Price <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md flex items-center gap-2 text-gray-900">
                Bed <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md flex items-center gap-2 text-gray-900">
                Type <FiChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsMoreFiltersOpen(true)}
                className="px-4 py-2 rounded-lg bg-purple-800 text-white hidden md:inline-flex items-center space-x-2">
                <Image src="/icons/Filter.svg" alt="Filter" className="w-4 h-4" width={24} height={24}/>
                <span>More Filters</span>
              </button>
            </div> 
          </div>
        
          <div className="hidden md:block mt-8 md:mt-0 align-items-right  absolute right-6">
            <div className="align-items-right relative">
              <Image src={ApartmentBg} alt="3D House" className="w-90 h-55" />
            </div>
          </div>
        </div>
      </div>

      {/* Apartment Listings */}
      <div className="grid grid-cols-1 md:px- md:grid-cols-2 lg:grid-cols-2 gap-5">
        {apartments.map((apt) => (
          <div key={apt.id} className="bg-white rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="relative mr-3">
              <Image
                src={Property}
                alt={apt.title}
                width={500}
                height={500}
                className="w-full h-42 object-cover rounded-lg"
              />
              {apt.tag && (
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-medium ${apt.tag === 'NEW' ? 'bg-white text-purple-700' : 'bg-white text-emerald-700'}`}>
                  {apt.tag}
                </div>
              )}
              <button className="absolute top-3 right-3 p-1">
                <Image src={WishlistHeart} alt="Wishlist" />
              </button>
            </div>
                        
            <div className="py-2">
              <h3 className="text-sm font-bold text-gray-800 mb-2">{apt.title}</h3>
              
              <div className="flex items-center gap-4 mb-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/bedroom.svg" width={20} height={20} alt="bedroom" />
                  <span>{apt.beds}bed</span>
                </div>
                            
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/bath.svg" width={20} height={20} alt="bath" />
                  <span>{apt.baths}bath</span>
                </div>
                            
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/ruler.svg" width={20} height={20} alt="ruler" />
                  <span>{apt.area}</span>
                </div>
              </div>
                          
              <div className="flex items-center gap-1 mb-3 text-gray-600">
                <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={20} height={20} alt="location" />
                <span className="text-xs">{apt.location}</span>
              </div>
                          
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-green-800">{apt.price}</p>
              </div>
              <div className="flex items-center justify-between mt-5" >
                <button onClick={() => handleExplore(apt.id)} className="bg-complementary text-white px-20 text-center py-2 w-2/3 rounded-md text-sm font-medium hover:bg-green-600 transition-colors">
                  <span>Explore</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Can't find section */}
      <div className="relative rounded-2xl shadow-lg overflow-hidden w-full mx-auto my-15">
        <Image
          src={Bedroom}
          alt="Luxury Room"
          width={1200}
          height={600}
          className="w-full h-[400px] object-cover hidden md:block"
        />
        <div className="absolute inset-0 bg-opacity-40"></div>
        {/* mobile view */}
        <div className='grid grid-cols-1'>
            <div className="md:hidden rounded-lg"> 
              <Image src={Bedroom} alt="Luxury Room" width={1200} height={600} className="w-full h-[400px] object-cover" />
            </div>
            <div className="md:hidden w-full md:w-[450px] p-8 bg-white rounded-lg mr-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Can't find what you are looking for?
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                Solacely owns hundreds of homes for sale near you. See homes on the market, or get a sneak peek at those that have yet to hit the market.
              </p>
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm mb-1 text-gray-600">Phone Number</label>
                  <div className="flex items-center gap-0">
                    <input
                      type="text"
                      placeholder="+2347855455555444"
                      className="flex-1 px-4 py-2 rounded-l-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                    />
                    <button className="px-4 py-2 bg-emerald-700 text-white text-sm rounded-r-lg hover:bg-emerald-800 transition-colors">
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-600">Email Address</label>
                  <input
                    type="email"
                    placeholder="contact@healingrays.com"
                    className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

        <div className="absolute inset-0 flex items-center justify-end">
          <div className="hidden md:block w-full md:w-[450px] p-8 bg-white rounded-lg mr-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Can't find what you are looking for?
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Solacely owns hundreds of homes for sale near you. See homes on the market, or get a sneak peek at those that have yet to hit the market.
            </p>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm mb-1 text-gray-600">Phone Number</label>
                <div className="flex items-center gap-0">
                  <input
                    type="text"
                    placeholder="+2347855455555444"
                    className="flex-1 px-4 py-2 rounded-l-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                  <button className="px-4 py-2 bg-emerald-700 text-white text-sm rounded-r-lg hover:bg-emerald-800 transition-colors">
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">Email Address</label>
                <input
                  type="email"
                  placeholder="contact@healingrays.com"
                  className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
            </div>
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

export default ApartmentsPage;