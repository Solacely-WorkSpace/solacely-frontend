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

            <div className="w-full flex flex-col items-center mt-16 text-center">
                <div className="w-full md:w-[380px]">
                    <h1>Your Email has been verified.</h1>

                    <Link
                        href="/recommendation"
                        className="text-primary mt-8 block"
                    >
                        Click here to continue to your dashboard.
                    </Link>
                </div>
            </div>
        </section>
    )
}
