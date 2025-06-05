"use client"

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from 'react-icons/fi';

export default function Budget({ setCurrentStage }) {
    const [value, setValue] = useState('')

    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="w-full">
                <div className="flex items-center justify-between w-full">
                    <Link href="#" onClick={() => setCurrentStage('form')} className="flex items-center gap-1 text-sm text-gray-600">
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
                    "h-full  bg-primary", "w-[25%]"
                )}
                ></div>
            </div>

            <div className="w-full flex flex-col items-center text-center">
                <div className="w-full md:w-[380px] flex flex-col items-center">
                    <h1 className="whitespace-nowrap">What's your budget<br className="md:hidden"/> range?</h1>

                    <small className="text-[#9EA0AB] mt-5 block md:max-w-[340px] ">We'll only show listings that match your price range.</small>

                    <input
                        type="text"
                        name="fullname"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="#500,000"
                        required
                        className="text-sm bg-transparent w-full px-4 py-3 mt-12 rounded-lg border border-gray-300 focus:border-complementary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    <div className="flex gap-2 items-center">
                        <p className=" my-4 border border-gray-300 px-3 text-gray-500 py-1 text-xs rounded-full">#400k - #800k</p>
                        <p className=" my-4 border border-gray-300 px-3 text-gray-500 py-1 text-xs rounded-full">#1m - #2m</p>
                    </div>

                    <button
                        onClick={() => setCurrentStage('home type')}
                        className="w-fit px-12 mt-12 btn-primary"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => setCurrentStage('home type')}
                        className="w-full mt-4 py-3 underline"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </section>
    )
}



