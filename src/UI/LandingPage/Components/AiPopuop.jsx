
import { React, useState, useEffect} from "react";
import { useAuthStatus } from "@/hooks/useAuthGuard";
import AnimateNav from "@/UI/Components/Animations/AnimateNav";
import { slideInLeft } from "@/Constant";
import apartmentService from "@/lib/api/services/apartmentService";
import Image from "next/image";
import { Property } from "@/assets/images";
import Link from "next/link";
import { FiX } from "react-icons/fi";

const AiPopuop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
      // Check if user is logged in
      const checkLoginStatus = () => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
        
        // Try different possible keys for user data
        const possibleKeys = ['userInfo', 'user', 'userData', 'currentUser'];
        let foundName = '';
        
        for (const key of possibleKeys) {
          const data = localStorage.getItem(key);
          if (data) {
            try {
              const user = JSON.parse(data);
              console.log(`Found user data in ${key}:`, user);
              foundName = user.full_name || '';
              if (foundName) break;
            } catch (e) {
              console.log(`Error parsing ${key}:`, e);
            }
          }
        }
        
        console.log('Final userName:', foundName);
        setUserName(foundName);
      };
  
      checkLoginStatus();
      // Add event listener for storage changes
      window.addEventListener('storage', checkLoginStatus);
      
      return () => {
        window.removeEventListener('storage', checkLoginStatus);
      };
    }, []);

  const searchApartments = async (query) => {
    try {
      console.log('Searching for:', query);
      let response;
      try {
        response = await apartmentService.searchByLocation(query);
      } catch (searchError) {
        console.log('Search by location failed, trying getListings:', searchError);
        response = await apartmentService.getListings();
      }
      const apartmentData = response?.data || response || [];
      console.log('Found apartments:', apartmentData.length);
      setApartments(apartmentData);
    } catch (error) {
      console.error('Error searching apartments:', error);
      setApartments([]);
    }
  };


  return (
    <AnimateNav animation={slideInLeft}>
      <div className="flex justify-center mt-20 relative">
        <button className="w-fit bg-transparent  border border-gray-300 text-black shadow-none mt-10 py-4 px-12 rounded-4xl flex flex-col items-center w-[400px]">
          <div className="">
            <span className=" border border-gray-300 px-2 py-1.5 rounded-2xl mr-4 text-sm font-medium mb-2">
              New
            </span>
            <span className="text-sm font-semibold">
              {isLoggedIn && userName ? `Hi, ${userName}. I'm Solacely AI` : "Hi, I'm Solacely AI"}
            </span>
          </div>
          {isLoggedIn && (
            <input
              type="text"
              placeholder="What are you looking?"
              className="mt-6 w-full rounded-full border border-gray-300 px-6 py-4 text-base text-gray-500 outline-none"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowResults(e.target.value.length > 0);
                if (e.target.value.length > 0) {
                  searchApartments(e.target.value);
                }
              }}
            />
          )}
        </button>
        
        {showResults && searchQuery && apartments.length > 0 && (
          <div className="absolute top-full mt-2 w-[600px] bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
            <button 
              onClick={() => setShowResults(false)}
              className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full"
            >
              <FiX className="w-4 h-4 text-gray-500" />
            </button>
            <p className="text-sm text-gray-600 mb-4">AI-powered recommendations based on your preferences and budget.</p>
            <div className="grid grid-cols-2 gap-4">
              {apartments.slice(0, 2).map((apt, index) => (
                <div key={apt.id || index} className="border border-gray-200 rounded-lg p-3">
                  <Image
                    src={apt.image || Property}
                    alt={apt.title || 'Apartment'}
                    width={200}
                    height={96}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-1 rounded">RECOMMENDED</span>
                  </div>
                  <h3 className="font-medium text-sm">{apt.title || apt.name}</h3>
                  <p className="text-xs text-gray-500">{apt.location || apt.address}</p>
                  <p className="font-bold text-sm mt-1">₦{apt.price || apt.rent || 'Price on request'}</p>
                  <Link href={`/apartment/${apt.id}`}>
                    <button className="w-full bg-complementary text-white text-xs py-2 rounded mt-2">Explore</button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <Link href="/apartment">
                <button className="mt-4 py-2 px-6 bg-primary text-white border rounded-xl text-sm">See more</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AnimateNav>
  );
};

export default AiPopuop;
