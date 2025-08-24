"use client"
import { whatWeOffer } from "@/Constant";
import Image from "next/image";
import AnimatedComponents from "@/UI/Components/Animations/AnimatedComponents";
import { slideInLeft } from "@/Constant";
import { offerSectionImage } from "@/assets/images";
import clsx from "clsx";
import { useState, useEffect, useRef } from 'react';

const Offer = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSecondSet, setShowSecondSet] = useState(false);
  const [flipping, setFlipping] = useState({});
  const totalSlides = whatWeOffer.length;
  const slideTimerRef = useRef(null);
  const desktopTimerRef = useRef(null);

  // Auto-advance slides for mobile
  useEffect(() => {
    if (window.innerWidth >= 768) return; // Only on mobile
    
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 5000);
    
    return () => clearInterval(slideTimerRef.current);
  }, [totalSlides]);

  // Desktop flip animation
  useEffect(() => {
    // Only for desktop
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    
    const flipCards = () => {
      // Start flipping animation
      setFlipping({
        0: true,
        1: true,
        2: true,
        3: true
      });
      
      // Toggle the showSecondSet state, which controls which cards are shown
      setShowSecondSet(prev => !prev);
      
      // After the animation completes, remove the flipping class
      setTimeout(() => {
        setFlipping({});
      }, 800);
    };

    // Flip cards every 8 seconds
    desktopTimerRef.current = setInterval(flipCards, 8000);
    
    return () => {
      clearInterval(desktopTimerRef.current);
    };
  }, []);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Reset timer when manually navigating
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
      slideTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, 4000);
    }
  };

  return (
    <section className=" bg-[url('/images/LandingPage/offer/Bg.png')] bg-left-top bg-fixed bg-cover w-screen p-2 md:px-8">
      <div className="landingpage-container flex flex-col md:flex-row items-center justify-between py-10 gap-4 md:gap-8">
        <figure className="w-full md:w-1/3 flex flex-col justify-end md:pt-40 md:pr-4">
          <h2 className=" text-center md:text-left">
            Smarter Housing Solutions
            <br />
             for{" "}
            <b className="text-green-400">Tenants, </b>
            <br />
            <b className="text-green-400">Landlords </b> and 
            <b className="text-green-400"> Investors </b>
          </h2>

          <Image
            src={offerSectionImage}
            width={200}
            height={200}
            alt="3d design"
            placeholder="blur"
            className=" hidden md:block w-64 h-64"
          />
        </figure>

        <div className="w-full md:w-2/3 max-md:relative max-md:overflow-hidden max-md:w-full group">
          <div className="md:grid md:grid-cols-2 md:gap-6 max-md:flex max-md:transition-all max-md:duration-500 max-md:pb-4 max-md:w-full" 
               style={{ 
                 transform: `translateX(-${currentSlide * 100}%)`,
                 gap: "12px", 
                 paddingRight: "12px" 
               }}>
          {whatWeOffer.map((item, index) => {
            // Only render first 8 items
            if (index >= 8) return null;
            
            // For mobile, render all items; for desktop, only render first 4 positions
            if (index >= 4 && typeof window !== "undefined" && window.innerWidth >= 768) return null;
            
            // Get front and back items
            const frontItem = whatWeOffer[index];
            const backItem = whatWeOffer[index + 4] || item;
            const isFlipping = flipping[index % 4];
            
            // For mobile view - simple rendering
            if (typeof window !== "undefined" && window.innerWidth < 768) {
              return (
                <article
                  key={index}
                  className={clsx(
                    "h-fit p-6 flex flex-col transition-all duration-200",
                    "bg-white rounded-xl shadow-sm min-w-[95%] w-[90%] flex-shrink-0 mx-3"
                  )}
                >
                  <Image
                    src={item.icon}
                    width={35}
                    height={35}
                    alt="icon"
                    className="w-10"
                  />

                  <div>
                    <h4 className="text-lg font-semibold my-3.5">{item.header}</h4>
                    <p>{item.offer}</p>
                  </div>
                </article>
              );
            }
            
            // For desktop view - card flip
            return (
              <div
                key={index}
                className={clsx(
                  "flip-card", // flip card container
                  "md:h-full w-full",
                  "md:shadow-sm",
                  index % 4 === 0 && "md:border-r md:border-b border-dashed border-black/30",
                  index % 4 === 1 && "md:border-b border-dashed border-black/30",
                  index % 4 === 2 && "md:border-r border-dashed border-black/30"
                )}
              >
                <div className={clsx(
                  "flip-card-inner",
                  isFlipping && "flipping",
                  showSecondSet && "flipped"
                )}>
                  {/* Front of card */}
                  <div className="flip-card-front">
                    <article className="h-fit p-6 flex flex-col cursor-pointer">
                      <Image
                        src={frontItem.icon}
                        width={35}
                        height={35}
                        alt="icon"
                        className="w-10"
                      />

                      <div>
                        <h4 className="text-lg font-semibold my-3.5">{frontItem.header}</h4>
                        <p>{frontItem.offer}</p>
                      </div>
                    </article>
                  </div>
                  
                  {/* Back of card */}
                  <div className="flip-card-back">
                    <article className="h-fit p-6 flex flex-col cursor-pointer">
                      <Image
                        src={backItem.icon}
                        width={35}
                        height={35}
                        alt="icon"
                        className="w-10"
                      />

                      <div>
                        <h4 className="text-lg font-semibold my-3.5">{backItem.header}</h4>
                        <p>{backItem.offer}</p>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
          
          {/* Navigation dots - Only visible on mobile */}
          <div className="hidden max-md:flex justify-center mt-6 space-x-2">
            {whatWeOffer.map((_, index) => (
              <button 
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-green-400 transform scale-125" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @media (min-width: 768px) {
          /* Card Flip Styling */
          .flip-card {
            perspective: 1000px;
            background-color: transparent;
            height: 100%;
            min-height: 280px; /* Ensure sufficient height */
            display: block;
            overflow: hidden;
            position: relative;
          }
          
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: left;
            transition: transform 0.8s;
            transform-style: preserve-3d;
            /* Make sure pointer events work through the container */
            pointer-events: none;
          }
          
          /* Apply flip animation */
          .flipping {
            animation: flipAnimation 0.8s;
          }
          
          /* Keep card flipped */
          .flipped {
            transform: rotateY(-180deg);
          }
          
          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden; /* Safari */
            backface-visibility: hidden;
            border-radius: 0.75rem;
            background-color: transparent;
            transition: opacity 0.2s, visibility 0.2s;
            /* Re-enable pointer events for the card faces */
            z-index: 50;
            overflow: hidden;
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
          }
          
          /* Hover effects properly moved to the articles themselves */
          .flip-card-front article:hover, .flip-card-back article:hover {
            background-color: white;
            transform: scale(1.05);
            border-radius: 0.75rem;
          }
          
          .flip-card-front {
            background-color: transparent;
            z-index: 2;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
          .flipped .flip-card-front {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
          
          .flip-card-back {
            background-color: transparent;
            transform: rotateY(-180deg);
            z-index: 1;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
          .flipped .flip-card-back {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
          
          /* Article backgrounds */
          .flip-card-front article, .flip-card-back article {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 0.75rem;
            transition: all 0.2s;
          }
          
          .flip-card-front article, .flip-card-back article {
            height: 100%;
            width: 100%;
          }
          
          @keyframes flipAnimation {
            from {
              transform: rotateY(0deg);
            }
            to {
              transform: rotateY(-180deg);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default Offer;
