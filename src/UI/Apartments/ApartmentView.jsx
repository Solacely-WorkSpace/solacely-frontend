"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { memberOne, memberTwo} from '@/assets/images'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { WoodHouse, Kitchen, Bathroom, PropertyOne, PropertyTwo, PropertyThree, PropertyFour, LivingRoom } from '@/assets/images'

function ApartmentView() {
  const [sortBy, setSortBy] = useState('newest');
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    image: '',
    review: ''
  });
  
  // Gallery images
  const galleryImages = [
    { src: WoodHouse, alt: "Main apartment view" },
    { src: Kitchen, alt: "Kitchen view" },
    { src: Bathroom, alt: "Bathroom view" },
    { src: LivingRoom, alt: "Living room view" }
  ];

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission
    console.log('Review submitted:', reviewForm);
  };

  const apartments = [
    {
      id: 3,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.79sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000",
      image: PropertyOne
    },
    {
      id: 4,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000",
      image: PropertyTwo
    },
    {
      id: 5,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Festac",
      price: "₦24,000,000",
      image: PropertyThree
    },
    {
      id: 6,
      title: "1 Bedroom Apartment",
      beds: 4,
      baths: 1,
      area: "8.75sqft",
      location: "1998 Wulfrta Minnesota, Lasdo",
      price: "₦24,000,000",
      image: PropertyFour
    }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const paymentBreakdown = [
    { label: 'Light fee', amount: 0, period: '0 Year' },
    { label: 'Security Fee', amount: 0, period: '0 Year' },
    { label: 'Estate Due', amount: 0, period: '0 Year' },
    { label: 'Bin Contribution', amount: 0, period: '0 Year' },
    { label: 'House Rent', amount: 0, period: '0 Year' }
  ];

  return (
    <main className="landingpage-container px-4 md:px-0 mt-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-gray-600 hover:text-complementary">
          Home
        </Link>
        <FiChevronRight className="w-3 h-3 text-gray-900" />
        <Link href="/apartment" className="text-gray-900 hover:text-complementary">
          Apartments
        </Link>
        <FiChevronRight className="w-3 h-3 text-gray-900" />
        <span className="text-complementary">Northwest Office Space</span>
      </nav>

      <div className="space-y-6">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 mb-8">
          <div className="md:col-span-6 relative md:h-[80vh] h-[60vh] rounded-xl overflow-hidden">
            <Image
              src={WoodHouse}
              alt="Main apartment view"
              fill
              className="object-fit"
              priority
            />
          </div>
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative h-[39vh] rounded-xl overflow-hidden hidden md:block">
              <Image
                src={Kitchen}
                alt="Kitchen view"
                fill
                className="object-fit"
              />
            </div>
            <div className="relative h-[39vh] rounded-lg overflow-hidden hidden md:block">
              <Image
                src={Bathroom}
                alt="Bathroom view"
                fill
                className="object-fit"
              />
              <div className="absolute bottom-5 right-5">
                <button 
                  onClick={() => setShowGallery(true)} 
                  className="bg-[#00000199] text-white px-4 py-3 rounded-lg flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="font-medium">View Images</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Dots indicator for image gallery */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <div className="w-8 h-2 bg-black rounded-full"></div>
          <div className="w-3 h-2 bg-gray-300 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-end gap-4 mt-4">
          <button 
            onClick={() => setShowGallery(true)}
            className="flex items-center justify-center md:justify-start gap-1 px-1 py-1.5 w-full md:w-fit rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <span>View Images</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="relative w-full md:w-fit">
            <div className="absolute -top-4 left-0 right-0 text-center">
              <span className="bg-complementary text-primary text-[10px] font-medium px-0.5 py-0.5 rounded">Coming Soon</span>
            </div>
            <button className="flex items-center justify-center md:justify-start gap-2 px-1 py-1.5 w-full md:w-fit rounded-lg border border-primary text-primary">
              <span>View Video Tour</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
          <div>
            <div>
              <div className="flex items-center gap-1 mb-3 text-gray-600">
                <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={20} height={20} alt="location" />
                <span className="text-xs">1998 Wulma Minnesota, Festac</span>
              </div>
              <h1 className="text-2xl font-semibold mb-2">Northwest Studio Apartment</h1>
            </div>

            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-1">
                <Image src="/icons/UserDashboard/bedroom.svg" width={20} height={20} alt="bedroom" />
                <span>4bed</span>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/icons/UserDashboard/bath.svg" width={20} height={20} alt="bath" />
                <span>2bath</span>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/icons/UserDashboard/ruler.svg" width={20} height={20} alt="ruler" />
                <span>8,725sqft</span>
              </div>
              <div className="flex items-center justify-between mb-2 hidden md:block">
                <p className="text-lg font-bold text-complementary">₦4,000,000/month</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2 mt-2 md:hidden">
              <p className="text-lg font-bold text-complementary">₦4,000,000/month</p>
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-4 mt-6">
              <button className="bg-complementary text-white py-3 px-10 rounded-lg hover:bg-emerald-800 transition-colors">
                I'm interested
              </button>
            </div>
            {/* Share and Like */}
            <div className="flex items-center gap-4 mt-6">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
                <Image src="/icons/Line.svg" className="w-6 h-5" width={20} height={20} alt="line" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
                <Image src="/icons/Heart.svg" className="w-6 h-5" width={20} height={20} alt="heart" />
              </button>
            </div>
            {/* Description */}
            <p className="text-gray-600 mt-6">
              Totally updated and move-in ready in Hidden Pond! This home is better than new! Kitchen
              offers all new stainless steel appliances, lighting, and granite countertops. Master
              bathroom features new tile floor and designer tile shower.
            </p>
            <p className="text-sm text-gray-500 mt-6 border-b pb-6 border-gray-300">
              Listed by Phillip A Montague II, Atlanta Fine Homes Sotheby's International #6791910
            </p>
          </div>

          {/* Payment Breakdown */}
          <div className="">
            <h2 className="text-lg font-semibold mb-4">Payment Breakdown</h2>
            <p className="text-sm text-gray-600 mb-8">
              The annual fees below start at zero(0) except the house rent
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                {/* Desktop View */}
                <div className="hidden md:block">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 justify-between items-center py-2">
                    <p className="md:col-span-5 font-medium text-gray-500">Light fee</p>
                    <div className="md:col-span-3 flex items-center gap-2 justify-center border w-full border-gray-300 rounded-md">
                      <p className="text-sm text-gray-600 py-1">0 Year</p>
                      <Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={20} height={20} alt="chevron-arow" />
                    </div>
                    <p className="md:col-span-4 text-right font-medium">₦0.00</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 justify-between items-center py-2">
                    <p className="md:col-span-5 font-medium text-gray-500">Security Fee</p>
                    <div className="md:col-span-3 flex items-center gap-2 justify-center border w-full border-gray-300 rounded-md">
                      <p className="text-sm text-gray-600 py-1">0 Year</p>
                      <Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={20} height={20} alt="chevron-arow" />
                    </div>
                    <p className="md:col-span-4 text-right font-medium">₦0.00</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 justify-between items-center py-2">
                    <p className="md:col-span-5 font-medium text-gray-500">Estate Due</p>
                    <div className="md:col-span-3 flex items-center gap-2 justify-center border w-full border-gray-300 rounded-md">
                      <p className="text-sm text-gray-600 py-1">0 Year</p>
                      <Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={20} height={20} alt="chevron-arow" />
                    </div>
                    <p className="md:col-span-4 text-right font-medium">₦0.00</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 justify-between items-center py-2">
                    <p className="md:col-span-5 font-medium text-gray-500">Bin Contribution</p>
                    <div className="md:col-span-3 flex items-center gap-2 justify-center border w-full border-gray-300 rounded-md">
                      <p className="text-sm text-gray-600 py-1">0 Year</p>
                      <Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={20} height={20} alt="chevron-arow" />
                    </div>
                    <p className="md:col-span-4 text-right font-medium">₦0.00</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 justify-between items-center py-2 pb-6">
                    <p className="md:col-span-5 font-medium text-gray-500">House Rent</p>
                    <div className="md:col-span-3 flex items-center gap-2 justify-center border w-full border-gray-300 rounded-md">
                      <p className="text-sm text-gray-600 py-1">0 Year</p>
                      <Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={20} height={20} alt="chevron-arow" />
                    </div>
                    <p className="md:col-span-4 text-right font-medium">₦0.00</p>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden space-y-4">
                  {paymentBreakdown.map((item, index) => (
                    <div key={index} className="mb-4 last:mb-6">
                      <p className="font-medium text-gray-500 mb-2">{item.label}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 justify-center border border-gray-300 rounded-md">
                          <p className="text-sm text-gray-600 py-1">{item.period}</p>
                          <Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={20} height={20} alt="chevron-arow" />
                        </div>
                        <p className="text-right font-medium">₦{item.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              <div className="pt-4 border-t border-b pb-6 flex justify-between items-center border-gray-300">
                <p className="font-bold text-xl">Total Amount:</p>
                <p className="font-bold text-complementary text-xl">₦4,000,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-8">
          <div className="md:col-span-8">
            <h2 className="text-xl font-semibold mb-6">Home Details for Northwest Studio Apartment</h2>
            
            <div className="grid md:grid-cols-3 gap-y-4 mb-8 gap-5">
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">Condo</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">$1,044/sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">Built in 1905</span>
              </div>  
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">2 Days on Oval</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">Rooms: Dining Room</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">Heating: Forced Air</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">Cooling System: Central</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">Air Conditioning</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                <span className="text-gray-600">prepaid meter</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Home Defects</h3>
            <div className="space-y-4 mb-8 flex md:gap-20 flex-col md:flex-row">
              <div>
                <div className="flex items-center justify-between gap-20">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/Apartments/kitchensink.svg" className="w-6 h-6" width={24} height={24} alt="kitchen" />
                    <span>Kitchen Sink:</span>
                  </div>
                  <span className="text-complementary">₦25,000</span>
                </div>
                <div className="flex items-center justify-between gap-20 mt-4">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/Apartments/toiletsink.svg" className="w-6 h-6" width={24} height={24} alt="toilet" />
                    <span>Toilet Sink:</span>
                  </div>
                  <span className="text-complementary">₦25,000</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-20">
                  <div className="flex items-center gap-2">
                    <Image src="/icons/Apartments/AC.svg" className="w-6 h-6" width={24} height={24} alt="ac" />
                    <span>AC Repairs:</span>
                  </div>
                  <span className="text-complementary">₦25,000</span>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">Housing Agent</h3>
            <div className="flex items-center gap-4">
              <Image src={memberOne} className="w-12 h-12 rounded-full" width={48} height={48} alt="agent" />
              <div>
                <p className="font-medium">Mr Sandars Kemi</p>
                <p className="text-sm text-gray-600">Andromeda Homes Agent</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:sticky md:top-6">
            <h2 className="text-xl font-semibold mb-6">Map Location</h2>
            <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden bg-gray-100">
              <Image src="/icons/Apartments/Map.svg" fill className="object-cover" alt="map location" />
              <button className="absolute bottom-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Image src="/icons/Apartments/Apt.svg" width={16} height={16} alt="location" />
                Locate Apt.
              </button>
            </div>
          </div>
        </div>
          
        {/*Comments and reviews */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 mt-30">
          <div className="md:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">All Comments (6)</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden md:block">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 px-2 py-1 rounded-lg text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="helpful">Most helpful</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Image src={memberTwo} className="w-10 h-10 rounded-full" width={40} height={40} alt="reviewer" />
                    <div>
                      <p className="font-medium">Daisy Murphy</p>
                      <p className="text-sm text-gray-500">July 23 2020</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">
                    The place was amazing and it is pretty much close to great restaurants/cafes. A little
                    feedback is for the wifi, as the signal was not so stable so it was kind of painful for us
                  </p>
                  <button className="text-complementary text-sm hover:underline">Read more</button>
                </div>
              ))}
            </div>
            <button className="py-3 px-8 rounded-lg text-white bg-complementary">
              Load more reviews
            </button>
          </div>

          <div className="md:col-span-4 border border-gray-300 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Write your review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YOUR NAME:</label>
                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YOUR EMAIL:</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={reviewForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IMAGE:</label>
                <input
                  type="file"
                  name="image"
                  value={reviewForm.image}
                  onChange={handleInputChange}
                  placeholder="Upload image"
                  className="w-full px-4 py-2 border-dashed border-2 border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WRITE A REVIEW:</label>
                <textarea
                  name="review"
                  value={reviewForm.review}
                  onChange={handleInputChange}
                  placeholder="Enter review"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Related Properties */}
        <div className="pt-16 pb-10">
          <h2 className="text-2xl font-semibold mb-8">Related Properties</h2>
          <div className="-mx-5 px-5 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-4 gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
              {apartments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-lg overflow-hidden flex-none w-[85%] md:w-auto snap-center">
                  <div className="relative">
                    <div className="absolute top-4 left-4 bg-white text-primary text-xs font-medium px-2 py-1 rounded">
                      NEW
                    </div>
                    <Image
                      src={apt.image}
                      width={400}
                      height={300}
                      alt="property"
                      className="w-full h-[200px] object-cover"
                    />
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
                  </div>
                                    
                  <div className="flex items-center gap-1 mb-3 text-gray-600">
                    <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={20} height={20} alt="location" />
                    <span className="text-xs">{apt.location}</span>
                  </div>
                                    
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-green-800">{apt.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="bg-complementary text-white px-5 py-2 rounded-md text-sm font-medium w-full hover:bg-emerald-800 transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Image Gallery Modal */}
      {showGallery && (
        <div 
          className="fixed inset-0 bg-[#00000199] z-50 flex items-center justify-center p-4"
          onClick={() => setShowGallery(false)}
        >
          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the content from closing the modal
          >
            {/* Close button */}
            {/* <button 
              onClick={() => setShowGallery(false)} 
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <FiX className="w-6 h-6 text-gray-800" />
            </button> */}
            
            {/* Main image */}
            <div className="relative h-[60vh] md:h-[80vh] rounded-lg overflow-hidden">
              <Image
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                fill
                className="object-contain md:object-fit"
              />
              
              {/* Navigation buttons */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-4 justify-center items-center">
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
                  className="z-10 bg-[#00000199] hover:bg-[#000000] text-white p-3 rounded-lg transition-colors"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                
                <button 
                  onClick={() => setCurrentImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
                  className="z-10 bg-[#00000199] hover:bg-[#000000] text-white p-3 rounded-lg transition-colors"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </div>              
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ApartmentView;