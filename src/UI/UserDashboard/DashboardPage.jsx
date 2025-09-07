"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import {Property, HouseIllustration, WishlistHeart, WalletIcon} from "@/assets/images"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {VerifiedIcon, homeIcon, locationIcon, contractIcon} from "@/assets/icons"
import { apartmentService } from "@/lib/api"
import { useAuthStatus } from "@/hooks/useAuthGuard"

const formatUserName = (user) => {
  if (!user) return '';
  return user.full_name || 'User';
};

function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [userName, setUserName] = useState('')
  const [apartments, setApartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const ITEMS_PER_PAGE = 6
  // State to check if user has a rented apartment
  const [hasRentedApartment, setHasRentedApartment] = useState(true) // Set to true for demo

  // Check authentication status
  const { isAuthenticated, user, hasValidToken } = useAuthStatus();

  // Calculate pagination
  const totalPages = Math.ceil(apartments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentApartments = apartments.slice(startIndex, endIndex)

  useEffect(() => {
    // Get user data from auth hook or localStorage as fallback
    if (user) {
      setUserName(formatUserName(user));
    } else if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserName(formatUserName(parsedUser));
      }
    }
  }, [user]);

  // Fetch apartments from API
  useEffect(() => {
    const fetchApartments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🏠 Fetching apartment listings...');
        
        // Try to fetch apartments
        const response = await apartmentService.getListings();
        
        // Handle the response data structure
        if (response && response.data) {
          console.log('✅ Successfully fetched apartments:', response.data.length);
          setApartments(response.data);
        } else if (Array.isArray(response)) {
          console.log('✅ Successfully fetched apartments:', response.length);
          setApartments(response);
        } else {
          console.log('⚠️ No apartments found in response');
          setApartments([]);
        }
      } catch (err) {
        console.error('❌ Error fetching apartments:', err);
        
        // More specific error handling
        if (err.status === 401) {
          // Check if user is logged in
          if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('user');
            const token = localStorage.getItem('authToken');
            
            if (!userData || !token || token === 'undefined' || token === 'null') {
              setError('Please log in to view apartment listings.');
            } else {
              setError('Your session has expired. Please log in again to view apartments.');
              // Clean up invalid auth data
              localStorage.removeItem('authToken');
            }
          } else {
            setError('Please log in to view apartment listings.');
          }
        } else if (err.status === 403) {
          setError('Access forbidden. You do not have permission to view apartments.');
        } else if (err.status === 404) {
          setError('Apartment listings not found. The endpoint might not be available.');
        } else if (err.message?.includes('Network error') || err.message?.includes('aborted')) {
          setError('Network connection error. Please check your internet connection and try again.');
        } else {
          setError('Failed to load apartments. Please try again later.');
        }
        setApartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);
  
  // Rented apartment details
  const rentedApartment = {
    title: "Northwest Studio Apartment",
    type: "Apartment",
    location: "1998 Wufma Minnessota, Festac",
    rent: "₦85,000/month",
    rentLabel: "Monthly Rent",
    contractType: "Contract",
    contractLabel: "Rental Agreement"
  }

  return (
        
        <main className="md:p-6">
          <div className="md:hidden mb-8">
            <h1 className="text-lg font-medium">Hi {userName || 'user'}</h1>
            <p className="text-base font-medium text-gray-500">Welcome back!</p>
          </div>
          {/* Rental Information Card */}
          <div className="bg-purple-50 rounded-lg overflow-hidden mb-8">
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between relative">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-semibold text-gray-600">Rental Information</h2>
                  <span>
                  <Image src={VerifiedIcon} alt="Verified" />
                  </span>
                </div>

                {!hasRentedApartment && (
                  <p className="text-base text-gray-500 py-6">
                    You have not rented any apartment yet. Explore to find our listings<br />
                    to find an Apartment you may like
                  </p>
                )}
                {/* Rental Details */}
                {hasRentedApartment && (
                  <div className="mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Apartment Name */}
                      <div className="rounded-md flex items-start gap-3">
                        <div className="bg-complementary text-white p-2 rounded-md">
                          <Image src={homeIcon} alt="Home" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{rentedApartment.title}</p>
                          <p className="text-gray-400 text-sm">{rentedApartment.type}</p>
                        </div>
                      </div>
                      
                      {/* Location */}
                      <div className="rounded-md flex items-start gap-3">
                        <div className="bg-complementary text-white p-2 px-3 rounded-md">
                          <Image src={locationIcon} alt="Location" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{rentedApartment.location}</p>
                          <p className="text-gray-400 text-sm">Location</p>
                        </div>
                      </div>
                      
                      {/* Monthly Rent */}
                      <div className="rounded-md flex items-start gap-3">
                        <div className="bg-complementary text-white p-2 rounded-md">
                          <Image src={WalletIcon} alt="Monthly Rent" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{rentedApartment.rent}</p>
                          <p className="text-gray-400 text-sm">{rentedApartment.rentLabel}</p>
                        </div>
                      </div>
                      
                      {/* Contract */}
                      <div className="rounded-md flex items-start gap-3">
                        <div className="bg-complementary text-white p-2 rounded-md">
                          <Image src={contractIcon} alt="Contract" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{rentedApartment.contractType}</p>
                          <p className="text-gray-400 text-sm">{rentedApartment.contractLabel}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="absolute top-0 right-0 hidden md:block h-full">
                <Image
                  src={HouseIllustration}
                  alt="House illustration"
                  className="h-full object-contain"
                />
              </div>
            </div>
            
            
          </div>
          {hasRentedApartment && (
          <div className="bg-purple-50 rounded-lg overflow-hidden mb-8">
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  {/* Rent payment info */}
                  <div className="flex items-start gap-3 mb-8 md:mb-2">
                    <div className="w-6 h-6">
                      <Image src="/icons/UserDashboard/Wallet.svg" width={24} height={24} alt="Contract" />
                    </div>
                    <div>
                      <h2 className="text-base text-gray-600 font-bold">Next payment due September 23rd, 2025</h2>
                    </div>
                  </div>
                  
                  <div className="md:flex md:justify-end">
                    <Link href="/wallet" className="bg-primary text-white py-2 px-6 rounded-md text-base font-medium hover:bg-primary/80 focus:outline-none focus:ring-2">
                      Make Payment
                    </Link>
                  </div>
                </div>
            </div>
          </div>
          )}
          
          {/* Listings Section */}
          <div className="mb-6 mt-6 p-1 md:p-4 rounded-lg bg-white md:border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-800">Explore Listings</h2>
              <Link href="/apartment" className="text-sm text-gray-600 font-medium flex bg-gray-50 rounded-md px-2 py-1 items-center">
                View all <ChevronRight size={16} />
              </Link>
            </div>
            
            {/* Grid of Apartments */}
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">Loading apartment listings...</div>
              </div>
            ) : apartments.length === 0 ? (
              <div className="flex justify-center items-center py-8">
                <div className="text-gray-500">No apartments available</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:px-4 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentApartments.map((apt) => (
                  <div key={apt.id} className="bg-white rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src={apt.image || Property}
                        alt={apt.title || 'Apartment'}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button className="absolute top-3 right-3 p-1">
                        <Image src={WishlistHeart} alt="Wishlist" />
                      </button>
                    </div>
                    
                    <div className="py-2">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">{apt.title || apt.name}</h3>
                        
                      <div className="flex items-center gap-4 mb-2 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Image src="/icons/UserDashboard/bedroom.svg" width={20} height={20} alt="bedroom" />
                          <span>{apt.beds || apt.number_of_bedrooms || '--'}bed</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Image src="/icons/UserDashboard/bath.svg" width={20} height={20} alt="bath" />
                          <span>{apt.baths || apt.number_of_bathrooms || '--'}bath</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Image src="/icons/UserDashboard/ruler.svg" width={20} height={20} alt="ruler" />
                          <span>{apt.area || apt.area_size_sqm || '--'}m²</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 mb-3 text-gray-600">
                        <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={20} height={20} alt="location" />
                        <span className="text-xs">{apt.location || apt.address}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-green-800">
                          ₦ {apt.price || apt.rent || 'Price on request'}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Link href={`/apartment/${apt.id}`} className="bg-complementary text-white px-5 py-2 rounded-md text-sm font-medium w-full hover:bg-green-600 transition-colors">
                          <button>
                            Explore
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {apartments.length > ITEMS_PER_PAGE && (
              <div className="flex flex-col md:flex-row items-center justify-between px-4 mt-6 gap-4">
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
                    Next <ChevronRight size={12} className="md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
  );
};

export default DashboardPage