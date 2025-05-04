import Link from "next/link";


export default function ConfirmVerificationMethodSection({ setCurrentStage }) {
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
                    <h1>Let’s confirm it’s really you</h1>

                    <small className="text-[#9EA0AB] mt-8 block">Help us secure your account. <br /> Please complete the verifications below</small>

                    <div className="mt-10">
                        <div className="text-start">
                            <div className="flex gap-2 items-start">
                                <input
                                    type="radio"
                                    name="confirm"
                                    id="confirm-mobile"
                                    className="mt-1"
                                />

                                <label htmlFor="confirm-mobile">
                                    Get the code by text message (SM) at <br />
                                    <span className="text-complementary text-start  ">+1234 234 567 890</span>
                                </label>
                            </div>
                        </div>

                        <div className="w-full h-[1] bg-gray-400 opacity-30 mt-4 mb-5"></div>

                        <div className="text-start">
                            <div className="flex gap-2 items-start">
                                <input
                                    type="radio"
                                    name="confirm"
                                    id="confirm-email"
                                    className="mt-1"
                                />

                                <label htmlFor="confirm-email">
                                    Get the code by email at <br />
                                    <span className="text-complementary text-start  ">benby••••••••••••@gm•••.com</span>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={() => setCurrentStage('otp')}
                            className="w-full mt-8 btn-primary"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
