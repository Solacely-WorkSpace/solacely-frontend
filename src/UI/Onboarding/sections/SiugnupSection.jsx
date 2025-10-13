
"use client"

import Link from "next/link";
import SignupForm from "../components/SignupForm";
import { useEffect } from "react";
import { googleAuth } from "@/lib/api/services/googleAuthService";
import toast from 'react-hot-toast';

export default function SiugnupSection({ setCurrentStage, setUserData }) {

    useEffect(() => {
        const initializeGoogle = () => {
            if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
                try {
                    window.google.accounts.id.initialize({
                        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                        callback: handleGoogleResponse,
                        auto_select: false,
                        cancel_on_tap_outside: true,
                        use_fedcm_for_prompt: false,
                    });
                    
                    // Render button after initialization
                    setTimeout(() => {
                        const buttonContainer = document.getElementById('google-signin-button');
                        if (buttonContainer) {
                            window.google.accounts.id.renderButton(buttonContainer, {
                                theme: 'outline',
                                size: 'large',
                                width: 300
                            });
                        }
                    }, 100);
                } catch (error) {
                    console.error('Google initialization error:', error);
                    toast.error('Failed to initialize Google Sign-In');
                }
            } else if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
                console.error('Google Client ID not found');
                toast.error('Google Sign-In not configured');
            }
        };

        // Check if Google script is already loaded
        if (window.google) {
            initializeGoogle();
        } else {
            // Wait for script to load
            const checkGoogle = setInterval(() => {
                if (window.google) {
                    clearInterval(checkGoogle);
                    initializeGoogle();
                }
            }, 100);

            // Cleanup after 10 seconds
            setTimeout(() => {
                clearInterval(checkGoogle);
                if (!window.google) {
                    toast.error('Google services failed to load');
                }
            }, 10000);
        }
    }, []);

    const handleGoogleResponse = async (response) => {
        if (!response.credential) {
            toast.error('No credential received from Google');
            return;
        }

        try {
            const result = await googleAuth(response.credential);
            
            // Decode token to get user email for next steps
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            
            setUserData({
                email: payload.email,
                phone: result.data?.phone || '',
            });
            
            toast.success('Google signup successful!');
            setCurrentStage('confirm');
            
        } catch (error) {
            console.error('Google signup error:', error);
            
            // Handle specific error cases
            if (error.response?.status === 400) {
                toast.error('Invalid Google credentials');
            } else if (error.response?.status === 409) {
                toast.error('Account already exists. Please sign in instead.');
            } else {
                toast.error('Google signup failed. Please try again.');
            }
        }
    };

    const handleGoogleClick = () => {
        if (window.google) {
            window.google.accounts.id.prompt();
        } else {
            toast.error('Google services not loaded');
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

            <div className="flex flex-col items-center mt-16">
                <h1 className="text-3xl">Sign up on Solacely</h1>

                <p className="mt-10 text-xs text-center opacity-60">use your OpenId to Sign up</p>

                <div className="mt-4 flex gap-4 items-center justify-center">
                    <div id="google-signin-button"></div>
                </div>

                <div className="w-[400px] h-[1px] bg-gray-400 opacity-20 mt-8 "></div>

                <p className="mt-6 text-xs text-center opacity-60">Or continue with email</p>

                <div className="w-full mt-6 md:w-[380px]">
                    <SignupForm 
                        setCurrentStage={setCurrentStage} 
                        setUserData={setUserData}
                    />
                </div>
            </div>
        </section>
    )
}
