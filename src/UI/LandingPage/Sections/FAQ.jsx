'use client'
import { useState } from 'react'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(2) // Third item open by default

    const faqs = [
        {
            question: "What is Solacely?",
            answer: "Solacely is a real estate platform powered by AI and built on blockchain technology, designed to provide a secure and efficient way to find and manage rentals."
        },
        {
            question: "How does Solacely work?",
            answer: "Solacely uses AI-powered recommendations to help tenants find verified rentals, while landlords can list their properties and collect rents securely through the platform."
        },
        {
            question: "How do I find a rental on Solacely?",
            answer: "Simply browse through our verified listings and use our AI-powered recommendations to find your perfect match."
        },
        {
            question: "Can I pay rent in installments?",
            answer: "Yes, Solacely offers flexible rent payment options, allowing you to pay instalments."
        },
        {
            question: "How do I list my property on Solacely?",
            answer: "Simply create an account, and follow our easy listing process to showcase your property to potential tenants."
        }
    ]

    return (
        <section className="py-8 md:py-16 px-4 bg-purple-50">
            <div className="landingpage-container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="lg:w-1/3">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-smHow do I list my property on Solacely?:  md:text-base">We know you have questions, so we have taken it upon ourselves to provide answers.</p>
                </div>
                
                <div className="lg:w-2/3 space-y-3 md:space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-2 border-gray-600 rounded-lg overflow-hidden">
                            <button
                                className="w-full px-3 md:px-6 py-3 md:py-4 text-left hover:bg-gray-50 cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                            >
                                <div className="flex items-start justify-between">
                                    <span 
                                        className="font-medium text-gray-800 text-sm md:text-base leading-relaxed pr-4" 
                                        style={{
                                            wordBreak: 'break-word', 
                                            overflowWrap: 'break-word', 
                                            hyphens: 'auto',
                                            lineHeight: '1.4',
                                            width: 'calc(100% - 40px)'
                                        }}
                                    >
                                        {faq.question}
                                    </span>
                                    <span className="text-lg md:text-2xl text-gray-500 flex-shrink-0 w-[32px] text-center ml-2">
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