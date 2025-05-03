"use client"

import Link from "next/link";
import { useState } from "react";
import { RealTimeValidateInput } from "./RealTimeValidatedInput";
import clsx from "clsx";

export default function SigninForm({ serviceType }) {
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

            {
                serviceType === 'email' &&
                <div className="w-full">
                    <label
                        htmlFor="Email"
                        className="text-sm mb-1.5 block"
                    >
                        Email
                    </label>

                    <RealTimeValidateInput
                        {...{
                            type: 'email',
                            name: 'email',
                            placeholder: "Email address",
                            value: email,
                            setValue: setEmail,
                            required: true,
                            status: emailStatus,
                            setStatus: setEmailStatus,
                            validator: emailValidator,
                        }}
                    />
                </div>
            }

            {
                serviceType === 'mobile' &&
                <div className="w-full">
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
                            className={clsx(
                                "relative border border-gray-400 rounded-lg w-fit h-fit flex gap-4 items-center justify-between focus:outline-complementary p-3 px-2",
                                {
                                    "border-0 outline-2 outline-complementary": phoneNumberStatus === 'not taken'
                                }
                            )}
                        >
                            <option value="+234">+234</option>
                            <option value="+234">+265</option>
                            <option value="+234">+1</option>
                        </select>

                        <RealTimeValidateInput
                            {...{
                                type: 'number',
                                name: 'phone number',
                                placeholder: "",
                                value: phoneNumber,
                                setValue: setPhoneNumber,
                                required: true,
                                status: phoneNumberStatus,
                                setStatus: setPhoneNumberStatus,
                                validator: phoneNumberValidator,
                            }}
                        />
                    </div>
                </div>
            }

            <div className="mt-6">
                <label
                    htmlFor="Password"
                    className="text-sm mb-1.5 block"
                >
                    Password
                </label>

                <RealTimeValidateInput
                    {...{
                        type: 'password',
                        value: password,
                        name: 'password',
                        placeholder: "Password",
                        required: true,
                        setValue: setPassword,
                        validator: passwordValidator,
                        status: passwordStatus,
                        setStatus: setPasswordStatus
                    }}
                />
            </div>


            <Link
                href="#"
                className="block w-full mt-2 text-sm text-end text-complementary"
            >
                Forgot Password?
            </Link>

            <button className="w-full mt-6 btn-primary">Login</button>
        </form>
    )
}

function emailValidator(value) {
    console.log(value)
    return value.length === 0
        ? undefined
        : value.length < 3
            ? 'taken'
            : 'not taken'
}

function phoneNumberValidator(value) {
    console.log(value)
    return value.length === 0
        ? undefined
        : value.length < 3
            ? 'taken'
            : 'not taken'
}

function passwordValidator(value) {
    return value.length === 0
        ? undefined
        : value.length < 3
            ? 'taken'
            : 'not taken'
}