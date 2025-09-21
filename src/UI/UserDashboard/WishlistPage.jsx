"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {Property, WishlistHeart, Clipboard} from "@/assets/images"

function WishlistPage() {
  const [hasWishlistItems, setHasWishlistItems] = useState(true) // Set to true to see the wishlist items
  const [currentPage, setCurrentPage] = useState(1)
  
  // Sample apartments data for the wishlist (when hasWishlistItems is true)
  const apartments = [
    {
      id: 1,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.72sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month"
    },
    {
      id: 2,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.72sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month"
    },
    {
      id: 3,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.79sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month"
    },
    {
      id: 4,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month"
    },
    {
      id: 5,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000/month"
    },
    {
      id: 6,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Lasdo",
      price: "₦24,000,000/month"
    }
  ]
  
  return (
    <main className="md:p-6">
      <div className="md:hidden md:block mb-8">
        <h1 className="text-xl font-medium">Wishlist</h1>
      </div>
      {/* Empty Wishlist State */}
      {!hasWishlistItems && (
        <div className="flex mt-16 flex-col items-center justify-center p-5 rounded-md w-full mx-auto">
          <div className="relative w-40 h-40 mb-5">
            <Image src={Clipboard} alt="Clipboard" />
          </div>
          <p className="text-center text-gray-500 text-sm mb-5">
            You do not have any Apartment on your wish-list. Explore available<br className="hidden md:block" />
            apartments to find a suitable apartment you'll love
          </p>
          <Link href="">
            <button className="bg-primary text-white py-2 px-6 rounded-md text-base font-medium hover:bg-purple-800 focus:outline-none focus:ring-2">
              Explore Apartments
            </button>
          </Link>
        </div>
      )}

      {/* Wishlist Items Display */}
      {hasWishlistItems && (
        <div className="mt-4">
          {/* Grid of Apartments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {apartments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-lg overflow-hidden">
                <div className="relative">
                  <Image
                    src={Property}
                    alt={apt.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button className="absolute top-3 right-3 p-1">
                    <Image src={WishlistHeart} alt="Remove from Wishlist" />
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
                  
                  <div className="flex items-center gap-2">
                    <button className="bg-complementary text-white px-4 py-2 w-full rounded-md text-sm font-medium flex-1 hover:bg-green-600 transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {apartments.length > 0 && (
            <div className="flex items-center gap-2 mt-6 mb-4">
              <button 
                className={`w-8 h-8 flex items-center justify-center rounded-md ${
                  currentPage === 1 ? 'bg-complementary text-white' : 'bg-white text-gray-600 border border-gray-200'
                }`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button 
                className="flex items-center justify-center gap-1 rounded-md bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 px-3 py-1"
                onClick={() => setCurrentPage(2)}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
              
              
    </main>
  );
}

export default WishlistPage