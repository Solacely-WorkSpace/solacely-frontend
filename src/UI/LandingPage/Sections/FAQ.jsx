'use client'
import { useState } from 'react'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(2) // Third item open by default

    const faqs = [
        {
            question: "How does the pairing process work?",
            answer: "Our pairing process matches you with compatible roommates based on your preferences, lifestyle, and location requirements."
        },
        {
            question: "Can I edit my profile information?",
            answer: "Yes, you can edit your profile information at any time through your account settings to ensure accurate matching."
        },
        {
            question: "What happens if there's a disagreement between roommates?",
            answer: "We have a dispute resolution process in place to help users resolve any issues. If you encounter any issues, you can reach out to our support team, and we'll work with both parties to find a fair resolution."
        },
        {
            question: "Are there any fees for using Pair with Me?",
            answer: "We offer both free and premium features. Basic matching is free, while premium features require a subscription."
        }
    ]

    return (
        <section className="py-8 md:py-16 px-4 bg-purple-50">
            <div className="landingpage-container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="lg:w-1/3">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-sm md:text-base">We know you have questions, so we have taken it upon ourselves to provide answers.</p>
                </div>
                
                <div className="lg:w-2/3 space-y-3 md:space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-2 border-gray-600 rounded-lg overflow-hidden">
                            <button
                                className="w-full px-4 md:px-6 py-3 md:py-4 text-left hover:bg-gray-50 cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <div className="flex justify-between items-start gap-3">
                                    <span className="font-medium text-gray-800 text-sm md:text-base leading-relaxed break-words hyphens-auto" style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>{faq.question}</span>
                                    <span className="text-xl md:text-2xl text-gray-500 flex-shrink-0">
                                        {openIndex === index ? '−' : '+'}
                                    </span>
                                </div>
                            </button>
                            {openIndex === index && (
                                <div className="px-4 md:px-6 pb-3 md:pb-4">
                                    <p className="text-gray-600 text-sm md:text-base">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}