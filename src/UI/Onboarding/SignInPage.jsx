'use client'

import Link from 'next/link'
import FormSwitcher from './components/FormSwitcher'
import AuthIllustration from './components/AuthIllustration'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignInPage() {
    const searchParams = useSearchParams()
    const [message, setMessage] = useState('')
    
    useEffect(() => {
        const urlMessage = searchParams.get('message')
        if (urlMessage) {
            setMessage(urlMessage)
            // Clear message after 5 seconds
            setTimeout(() => setMessage(''), 5000)
        }
    }, [searchParams])
    return (
        <>
            <section className='flex-1 w-full p-6 md:p-12'>
                <div className="flex items-center justify-center md:justify-end w-full gap-2 ">
                    <p className="text-sm">Don't have an account?</p>

                    <Link
                        href='/sign-up'
                        className="text-sm text-complementary"
                    >
                        Sign up for free
                    </Link>
                </div>

                <section className="flex flex-col items-center mt-16">
                    <h1 className="text-3xl">Login to Solacely</h1>
                    
                    {message && (
                        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm max-w-md text-center">
                            {message}
                        </div>
                    )}

                    <p className="mt-10 text-xs text-center opacity-60">use your OpenId to Sign in</p>

                    <button className="px-16 mt-4 rounded-full w-fit btn-primary shadow-none">Google</button>

                    <div className="w-full md:w-[400px] h-[1px] bg-gray-400 opacity-20 mt-8 "></div>

                    <p className="mt-6 text-xs text-center opacity-60">Or continue with email</p>

                    <FormSwitcher />
                </section>
            </section>
        </>
    )
}
