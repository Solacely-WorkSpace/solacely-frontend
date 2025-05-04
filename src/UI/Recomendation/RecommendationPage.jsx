"use client"

import { useState } from "react";
import SiugnupSection from "./sections/SiugnupSection";
import Link from "next/link";
import ConfirmVerificationMethodSection from "./sections/ConfirmVerificationMethodSection";
import OTPSection from "./sections/OTPSection";
import FinalSection from "./sections/WhereSection";

export default function RecommendationPage() {
    const [currentStage, setCurrentStage] = useState('form')

    return (
        <>
            {
                currentStage === 'final' &&
                <WhereSection setCurrentStage={setCurrentStage} />
            }
        </>
    )
}
