"use client"

import { useState } from "react"
import SigninForm from "./SigninForm"
import clsx from "clsx"

export default function FormSwitcher() {
    const [currentForm, setCurrentForm] = useState('email')

    return (
        <div className="flex flex-col items-center w-full mt-6 md:w-fit">
            {/* <div className="mt-4 mb-8">
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
            </div> */}

            <SigninForm {...{ serviceType: currentForm }} />
        </div >
    )
}
