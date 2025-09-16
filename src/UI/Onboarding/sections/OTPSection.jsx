"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useVerifyEmail, useResendVerification } from "@/hooks";

export default function OTPSection({ setCurrentStage, userEmail, userPhone }) {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState('');
    
    const verifyMutation = useVerifyEmail();
    const resendMutation = useResendVerification();

    const handleVerification = async () => {
        if (!otp || otp.length < 4) {
            setErrors('Please enter a valid 4-digit code');
            return;
        }

        try {
            setErrors('');
            const verificationData = {
                email: userEmail,
                otp_code: otp  // Changed from 'code' to 'otp_code'
            };

            console.log('🔍 Sending verification data:', verificationData);
            console.log('📧 User email:', userEmail);
            console.log('🔢 OTP code:', otp);

            // Use mutate for faster response instead of mutateAsync
            verifyMutation.mutate(verificationData, {
                onSuccess: (response) => {
                    console.log('✅ Verification successful:', response);
                    
                    // Store tokens if provided in response
                    if (response?.tokens?.access || response?.token || response?.data?.token) {
                        const token = response.tokens?.access || response.token || response.data?.token;
                        const refreshToken = response.tokens?.refresh || response.refresh_token;
                        const userData = response.user || response.data?.user || {};
                        
                        // Import tokenManager dynamically to avoid circular imports
                        import('@/lib/auth/tokenManager').then(({ default: tokenManager }) => {
                            tokenManager.storeTokens(token, refreshToken, userData);
                            console.log('🔐 Tokens stored after verification');
                            
                            // Small delay to ensure tokens are stored before redirect
                            setTimeout(() => {
                                router.replace('/dashboard');
                            }, 100);
                        });
                    } else {
                        console.warn('⚠️ No tokens found in verification response');
                        console.log('📋 Email verified but no authentication tokens provided');
                        console.log('🔄 Redirecting to dashboard anyway');
                        
                        // Redirect to dashboard even without tokens
                        setTimeout(() => {
                            router.replace('/dashboard');
                        }, 1500);
                    }
                },
                onError: (error) => {
                    console.error('Verification failed:', error);
                    console.log('📄 Error details:', {
                        status: error.status,
                        message: error.message,
                        data: error.data,
                        errors: error.errors
                    });
                    
                    // Extract the most specific error message available
                    let errorMessage = 'Verification failed. Please try again.';
                    
                    if (error.data?.message) {
                        errorMessage = error.data.message;
                    } else if (error.data?.error) {
                        errorMessage = error.data.error;
                    } else if (error.data?.detail) {
                        errorMessage = error.data.detail;
                    } else if (error.data?.errors) {
                        // Handle validation errors object
                        if (typeof error.data.errors === 'object') {
                            const firstError = Object.values(error.data.errors)[0];
                            errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
                        } else {
                            errorMessage = error.data.errors;
                        }
                    } else if (error.message && !error.message.includes('HTTP')) {
                        errorMessage = error.message;
                    } else {
                        // Fallback based on status code
                        switch (error.status) {
                            case 400:
                                errorMessage = 'Invalid verification code or expired code.';
                                break;
                            case 404:
                                errorMessage = 'Verification code not found or already used.';
                                break;
                            case 422:
                                errorMessage = 'Invalid code format. Please enter a valid code.';
                                break;
                            case 429:
                                errorMessage = 'Too many attempts. Please wait before trying again.';
                                break;
                            case 500:
                                errorMessage = 'Server error. Please try again later.';
                                break;
                            default:
                                errorMessage = 'Verification failed. Please check your code and try again.';
                        }
                    }
                    
                    setErrors(errorMessage);
                }
            });
        } catch (error) {
            setErrors('An unexpected error occurred. Please try again.');
        }
    };

    const handleResend = async () => {
        try {
            setErrors('');
            await resendMutation.mutateAsync({ email: userEmail });
            // Show success message or toast
        } catch (error) {
            console.error('Resend failed:', error);
            
            let errorMessage = 'Failed to resend code. Please try again.';
            
            if (error.data?.message) {
                errorMessage = error.data.message;
            } else if (error.data?.error) {
                errorMessage = error.data.error;
            } else if (error.message && !error.message.includes('HTTP')) {
                errorMessage = error.message;
            }
            
            setErrors(errorMessage);
        }
    };

    const maskEmail = (email) => {
        if (!email) return "••••••••••••@••••.com";
        const [username, domain] = email.split('@');
        const maskedUsername = username.slice(0, 2) + '••••••••••••';
        const [domainName, ext] = domain.split('.');
        const maskedDomain = domainName.slice(0, 2) + '•••';
        return `${maskedUsername}@${maskedDomain}.${ext}`;
    };
    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="flex items-center md:justify-end justify-center w-full gap-1 ">
                <p className="text-sm">Already have an account?</p>

                <Link
                    href='/sign-in'
                    className="text-sm text-complementary"
                >
                    Sign in
                </Link>
            </div>

            <div className="w-full flex flex-col items-center mt-16 text-center">
                <div className="w-full md:w-[380px]">
                    <h1>Enter your security code</h1>

                    <small className="text-[#9EA0AB] mt-8 block">
                        We sent your code to {maskEmail(userEmail)}
                    </small>

                    <div className="mt-10">
                        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index] || ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!/^[0-9]?$/.test(value)) return;
                                        
                                        const newOtp = otp.split('');
                                        newOtp[index] = value;
                                        setOtp(newOtp.join(''));
                                        
                                        // Auto-focus next input
                                        if (value && index < 5) {
                                            const nextInput = e.target.parentElement.children[index + 1];
                                            nextInput?.focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        // Handle backspace to focus previous input
                                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                                            const prevInput = e.target.parentElement.children[index - 1];
                                            prevInput?.focus();
                                        }
                                    }}
                                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                />
                            ))}
                        </div>

                        {errors && (
                            <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                                {errors}
                            </div>
                        )}

                        {verifyMutation.isSuccess && (
                            <div className="mt-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
                                Email verified successfully!
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-8">
                            <button
                                onClick={handleResend}
                                disabled={resendMutation.isPending}
                                className={`w-fit mt-8 py-1.5 px-4 text-sm rounded-md border border-gray-400 ${resendMutation.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                            >
                                {resendMutation.isPending ? 'Sending...' : 'Resend'}
                            </button>

                            <button
                                onClick={handleVerification}
                                disabled={verifyMutation.isPending || !otp}
                                className={`w-fit mt-8 py-1.5 px-4 rounded-md bg-primary text-white text-sm ${(verifyMutation.isPending || !otp) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                            >
                                {verifyMutation.isPending ? 'Verifying...' : 'Continue'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
