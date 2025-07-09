"use client"

import { useState } from "react";
import SiugnupSection from "./sections/SiugnupSection";
import Link from "next/link";
import ConfirmVerificationMethodSection from "./sections/ConfirmVerificationMethodSection";
import OTPSection from "./sections/OTPSection";
import FinalSection from "./sections/FinalSection";

export default function SignUpPage() {
    const [currentStage, setCurrentStage] = useState('form')
    const [userData, setUserData] = useState({
        email: '',
        phone: '',
        username: ''
    })

    return (
        <>
            {
                currentStage === 'form' &&
                <SiugnupSection 
                    setCurrentStage={setCurrentStage} 
                    setUserData={setUserData}
                />
            }

            {
                currentStage === 'confirm' &&
                <ConfirmVerificationMethodSection 
                    setCurrentStage={setCurrentStage}
                    userEmail={userData.email}
                    userPhone={userData.phone}
                />
            }

            {
                currentStage === 'otp' &&
                <OTPSection 
                    setCurrentStage={setCurrentStage}
                    userEmail={userData.email}
                    userPhone={userData.phone}
                />
            }

            {
                currentStage === 'final' &&
                <FinalSection setCurrentStage={setCurrentStage} />
            }
        </>
    )
}
