"use client"

import Link from "next/link";
import { useState } from "react";
import { RealTimeValidateInput } from "./RealTimeValidatedInput";

export default function SignupForm({ serviceType }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailStatus, setEmailStatus] = useState('')
    const [phoneNumberStatus, setPhoneNumberStatus] = useState('')
    const [passwordStatus, setPasswordStatus] = useState('')

    return (
        <form
            action=""
            className="h-full w-full md:w-[360px] "
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
                        <option value="+234">+265</option>
                        <option value="+234">+1</option>
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

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400 "
                />
            </div>

            <div className="w-full mb-6">
                <label
                    htmlFor="confirm-password"
                    className="text-sm mb-1.5 block"
                >
                    Confirm Password
                </label>

                <input
                    type="password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    required
                    className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 rounded-lg border border-gray-400 "
                />
            </div>

            <Link
                href="#"
                className="block w-full mt-2 text-sm text-end text-complementary"
            >
                Forgot Password?
            </Link>

            <button className="w-full mt-6 btn-primary">Register</button>
        </form>
    )
}
