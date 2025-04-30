import AboutNavbar from '@/UI/AboutPage/Components/AboutNavbar'
import AboutUsInfo from '@/UI/AboutPage/Sections/AboutUsInfo'
import Newsletter from '@/UI/AboutPage/Sections/Newsletter'

export default function AboutPage() {
    return (
        <main className='w-screen flex flex-col gap-24 mt-20'>
            <AboutNavbar />
            <AboutUsInfo />
            <Newsletter />
            
        </main>
    )
}