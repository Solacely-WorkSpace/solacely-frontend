"use client"
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { IoMdRemove } from 'react-icons/io';

const MoreFilters = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState('Studio');
  const [priceRange, setPriceRange] = useState([500000, 1234567]);
  const [bedrooms, setBedrooms] = useState(4);
  const [bathrooms, setBathrooms] = useState(2);
  const [rentalPeriod, setRentalPeriod] = useState('Any');

  const types = ['Studio', 'Duplex', 'Mini flat', 'Bungalow', 'Shared'];
  const rentalPeriods = ['Any', '1 - 12 months', '13 - 24 months', '24+ months'];

  if (!isOpen) return null;

  const handlePriceChange = (e) => {
    setPriceRange([500000, parseInt(e.target.value)]);
  };

  const handleReset = () => {
    setSelectedType('Studio');
    setPriceRange([500000, 1234567]);
    setBedrooms(4);
    setBathrooms(2);
    setRentalPeriod('Any');
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-end z-50000" onClick={onClose}>
      <div className="bg-white w-screen max-w-md h-full overflow-x-auto p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">More Filters</h2>
          <button onClick={onClose} className="p-2">
            <IoClose size={24} />
          </button>
        </div>

        {/* Type */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Type</h3>
          <div className="flex flex-wrap gap-3">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-full ${selectedType === type ? 'bg-primary text-white' : 'bg-gray-100'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Price Range</h3>
          <div className="space-y-4">
            <input
              type="range"
              min="500000"
              max="1234567"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm">
              <span>₦{priceRange[0].toLocaleString()}</span>
              <span>₦{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Features</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Bedroom</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                  className="p-1 rounded-full bg-gray-100"
                >
                  <IoMdRemove />
                </button>
                <span>{bedrooms}</span>
                <button
                  onClick={() => setBedrooms(bedrooms + 1)}
                  className="p-1 rounded-full bg-primary text-white"
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Bathroom</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                  className="p-1 rounded-full bg-gray-100"
                >
                  <IoMdRemove />
                </button>
                <span>{bathrooms}</span>
                <button
                  onClick={() => setBathrooms(bathrooms + 1)}
                  className="p-1 rounded-full bg-primary text-white"
                >
                  <IoMdAdd />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rental Period */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Rental Period</h3>
          <div className="space-y-3">
            {rentalPeriods.map((period) => (
              <label key={period} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="rentalPeriod"
                  value={period}
                  checked={rentalPeriod === period}
                  onChange={(e) => setRentalPeriod(e.target.value)}
                  className="w-4 h-4 accent-primary"
                />
                <span>{period}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-auto">
          <button
            onClick={handleReset}
            className="flex-1 py-3 text-primary font-medium"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-primary text-white rounded-lg font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreFilters;
