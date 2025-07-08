
import Link from "next/link";
import SignupForm from "../components/SignupForm";

export default function SiugnupSection({ setCurrentStage, setUserData }) {
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

            <div className="flex flex-col items-center mt-16">
                <h1 className="text-3xl">Sign up on Solacely</h1>

                <p className="mt-10 text-xs text-center opacity-60">use your OpenId to Sign up</p>

                <div className="mt-4 flex gap-4 items-center">
                    <button className="px-16 rounded-full w-fit btn-primary shadow-none">Google</button>

                </div>

                <div className="w-[400px] h-[1px] bg-gray-400 opacity-20 mt-8 "></div>

                <p className="mt-6 text-xs text-center opacity-60">Or continue with email</p>

                <div className="w-full mt-6 md:w-[380px]">
                    <SignupForm 
                        setCurrentStage={setCurrentStage} 
                        setUserData={setUserData}
                    />
                </div>
            </div>
        </section>
    )
}
