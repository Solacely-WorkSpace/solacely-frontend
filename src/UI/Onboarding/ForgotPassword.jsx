"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useForgotPassword } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import FormSwitcher from './components/FormSwitcher'
import AuthIllustration from './components/AuthIllustration'

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const forgotPasswordMutation = useForgotPassword();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!email.trim()) {
            setErrors({ email: 'Email is required' });
            return;
        }
        try {
            await forgotPasswordMutation.mutateAsync(email);
            // Redirect to NewPassword page after success
            router.replace('/new-password');
        } catch (error) {
            if (error.status === 404) {
                setErrors({ email: 'Email address not found' });
            } else if (error.status === 422 && error.errors) {
                setErrors(error.errors);
            } else {
                setErrors({ general: error.message || 'Failed to send password reset email. Please try again.' });
            }
        }
    };

    return (
        <>
            <section className='flex-1 w-full p-6 md:p-12'>
                <div className="flex items-center justify-center md:justify-end w-full gap-2 ">
                    <p className="text-sm">Don't have an account?</p>
                    <Link
                        href='/sign-up'
                        className="text-sm text-complementary"
                    >
                        Sign up for free
                    </Link>
                </div>

                <section className="flex flex-col items-center mt-16">
                    <h1 className="text-3xl">Forgot Password</h1>
                    <p className="mt-10 text-xs text-center opacity-60">
                        For security purposes, no withdrawals are permitted for 24 hours after password change
                    </p>

                    <div className="flex flex-col items-center w-full mt-6 ">
                        {errors.general && (
                            <div className="w-full max-w-[400px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errors.general}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="w-full max-w-[400px] mt-8">
                            <div className="w-full">
                                <label htmlFor="email" className="text-sm mb-1.5 block">
                                    Enter your account email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email"
                                    required
                                    disabled={forgotPasswordMutation.isPending}
                                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-complementary ${
                                        errors.email ? 'border-red-400' : 'border-gray-300'
                                    } ${forgotPasswordMutation.isPending ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={forgotPasswordMutation.isPending}
                                className={`w-full mt-6 btn-primary px-6 py-4 text-base rounded-lg ${
                                    forgotPasswordMutation.isPending 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:opacity-90'
                                }`}
                            >
                                {forgotPasswordMutation.isPending 
                                    ? 'Sending...'
                                    : 'Continue'
                                }
                            </button>
                            <Link
                                href='/sign-in'
                                className="text-xs text-primary font-bold mt-2 block text-center"
                            >   
                                <p className='mt-8 text-xs text-center text-primary font-bold'>
                                    Nevermind, I got it
                                </p>
                            </Link>
                        </form>
                    </div>
                </section>
            </section>
            <AuthIllustration />
        </>
    );
}