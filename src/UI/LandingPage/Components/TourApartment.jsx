
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginPromptModal from "./LoginPromptModal";
import authService from "@/lib/api/services/authService";

export default function TourApartment() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const handleSearch = () => {
    if (authService.isAuthenticated()) {
      router.push("/apartment");
    } else {
      setShowModal(true);
    }
  };

  const toggleFavorite = (apartmentId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(apartmentId)) {
        newFavorites.delete(apartmentId);
      } else {
        newFavorites.add(apartmentId);
      }
      return newFavorites;
    });
  };

  const apartments = [
    {
      id: 1,
      image: "/images/Apartments/apartmentOne.png",
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      sqft: "8,725sqft",
      location: "1998 Wufma Minnesota, Festac",
      price: "₦24,000,000",
      badge: "NEW",
      badgeColor: "bg-green-500"
    },
    {
      id: 2,
      image: "/images/Apartments/apartmentTwo.png",
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      sqft: "8,725sqft",
      location: "1998 Wufma Minnesota, Festac",
      price: "₦24,000,000",
      badge: "RECOMMENDED",
      badgeColor: "bg-blue-500"
    },
    {
      id: 3,
      image: "/images/Apartments/apartmentThree.png",
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      sqft: "8,725sqft",
      location: "1998 Wufma Minnesota, Festac",
      price: "₦24,000,000",
      badge: "NEW",
      badgeColor: "bg-green-500"
    },
    {
      id: 4,
      image: "/images/Apartments/apartmentFour.png",
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      sqft: "8,725sqft",
      location: "1998 Wufma Minnesota, Festac",
      price: "₦24,000,000",
      badge: "RECOMMENDED",
      badgeColor: "bg-blue-500"
    }
  ];

  return (
    <div className="mt-8">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="w-full md:flex-1 flex items-center px-6 py-2 rounded-xl border border-gray-300 shadow-sm">
          <Image
            src="/icons/search.svg"
            width={20}
            height={20}
            alt="search"
            className="w-8 h-8"
          />
          <input
            placeholder="Enter a city or style"
            className="pl-2 flex-1 bg-transparent outline-none text-gray-600"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="self-start w-fit md:w-auto bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Apartment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2">
              <Image 
                src={apartment.image} 
                alt={apartment.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              {apartment.badge && (
                <div className="absolute top-3 left-3 bg-white text-xs font-medium px-2 py-1 rounded">
                  {apartment.badge}
                </div>
              )}
              <button 
                onClick={() => toggleFavorite(apartment.id)}
                className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow hover:bg-gray-100"
              >
                <svg className={`w-5 h-5 ${favorites.has(apartment.id) ? 'text-primary fill-primary' : 'text-gray-500'}`} fill={favorites.has(apartment.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <div className="p-4 w-full md:w-1/2">
              <h3 className="font-medium text-lg mb-2">{apartment.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/bedroom.svg" alt="bed" width={16} height={16} className="w-4 h-4" />
                  <span>{apartment.beds}bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/bath.svg" alt="bath" width={16} height={16} className="w-4 h-4" />
                  <span>{apartment.baths}bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <Image src="/icons/UserDashboard/ruler.svg" alt="area" width={16} height={16} className="w-4 h-4" />
                  <span>{apartment.sqft}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <Image src="/icons/UserDashboard/location.svg" alt="location" width={16} height={16} className="w-4 h-4" />
                <p>{apartment.location}</p>
              </div>
              <div className="font-semibold mb-2 text-emerald-700">
                {apartment.price}<span className="font-normal">/month</span>
              </div>
              <div className="flex justify-between items-center w-full">
                <button 
                  onClick={handleSearch}
                  className="bg-white border border-complementary text-complementary px-6 py-2 rounded-lg text-base font-medium hover:bg-complementary hover:text-white transition-colors w-full"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <LoginPromptModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
