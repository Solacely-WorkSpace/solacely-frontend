"use client"
import { useState } from 'react';
import Image from 'next/image';
import {PopUp} from '@/assets/images'


const PopUpModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle closing the modal
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  // Optional: Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#00000199] bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg overflow-hidden max-w-md w-full shadow-xl transform transition-all">
        {/* Apartment Image */}
        <div className="relative w-full h-48">
          <Image
            src={PopUp} 
            alt="Solacely Apartment"
            width={400}
            height={200}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Solacely Apartments</h2>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Welcome to Solacely, where we provide you with an effortless method to discover your next home. Our vision is to streamline the traditional home-searching procedures, and we can't accomplish this without your valuable support and involvement. With just a quick swipe of your finger, you can virtually tour and make payments for your apartment.
          </p>
          
          <button
            onClick={handleClose}
            className="text-purple-800 font-medium hover:text-purple-800 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
