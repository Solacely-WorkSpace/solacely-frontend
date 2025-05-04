"use client"

import { useState } from "react";
import SiugnupSection from "./sections/SiugnupSection";
import Link from "next/link";
import ConfirmVerificationMethodSection from "./sections/ConfirmVerificationMethodSection";
import OTPSection from "./sections/OTPSection";
import FinalSection from "./sections/FinalSection";

export default function SignUpPage() {
    const [currentStage, setCurrentStage] = useState('form')

    return (
        <>
            {
                currentStage === 'form' &&
                <SiugnupSection setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'confirm' &&
                <ConfirmVerificationMethodSection setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'otp' &&
                <OTPSection setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'final' &&
                <FinalSection setCurrentStage={setCurrentStage} />
            }
        </>
    )
}
