"use client"

import React from 'react'

function Workflow() {
  return (
    <div className="landingpage-container py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-primary text-base font-semibold">Our workflow</p>
              <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-txt leading-tight">
                People first. Design later.
              </h2>
            </div>
            
            <div className="space-y-6 text-[#515151] text-base leading-relaxed">
              <p>
                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio 
                nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi 
                bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.
              </p>
              
              <p>
                Elit nisl in eleifend sed nisl. Pulvinar at orci, proin imperdiet commodo 
                consectetur convallis risus. Sed condimentum enim dignissim 
                adipiscing faucibus consequat, urna. Viverra purus et erat auctor 
                aliquam. Risus, volutpat vulputate posuere purus sit congue convallis 
                aliquet.
              </p>
              
              <p>
                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. 
                Non pellentesque congue eget consectetur turpis. Sapien, dictum 
                molestie sem tempor. Diam elit, orci, tincidunt aenean.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-white border border-gray-300 text-txt px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Get in touch
              </button>
              <button className="bg-complementary text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Our process
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <img 
                src="/images/Apartments/Livingroom.png" 
                alt="Modern living space" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Workflow