"use client";

import Link from 'next/link';
import { useState } from 'react';
import FormSwitcher from './components/FormSwitcher'
import AuthIllustration from './components/AuthIllustration'

export default function SignInPage() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password reset logic here
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

                    <p className="mt-10 text-xs text-center opacity-60">For security purposes, no no withdrawals are permitted for 24 hours after password change</p>

                    

                    <div className="flex flex-col items-center w-full mt-6 ">
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
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-complementary"
                                />
                            </div>
                            <Link
                                href='/security-verification'
                                className="text-xs text-primary font-bold mt-2 block text-center"
                            >
                                <button
                                    type="submit"
                                    className="w-full mt-6 btn-primary px-6 py-4 text-base rounded-lg"
                                >
                                    Continue
                                </button>
                            </Link>
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
        </>
    )
}
