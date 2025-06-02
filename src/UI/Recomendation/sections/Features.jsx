"use client"

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from 'react-icons/fi';

export default function Features({ setCurrentStage, currentStage }) {
    const [value, setValue] = useState('')

    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full">
                    <Link href="#" onClick={() => setCurrentStage('rooms')} className="flex items-center gap-1 text-sm text-gray-600 hidden md:block">
                        <div className="flex items-center gap-1">
                            <FiChevronLeft className="w-4 h-4 text-gray-600" /> Go back
                        </div>
                    </Link>  
                    <div className="flex items-center justify-center md:justify-end gap-1">
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
                    "h-full  bg-primary", "w-[78%]"
                )}
                ></div>
            </div>

            <div className="w-full flex flex-col items-center text-center">
                <div className="w-full md:w-[380px] flex flex-col items-center">
                    <h1 className="whitespace-nowrap">Amenities for your daily<br className="md:hidden"/> convenience</h1>

                    <small className="text-[#9EA0AB] mt-5 block md:max-w-[340px] ">Pick from the list of various amenities to make life convenient</small>

                    <div className="w-full flex flex-col gap-4 mt-12">
                        <button
                            onClick={() => setValue('Spacious Parking Lot')}
                            className={clsx(
                                "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                value === 'Spacious Parking Lot'
                                    ? "border-complementary  bg-[#6E3EFF]/10"
                                    : "border-gray-300 hover:border-complementary"
                            )}
                        >
                            Spacious Parking Lot
                        </button>
                        
                        <button
                            onClick={() => setValue('Fully Equipped Gym')}
                            className={clsx(
                                "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                value === 'Fully Equipped Gym'
                                    ? "border-complementary  bg-[#6E3EFF]/10"
                                    : "border-gray-300 hover:border-complementary"
                            )}
                        >
                            Fully Equipped Gym
                        </button>

                        <button
                            onClick={() => setValue('Balcony')}
                            className={clsx(
                                "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                value === 'Balcony'
                                    ? "border-complementary  bg-[#6E3EFF]/10"
                                    : "border-gray-300 hover:border-complementary"
                            )}
                        >
                            Balcony
                        </button>

                        <button
                            onClick={() => setValue('Pet Friendly Environment')}
                            className={clsx(
                                "w-full py-4 px-6 rounded-lg border transition-all text-left",
                                value === 'Pet Friendly Environment'
                                    ? "border-complementary  bg-[#6E3EFF]/10"
                                    : "border-gray-300 hover:border-complementary"
                            )}
                        >
                            Pet Friendly Environment
                        </button>
                    </div>

                    <button
                        onClick={() => setCurrentStage('move in date')}
                        className="w-fit px-12 mt-12 btn-primary"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => setCurrentStage('move in date')}
                        className="w-full mt-4 py-3 underline"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </section >
    )
}
