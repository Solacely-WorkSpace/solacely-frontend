
import { React, useState, useEffect} from "react";
import { useAuthStatus } from "@/hooks/useAuthGuard";
import AnimateNav from "@/UI/Components/Animations/AnimateNav";
import { slideInLeft } from "@/Constant";

const AiPopuop = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
      // Check if user is logged in
      const checkLoginStatus = () => {
        const authToken = localStorage.getItem('authToken');
        setIsLoggedIn(!!authToken);
      };
  
      checkLoginStatus();
      // Add event listener for storage changes
      window.addEventListener('storage', checkLoginStatus);
      
      return () => {
        window.removeEventListener('storage', checkLoginStatus);
      };
    }, []);


  return (
    <AnimateNav animation={slideInLeft}>
      <div className=" flex justify-center mt-20 ">
        <button className="w-fit bg-transparent  border border-gray-300 text-black shadow-none mt-10 py-4 px-12 rounded-4xl flex flex-col items-center w-[400px]">
          <div className="">
            <span className=" border border-gray-300 px-2 py-1.5 rounded-2xl mr-4 text-sm font-medium mb-2">
              New
            </span>
            <span className="text-sm font-semibold">Hi, i'm Solacely AI</span>
          </div>
          {isLoggedIn && (
            <input
              type="text"
              placeholder="What are you looking?"
              className="mt-6 w-full rounded-full border border-gray-300 px-6 py-4 text-base text-gray-500 outline-none"

            />
          )}
        </button>
      </div>
    </AnimateNav>
  );
};

export default AiPopuop;
