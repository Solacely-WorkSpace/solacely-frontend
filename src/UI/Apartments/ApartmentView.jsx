"use client";


import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { apartmentService } from '@/lib/api';
import { Profile, memberTwo, WoodHouse, Kitchen, Bathroom, PropertyOne, PropertyTwo, PropertyThree, PropertyFour, LivingRoom } from '@/assets/images';

import InspectionBookingModal from './Components/InspectionBookingModal';
import PaymentSuccess from './Components/PaymentSuccess';
import { useRef } from 'react';
import DatePicker from './Components/DatePicker';

function ApartmentView() {
  // Handle date selection from DatePicker
  function handleDateSelect(date) {
    setSelectedDate(date);
    setShowDatePicker(false);
    // You can add further logic here, e.g., send the selected date to backend or show a confirmation
  }
  // Show DatePicker when Proceed to Book is clicked in PaymentSuccess
  function handleProceedToDatePicker() {
    setShowSuccessModal(false);
    setShowDatePicker(true);
  }
  const pathname = usePathname();
  const router = useRouter();
  const id = pathname?.split('/').pop();

  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewForm, setReviewForm] = useState({ name: '', email: '', image: '', review: '' });
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apartmentService.getApartmentById(id);
        if (response && response.id) {
          setApartment(response);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        if (err.status === 404) setError('Apartment not found.');
        else if (err.status === 401) setError('Please log in to view apartment details.');
        else setError(err.message || 'Failed to load apartment details.');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchApartmentDetails(); else { setError('No apartment ID provided'); setLoading(false); }
  }, [id]);

  // Handle inspection booking
  const handleCloseInspectionModal = () => {
    setShowInspectionModal(false);
  };

  const handleProceedToPayment = () => {
    // Payment is now handled in the InspectionBookingModal
    // We'll just close the modal here since payment confirmation
    // will happen in the PaymentModal component
    setShowInspectionModal(false);
    
    // After payment, we could navigate to a success page or show a confirmation
    // router.push('/payment/success?type=inspection');
  };

  // Use only direct image URLs, no fallbacks
  const apiImages = (apartment?.images || []).map((img, index) => {
    console.log(`Processing image ${index}:`, img);
    const url = img?.original_image_url || img?.image || '';
    console.log(`Extracted URL:`, url);
    // Clean up the URL
    const cleanUrl = url.replace(/^"|"$/g,'').replace(/^'|'$/g,'').trim();
    console.log(`Clean URL:`, cleanUrl);
    // If we have a full URL, use it directly
    if (/^https?:\/\//i.test(cleanUrl)) return cleanUrl;
    // If it's a cloudinary path, construct the full URL
    if (cleanUrl && !cleanUrl.startsWith('http')) {
      const cloudinaryUrl = cleanUrl.startsWith('image/upload/') 
        ? `https://res.cloudinary.com/dsar6jtux/${cleanUrl}`
        : `https://res.cloudinary.com/dsar6jtux/image/upload/${cleanUrl}`;
      console.log(`Constructed Cloudinary URL:`, cloudinaryUrl);
      return cloudinaryUrl;
    }
    console.log(`No valid URL found for image ${index}`);
    return '';
  }).filter(Boolean);

  // Debug logging
  if (apartment && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('Apartment data:', apartment);
    // eslint-disable-next-line no-console
    console.log('Raw images array:', apartment.images);
    // eslint-disable-next-line no-console
    console.log('Final apiImages:', apiImages);
  }

  const apartments = [
    { id: 3, title: '1 Bedroom Apartment', beds: 4, baths: 1, area: '8.79sqft', location: '1998 Wulfrta Minnesota, Festac', price: '₦24,000,000', image: PropertyOne },
    { id: 4, title: '1 Bedroom Apartment', beds: 4, baths: 1, area: '8.75sqft', location: '1998 Wulfrta Minnesota, Festac', price: '₦24,000,000', image: PropertyTwo },
    { id: 5, title: '1 Bedroom Apartment', beds: 4, baths: 1, area: '8.75sqft', location: '1998 Wulfrta Minnesota, Festac', price: '₦24,000,000', image: PropertyThree },
    { id: 6, title: '1 Bedroom Apartment', beds: 4, baths: 1, area: '8.75sqft', location: '1998 Wulfrta Minnesota, Lasdo', price: '₦24,000,000', image: PropertyFour }
  ];

  const handleInputChange = (e) => setReviewForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleReviewSubmit = (e) => { e.preventDefault(); };

  const paymentBreakdown = [
    { label: 'Light fee', amount: apartment?.utility_fees?.light_fee || 0, period: '1 Year' },
    { label: 'Security Fee', amount: apartment?.utility_fees?.security_fee || 0, period: '1 Year' },
    { label: 'Estate Due', amount: apartment?.utility_fees?.estate_due || 0, period: '1 Year' },
    { label: 'Bin Contribution', amount: apartment?.utility_fees?.bin_contribution || 0, period: '1 Year' },
    { label: 'House Rent', amount: apartment?.price || apartment?.rent || 0, period: '1 Year' }
  ];

  if (loading) {
    return (
      <main className="landingpage-container px-4 md:px-0 mt-20">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-gray-600">Loading apartment details...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="landingpage-container px-4 md:px-0 mt-20">
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <p className="text-red-500 mb-4">{error}</p>
          <Link href="/apartment" className="text-complementary hover:underline">Return to Apartments</Link>
        </div>
      </main>
    );
  }

  if (!apartment) {
    return (
      <main className="landingpage-container px-4 md:px-0 mt-20">
        <div className="flex flex-col justify-center items-center min-h-[60vh]">
          <p className="text-gray-600 mb-4">Apartment not found</p>
          <Link href="/apartment" className="text-complementary hover:underline">Return to Apartments</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="landingpage-container px-4 md:px-0 mt-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6">
        <Link href="/" className="text-gray-600 hover:text-complementary">Home</Link>
        <FiChevronRight className="w-3 h-3 text-gray-900" />
        <Link href="/apartment" className="text-gray-900 hover:text-complementary">Apartments</Link>
        <FiChevronRight className="w-3 h-3 text-gray-900" />
        <span className="text-complementary">{apartment.title || apartment.name || 'Apartment Details'}</span>
      </nav>

      <div className="space-y-6">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3 mb-8">
          {apiImages[0] && (
            <div className="md:col-span-6 relative md:h-[80vh] h-[60vh] rounded-xl overflow-hidden">
              <Image
                src={apiImages[0]}
                alt={`${apartment?.title || 'Apartment'} - Main View`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                onError={(e) => {
                  // eslint-disable-next-line no-console
                  console.error('Failed to load main image:', apiImages[0]);
                }}
              />
            </div>
          )}
          <div className="md:col-span-6 flex flex-col gap-4">
            {apiImages.length > 1 && apiImages[1] && (
              <div className="relative h-[39vh] rounded-xl overflow-hidden hidden md:block">
                <Image
                  src={apiImages[1]}
                  alt={`${apartment.title} - View 2`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  onError={() => console.error('Failed to load second image:', apiImages[1])}
                />
              </div>
            )}
            {apiImages.length > 2 && apiImages[2] && (
              <div className="relative h-[39vh] rounded-lg overflow-hidden hidden md:block">
                <Image
                  src={apiImages[2]}
                  alt={`${apartment.title} - View 3`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={85}
                  onError={() => console.error('Failed to load third image:', apiImages[2])}
                />
                <div className="absolute bottom-5 right-5">
                  <button onClick={() => setShowGallery(true)} className="bg-[#00000199] text-white px-4 py-3 rounded-lg flex items-center gap-2 shadow-md cursor-pointer">
                    <span className="font-medium">View All Images</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Dots indicator */}
        {apiImages.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {apiImages.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${currentImageIndex === index ? 'w-8 bg-black' : 'w-3 bg-gray-300'}`}
                onClick={() => setCurrentImageIndex(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 md:flex md:flex-row md:justify-end gap-4 mt-4">
          <button onClick={() => setShowGallery(true)} className="flex items-center justify-center md:justify-start gap-1 px-1 py-1.5 w-full md:w-fit rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
            <span className="font-medium text-sm">View Images</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
          <div className="relative w-full md:w-fit">
            <div className="absolute -top-4 left-0 right-0 text-center">
              <span className="bg-complementary text-primary text-[10px] font-medium px-0.5 py-0.5 rounded">Coming Soon</span>
            </div>
            <button className="flex items-center justify-center md:justify-start gap-2 px-1 py-1.5 w-full md:w-fit rounded-lg border border-primary text-primary">
              <span className="font-medium text-sm">View Video Tour</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Details Section (trimmed for brevity) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
          <div>
            <div className="flex items-center gap-1 mb-3 text-gray-600">
              <Image src="/icons/UserDashboard/location.svg" className="h-4 w-4" width={20} height={20} alt="location" />
              <span className="text-xs">{apartment.location}</span>
            </div>
            <h1 className="text-2xl font-semibold mb-2">{apartment.title}</h1>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-1"><Image src="/icons/UserDashboard/bedroom.svg" width={20} height={20} alt="bedroom" /><span>{apartment.number_of_bedrooms}bed</span></div>
              <div className="flex items-center gap-1"><Image src="/icons/UserDashboard/bath.svg" width={10} height={10} alt="bath" /><span>{apartment.number_of_bathrooms}bath</span></div>
              <div className="flex items-center gap-1"><Image src="/icons/UserDashboard/ruler.svg" width={10} height={10} alt="ruler" /><span>{apartment.area_size_sqm}m²</span></div>
              <div className="hidden md:block"><p className="text-lg font-bold text-complementary">₦ {apartment.price}</p></div>
            </div>
            <div className="md:hidden mt-2"><p className="text-lg font-bold text-complementary">₦{apartment.price}</p></div>

            <div className='grid grid-cols-2 md:flex md:flex-row md:justify-start gap-4 mt-4'>
              <div className="relative w-full md:w-fit"><a href='/personalinformation'><button className="bg-complementary text-white py-3 px-6 rounded-lg hover:bg-emerald-800">I'm interested</button></a></div>
              <div className="relative w-full md:w-fit">
                <button 
                  onClick={() => setShowInspectionModal(true)} 
                  className="bg-white text-primary py-2.5 px-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-white"
                >
                  Book Inspection
                </button>
              </div>
            </div>
            
            {/* Share and Like */}
            <div className="mt-6 flex items-center gap-4">
              <button className='p-2 hover:bg-gray-100 rounded'>
                <Image src="/icons/Line.svg" width={20} height={20} alt="share" />
              </button>
              <button className='p-2 hover:bg-gray-100 rounded'>
                <Image src="/icons/Heart.svg" width={20} height={20} alt="heart" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 mt-6">{apartment.description || 'No description available.'}</p>
            <div className="mt-4 text-sm text-gray-600">
              <p><span className="font-medium">Type:</span> {apartment.building_type.split('_').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ')}</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment Breakdown</h2>
            <p className="text-sm text-gray-600 mb-8">
              The annual fees below start at zero(0) except the house rent
            </p>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              {paymentBreakdown.map((p,i)=>(
                <>
                <div className='hidden md:block'>
                  <div key={p.label} className={`grid grid-cols-12 gap-4 items-center py-2 ${i===paymentBreakdown.length-1?'pb-6':''}`}>
                    <p className="col-span-5 font-medium text-gray-500">{p.label}</p>
                    <div className="col-span-3 flex items-center gap-2 justify-center border border-gray-300 rounded-md"><p className="text-sm text-gray-600 py-1">{p.period}</p><Image src="/icons/chevron-arow.svg" className="w-3 h-4" width={12} height={16} alt="chevron" /></div>
                    <p className="col-span-4 text-right font-medium">₦{p.amount}</p>
                  </div>
                </div>
                {/* mobile view */}
                <div className="md:hidden space-y-4">
                    <div key={p.label} className="mb-4 last:mb-6">
                      <p className="font-medium text-gray-500 mb-1">{p.label}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 justify-center border border-gray-300 rounded-md">
                          <p className="text-sm text-gray-600 py-1">{p.period}</p>
                        </div>
                        <p className="text-right font-medium">₦{p.amount}</p>
                      </div>
                    </div>
                </div>
                </>
              ))}
              <div className="pt-4 border-t border-b pb-6 flex justify-between items-center border-gray-300">
                <p className="font-bold text-xl">Total Amount:</p>
                <p className="font-bold text-complementary text-xl">₦{apartment.price}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pt-8">
          <div className="md:col-span-8">
            <h2 className="text-xl font-semibold mb-6">Home Details for {apartment.title}</h2>
            
            <div className="grid md:grid-cols-3 gap-y-4 mb-8 gap-5">
              {apartment.amenities && apartment.amenities.split(',').map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Image src="/icons/check.svg" className="w-4 h-4" width={16} height={16} alt="check" />
                  <span className="text-gray-600">{amenity.trim()}</span>
                </div>
              ))}
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
              <Image src={Profile} className="w-12 h-12 rounded-full" width={48} height={48} alt="agent" />
              <div>
                <p className="font-medium">Agent ID: {apartment.agent}</p>
                <p className="text-sm text-gray-600">Andromeda Homes Agent</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 md:sticky md:top-6">
            <h2 className="text-xl font-semibold mb-6">Map Location</h2>
            <div className="relative h-[400px] md:h-full rounded-lg overflow-hidden bg-gray-100">
              {apartment.latitude && apartment.longitude ? (
                <iframe
                  src={`https://maps.google.com/maps?q=${apartment.latitude},${apartment.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Apartment Location"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-center text-gray-500">
                  <p>Location coordinates for <span className='text-complementary font-bold'>{apartment.title}</span> not available</p>
                </div>
              )}
            </div>
          </div>
        </div>
          
        {/*Comments and reviews */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 mt-30">
          <div className="md:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Comments</h2>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Image src={Profile} className="w-10 h-10 rounded-full" width={40} height={40} alt="reviewer" />
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

      {/* Gallery Modal */}
      {showGallery && apiImages.length > 0 && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={()=>setShowGallery(false)}>
          <div className="relative w-full max-w-5xl" onClick={e=>e.stopPropagation()}>
            <button onClick={()=>setShowGallery(false)} className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow"><FiX className="w-5 h-5" /></button>
            <div className="relative h-[60vh] md:h-[80vh] rounded-lg overflow-hidden bg-black/10">
              {apiImages[currentImageIndex] && (
                <Image src={apiImages[currentImageIndex]} alt={`Gallery image ${currentImageIndex+1}`} fill className="object-contain md:object-cover" sizes="100vw" />
              )}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4">
                <button onClick={()=>setCurrentImageIndex(p=>p===0?apiImages.length-1:p-1)} className="bg-black/60 hover:bg-black text-white p-3 rounded-lg"><FiChevronLeft className="w-6 h-6" /></button>
                <button onClick={()=>setCurrentImageIndex(p=>p===apiImages.length-1?0:p+1)} className="bg-black/60 hover:bg-black text-white p-3 rounded-lg"><FiChevronRight className="w-6 h-6" /></button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Inspection Booking Modal */}
      <InspectionBookingModal 
        isOpen={showInspectionModal} 
        onClose={handleCloseInspectionModal} 
        onProceed={handleProceedToPayment}
        onShowSuccess={() => setShowSuccessModal(true)}
      />

      {/* Payment Success Modal */}
      {showSuccessModal && (
        <PaymentSuccess onProceed={handleProceedToDatePicker} />
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
  <DatePicker onSelect={handleDateSelect} onClose={() => setShowDatePicker(false)} apartmentId={apartment?.id || id} />
      )}

      {/* Optionally show selected date */}
      {selectedDate && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 px-4 py-2 rounded shadow-lg z-50">
          Selected date: {selectedDate.toLocaleDateString()}
        </div>
      )}

    </main>
  );
}

// End of file


  export default ApartmentView;