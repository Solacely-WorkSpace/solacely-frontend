"use client"

import Link from "next/link";
import { useState } from "react";
import { useRegister } from "@/hooks";
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignupForm({ setCurrentStage, setUserData }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        location: '',
        password: '',
        confirmPassword: ''
    });
    const [countryCode, setCountryCode] = useState('+234');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const registerMutation = useRegister();

    const validateField = (name, value, currentFormData = formData) => {
        switch (name) {
            case 'fullName':
                if (!value.trim()) return 'Full name is required';
                if (!/^[a-zA-Z\s]+$/.test(value.trim())) return 'Full name must contain only letters and spaces';
                break;
            case 'email':
                if (!value.trim()) return 'Email is required';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
                break;
            case 'mobile':
                if (!value.trim()) return 'Mobile number is required';
                const mobilePatterns = {
                    '+234': /^[789]\d{9}$/,
                    '+27': /^[1-9]\d{8}$/,
                    '+251': /^9\d{8}$/,
                    '+254': /^[17]\d{8}$/
                };
                const pattern = mobilePatterns[countryCode];
                if (pattern && !pattern.test(value)) return 'Invalid mobile number format for selected country';
                break;
            case 'location':
                if (!value.trim()) return 'Please select a location';
                break;
            case 'password':
                if (!value) return 'Password is required';
                if (value.length < 8) return 'Password must be at least 8 characters';
                if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value)) return 'Password must include uppercase, lowercase, number, and special character';
                break;
            case 'confirmPassword':
                if (!value) return 'Please confirm your password';
                if (currentFormData.password !== value) return 'Passwords do not match';
                break;
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'countryCode') {
            setCountryCode(value);
            // Re-validate mobile with new country code
            if (formData.mobile) {
                const mobileError = validateField('mobile', formData.mobile);
                setErrors(prev => ({ ...prev, mobile: mobileError }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            
            // Real-time validation
            const error = validateField(name, value, { ...formData, [name]: value });
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
            newErrors.fullName = 'Full name must contain only letters and spaces';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Mobile validation based on country code
        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        } else {
            const mobilePatterns = {
                '+234': /^[789]\d{9}$/, // Nigeria: starts with 7,8,9 + 9 more digits
                '+27': /^[1-9]\d{8}$/, // South Africa: 9 digits, not starting with 0
                '+251': /^9\d{8}$/, // Ethiopia: starts with 9 + 8 more digits
                '+254': /^[17]\d{8}$/ // Kenya: starts with 1 or 7 + 8 more digits
            };
            const pattern = mobilePatterns[countryCode];
            if (pattern && !pattern.test(formData.mobile)) {
                newErrors.mobile = 'Invalid mobile number format for selected country';
            }
        }

        // Location validation
        if (!formData.location.trim()) {
            newErrors.location = 'Please select a location';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
            newErrors.password = 'Password must include uppercase, lowercase, number, and special character';
        }

        // Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!agreedToTerms) {
            newErrors.terms = 'Please agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // Format data to match backend expectations
            const registrationData = {
                email: formData.email,
                full_name: formData.fullName,
                phone_number: countryCode + formData.mobile,
                location: formData.location,
                password: formData.password,
                password_confirm: formData.confirmPassword
            };

            console.log('Sending registration data:', registrationData);
            const result = await registerMutation.mutateAsync(registrationData);
            
            // Store user data for verification stage
            if (setUserData) {
                setUserData({
                    email: formData.email,
                    phone: countryCode + formData.mobile,
                });
            }
            
            // On success, move to confirmation stage
            console.log('Registration successful:', result);
            setCurrentStage && setCurrentStage('confirm');
            
        } catch (error) {
            console.error('Registration error:', error);
            
            // Handle server errors with actual error messages
            if (error.data && typeof error.data === 'object') {
                const serverErrors = {};
                
                // Extract field-specific errors from server response
                Object.keys(error.data).forEach(field => {
                    const fieldErrors = error.data[field];
                    if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
                        serverErrors[field] = fieldErrors[0]; // Show first error message
                    } else if (typeof fieldErrors === 'string') {
                        serverErrors[field] = fieldErrors;
                    }
                });
                
                setErrors(serverErrors);
            } else {
                // Fallback for other error types
                setErrors({ general: error.message || 'Registration failed. Please try again.' });
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full"
        >
            {errors.general && (
                <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.general}
                </div>
            )}

            <div className="w-full mb-6">
                <label
                    htmlFor="fullName"
                    className="text-sm mb-1.5 block"
                >
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-400' : 'border-gray-400'}`}
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="email"
                    className="text-sm mb-1.5 block"
                >
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                    className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-gray-400'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="mobile"
                    className="text-sm mb-1.5 block"
                >
                    Mobile
                </label>
                <div className="w-full flex items-center gap-2">
                    <select
                        name="countryCode"
                        value={countryCode}
                        onChange={handleInputChange}
                        className="relative border border-gray-400 rounded-lg w-fit h-fit flex gap-4 items-center justify-between focus:outline-complementary p-3 px-2"
                    >
                        <option value="+234">Nigeria (+234)</option>
                        <option value="+27">South Africa (+27)</option>
                        <option value="+251">Ethiopia (+251)</option>
                        <option value="+254">Kenya (+254)</option>
                    </select>

                    <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Mobile"
                        required
                        className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.mobile ? 'border-red-400' : 'border-gray-400'}`}
                    />
                </div>
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="location"
                    className="text-sm mb-1.5 block"
                >
                    Location
                </label>

                <select
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.location ? 'border-red-400' : 'border-gray-400'}`}
                >
                    <option value="" disabled>Select Location</option>
                    <option value="abuja">Abuja</option>
                    <option value="lagos">Lagos</option>
                    <option value="port-harcourt">Port Harcourt</option>
                    <option value="kano">Kano</option>
                </select>
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="password"
                    className="text-sm mb-1.5 block"
                >
                    Password
                </label>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        required
                        className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.password ? 'border-red-400' : 'border-gray-400'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="w-full mb-4">
                <label
                    htmlFor="confirmPassword"
                    className="text-sm mb-1.5 block"
                >
                    Confirm Password
                </label>

                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm Password"
                        required
                        className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-400'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div className="flex gap-2 items-start mb-4">
                <input
                    type="checkbox"
                    name="agreedToTerms"
                    id="agreedToTerms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="block mt-1"
                />

                <label
                    htmlFor="agreedToTerms"
                    className="text-sm text-[#9EA0AB]"
                >
                    By signing up I agree that I'm 18 years of age or older, to the User{' '}
                    <Link href="#" className="text-black">Agreements,</Link>{' '}
                    <Link href="#" className="text-black">Privacy Policy,</Link>{' '}
                    <Link href="#" className="text-black">Cookie Policy,</Link>{' '}
                    <Link href="#" className="text-black">E-Sign Consent</Link>.
                </label>
            </div>
            {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}

            <button
                type="submit"
                disabled={registerMutation.isPending}
                className={`w-full mt-6 btn-primary ${registerMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {registerMutation.isPending ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
}
