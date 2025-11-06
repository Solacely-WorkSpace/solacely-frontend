"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, UploadCloud } from "lucide-react";
import AuthIllustration from "../Onboarding/components/AuthIllustration";

const AgencyOnboardingPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    rcNumber: '',
    email: '',
    phoneNumber: '',
    location: '',
    address: '',
    termsAccepted: false
  });

  const [files, setFiles] = useState({
    image: null,
    workDocument: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateRCNumber = (rcNumber) => {
    // I don't know about RC can't implement validation
    return rcNumber.trim().length >= 10;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    } else if (formData.companyName.trim().length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    if (!formData.rcNumber.trim()) {
      newErrors.rcNumber = 'RC number is required';
    } else if (!validateRCNumber(formData.rcNumber)) {
      newErrors.rcNumber = 'Please enter a valid RC number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.location || formData.location === 'Select Location') {
      newErrors.location = 'Please select a location';
    }

    // A better logic needed
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'Please provide a more detailed address';
    }

    if (!files.image) {
      newErrors.image = 'Company image is required';
    }

    if (!files.workDocument) {
      newErrors.workDocument = 'Work document is required';
    }

    
    if (!formData.termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = (fileType, event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const allowedDocumentTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];

      if (fileType === 'image' && !allowedImageTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          image: 'Please upload a valid image file (JPG, PNG, JPEG)'
        }));
        return;
      }

      if (fileType === 'workDocument' && !allowedDocumentTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          workDocument: 'Please upload a valid document (PDF, JPG)'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'File size must be less than 5MB'
        }));
        return;
      }

      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));

      // Clear error
      setErrors(prev => ({
        ...prev,
        [fileType]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      
      console.log('Form data:', formData);
      console.log('Files:', files);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Handle successful submission
      router.push('/partner/verification');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* Left side illustration */}
      <div className="hidden md:block w-1/3 relative">
        <AuthIllustration />
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-2/3 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <div className="w-full max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <a
              href="/partner"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Go back
            </a>
            <p className="text-sm text-gray-600">
              Already a partner?{" "}
              <a href="/partner/signin" className="font-semibold text-complementary hover:underline">
                Sign in
              </a>
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Please introduce yourself to us.
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="company-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  COMPANY NAME *
                </label>
                <input
                  type="text"
                  id="company-name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="rc-number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  RC NUMBER *
                </label>
                <input
                  type="text"
                  id="rc-number"
                  name="rcNumber"
                  value={formData.rcNumber}
                  onChange={handleInputChange}
                  placeholder="Enter RC number"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.rcNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.rcNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.rcNumber}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  id="phone-number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter whatsapp number"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  LOCATION *
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Location</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Ghana">Ghana</option>
                </select>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ADDRESS *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPLOAD IMAGE *
                </label>
                <div className={`flex justify-center items-center w-full h-40 px-6 py-4 mt-2 bg-white border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileUpload('image', e)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer w-full">
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">
                          {files.image ? files.image.name : 'Drop your image here, or browse'}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG, and JPEG (Max 5MB)
                      </p>
                    </div>
                  </label>
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPLOAD WORK DOCUMENT *
                </label>
                <div className={`flex justify-center items-center w-full h-40 px-6 py-4 mt-2 bg-white border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 ${
                  errors.workDocument ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <input
                    type="file"
                    accept="application/pdf,image/jpeg,image/jpg"
                    onChange={(e) => handleFileUpload('workDocument', e)}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer w-full">
                    <div className="text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold">
                          {files.workDocument ? files.workDocument.name : 'Drop your document here, or browse'}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports PDF and JPG (Max 5MB)
                      </p>
                    </div>
                  </label>
                </div>
                {errors.workDocument && (
                  <p className="mt-1 text-sm text-red-500">{errors.workDocument}</p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <p className="text-gray-500">
                  By signing up I agree that I'm 18 years of age or older, to
                  the{" "}
                  <a href="#" className="font-medium text-gray-700 underline">
                    User Agreements
                  </a>
                  ,{" "}
                  <a href="#" className="font-medium text-gray-700 underline">
                    Privacy Policy
                  </a>
                  ,{" "}
                  <a href="#" className="font-medium text-gray-700 underline">
                    Cookie Policy
                  </a>
                  ,{" "}
                  <a href="#" className="font-medium text-gray-700 underline">
                    E-Sign Consent
                  </a>
                  .
                </p>
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgencyOnboardingPage;