import Ad from '@/UI/LandingPage/Sections/Ad'
import Hero from '@/UI/LandingPage/Sections/Hero'
import Offer from '@/UI/LandingPage/Sections/Offer'
import Tour from '@/UI/LandingPage/Sections/Tour'
import Waiting from '@/UI/LandingPage/Sections/Waiting'
import Cta from '@/UI/LandingPage/Sections/Cta'

export default function LandingPage() {
    return (
        <main className='w-screen flex flex-col gap-24 mt-20'>
            <Hero />
            <Tour />
            <Waiting />
            <Offer />
            <Ad />
            <Cta />
        </main>
    )
}
