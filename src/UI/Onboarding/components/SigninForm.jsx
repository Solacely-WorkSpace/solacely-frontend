"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "@/hooks";
import authService from "@/lib/api/services/authService";
import { RealTimeValidateInput } from "./RealTimeValidatedInput";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import clsx from "clsx";
import toast from 'react-hot-toast';

export default function SigninForm({ serviceType }) {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailStatus, setEmailStatus] = useState('')
    const [phoneNumberStatus, setPhoneNumberStatus] = useState('')
    const [passwordStatus, setPasswordStatus] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [attemptInfo, setAttemptInfo] = useState(null)

    const loginMutation = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors and attempt info
        setErrors({});
        setAttemptInfo(null);
        
        // Check if account is locked before proceeding
        if (serviceType === 'email' && email) {
            const status = authService.getLoginAttemptStatus(email);
            if (status.isLocked) {
                setErrors({ general: `Too many failed attempts. Please try again after ${status.remainingLockoutTime} minutes.` });
                return;
            }
        }

        // Validate required fields
        const newErrors = {};
        
        if (serviceType === 'email' && !email.trim()) {
            newErrors.email = 'Email is required';
        }
        
        // if (serviceType === 'mobile' && !phoneNumber.trim()) {
        //     newErrors.phoneNumber = 'Phone number is required';
        // }
        
        if (!password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Prepare login data based on service type
            const loginData = {
                email: serviceType === 'email' ? email : phoneNumber, // Backend might accept phone as email
                password: password
            };

            console.log('Attempting login with:', loginData);
            
            // Use mutate instead of mutateAsync for faster response
            loginMutation.mutate(loginData, {
                onSuccess: (result) => {
                    console.log('Login successful:', result);
                    
                    // Token storage is now handled by authService.login()
                    // Just show success message and redirect
                    
                    // Show success toast
                    toast.success('You have been successfully logged in. You can now access your dashboard!');
                    
                    // Immediate redirect to home page using replace for faster navigation
                    router.replace('/');
                },
                onError: (error) => {
                    console.error('Login error:', error);
                    
                    // Update attempt info if available
                    if (error.data) {
                        setAttemptInfo({
                            count: error.data.attemptCount || 0,
                            remainingAttempts: error.data.remainingAttempts || 5,
                            isLocked: error.data.isLocked || false,
                            type: error.data.type || 'general'
                        });
                    }
                    
                    // Handle account lockout
                    if (error.status === 423 || error.data?.type === 'account_locked') {
                        const errorMessage = error.message || 'Too many failed attempts. Please try again after 10 minutes.';
                        setErrors({ general: errorMessage });
                        toast.error(errorMessage);
                        return;
                    }
                    
                    // Handle specific login errors
                    if (error.data?.type === 'email_not_found') {
                        setErrors({ email: 'This email address is not registered.' });
                        toast.error('This email address is not registered.');
                        return;
                    }
                    
                    if (error.data?.type === 'wrong_password') {
                        setErrors({ password: 'Incorrect password.' });
                        toast.error('Incorrect password.');
                        return;
                    }
                    
                    // Handle 500 errors with user-friendly messages
                    if (error.status === 500) {
                        const errorMessage = 'Our servers are experiencing issues. Please try again in a few minutes or check your details and try again.';
                        setErrors({ general: errorMessage });
                        toast.error(errorMessage);
                        return;
                    }
                    
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
                        toast.error('Please check your input and try again');
                    } else {
                        // Fallback for other error types
                        const errorMessage = error.message || 'Login failed. Please try again.';
                        setErrors({ general: errorMessage });
                        toast.error(errorMessage);
                    }
                }
            });
            
        } catch (error) {
            console.error('Unexpected error:', error);
            setErrors({ general: 'An unexpected error occurred. Please try again.' });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="h-full w-full md:w-[360px] mt-6"
        >
            {errors.general && (
                <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.general}
                </div>
            )}

            {/* Login attempt warning */}
            {attemptInfo && !attemptInfo.isLocked && attemptInfo.count > 0 && (
                <div className="w-full mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                    <p className="text-sm">
                        {attemptInfo.remainingAttempts > 0 
                            ? `${attemptInfo.remainingAttempts} attempt${attemptInfo.remainingAttempts !== 1 ? 's' : ''} remaining before account lockout.`
                            : 'Account will be locked after next failed attempt.'
                        }
                    </p>
                </div>
            )}

            {
                serviceType === 'email' &&
                <div className="w-full">
                    <label
                        htmlFor="Email"
                        className="text-sm mb-1.5 block"
                    >
                        Email
                    </label>

                    <RealTimeValidateInput
                        {...{
                            type: 'email',
                            name: 'email',
                            id: 'email',
                            placeholder: "Email address",
                            value: email,
                            setValue: setEmail,
                            required: true,
                            status: emailStatus,
                            setStatus: setEmailStatus,
                            validator: emailValidator,
                        }}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
            }

            {/* {
                serviceType === 'mobile' &&
                <div className="w-full">
                    <label
                        htmlFor="phoneNumber"
                        className="text-sm mb-1.5 block"
                    >
                        Mobile
                    </label>

                    <div className="w-full flex items-center gap-2">
                        <select
                            name="country-code"
                            id="country-code"
                            className={clsx(
                                "relative border border-gray-400 rounded-lg w-fit h-fit flex gap-4 items-center justify-between focus:outline-complementary p-3 px-2",
                                {
                                    "border-0 outline-2 outline-complementary": phoneNumberStatus === 'not taken'
                                }
                            )}
                        >
                            <option value="+234">+234</option>
                            <option value="+265">+265</option>
                            <option value="+1">+1</option>
                        </select>

                        <RealTimeValidateInput
                            {...{
                                type: 'number',
                                name: 'phone number',
                                id: 'phone number',
                                placeholder: "",
                                value: phoneNumber,
                                setValue: setPhoneNumber,
                                required: true,
                                status: phoneNumberStatus,
                                setStatus: setPhoneNumberStatus,
                                validator: phoneNumberValidator,
                            }}
                        />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
            } */}

            <div className="mt-6">
                <label
                    htmlFor="Password"
                    className="text-sm mb-1.5 block"
                >
                    Password
                </label>

                <div className="relative">
                    <RealTimeValidateInput
                        {...{
                            type: showPassword ? 'text' : 'password',
                            value: password,
                            name: 'password',
                            id: 'password',
                            placeholder: "Password",
                            required: true,
                            setValue: setPassword,
                            // validator: passwordValidator,
                            status: passwordStatus,
                            setStatus: setPasswordStatus
                        }}
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

            <Link
                href="/forgot-password"
                className="block w-full mt-2 text-sm text-end text-complementary"
            >
                Forgot Password?
            </Link>

            <button 
                type="submit"
                disabled={loginMutation.isPending}
                className={`w-full mt-6 btn-primary ${loginMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}

function emailValidator(value) {
    // console.log(value)
    return value.length === 0
        ? undefined
        : value.length < 3
            ? 'taken'
            : 'not taken'
}

// function phoneNumberValidator(value) {
//     console.log(value)
//     return value.length === 0
//         ? undefined
//         : value.length < 3
//             ? 'taken'
//             : 'not taken'
// }