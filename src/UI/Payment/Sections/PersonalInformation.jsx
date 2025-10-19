"use client"
import { useState, useEffect } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/UI/Components/Nav";

export default function PersonalInformationPage() {
  const router = useRouter();
  const [userName, setUserName] = useState('User');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    countryCode: 'ng',
    mobileNumber: '',
    workId: null,
    designation: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.full_name || user.firstName || 'User');
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.workId) newErrors.workId = 'Work/Student ID is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    localStorage.setItem('personalInfo', JSON.stringify(formData));
    router.push('/tenancyagreement');
  };

  return (
    <>
        <Navbar />
        <div className="min-h-screen md:bg-[#F8F7FC] flex flex-col">
        <div className="aboutpage-container px-4 mt-20 w-full">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-gray-500 text-sm md:mt-10 mt-3 mb-8 pl-2 hover:text-gray-700"
            >
                <FiChevronLeft className="mr-1 w-4 h-4" /> Go Back
            </button>
            <div className="hidden md:block">
                <h1 className="text-3xl font-bold text-black mb-4">
                    Rent Apartment
                </h1>
            </div>
                <p className="hidden md:block text-gray-500 mb-8">
                    Welcome {userName}, complete your registration by filling<br /> in the following details.
                </p>
            <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm py-8 pr-8 w-full h-fit md:w-80 mb-6 md:mb-0">
                <ul className="py-4 space-y-6">
                    <li className="flex items-center justify-between">
                    <span className="font-semibold text-black border-l-4 border-complementary pl-6 py-2">Personal Information</span>
                    <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Tenancy Agreement</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Estate Agreement</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Mail Confirmation</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-gray-400 pl-6">Payment Review</span>
                        <FaCheckCircle className="text-complementary/20 text-lg" />
                    </li>
                </ul>
            </div>

            {/* Main Form Card */}
            <div className="bg-white md:rounded-xl md:shadow-sm md:p-8 px-3 flex-1 min-w-[320px]">
                <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">Personal Information</span>
                </div>
                <p className="text-gray-400 text-sm mb-8">Let's get to know more about you.</p>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                    <label className="block text-xs font-semibold mb-2">FIRST NAME<span className="text-complementary font-bold text-lg">*</span></label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name" 
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-primary text-sm ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200'
                      }`} 
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                {/* Last Name */}
                <div>
                    <label className="block text-xs font-semibold mb-2">LAST NAME<span className="text-complementary font-bold text-lg">*</span></label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name" 
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-primary text-sm ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200'
                      }`} 
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                {/* Date of Birth */}
                <div>
                    <label className="block text-xs font-semibold mb-2">DATE OF BIRTH</label>
                    <input 
                      type="date" 
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-primary text-sm" 
                    />
                </div>
                {/* Gender */}
                <div>
                    <label className="block text-xs font-semibold mb-2 text-black">GENDER<span className="text-complementary font-bold text-lg">*</span></label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-primary text-sm text-black ${
                        errors.gender ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                {/* Email Address */}
                <div>
                    <label className="block text-xs font-semibold mb-2">EMAIL ADDRESS<span className="text-complementary font-bold text-lg">*</span></label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address" 
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-primary text-sm ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`} 
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                {/* Mobile Number */}
                <div>
                    <label className="block text-xs font-semibold mb-2">MOBILE NUMBER<span className="text-complementary font-bold text-lg">*</span></label>
                    <div className="flex">
                        <select 
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-sm text-gray-500 px-2 focus:outline-primary min-w-[90px]"
                        >
                            <option value="ng">🇳🇬 +234</option>
                            <option value="gh">🇬🇭 +233</option>
                            <option value="za">🇿🇦 +27</option>
                        </select>
                        <input 
                          type="tel" 
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          placeholder="Enter mobile number" 
                          className={`w-full border rounded-r-lg px-4 py-3 focus:outline-primary text-sm ${
                            errors.mobileNumber ? 'border-red-500' : 'border-gray-200'
                          }`} 
                        />
                    </div>
                    {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>
                {/* Upload ID */}
                <div>
                    <label className="block text-xs font-semibold mb-2">UPLOAD WORK/STUDENT ID<span className="text-complementary font-bold text-lg">*</span></label>
                    <input 
                      type="file" 
                      name="workId"
                      onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={`w-full border border-dashed rounded-lg px-4 py-3 cursor-pointer text-sm ${
                        errors.workId ? 'border-red-500' : 'border-gray-300'
                      }`} 
                    />
                    {errors.workId && <p className="text-red-500 text-xs mt-1">{errors.workId}</p>}
                </div>
                {/* Designation */}
                <div>
                    <label className="block text-xs font-semibold mb-2">DESIGNATION (WORK)<span className="text-complementary font-bold text-lg">*</span></label>
                    <select 
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-3 focus:outline-primary text-sm text-black ${
                        errors.designation ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                        <option value="">Select designation</option>
                        <option value="student">Student</option>
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-employed</option>
                    </select>
                    {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation}</p>}
                </div>
                
                <div className="md:col-span-2">
                    <button 
                      type="submit" 
                      className="md:w-1/2 w-full my-10 py-3 rounded-lg bg-primary text-white font-semibold text-lg shadow-md hover:bg-primary/90 transition"
                    >
                      Continue
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    </>
  );
}
