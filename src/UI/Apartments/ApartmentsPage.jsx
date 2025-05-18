"use client"
import { useState } from 'react';
import { FiSearch, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { ApartmentBg, WishlistHeart, Property, Bedroom } from '@/assets/images'
import Image from 'next/image'


const ApartmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className="w-full lg:max-w-[1120px] xl:max-w-[1200px] 2xl:max-w-[1500px] mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-50 to-gray-100 rounded-3xl p-6 mb-12 overflow-hidden pt-20">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold py-6 text-emerald-800 mb-6">Apartment</h1>
            
            {/* Search Bar */}
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="Enter a city or Type"
                className="w-full px-4 bg-white py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute px-5 py-2 right-2 top-1/2 -translate-y-1/2 bg-complementary text-white p-2 rounded-full">
                Search
              </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-4 mt-6 flex-wrap">
              <button className="px-2 py-2 rounded-lg bg-white shadow-sm hover:shadow flex items-center gap-2 text-gray-600">
                Location <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="px-2 py-2 rounded-lg bg-white shadow-sm hover:shadow flex items-center gap-2 text-gray-600">
                Price <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="px-2 py-2 rounded-lg bg-white shadow-sm hover:shadow flex items-center gap-2 text-gray-600">
                Type <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="px-2 py-2 rounded-lg bg-white shadow-sm hover:shadow flex items-center gap-2 text-gray-600">
                Bed <FiChevronRight className="w-4 h-4" />
              </button>
              <button className="px-2 py-2 rounded-lg bg-purple-800 text-white shadow-sm hover:shadow flex items-center gap-2">
                <Image src="/icons/Filter.svg" alt="Filter" className="w-4 h-4" width={24} height={24}/> More Filters
              </button>
            </div> 
          </div>
        
          <div className="hidden md:block mt-8 md:mt-0 align-items-right  absolute right-0">
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
              <div className="flex items-center justify-between mt-5" href="/apartmentview">
                <button className="bg-complementary text-white px-15 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition-colors">
                  Explore
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
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="w-full md:w-[450px] p-8 bg-white rounded-lg mr-5">
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
    </div>
  );
};

export default ApartmentsPage;