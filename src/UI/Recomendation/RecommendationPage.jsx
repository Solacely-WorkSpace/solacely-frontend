"use client"

import { useEffect, useState } from "react";
import WhereSection from "./sections/WhereSection";
import DummySection from "./sections/DummySection";

export default function RecommendationPage() {
    const [currentStage, setCurrentStage] = useState('form')

    return (
        <>
            {
                currentStage === 'form' &&
                <WhereSection
                    setCurrentStage={setCurrentStage}
                    currentStage={currentStage}
                />
            }

            {
                currentStage === 'next stage' &&
                <DummySection setCurrentStage={setCurrentStage} />
            }
        </>
    )
}
