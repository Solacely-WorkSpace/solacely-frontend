"use client"

import Link from "next/link";
import { useState } from "react";
import { useRegister } from "@/hooks";
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignupForm({ setCurrentStage, setUserData }) {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        mobile: '',
        location: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const registerMutation = useRegister();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.mobile.trim()) {
            newErrors.mobile = 'Mobile number is required';
        }

        if (!formData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

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
                username: formData.username, // Use the username from form instead of generating
                email: formData.email,
                full_name: formData.fullName,
                phone_number: formData.mobile,
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
                    phone: formData.mobile,
                    username: formData.username
                });
            }
            
            // On success, move to confirmation stage
            console.log('Registration successful:', result);
            setCurrentStage && setCurrentStage('confirm');
            
        } catch (error) {
            console.error('Registration error:', error);
            // Handle API validation errors
            if (error.status === 422 && error.errors) {
                setErrors(error.errors);
            } else {
                // Handle other errors
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
                    htmlFor="username"
                    className="text-sm mb-1.5 block"
                >
                    Username
                </label>

                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                    className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.username ? 'border-red-400' : 'border-gray-400'}`}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
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
                        className="relative border border-gray-400 rounded-lg w-fit h-fit flex gap-4 items-center justify-between focus:outline-complementary p-3 px-2"
                    >
                        <option value="+234">+234</option>
                    </select>

                    <input
                        type="text"
                        name="mobile"
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
