"use client"

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from 'react-icons/fi';

export default function RentingModel({ setCurrentStage, currentStage }) {
    const [value, setValue] = useState('')

    const handleOptionClick = (option) => {
        setValue(option);
    };

    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="w-full">
                <div className="flex items-center justify-between w-full">
                    <Link href="#" onClick={() => setCurrentStage('home type')} className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FiChevronLeft className="w-4 h-4 text-gray-600" /> Go back
                        </div>
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
                    "h-full  bg-primary", "w-[50%]"
                )}
                ></div>
            </div>

            <div className="w-full flex flex-col items-center text-center">
                <div className="w-full md:w-[380px] flex flex-col items-center">
                    <h1 className="whitespace-nowrap">How would you like to<br className="md:hidden"/> rent?</h1>

                    <small className="text-[#9EA0AB] mt-5 block md:max-w-[340px] ">Choose a renting model that works best for you</small>

                    <div className="w-full flex flex-col gap-4 mt-12">
                                                <button
                                                    onClick={() => handleOptionClick('rent-now')}
                                                    className={clsx(
                                                        "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                                        value === 'rent-now' 
                                                            ? "border-complementary t bg-[#6E3EFF]/10"
                                                            : "border-gray-300 hover:border-complementary"
                                                    )}
                                                >
                                                    Rent now, pay small small
                                                </button>
                                                <button
                                                    onClick={() => handleOptionClick('co-living')}
                                                    className={clsx(
                                                        "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                                        value === 'co-living'
                                                            ? "border-complementary  bg-[#6E3EFF]/10"
                                                            : "border-gray-300 hover:border-complementary"
                                                    )}
                                                >
                                                    Co-living (pair with me)
                                                </button>
                                                <button
                                                    onClick={() => handleOptionClick('standard')}
                                                    className={clsx(
                                                        "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                                        value === 'standard'
                                                            ? "border-complementary  bg-[#6E3EFF]/10"
                                                            : "border-gray-300 hover:border-complementary"
                                                    )}
                                                >
                                                    Standard Rent
                                                </button>
                                            </div>

                    <button
                        onClick={() => setCurrentStage('rooms')}
                        className="w-fit px-12 mt-12 btn-primary"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => setCurrentStage('rooms')}
                        className="w-full mt-4 py-3 underline"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </section >
    )
}
