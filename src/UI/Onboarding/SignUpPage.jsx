import Link from "next/link";
import SignInForm from "./components/SignInForm";
import AuthIllustration from "./components/AuthIllustration";

export default function SignUpPage() {
    return (
        <main className='flex w-screen min-h-screen '>
            <div className='h-svh h-screen w-[400px] p-12 hidden md:block'>
            </div>

            <AuthIllustration />

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

                <section className="flex flex-col items-center mt-16">
                    <h1 className="text-3xl">Login to Solacely</h1>

                    <p className="mt-10 text-xs text-center opacity-60">use your OpenId to Sign up</p>

                    <button className="px-16 mt-4 rounded-full w-fit btn-primary">Google</button>

                    <div className="w-[400px] h-[1px] bg-gray-400 opacity-20 mt-8 "></div>

                    <p className="mt-6 text-xs text-center opacity-60">Or continue with email</p>

                    <div className="w-full mt-6 md:w-fit">
                        <p>signup form</p>
                    </div>
                </section>
            </section>
        </main>
    )
}
