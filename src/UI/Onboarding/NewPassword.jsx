"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useResetPassword } from '@/hooks/useAuth';
import FormSwitcher from './components/FormSwitcher'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import AuthIllustration from './components/AuthIllustration'

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const resetPasswordMutation = useResetPassword();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSuccess(false);
        // Validation
        if (!email.trim()) {
            setErrors({ email: 'Email is required' });
            return;
        }
        if (!otp.trim()) {
            setErrors({ otp: 'OTP code is required' });
            return;
        }
        if (!newPassword.trim()) {
            setErrors({ newPassword: 'New password is required' });
            return;
        }
        if (!confirmPassword.trim()) {
            setErrors({ confirmPassword: 'Confirm password is required' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }
        try {
            await resetPasswordMutation.mutateAsync({
                email,
                otp_code: otp,
                new_password: newPassword,
                confirm_password: confirmPassword
            });
            setIsSuccess(true);
            router.replace('/sign-in');
        } catch (error) {
            if (error.status === 404) {
                setErrors({ email: 'Email address not found' });
            } else if (error.status === 422 && error.errors) {
                setErrors(error.errors);
            } else {
                setErrors({ general: error.message || 'Failed to reset password. Please try again.' });
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
                    <h1 className="text-3xl">New Password</h1>
                    <div className="flex flex-col items-center w-full mt-6 ">
                        {errors.general && (
                            <div className="w-full max-w-[400px] mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {errors.general}
                            </div>
                        )}
                        {isSuccess && (
                            <div className="w-full max-w-[400px] mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                Password reset successful! Redirecting to login...
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="w-full max-w-[400px] mt-8">
                            <div className="w-full mb-6 mt-4">
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
                                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-complementary ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                                    disabled={resetPasswordMutation.isPending || isSuccess}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div className="w-full mb-6">
                                <label htmlFor="otp" className="text-sm mb-1.5 block">
                                    OTP Code
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP code"
                                    required
                                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:border-complementary ${errors.otp ? 'border-red-400' : 'border-gray-300'}`}
                                    disabled={resetPasswordMutation.isPending || isSuccess}
                                />
                                {errors.otp && (
                                    <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                                )}
                            </div>
                            <div className="w-full mb-6">
                                <label htmlFor="new-password" className="text-sm mb-1.5 block">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="new-password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                        required
                                        className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.newPassword ? 'border-red-400' : 'border-gray-400'}`}
                                        disabled={resetPasswordMutation.isPending || isSuccess}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                                {errors.newPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                                )}
                            </div>
                            <div className="w-full mb-4">
                                <label htmlFor="confirm-password" className="text-sm mb-1.5 block">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirm-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        required
                                        className={`placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-400'}`}
                                        disabled={resetPasswordMutation.isPending || isSuccess}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={resetPasswordMutation.isPending || isSuccess}
                                className={`w-full mt-6 btn-primary px-6 py-4 text-base rounded-lg ${
                                    resetPasswordMutation.isPending || isSuccess 
                                        ? 'opacity-50 cursor-not-allowed' 
                                        : 'hover:opacity-90'
                                }`}
                            >
                                {resetPasswordMutation.isPending 
                                    ? 'Resetting...'
                                    : isSuccess 
                                        ? 'Success!'
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
        </>
    )
}