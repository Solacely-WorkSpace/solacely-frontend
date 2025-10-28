"use client"
import { useState, useEffect } from 'react';
import { FiSearch, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { ApartmentBg, WishlistHeart, Property, Bedroom, PurpleFilter } from '@/assets/images'
import { apartmentService } from '@/lib/api';
import Image from 'next/image'
import MoreFilters from './Sections/MoreFilters';
import SearchResults from './Components/SearchResults';
import PopUpModal from './Components/PopUpModal';
import StickyFilterBar from './Components/StickyFilterBar';
import Link from 'next/link';


const ApartmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showStickyFilter, setShowStickyFilter] = useState(false);

  // State for selected filter values
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  
  // More filters state
  const [moreFilters, setMoreFilters] = useState({
    type: 'Studio',
    priceRange: [500000, 1234567],
    bedrooms: 4,
    bathrooms: 2,
    rentalPeriod: 'Any'
  });

  // Filter options
  const [locationOptions, setLocationOptions] = useState([]);
  const priceOptions = ['₦0 - 500k', '₦510k - 1mil'];
  const typeOptions = [
    'Duplex',
    'Bungalow',
    'Terrace',
    'Penthouse',
    'Detached House',
    'Semi-detached House',
    'Maisonette',
    'Shared Apartment / Co-living',
    'Self-contained (Mini flat)',
  ];
  
  const bedOptions = ['1', '2', '3', '4', '5'];
  
  // Close the welcome modal
  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  // Handle scroll for sticky filter
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 300; // Adjust this value to control when the sticky filter appears
      setShowStickyFilter(scrollPosition > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // State for apartments
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  
  // Calculate pagination
  const totalPages = Math.ceil(apartments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApartments = apartments.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🏠 Fetching apartment listings for apartments page...');
        
        const [apartmentsResponse, locationsResponse] = await Promise.all([
          apartmentService.getListings(),
          apartmentService.getLocations()
        ]);
        
        if (apartmentsResponse && apartmentsResponse.data) {
          console.log('Successfully fetched apartments:', apartmentsResponse.data.length);
          setApartments(apartmentsResponse.data);
        } else if (Array.isArray(apartmentsResponse)) {
          console.log('Successfully fetched apartments:', apartmentsResponse.length);
          setApartments(apartmentsResponse);
        } else {
          console.log('No apartments found in response');
          setApartments([]);
        }
        
        setLocationOptions(locationsResponse || []);
      } catch (err) {
        console.error('Error fetching data for apartments page:', err);
        
        // More specific error handling
        if (err.status === 401) {
          setError('Please log in to view apartment listings.');
        } else if (err.status === 403) {
          setError('Access forbidden. You do not have permission to view apartments.');
        } else if (err.status === 404) {
          setError('Apartment listings not found. The endpoint might not be available.');
        } else if (err.message?.includes('Network error') || err.message?.includes('aborted')) {
          setError('Network connection error. Please check your internet connection and try again.');
        } else {
          setError('Failed to load apartments from server. Please try again later.');
        }
        setApartments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle location filter
  useEffect(() => {
    const filterByLocation = async () => {
      if (!selectedLocation) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await apartmentService.searchByLocation(selectedLocation);
        if (response && response.data) {
          setApartments(response.data);
        } else if (Array.isArray(response)) {
          setApartments(response);
        } else {
          setApartments([]);
        }
        setCurrentPage(1);
      } catch (err) {
        console.error('Error filtering apartments by location:', err);
        setError('Failed to filter apartments by location.');
      } finally {
        setLoading(false);
      }
    };
    
    filterByLocation();
  }, [selectedLocation]);

  // Handle price filter
  useEffect(() => {
    const filterByPrice = async () => {
      if (!selectedPrice) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Parse price range from selected option
        const priceRange = selectedPrice.replace('₦', '').split(' - ');
        const minPrice = priceRange[0].replace('k', '000').replace('mil', '000000');
        const maxPrice = priceRange[1]?.replace('k', '000').replace('mil', '000000');
        
        const response = await apartmentService.searchByPriceRange(minPrice, maxPrice);
        if (response && response.data) {
          setApartments(response.data);
        } else if (Array.isArray(response)) {
          setApartments(response);
        } else {
          setApartments([]);
        }
        setCurrentPage(1);
      } catch (err) {
        console.error('Error filtering apartments by price:', err);
        setError('Failed to filter apartments by price.');
      } finally {
        setLoading(false);
      }
    };
    
    filterByPrice();
  }, [selectedPrice]);

  // Handle bed filter
  useEffect(() => {
    const filterByBeds = async () => {
      if (!selectedBeds) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await apartmentService.searchByBedrooms(selectedBeds);
        if (response && response.data) {
          setApartments(response.data);
        } else if (Array.isArray(response)) {
          setApartments(response);
        } else {
          setApartments([]);
        }
        setCurrentPage(1);
      } catch (err) {
        console.error('Error filtering apartments by bedrooms:', err);
        setError('Failed to filter apartments by bedrooms.');
      } finally {
        setLoading(false);
      }
    };
    
    filterByBeds();
  }, [selectedBeds]);

  // Handle type filter
  useEffect(() => {
    const filterByType = async () => {
      if (!selectedType) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await apartmentService.searchByType(selectedType);
        if (response && response.data) {
          setApartments(response.data);
        } else if (Array.isArray(response)) {
          setApartments(response);
        } else {
          setApartments([]);
        }
        setCurrentPage(1);
      } catch (err) {
        console.error('Error filtering apartments by type:', err);
        setError('Failed to filter apartments by type.');
      } finally {
        setLoading(false);
      }
    };
    
    filterByType();
  }, [selectedType]);

  // Handle more filters application
  const handleApplyMoreFilters = async (filters) => {
    setMoreFilters(filters);
    
    try {
      setLoading(true);
      setError(null);
      
      // Apply combined filters
      const response = await apartmentService.searchWithFilters({
        type: filters.type !== 'Studio' ? filters.type : undefined,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        bedrooms: filters.bedrooms,
        bathrooms: filters.bathrooms,
        rentalPeriod: filters.rentalPeriod !== 'Any' ? filters.rentalPeriod : undefined,
        location: selectedLocation || undefined
      });
      
      if (response && response.data) {
        setApartments(response.data);
      } else if (Array.isArray(response)) {
        setApartments(response);
      } else {
        setApartments([]);
      }
      setCurrentPage(1);
    } catch (err) {
      console.error('Error applying more filters:', err);
      setError('Failed to apply filters.');
    } finally {
      setLoading(false);
    }
  };

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
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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
                  placeholder="Enter address, zip, city, or apartment name"
                  className="w-full px-4 md:px-5 py-3 md:py-3 text-lg md:text-base text-gray-600 bg-transparent md:bg-white focus:outline-none md:rounded-lg md:border md:border-gray-200 md:focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchTerm.trim()) {
                      setSearchLocation(searchTerm);
                      setShowSearchResults(true);
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    if (searchTerm.trim()) {
                      setSearchLocation(searchTerm);
                      setShowSearchResults(true);
                    }
                  }}
                  disabled={!searchTerm.trim()}
                  className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 mt-3 md:mt-0 bg-[#40D1B3] text-white py-2 md:py-2 px-6 md:px-5 rounded-3xl md:rounded-3xl text-lg md:text-base font-medium hover:bg-[#35B095] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 md:gap-4 mt-6 overflow-x-auto md:overflow-visible pb-2 px-4 md:px-0 md:flex-wrap">
              <button onClick={() => setIsMoreFiltersOpen(true)} className="md:hidden flex-none px-6 md:px-2 py-3 md:py-2 rounded-xl md:rounded-lg border border-gray-700 hover:shadow-md flex items-center gap-2 text-gray-900">
                <Image src={PurpleFilter} alt="Filter" className="w-5 h-5" width={24} height={24}/>
              </button>
              
              {/* Location Filter */}
              <div className="relative w-[120px] md:w-[90px] flex-none">
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedLocation(value);
                    if (!value) {
                      // Reset to all apartments when no location is selected
                      window.location.reload();
                    }
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedPrice(value);
                    if (!value) {
                      // Reset to all apartments when no price is selected
                      window.location.reload();
                    }
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedType(value);
                    if (!value) {
                      // Reset to all apartments when no type is selected
                      window.location.reload();
                    }
                  }}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedBeds(value);
                    if (!value) {
                      // Reset to all apartments when no bed count is selected
                      window.location.reload();
                    }
                  }}
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
              
              <button 
                onClick={() => setIsMoreFiltersOpen(true)}
                className="text-sm px-1.5 py-2 rounded-lg bg-purple-800 text-white hidden md:inline-flex items-center space-x-2">
                <Image src="/icons/Filter.svg" alt="Filter" className="w-3 h-3" width={24} height={24}/>
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
      {loading ? (
        <div className="space-y-6">
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
              <span>Loading apartment listings...</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-pulse">
                <div className="bg-gray-200 h-48 w-full rounded-lg"></div>
                <div className="py-2 md:px-2">
                  <div className="h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="flex gap-4 mb-2">
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col justify-center items-center py-8">
          <div className="text-red-500 text-center mb-4">{error}</div>
          {(error.includes('log in') || error.includes('session has expired')) && (
            <Link 
              href="/sign-in" 
              className="bg-primary text-white py-2 px-6 rounded-md text-sm font-medium hover:bg-primary/80 transition-colors"
            >
              Log In
            </Link>
          )}
        </div>
      ) : apartments.length === 0 ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">No apartments available at the moment.</div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:px- md:grid-cols-2 lg:grid-cols-2 gap-5">
            {currentApartments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
              <div className="relative">
                <Image
                  src={apt.image || Property}
                  alt={apt.title || 'Apartment'}
                  className="w-full h-48 object-cover rounded-lg"
                />
                {/* <Image
                  src={
                    apt.images && apt.images.length > 0
                      ? apt.images[0].original_image_url || apt.images[0].image
                      : (apt.image || Property)
                  }
                  alt={apt.title || apt.name || 'Apartment'}
                  width={500}
                  height={500}
                  className="w-full h-42 object-cover rounded-lg"
                /> */}
              {apt.tag && (
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-md text-xs font-medium ${apt.tag === 'NEW' ? 'bg-white text-purple-700' : 'bg-white text-emerald-700'}`}>
                  {apt.tag}
                </div>
              )}
              <button className="absolute top-3 right-3 p-1">
                <Image src={WishlistHeart} alt="Wishlist" />
              </button>
            </div>
                        
            <div className="py-2 md:px-2">
              <h3 className="text-sm font-bold text-gray-800 mb-2">{apt.title || apt.name}</h3>
              
              <div className="flex items-center gap-4 mb-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/bedroom.svg" className='w-5 h-5' width={20} height={20} alt="bedroom" />
                  <span>{apt.beds || apt.number_of_bedrooms || '--'}bed</span>
                </div>
                            
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/bath.svg" className='w-5 h-5' width={20} height={20} alt="bath" />
                  <span>{apt.baths || apt.number_of_bathrooms || '--'}bath</span>
                </div>
                            
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/ruler.svg" width={20} className='w-5 h-5' height={20} alt="ruler" />
                  <span>{apt.area || apt.area_size_sqm || '--'} m²</span>
                </div>
              </div>
                          
              <div className="flex items-center gap-1 mb-3 text-gray-600">
                <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={20} height={20} alt="location" />
                <span className="text-xs">{apt.location || apt.address}</span>
              </div>
                          
              <div className="flex items-center justify-between mb-2">
                <p className="text-base font-semibold text-green-800">₦ {apt.price || apt.rent || 'Price on request'}</p>
              </div>
              <Link href={`/apartment/${apt.id}`}>
                <div className="flex items-center justify-between mt-5 w-full" >
                    <button className="bg-complementary text-white text-center py-2 rounded-md text-base w-full font-medium hover:bg-emerald-800 transition-colors">
                      <span>Explore</span>
                    </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
          </div>
          
          {/* Pagination */}
          {apartments.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col md:flex-row items-center justify-between px-4 mt-8 gap-4">
              <div className="text-sm text-gray-600 order-2 md:order-1">
                Showing {startIndex + 1}-{Math.min(endIndex, apartments.length)} of {apartments.length} apartments
              </div>
              
              <div className="flex items-center gap-2 order-1 md:order-2">
                <button 
                  className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    
                    // On mobile, show max 5 pages with ellipsis logic
                    if (totalPages > 5) {
                      if (pageNumber === 1 || pageNumber === totalPages) {
                        // Always show first and last page
                        return (
                          <button
                            key={pageNumber}
                            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md text-xs md:text-sm ${
                              currentPage === pageNumber
                                ? 'bg-complementary text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber >= currentPage - 1 && 
                        pageNumber <= currentPage + 1
                      ) {
                        // Show current page and adjacent pages
                        return (
                          <button
                            key={pageNumber}
                            className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md text-xs md:text-sm ${
                              currentPage === pageNumber
                                ? 'bg-complementary text-white'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 || 
                        pageNumber === currentPage + 2
                      ) {
                        // Show ellipsis
                        return (
                          <span key={pageNumber} className="px-1 text-gray-400 text-xs md:text-sm">
                            ...
                          </span>
                        );
                      }
                      return null;
                    } else {
                      // Show all pages if 5 or fewer
                      return (
                        <button
                          key={pageNumber}
                          className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-md text-xs md:text-sm ${
                            currentPage === pageNumber
                              ? 'bg-complementary text-white'
                              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setCurrentPage(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                  })}
                </div>
                
                <button 
                  className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium flex items-center gap-1 ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <FiChevronRight size={12} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
                Looking for something specific? Our support team is ready to help you find the right home faster. Reach out to us using the contact details below, 
                and we’ll guide you through personalized options, early access to new listings, and exclusive property deals tailored to your needs.
              </p>
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm mb-1 text-gray-600">Phone Number</label>
                  <div className="flex items-center gap-0">
                    <span className="flex-1 px-4 py-2 rounded-l-lg bg-gray-50 border border-complementary text-sm">.</span>
                    <button 
                      onClick={() => navigator.clipboard.writeText('Phone Number')}
                      className="px-4 py-2 bg-emerald-700 text-white text-sm rounded-r-lg hover:bg-emerald-800 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-600">Email Address</label>
                  <span className="w-full block px-4 py-2 rounded-lg bg-gray-50 border border-complementary text-sm">
                    hello@solacely.app
                  </span>
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
              Looking for something specific? Our support team is ready to help you find the right home faster. Reach out to us using the contact details below, 
              and we’ll guide you through personalized options, early access to new listings, and exclusive property deals tailored to your needs.
            </p>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm mb-1 text-gray-600">Phone Number</label>
                <div className="flex items-center gap-0">
                  <span className="flex-1 px-4 py-2 rounded-l-lg bg-gray-50 border border-complementary text-sm">.</span>
                  <button 
                    onClick={() => navigator.clipboard.writeText('Phone Number')}
                    className="px-4 py-2 bg-emerald-700 text-white text-sm rounded-r-lg hover:bg-emerald-800 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div className='w-full'>
                <label className="block text-sm mb-1 text-gray-600">Email Address</label>
                <span className="w-full block px-4 py-2 rounded-lg bg-gray-50 border border-complementary text-sm">
                  hello@solacely.app
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
    <MoreFilters 
      isOpen={isMoreFiltersOpen}
      onClose={() => setIsMoreFiltersOpen(false)}
      onApplyFilters={handleApplyMoreFilters}
      initialFilters={moreFilters}
    />
    {/* Sticky Filter bar */}
    <StickyFilterBar
      show={showStickyFilter}
      locationOptions={locationOptions}
      priceOptions={priceOptions}
      typeOptions={typeOptions}
      bedOptions={bedOptions}
      setIsMoreFiltersOpen={setIsMoreFiltersOpen}
      locationDropdown={selectedLocation}
      priceDropdown={selectedPrice}
      typeDropdown={selectedType}
      bedDropdown={selectedBeds}
      setLocationDropdown={setSelectedLocation}
      setPriceDropdown={setSelectedPrice}
      setTypeDropdown={setSelectedType}
      setBedDropdown={setSelectedBeds}
    />
  </div>
  );
};

export default ApartmentsPage;