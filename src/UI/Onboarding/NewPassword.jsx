"use client";

import Link from 'next/link';
import { useState } from 'react';
import FormSwitcher from './components/FormSwitcher'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthIllustration from './components/AuthIllustration'

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
                    <h1 className="text-3xl">New Password</h1>
                    <div className="flex flex-col items-center w-full mt-6 ">
                        <form onSubmit={handleSubmit} className="w-full max-w-[400px] mt-8">
                            <div className="w-ful mb-6 mt-4">
                                <label htmlFor="email" className="text-sm mb-1.5 block">
                                    Email
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
                                                    placeholder="Password"
                                                    required
                                                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                            
                                        <div className="w-full mb-4">
                                            <label
                                                htmlFor="confirm-password"
                                                className="text-sm mb-1.5 block"
                                            >
                                                Confirm Password
                                            </label>
                            
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name="confirm-password"
                                                    placeholder="Confirm Password"
                                                    required
                                                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                >
                                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                            <Link
                                href='/sign-in'
                                className="text-xs text-primary font-bold mt-2 block text-center"
                            >
                            <button
                                type="submit"
                                className="w-full mt-6 btn-primary px-6 py-4 text-base rounded-lg"
                            >
                                Continue
                            </button>
                            </Link>
                        </form>
                    </div>
                </section>
            </section>
        </>
    )
}
