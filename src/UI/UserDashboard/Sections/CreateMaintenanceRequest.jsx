"use client"
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowBack } from 'react-icons/io';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';

const CreateMaintenanceRequest = ({ isOpen, onClose }) => {
  const [requestType, setRequestType] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apartment, setApartment] = useState('');
  const [preferredDates, setPreferredDates] = useState([
    { date: '', time: '' },
    { date: '', time: '' },
    { date: '', time: '' }
  ]);
  const [images, setImages] = useState([]);
  const [countryCode, setCountryCode] = useState('+234');

  // Function to update preferred date/time
  const updatePreferredDate = (index, field, value) => {
    const updatedDates = [...preferredDates];
    updatedDates[index][field] = value;
    setPreferredDates(updatedDates);
  };

  // Function to handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages([...images, ...filesArray]);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data
    const formData = {
      requestType,
      description,
      phoneNumber: `${countryCode} ${phoneNumber}`,
      apartment,
      preferredDates,
      images: images.map(img => img.file)
    };
    console.log('Form submitted:', formData);
    onClose();
  };

  // If the sidebar is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 z-50 flex justify-end transition-opacity duration-300 shadow-xl overflow-hidden">
      <div 
        className="absolute inset-0 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      {/* Sidebar */}
      <div className="bg-white w-full p-6 max-w-md transform transition-transform duration-300 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center py-6 border-b border-gray-200">
          <button 
            onClick={onClose}
            className="m-3 text-gray-600 bg-gray-100 p-1 rounded-md"
          >
            <IoIosArrowBack size={18} />
          </button>
          <h2 className="text-base font-semibold">Create Maintenance Request</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Request Type */}
          <div>
            <label className="block uppercase text-xs font-medium text-gray-800 mb-2">WHAT ARE YOU REQUESTING FOR?</label>
            <div className="relative">
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full appearance-none border border-gray-300 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-gray-500 font-medium"
              >
                <option value="" disabled>Select an option</option>
                <option value="cleaning">Cleaning Services</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="other">Other</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block uppercase text-xs font-medium text-gray-800 mb-2">PROVIDE MORE INFORMATION ABOUT YOUR REQUEST</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a short description of what you are requesting for maintenance for"
              className="w-full border border-gray-200 border-bold text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-gray-600 min-h-[100px]"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block uppercase text-xs font-medium text-gray-800 mb-2">PHONE NUMBER</label>
            <div className="flex gap-2">
              <div className="relative w-24">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-xl py-3 px-2 focus:outline-none focus:ring-1 focus:ring-primary text-gray-600 text-sm"
                >
                  <option value="+234">🇳🇬 +234</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
                <IoIosArrowDown className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 border border-gray-200 border rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-primary text-gray-600 text-sm"
              />
            </div>
          </div>

          {/* Apartment */}
          <div>
            <label className="block uppercase text-xs font-medium text-gray-800 mb-2">APARTMENT</label>
            <div className="relative">
              <select
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full appearance-none font-medium border border-gray-200 rounded-xl py-3 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary text-sm text-gray-600"
              >
                <option value="" disabled>Select an option</option>
                <option value="home_coral_gables">Home in Coral Gables</option>
                <option value="apartment_lagos">Apartment in Lagos</option>
                <option value="villa_abuja">Villa in Abuja</option>
              </select>
              <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Preferred Dates */}
          <div>
            <label className="block uppercase text-xs font-medium text-gray-800 mb-2">PROVIDE PREFERRED DATE AND TIME FOR A VISIT</label>
            <div className="space-y-3">
              {preferredDates.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="relative flex-1 gap-2">
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={item.date}
                      onChange={(e) => updatePreferredDate(index, 'date', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary text-xs text-gray-600"
                    />
                    <Image src="/icons/UserDashboard/Calendar.svg" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" alt="Calendar" width={24} height={24} />
                  </div>
                  <div className="relative flex-1 gap-2">
                    <input
                      type="text"
                      placeholder="HH:MM AM"
                      value={item.time}
                      onChange={(e) => updatePreferredDate(index, 'time', e.target.value)}
                      className="w-full border border-gray-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-primary text-xs text-gray-600"
                    />
                    <Image src="/icons/UserDashboard/Time.svg" className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" alt="Time" width={24} height={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block uppercase text-xs font-medium text-gray-800 mb-2">UPLOAD IMAGES RELEVANT TO THIS REQUEST IF AVAILABLE</label>
            <div 
              className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
              onClick={() => document.getElementById('file-upload').click()}
            >
              <div className="mb-2">
                <Image src="/icons/Image.svg" className="w-6 h-6" alt="Time" width={24} height={24} />
              </div>
              <p className="text-sm text-black font-bold text-center">Drop your image here, or browse</p>
              <p className="text-xs text-gray-400 text-center mt-1">Supports JPG, PNG and JPEG</p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            {/* Preview uploaded images */}
            {images.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img 
                      src={img.preview}   
                      alt={`Uploaded ${index}`} 
                      className="w-full h-full object-cover rounded-lg" 
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-4  max-w-md ml-auto">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-md bg-primary text-white hover:bg-primary transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
          {/* Add padding at the bottom to account for fixed buttons */}
          <div className="h-20"></div>
        </form>
      </div>
    </div>
  );
};

export default CreateMaintenanceRequest;
