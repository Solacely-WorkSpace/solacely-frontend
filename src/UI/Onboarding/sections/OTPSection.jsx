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
                onSuccess: () => {
                    // Immediate redirect using replace for faster navigation
                    router.replace('/dashboard');
                },
                onError: (error) => {
                    console.error('Verification failed:', error);
                    console.log('📄 Error details:', {
                        status: error.status,
                        message: error.message,
                        data: error.data,
                        errors: error.errors
                    });
                    
                    // Show more specific error messages
                    if (error.status === 400) {
                        setErrors(error.data?.message || error.message || 'Invalid request. Please check your email and code.');
                    } else if (error.status === 422) {
                        setErrors('Invalid verification code format. Please try again.');
                    } else {
                        setErrors(error.message || 'Invalid verification code. Please try again.');
                    }
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
            setErrors('Failed to resend code. Please try again.');
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
            <div className="flex items-center justify-end w-full gap-1 ">
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
                        <div className="w-[160px] py-1 text-[#212121] text-center relative mx-auto">
                            <input
                                type="tel"
                                maxLength={6}
                                placeholder="______"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full appearance-none text-2xl font-bold tracking-[1rem] text-center z-[3] focus:outline-none"
                            />
                        </div>

                        {errors && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                                {errors}
                            </div>
                        )}

                        {verifyMutation.isSuccess && (
                            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
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
