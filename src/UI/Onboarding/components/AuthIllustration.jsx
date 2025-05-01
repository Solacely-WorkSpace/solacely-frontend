import { authImg } from '@/assets/images'
import Image from 'next/image'

export default function AuthIllustration() {
    return (
        <div className='fixed h-screen w-[400px] z-10 overflow-hidden hidden md:block'>
            <Image
                src={authImg}
                alt='auth image'
                width={2000}
                height={2000}
                placeholder='blur'
                className='h-full w-fit absolute top-0 right-0 -z-10'
            />

            <div className='bg-[#00000061] h-full w-full p-12 z-40'>
                <h3 className="text-white">Solacely</h3>
            </div>
        </div>
    )
}
