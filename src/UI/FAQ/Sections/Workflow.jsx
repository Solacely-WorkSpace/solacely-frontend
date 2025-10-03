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
                What Sets Us Apart
              </h2>
            </div>
            
            <div className="space-y-6 text-[#515151] text-base leading-relaxed">
              <p>
                At Solacely, we're not just another real estate platform. We're a community-driven ecosystem 
                that rewards tenants for being responsible renters. Our TRC (Tenant Reward Credit) program 
                allows tenants to earn money by completing tasks and activities on our platform, which 
                can be used towards rent payments. 
              </p>
              
              <p>
                This unique approach not only incentivizes responsible 
                behavior but also provides a sense of community and belonging. For landlords, our secure payment 
                system ensures prompt rent payments, with funds held in escrow until tenants confirm 
                satisfaction with the property.
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-white border border-gray-300 text-txt px-6 py-3 rounded-lg font-medium hover:bg-complementary hover:text-white transition-colors">
                Get in touch
              </button>
              <button className="bg-complementary text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors">
                Our process
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
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