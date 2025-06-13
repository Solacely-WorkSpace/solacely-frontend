"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SecurityVerification = () => {
    const router = useRouter();
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0 && !canResend) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    const handleInputChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);
            
            // Move to next input if value is entered
            if (value !== '' && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleResendCode = () => {
        if (canResend) {
            setTimer(60);
            setCanResend(false);
            // Add resend code logic here
        }
    };

    const handleVerifyCode = () => {
        const code = verificationCode.join('');
        if (code.length === 6) {
            // Add verification logic here
            console.log('Verifying code:', code);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
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
                    <h1 className="text-3xl">Security verification</h1>

                    <p className="mt-10 text-xs text-center opacity-60">To secure your account, please complete the following verification</p>
                    <p className="text-gray-500 mb-6 mt-6">
                        Enter the 6 digit code received via email
                    </p>

                <div className="flex justify-center gap-2 mb-8">
                    {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-12 text-center border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
                        />
                    ))}
                </div>
                <div className="flex justify-center items-center mb-4 gap-30">
                    <button
                        className="text-base text-gray-600 hover:text-primary transition-colors border border-gray-600 rounded-lg py-2 px-4 hover:border-primary pb-1"
                    >
                        Resend code
                    </button>
                    <Link
                        href="/new-password"
                    >
                    <button
                        className="text-base text-white py-2 px-4 bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        Continue
                    </button>
                    </Link>
                </div>

                
            </section>
        </section>
    );
};

export default SecurityVerification;