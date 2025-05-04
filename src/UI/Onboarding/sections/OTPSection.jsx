import Link from "next/link";


export default function OTPSection({ setCurrentStage }) {
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

            <div className="w-full flex flex-col items-center mt-16 text-center">
                <div className="w-full md:w-[380px]">
                    <h1>Enter your security code</h1>

                    <small className="text-[#9EA0AB] mt-8 block">We texted your code to +234 809 567 8909</small>

                    <div className="mt-10">
                        <div className="w-[160px] py-1  text-[#212121] text-center relative mx-auto">
                            <input
                                type="tel"
                                maxLength={4}
                                placeholder="____"
                                className="w-full appearance-none text-2xl font-bold tracking-[2rem] text-start z-[3] focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <button
                                className="w-fit mt-8 py-1.5 px-4 text-sm rounded-md border border-gray-400"
                            >
                                Resend
                            </button>

                            <button
                                onClick={() => setCurrentStage('final')}
                                className="w-fit mt-8 py-1.5 px-4 rounded-md bg-primary text-white text-sm"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
