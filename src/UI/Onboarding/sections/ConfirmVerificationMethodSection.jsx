"use client"

import Link from "next/link";
import { useState } from "react";
import { useResendVerification } from "@/hooks";

export default function ConfirmVerificationMethodSection({ setCurrentStage, userEmail, userPhone }) {
    const [selectedMethod, setSelectedMethod] = useState('email');
    const [isLoading, setIsLoading] = useState(false);
    
    const resendMutation = useResendVerification();

    // Mask email for display
    const maskEmail = (email) => {
        if (!email) return "••••••••••••@••••.com";
        const [username, domain] = email.split('@');
        const maskedUsername = username.slice(0, 2) + '••••••••••••';
        const [domainName, ext] = domain.split('.');
        const maskedDomain = domainName.slice(0, 2) + '•••';
        return `${maskedUsername}@${maskedDomain}.${ext}`;
    };

    // Mask phone for display
    const maskPhone = (phone) => {
        if (!phone) return "+1234 234 567 890";
        return `+234 ${phone.slice(0, 3)} ••• ••••`;
    };

    const handleContinue = async () => {
        setIsLoading(true);
        try {
            // Send verification code based on selected method
            const verificationData = selectedMethod === 'email' 
                ? { email: userEmail } 
                : { phone: userPhone };
                
            await resendMutation.mutateAsync(verificationData);
            
            // Move to OTP stage
            setCurrentStage('otp');
        } catch (error) {
            console.error('Failed to send verification code:', error);
            // Still move to OTP stage for testing purposes
            setCurrentStage('otp');
        } finally {
            setIsLoading(false);
        }
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
                    <h1>Let’s confirm it’s really you</h1>

                    <small className="text-[#9EA0AB] mt-8 block">Help us secure your account. <br /> Please complete the verifications below</small>

                    <div className="mt-10">
                        {/* <div className="text-start">
                            <div className="flex gap-2 items-start">
                                <input
                                    type="radio"
                                    name="confirm"
                                    id="confirm-mobile"
                                    value="mobile"
                                    checked={selectedMethod === 'mobile'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="mt-1"
                                />

                                <label htmlFor="confirm-mobile">
                                    Get the code by text message (SMS) at <br />
                                    <span className="text-complementary text-start">{maskPhone(userPhone)}</span>
                                </label>
                            </div>
                        </div> */}

                        <div className="w-full h-[1px] bg-gray-400 opacity-30 mt-4 mb-5"></div>

                        <div className="text-start">
                            <div className="flex gap-2 items-start">
                                <input
                                    type="radio"
                                    name="confirm"
                                    id="confirm-email"
                                    value="email"
                                    checked={selectedMethod === 'email'}
                                    onChange={(e) => setSelectedMethod(e.target.value)}
                                    className="mt-1"
                                />

                                <label htmlFor="confirm-email">
                                    Get the code by email at <br />
                                    <span className="text-complementary text-start">{maskEmail(userEmail)}</span>
                                </label>
                            </div>
                        </div>

                        {resendMutation.error && (
                            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                                Failed to send verification code. Please try again.
                            </div>
                        )}

                        <button
                            onClick={handleContinue}
                            disabled={isLoading || resendMutation.isPending}
                            className={`w-full mt-8 btn-primary ${(isLoading || resendMutation.isPending) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {(isLoading || resendMutation.isPending) ? 'Sending Code...' : 'Continue'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
