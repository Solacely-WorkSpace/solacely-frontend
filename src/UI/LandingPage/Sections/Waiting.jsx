"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { XSVG } from "@/assets/SVGAssets";
import { Testimonial } from "@/Constant";

const Waiting = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  
  const extendedTestimonials = [...Testimonial, ...Testimonial, ...Testimonial];
  const startIndex = Testimonial.length;

  useEffect(() => {
    setCurrentIndex(startIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex >= extendedTestimonials.length - Testimonial.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(startIndex);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    } else if (currentIndex < startIndex) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(extendedTestimonials.length - Testimonial.length - 1);
        setTimeout(() => setIsTransitioning(true), 50);
      }, 500);
    }
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <section className="px-4 rounded-sm">
      <div className="landingpage-container justify-center mx-auto flex flex-col items-center">
        <figure className="mb-4 w-20 h-20">
          <Image src="/icons/purple.svg" width={60} height={60} alt="heart" />
        </figure>

        <div className="font-rob md:w-1/2 mb-14 text-center">
          <h3 className="mb-3 text-2xl md:text-4xl font-semibold text-gray-800">
            10,000<span className="font-extrabold">+ </span> People are Waiting
          </h3>

          <p className="">
            Helping you in learning about new places and areas by allowing you<br className="hidden md:block"/> to
            experience them as if you were there.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto mb-6">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-black font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-black font-semibold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-12 py-4">
            <div 
              className={`flex items-center h-80 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
              style={{ transform: `translateX(calc(50% - ${currentIndex * 352}px - 176px))` }}
            >
              {extendedTestimonials.map((item, index) => {
                const isCenter = index === currentIndex;
                return (
                  <div
                    key={`${item.username}-${index}`}
                    className={`flex-shrink-0 mx-4 transition-all duration-500 w-80 ${
                      isCenter 
                        ? 'scale-115 z-10' 
                        : 'scale-90 opacity-60'
                    }`}
                  >
                    <div className={`rounded-2xl p-6 shadow-lg border flex flex-col ${
                      isCenter 
                        ? 'bg-purple-50 border-primary shadow-xl h-72 md:h-64' 
                        : 'bg-gray-50 border-gray-100 h-64'
                    }`}>
                      <div className="flex justify-between items-center mb-4">
                        <figure className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={item.pic}
                            height={48}
                            width={48}
                            alt="Picture"
                            className="w-full h-full object-cover"
                          />
                        </figure>
                        <div className="text-black">
                          <XSVG />
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed flex-1 overflow-hidden">
                        {item.testimony}
                      </p>

                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.username}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {Testimonial.map((_, index) => {
            const actualIndex = (currentIndex - startIndex + Testimonial.length) % Testimonial.length;
            return (
              <button
                key={index}
                onClick={() => setCurrentIndex(startIndex + index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === actualIndex ? 'bg-primary w-8' : 'bg-gray-300 w-4'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Waiting;
