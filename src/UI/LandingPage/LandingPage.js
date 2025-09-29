import Ad from '@/UI/LandingPage/Sections/Ad'
import Hero from '@/UI/LandingPage/Sections/Hero'
import WhatWeOffer from '@/UI/LandingPage/Sections/WhatWeOffer'
import Tour from '@/UI/LandingPage/Sections/Tour'
import Waiting from '@/UI/LandingPage/Sections/Waiting'
import Cta from '@/UI/LandingPage/Sections/Cta'
import WhyChooseSolacely from './Sections/WhyChooseSolacely'
import PartnersCarousel from './Sections/PartnersCarousel'
import HowItWorks from './Sections/HowItWorks'
import ContactForm from './Sections/ContactForm'
import FAQ from './Sections/FAQ'
import ScrollReveal from '@/components/ScrollReveal'
import ScrollToTop from '@/components/ScrollToTop'

export default function LandingPage() {
    return (
        <>
            <Hero />

            <main className='w-screen flex flex-col gap-24 bg-purple-50'>
                <ScrollReveal><WhyChooseSolacely /></ScrollReveal>
                <ScrollReveal delay={100}><Tour /></ScrollReveal>
                <ScrollReveal delay={200}><HowItWorks /></ScrollReveal>
                <ScrollReveal delay={100}><WhatWeOffer /></ScrollReveal>
                <ScrollReveal delay={200}><Waiting /></ScrollReveal>
                <ScrollReveal delay={100}><ContactForm /></ScrollReveal>
                <ScrollReveal delay={200}><Cta /></ScrollReveal>
                <ScrollReveal delay={100}><FAQ /></ScrollReveal>
                <ScrollReveal delay={200}><Ad /></ScrollReveal>
                <ScrollReveal><PartnersCarousel /></ScrollReveal>
            </main>
            <ScrollToTop />
        </>
    )
}
