"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, UploadCloud } from "lucide-react";
import AuthIllustration from "../Onboarding/components/AuthIllustration";
import { useRouter } from "next/navigation";

const LandlordOnboardingPage = () => {
  const router = useRouter();
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    whatsapp: '',
    email: '',
    location: '',
    workAddress: '',
    termsAccepted: false
  });

  const [files, setFiles] = useState({
    image: null,
    workDocument: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required';
    } else if (!validatePhoneNumber(formData.whatsapp)) {
      newErrors.whatsapp = 'Please enter a valid WhatsApp number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.location || formData.location === 'Select Location') {
      newErrors.location = 'Please select a location';
    }

    if (!formData.workAddress.trim()) {
      newErrors.workAddress = 'Work address is required';
    } else if (formData.workAddress.trim().length < 10) {
      newErrors.workAddress = 'Please provide a more detailed work address';
    }

    if (!files.image) {
      newErrors.image = 'Image is required';
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

  const handleImageUploadClick = () => {
    imageInputRef.current?.click();
  };

  const handleDocumentUploadClick = () => {
    documentInputRef.current?.click();
  };

  const handleImageFileChange = (event) => {
    handleFileUpload('image', event);
  };

  const handleDocumentFileChange = (event) => {
    handleFileUpload('workDocument', event);
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
              <a href="/partner/signin" className="font-semibold text-green-600">
                Sign in
              </a>
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Please introduce yourself to us.
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  id="first-name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  LAST NAME *
                </label>
                <input
                  type="text"
                  id="last-name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              {/* Phone Number */}
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
                  placeholder="Enter phone number"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label
                  htmlFor="whatsapp"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  WHATSAPP *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="Enter whatsapp number"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.whatsapp && (
                  <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>
                )}
              </div>

              {/* Email */}
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
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Location */}
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
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
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
            </div>

            {/* Work Address */}
            <div>
              <label
                htmlFor="work-address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                WORK ADDRESS *
              </label>
              <input
                type="text"
                id="work-address"
                name="workAddress"
                value={formData.workAddress}
                onChange={handleInputChange}
                placeholder="Enter property address"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors.workAddress ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.workAddress && (
                <p className="mt-1 text-sm text-red-500">{errors.workAddress}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPLOAD IMAGE *
                </label>
                <div
                  onClick={handleImageUploadClick}
                  className={`flex justify-center items-center w-full h-40 px-6 py-4 mt-2 bg-white border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {files.image ? (
                        <span className="font-semibold">{files.image.name}</span>
                      ) : (
                        <span className="font-semibold">Drop your image here, or browse</span>
                      )}
                    </p>
                    {!files.image && (
                      <p className="text-xs text-gray-500">
                        Supports JPG, PNG, and JPEG (Max 5MB)
                      </p>
                    )}
                  </div>
                </div>
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>

              {/* Upload Work Document */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPLOAD WORK DOCUMENT *
                </label>
                <div
                  onClick={handleDocumentUploadClick}
                  className={`flex justify-center items-center w-full h-40 px-6 py-4 mt-2 bg-white border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 ${
                    errors.workDocument ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="file"
                    ref={documentInputRef}
                    onChange={handleDocumentFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg"
                  />
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {files.workDocument ? (
                        <span className="font-semibold">{files.workDocument.name}</span>
                      ) : (
                        <span className="font-semibold">Drop your document here, or browse</span>
                      )}
                    </p>
                    {!files.workDocument && (
                      <p className="text-xs text-gray-500">
                        Supports PDF and JPG (Max 5MB)
                      </p>
                    )}
                  </div>
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
                  className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded"
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
                    : 'bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Signup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandlordOnboardingPage;