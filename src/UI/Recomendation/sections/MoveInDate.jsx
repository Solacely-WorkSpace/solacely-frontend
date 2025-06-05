"use client"

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function MoveInDate({ setCurrentStage, currentStage }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["S", "M", "T", "W", "T", "F", "S"];

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(newDate);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const days = [];

        // Find first and last weekend dates
        let firstWeekendDate = null;
        let lastWeekendDate = null;
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            if (isWeekend) {
                if (firstWeekendDate === null) firstWeekendDate = day;
                lastWeekendDate = day;
            }
        }

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-10 h-10" />);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected = selectedDate && 
                             date.getDate() === selectedDate.getDate() && 
                             date.getMonth() === selectedDate.getMonth() && 
                             date.getFullYear() === selectedDate.getFullYear();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isSunday = date.getDay() === 0;
            const isSaturday = date.getDay() === 6;
            const isFirstWeekendDate = day === firstWeekendDate;
            const isLastWeekendDate = day === lastWeekendDate;
            
            days.push(
                <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={clsx(
                        "w-10 h-10 transition-all flex items-center justify-center",
                        {
                            "bg-primary text-white rounded-lg": isSelected,
                            "bg-primary text-white": !isSelected && isWeekend,
                            "rounded-tl-lg": !isSelected && isSunday && isFirstWeekendDate,
                            "rounded-bl-lg": !isSelected && isSunday && isLastWeekendDate,
                            "rounded-tr-lg": !isSelected && isSaturday && isFirstWeekendDate,
                            "rounded-br-lg": !isSelected && isSaturday && isLastWeekendDate,
                            "hover:bg-primary/5 hover:text-primary rounded-lg": !isSelected && !isWeekend
                        }
                    )}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <section className='flex-1 w-full p-6 md:p-12'>
            <div className="w-full">
                <div className="flex items-center justify-between w-full">
                    <Link href="#" onClick={() => setCurrentStage('features')} className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FiChevronLeft className="w-4 h-4 text-gray-600" /> Go back
                        </div>
                    </Link>  
                    <div className="flex items-center gap-1">
                        <p className="text-sm">Already have an account?</p>
                        <Link
                            href='/sign-in'
                            className="text-sm text-complementary"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-[200px] h-1 mx-auto mt-28 mb-10 bg-gray-300 rounded-full overflow-hidden transition-all">
                <div className={clsx(
                    "h-full  bg-primary", "w-[100%]"
                )}
                ></div>
            </div>

                <div className="w-full flex flex-col items-center text-center">
                    <div className="w-full md:w-[380px] flex flex-col items-center">
                        <h1 className="whitespace-nowrap">Move-in Date</h1>
                        <small className="text-[#9EA0AB] mt-5 block md:max-w-[340px]">
                            Choose a date best convenient for you to move in
                        </small>

                        <div className="mt-12 w-">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-medium">{months[currentMonth.getMonth()]}</h2>
                                <div className="flex gap-4">
                                    <button onClick={prevMonth} className="p-1">
                                        <FiChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={nextMonth} className="p-1">
                                        <FiChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <div className="grid grid-cols-7 mb-2">
                                    {days.map((day, index) => (
                                        <div 
                                            key={index} 
                                            className={clsx(
                                                "w-10 h-10 flex items-center justify-center text-sm",
                                                (index === 0 || index === 6) && "text-black font-"
                                            )}
                                        >
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-7 relative">
                                    {renderCalendar()}
                                </div>
                                </div>
                            </div>
                        </div>

                    <Link
                        href="/user/dashboard"
                        className="w-fit px-12 mt-12 btn-primary"
                    >
                        Continue
                    </Link>

                    <Link
                        href="/user/dashboard"
                        className="w-full mt-4 py-3 underline"
                    >
                        Skip
                    </Link>
                </div>
        </section>
    );
}
