import Ad from '@/Components/Ad'
import AiPopuop from '@/Components/AiPopuop'
import Hero from '@/Components/Hero'
import Offer from '@/Components/Offer'
import Tour from '@/Components/Tour'
import Waiting from '@/Components/Waiting'
import Cta from '@/Components/Cta'
import React from 'react'

const Home = () => {
  return (
    <section className=' overflow-hidden'>
      <AiPopuop/>

      <Hero />

      <Tour />

      <Waiting />

      <Offer />

      <Ad />

      <Cta />


    </section>
  )
}

export default Home