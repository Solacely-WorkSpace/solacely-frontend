import Link from 'next/link'
import SignInForm from './components/SignInForm'
import FromSwitcher from './components/FromSwitcher'

export default function SignInPage() {
    return (
        <main className='flex w-screen min-h-screen '>
            <div className='h-svh h-screen w-[400px] p-12 '>
            </div>

            <div className='fixed bg-[url("/images/Auth/room.jpg")] bg-cover bg-left-bottom h-screen w-[400px] z-10 overflow-hidden'>
                <div className='bg-[#00000061] h-full w-full p-12'>
                    <h3 className="text-white">Solacely</h3>
                </div>
            </div>

            <section className='flex-1 p-12'>
                <div className="flex items-center justify-end w-full gap-1 ">
                    <p className="text-sm">Don't have an account?</p>

                    <Link
                        href='/sign-up'
                        className="text-sm"
                    >
                        Sign up for free
                    </Link>
                </div>

                <section className="flex flex-col items-center mt-16">
                    <h1 className="text-3xl">Login to Solacely</h1>

                    <p className="mt-10 text-xs text-center opacity-60">use your OpenId to Sign in</p>

                    <button className="px-16 mt-4 rounded-full w-fit btn-primary">Google</button>

                    <div className="w-[400px] h-[1px] bg-gray-400 opacity-20 mt-8 "></div>

                    <p className="mt-6 text-xs text-center opacity-60">Or continue with email</p>

                    <FromSwitcher />
                </section>
            </section>
        </main>
    )
}
