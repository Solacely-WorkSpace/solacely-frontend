"use client"

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from 'react-icons/fi';

export default function Rooms({ setCurrentStage, currentStage }) {
    const [value, setValue] = useState('');

    const handleOptionClick = (option) => {
        setValue(option);
    };

    const options = [
        "Two Bedroom and One Bathroom",
        "Two Bedrooms and Two Bathrooms",
        "Three Bedrooms and Two Bathrooms",
        "Four Bedrooms and Three Bathrooms"
    ];

    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="flex items-center justify-end w-full gap-1 ">
                <div className="flex items-center justify-between w-full">
                    <Link href="#" onClick={() => setCurrentStage('renting model')} className="flex items-center gap-1 text-sm text-gray-600">
                        <FiChevronLeft className="w-4 h-4 text-gray-600" /> Go back
                    </Link> 
                    <div className="flex items-center gap-1">
                        <p className="text-sm">Already have an account?</p>

                        <Link
                            href='/sign-in'
                            className="text-sm text-complementary"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-[200px] h-1 mx-auto mt-28 mb-10 bg-gray-300 rounded-full overflow-hidden transition-all">
                <div className={clsx(
                    "h-full  bg-primary", "w-[62.5%]"
                )}
                ></div>
            </div>

            <div className="w-full flex flex-col items-center text-center">
                <div className="w-full md:w-[380px] flex flex-col items-center">
                    <h1 className="whitespace-nowrap">Number of Bedrooms and Bathrooms</h1>

                    <small className="text-[#9EA0AB] mt-5 block md:max-w-[340px] ">How would you prefer your number of bathrooms and bedrooms</small>

                        <div className="w-full flex flex-col gap-4 mt-12">
                            {options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleOptionClick(option)}
                                    className={clsx(
                                        "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                        value === option 
                                            ? "border-complementary  bg-[#6E3EFF]/10"
                                            : "border-gray-300 hover:border-complementary"
                                    )}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                    <button
                        onClick={() => setCurrentStage('features')}
                        className="w-fit px-12 mt-12 btn-primary"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => setCurrentStage('features')}
                        className="w-full mt-4 py-3 underline"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </section >
    )
}
