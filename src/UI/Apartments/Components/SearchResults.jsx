"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { PropertyOne, Location, WishlistHeart } from '@/assets/images';
import MoreFilters from '../Sections/MoreFilters';
import { useSearch } from '@/hooks/useSearch';

const SearchResults = ({ searchTerm, location, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(['Location', 'Price', 'Type', 'Bed']);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [locationOptions] = useState(['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan']);
  const priceOptions = ['₦0 - 500k', '₦510k - 1mil', '₦1mil - 2mil', '₦2mil+'];
  const typeOptions = ['Duplex', 'Bungalow', 'Terrace', 'Penthouse', 'Self-contained'];
  const bedOptions = ['1', '2', '3', '4', '5'];
  
  const { searchResults, loading, error, totalResults, searchApartments } = useSearch();
  
  useEffect(() => {
    const searchParams = {
      query: searchTerm,
      location: location || selectedLocation,
      page: currentPage
    };
    
    if (selectedPrice) {
      const priceRange = selectedPrice.replace('₦', '').split(' - ');
      const minPrice = priceRange[0].replace('k', '000').replace('mil', '000000');
      const maxPrice = priceRange[1]?.replace('k', '000').replace('mil', '000000').replace('+', '');
      if (minPrice) searchParams.minPrice = minPrice;
      if (maxPrice) searchParams.maxPrice = maxPrice;
    }
    if (selectedType) searchParams.buildingType = selectedType.toLowerCase();
    if (selectedBeds) searchParams.bedrooms = selectedBeds;
    
    if (searchTerm || location || selectedLocation || selectedPrice || selectedType || selectedBeds) {
      searchApartments(searchParams);
    }
  }, [searchTerm, location, currentPage, selectedLocation, selectedPrice, selectedType, selectedBeds, searchApartments]);
  
  const ITEMS_PER_PAGE = 6;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedListings = searchResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  const toggleFavorite = (id) => {
    console.log(`Toggle favorite for listing ${id}`);
  };

  return (
    <>
      <div className="container w-full mt-10 md:p-3 flex">
        {/* Left Side - Interactive Map */}
        <div className="hidden md:block w-full md:w-1/3 sticky top-16 left-0 overflow-hidden py-6 rounded-xl">
          <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100">
            {searchResults.length > 0 && searchResults[0]?.latitude && searchResults[0]?.longitude ? (
              <iframe
                src={`https://maps.google.com/maps?q=${searchResults[0].latitude},${searchResults[0].longitude}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Search Results Map"
              />
            ) : (
              <>
                <Image
                  src={Location}
                  alt='Map location'
                  fill
                  priority
                  className='object-cover rounded-xl'
                />
                {searchResults.slice(0, 4).map((listing, index) => {
                  const positions = [
                    { top: '25%', left: '25%' },
                    { top: '33%', right: '33%' },
                    { bottom: '25%', left: '33%' },
                    { bottom: '33%', right: '25%' }
                  ];
                  return (
                    <div 
                      key={listing.id}
                      className="absolute bg-white px-2 py-1 rounded shadow text-sm cursor-pointer hover:bg-gray-50"
                      style={positions[index]}
                      title={`${listing.title || listing.name} - ₦${listing.price || listing.rent}`}
                    >
                      ₦{listing.price || listing.rent || '0'}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        
        {/* Right Side - Scrollable Listings */}
        <div className="w-full md:w-2/3 h-[calc(100vh-4rem)] overflow-y-auto pb-8 px-4 md:px-6 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-gray-100"
            aria-label="Close search results"
          >
            <FiX size={20} />
          </button>
          
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
                <h1 className="text-2xl font-bold mb-1">
                  {loading ? 'Searching...' : `${totalResults} listings${location ? ` in ${location}` : ''}`}
                </h1>
                <p className="text-gray-500 text-base">
                  {searchTerm ? `Results for "${searchTerm}"` : 'Rent your next home at one of our properties.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 rounded-full mb-4">
              <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-2 border border-gray-200 w-full">
                <Image src="/icons/search.svg" className='w-6 h-6' width={20} height={20} alt="search" />
                <span className="text-gray-700 py-2">{searchTerm || location || 'Search results'}</span>
              </div>
              <div className="w-[200px] hidden md:block">
                {/* <button onClick={() => {
                  setSelectedLocation('');
                  setSelectedPrice('');
                  setSelectedType('');
                  setSelectedBeds('');
                }} className="bg-gray-500 text-white p-2 rounded-lg flex items-center gap-2 px-4">
                  <span className="hidden md:inline py-2">Clear</span>
                </button> */}
              </div>
            </div>
            
            <div className="flex md:flex-wrap lg:flex-wrap gap-3 mb-4 overflow-x-auto md:overflow-visible pb-2">
              <button onClick={() => setIsMoreFiltersOpen(true)} className="md:hidden flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg border border-gray-200 hover:border-emerald-500 flex items-center gap-2 text-gray-900">
                <Image src="/icons/Apartments/PurpleFilter.svg" alt="Filter" className="w-8 h-8" width={24} height={24}/>
              </button>
              
              {/* Location Filter */}
              <div className="relative w-[120px] md:w-[90px] flex-none">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="relative w-[120px] md:w-[100px] flex-none">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="relative w-[120px] md:w-[100px] flex-none">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              <div className="relative w-[120px] md:w-[80px] flex-none">
                <select
                  value={selectedBeds}
                  onChange={(e) => setSelectedBeds(e.target.value)}
                  className="w-full appearance-none text-sm px-4 md:px-1.5 py-3 md:py-2 rounded-xl md:rounded-lg bg-white shadow-sm hover:shadow-md text-gray-900 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              
              {/* Clear Filters */}
              {(selectedLocation || selectedPrice || selectedType || selectedBeds) && (
                <button
                  onClick={() => {
                    setSelectedLocation('');
                    setSelectedPrice('');
                    setSelectedType('');
                    setSelectedBeds('');
                    setCurrentPage(1);
                  }}
                  className="bg-red-100 text-red-600 border border-red-200 rounded-lg px-4 py-2 text-sm hover:bg-red-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                  <span>Searching apartments...</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="flex gap-4 mb-2">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-red-500 text-center">{error}</div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-gray-500 text-center">
                <p className="text-lg mb-2">No apartments found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paginatedListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="relative">
                    <Image 
                      src={listing.image || PropertyOne}
                      alt={listing.title || listing.name || 'Apartment'}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                    {(listing.tag || listing.status === 'available') && (
                      <div className="absolute top-3 left-3 bg-white text-xs font-medium px-2 py-1 rounded">
                        {listing.tag || 'Available'}
                      </div>
                    )}
                    <button 
                      onClick={() => toggleFavorite(listing.id)}
                      className="absolute top-3 right-3 p-1"
                    >
                      <Image src={WishlistHeart} alt="Wishlist" width={24} height={24} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2">{listing.title || listing.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Image src="/icons/UserDashboard/bedroom.svg" className='w-4 h-4' width={16} height={16} alt="bedroom" />
                        <span>{listing.beds || listing.number_of_bedrooms || 0}bed</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src="/icons/UserDashboard/bath.svg" className='w-4 h-4' width={16} height={16} alt="bath" />
                        <span>{listing.baths || listing.number_of_bathrooms || 0}bath</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Image src="/icons/UserDashboard/ruler.svg" className='w-4 h-4' width={16} height={16} alt="area" />
                        <span>{listing.area || listing.area_size_sqm || '--'}m²</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={16} height={16} alt="location" />
                        <span>{listing.location || listing.address}</span>
                      </div>
                    </div>
                    <div className="font-semibold mb-2 text-emerald-700">
                      ₦{listing.price || listing.rent || 'Price on request'}
                      <span className="font-normal text-sm">/month</span>
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <Link href={`/apartment/${listing.id}`} className="w-full">
                        <button className="bg-complementary text-white px-6 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors w-full">
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 mb-8">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-2 rounded-lg border border-gray-200 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage === 1 || loading}
              >
                <FiChevronLeft />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentPage === page 
                      ? 'bg-complementary text-white' 
                      : 'border border-gray-200 hover:border-emerald-500'
                  }`}
                  disabled={loading}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 rounded-lg border border-gray-200 hover:border-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentPage >= totalPages || loading}
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <MoreFilters 
        isOpen={isMoreFiltersOpen}
        onClose={() => setIsMoreFiltersOpen(false)}
      />
    </>
  );
};

export default SearchResults;