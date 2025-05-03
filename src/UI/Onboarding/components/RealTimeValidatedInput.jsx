import { useState } from "react"
import clsx from "clsx"

import { debounce } from "@/lib/utils"

export function RealTimeValidateInput({
    name,
    placeholder,
    required,
    setValue,
    type,
    value,
    validator,
    status,
    setStatus
}) {
    const [error, setError] = useState('')

    const onChangeValidator = async (e) => {
        if (validator) {
            const status = await validator(e.target.value)

            if (status === 'taken') setError('error message will show here')
            else setError('')

            setStatus(status)
        }
    }

    return (
        <>
            {
                error &&
                <p className="text-red-500 w-full text-start ">{error}</p>
            }

            <div className="relative border border-gray-400 rounded-lg w-full  h-fit flex gap-4 items-center justify-between">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={e => {
                        setValue(e.target.value)

                        if (validator) {
                            setStatus(undefined)

                            debounce(() => onChangeValidator(e))
                        }
                    }}
                    placeholder={placeholder}
                    required={required}
                    className={clsx("placeholder:text-[#5e5e5e] bg-transparent w-full px-4 py-3 focus:outline-complementary rounded-lg ")}
                />

                {
                    status &&
                    <div className={clsx("w-4 h-4 rounded-full absolute right-4 ",
                        {
                            'bg-complementary': status === 'not taken',
                            'bg-red-700': status === 'taken',
                        }
                    )}></div>
                }
            </div >
        </>
    )
}