"use client"

import { useState } from "react"
import SignInForm from "./SignInForm"
import clsx from "clsx"

export default function FromSwitcher() {
    const [currentForm, setCurrentForm] = useState('email')

    return (
        <div className="flex flex-col items-center w-full mt-6 md:w-fit">
            <div className="mt-4 mb-8">
                <button
                    onClick={() => setCurrentForm('email')}
                    className={clsx(
                        "px-3 py-1 text-sm rounded-full",
                        {
                            "bg-complementary text-white": currentForm === 'email'
                        }
                    )}
                >
                    Email
                </button>

                <button
                    onClick={() => setCurrentForm('mobile')}
                    className={clsx(
                        "px-3 py-1 text-sm  rounded-full ml-4",
                        {
                            "bg-complementary text-white": currentForm === 'mobile'
                        }
                    )}
                >
                    Mobile
                </button>
            </div>

            {
                currentForm === 'email' &&
                <SignInForm />
            }

            {
                currentForm === 'mobile' &&
                <p>mobile form</p>
            }
        </div >
    )
}
