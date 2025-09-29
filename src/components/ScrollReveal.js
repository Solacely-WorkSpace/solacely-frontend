'use client'
import useScrollReveal from '@/hooks/useScrollReveal'

export default function ScrollReveal({ children, className = '', delay = 0 }) {
    const [ref, isVisible] = useScrollReveal(0.1)

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}