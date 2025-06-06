"use client"

import Link from "next/link";
import { useState } from "react";
import { RealTimeValidateInput } from "./RealTimeValidatedInput";
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function SignupForm({ setCurrentStage }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailStatus, setEmailStatus] = useState('')
    const [phoneNumberStatus, setPhoneNumberStatus] = useState('')
    const [passwordStatus, setPasswordStatus] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <form
            action=""
            className="h-full w-full "
        >
            <div className="w-full mb-6">
                <label
                    htmlFor="fullname"
                    className="text-sm mb-1.5 block"
                >
                    Full Name
                </label>

                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    required
                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400 "
                />
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
                    placeholder="Email"
                    required
                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400 "
                />
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="Email"
                    className="text-sm mb-1.5 block"
                >
                    Mobile
                </label>
                <div className="w-full flex items-center gap-2">
                    <select
                        name="country-code"
                        id="country-code"
                        className="relative border border-gray-400 rounded-lg w-fit h-fit flex gap-4 items-center justify-between focus:outline-complementary p-3 px-2"
                    >
                        <option value="+234">+234</option>
                    </select>

                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        required
                        className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400 "
                    />
                </div>
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="email"
                    className="text-sm mb-1.5 block"
                >
                    Location
                </label>

                <select
                    name="location"
                    id="location"
                    placeholder="Select Location"
                    defaultValue="default"
                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400 "
                >
                    <option value="default" disabled>Select Location</option>
                    <option value="abuja">Abuja</option>
                    <option value="lagos">Lagos</option>
                    <option value="x">...</option>
                </select>
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

            <div className="flex gap-2 items-start">
                <input
                    type="checkbox"
                    name="agreement-cheackbox"
                    id="agreement-cheackbox"
                    className="block mt-1"
                />

                <label
                    htmlFor="agreement-cheackbox"
                    className="text-sm text-[#9EA0AB]"
                >
                    By signing up I agree that I’m 18 years of age or older, to the User <Link href="#" className="text-black">Agreements,</Link> <Link href="#" className="text-black">Privacy Policy,</Link> <Link href="#" className="text-black">Cookie Policy,</Link> <Link href="#" className="text-black">E-Sign Consent</Link>.
                </label>
            </div>

            <button
                onClick={() => setCurrentStage('confirm')}
                className="w-full mt-6 btn-primary"
            >Register</button>
        </form >
    )
}
