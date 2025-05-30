import { authImg } from '@/assets/images'
import Image from 'next/image'

export default function AuthIllustration() {
    return (
        <div className='md:fixed h-fit md:h-screen w-full md:w-[400px] z-10 overflow-hidden '>
            <Image
                src={authImg}
                alt='auth image'
                width={2000}
                height={2000}
                placeholder='blur'
                className='h-full w-fit absolute top-0 right-0 -z-10 hidden md:block'
            />

            <div className='md:bg-[#00000061] h-full w-full mt-12 md:mt-0 md:p-12 z-40'>
                <h3 className="hidden md:block md:text-white text-center md:text-start">Solacely</h3>
                <Image
                    src="/icons/Logo.svg"
                    alt='logo'
                    width={20}
                    height={24}
                    className='md:hidden block w-28 h-6 mb-4 mx-auto md:mx-0 md:mb-0'
                />
            </div>
        </div>
    )
}
