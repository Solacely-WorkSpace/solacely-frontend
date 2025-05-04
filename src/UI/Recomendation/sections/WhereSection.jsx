"use client"

import Link from "next/link";

export default function FinalSection({ setCurrentStage }) {
    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="flex items-center justify-end w-full gap-1 ">
                <p className="text-sm">Already have an account?</p>

                <Link
                    href='/sign-in'
                    className="text-sm text-complementary"
                >
                    Sign in
                </Link>
            </div>

            <div className="w-[200px] h-1 mx-auto mt-28 mb-10 bg-gray-400 rounded-full overflow-hidden">
                <div className="h-full w-[0%] bg-primary"></div>
            </div>

            <div className="w-full flex flex-col items-center text-center">
                <div className="w-full md:w-[380px] flex flex-col items-center">
                    <h1 className="whitespace-nowrap">Where do you want to live?</h1>

                    <small className="text-[#9EA0AB] mt-5 block md:max-w-[340px] ">Select your preferred city or neighborhood so we can find the best options for you.</small>

                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter Location"
                        required
                        className="placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 mt-12 rounded-lg border border-gray-400 "
                    />

                    <button
                        onClick={() => setCurrentStage('otp')}
                        className="w-full mt-12 btn-primary"
                    >
                        Continue
                    </button>

                    <button
                        onClick={() => setCurrentStage('otp')}
                        className="w-full mt-4 py-3"
                    >
                        Skip
                    </button>
                </div>
            </div>
        </section>
    )
}
