import AboutNavbar from '@/UI/AboutPage/Components/AboutNavbar'
import AboutHero from '@/UI/AboutPage/Sections/AboutHero'
import Newsletter from '@/UI/AboutPage/Sections/Newsletter'
import AboutOffer from '@/UI/AboutPage/Sections/AboutOffer'

export default function AboutPage() {
    return (
        <main className='w-screen flex flex-col gap-24 mt-20'>
            <AboutNavbar />
            <AboutHero />
            <AboutOffer />
            <Newsletter />
            
        </main>
    )
}