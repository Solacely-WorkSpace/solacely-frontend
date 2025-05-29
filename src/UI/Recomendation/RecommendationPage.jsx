"use client"

import { useEffect, useState } from "react";
import Location from "./sections/Location";
import Budget from "./sections/Budget";
import KindOfHome from "./sections/KindOfHome";
import RentingModel from "./sections/RentingModel";
import Rooms from "./sections/Rooms";
import Features from "./sections/Features";
import MoveInDate from "./sections/MoveInDate";



export default function RecommendationPage() {
    const [currentStage, setCurrentStage] = useState('form')


    return (
        <>
            {
                currentStage === 'form' &&
                <Location
                    setCurrentStage={setCurrentStage}
                    currentStage={currentStage}
                />
            }

            {
                currentStage === 'next stage' &&
                <Budget setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'home type' &&
                <KindOfHome setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'renting model' &&
                <RentingModel setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'rooms' &&
                <Rooms setCurrentStage={setCurrentStage} />
            }

            {
                currentStage === 'features' &&
                <Features setCurrentStage={setCurrentStage} />
            }
            {
                currentStage === 'move in date' &&
                <MoveInDate setCurrentStage={setCurrentStage} />
            }
        </>
    )
}
