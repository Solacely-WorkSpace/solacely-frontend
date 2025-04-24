import Ad from '@/Components/Ad'
import Hero from '@/Components/Hero'
import Offer from '@/Components/Offer'
import Tour from '@/Components/Tour'
import Waiting from '@/Components/Waiting'
import Cta from '@/Components/Cta'

export default function LandingPage() {
    return (
        <main className='w-screen flex flex-col gap-24 mt-20'>
            <Tour />
            <Waiting />
            <Offer />
            <Ad />
            <Cta />
        </main>
    )
}
