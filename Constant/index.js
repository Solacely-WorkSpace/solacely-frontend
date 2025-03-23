const Testimonial = [{
    username: '- @thepatwalls',
    testimony: 'I owe these guys my life. Already used their landing page templates for my latest two projects.',
    social: '/icons/linkedin.svg',
    pic: '/images/pat.jpg'

}, 
{
    username: ' - @thepatwalls',
    testimony: "Time is the most precious thing you have when bootstrapping. You can't take time to ponder on…",
    social: '/icons/linkedin.svg',
    pic: '/images/pat.jpg'

}, 
{
    username: ' - @thepatwalls',
    testimony: 'I owe these guys my life. Already used their landing page templates for my latest two projects.',
    social: '/icons/linkedin.svg',
    pic: '/images/pat.jpg'

}, 
{
    username: '- @thepatwalls',
    testimony: ' Best Home Rental Company so awesome.',
    social: '/icons/linkedin.svg',
    pic: '/images/pat.jpg'

}, 
{
    username: ' - @thepatwalls',
    testimony: ' I owe these guys my life. Already used their landing page templates for my latest two projects.',
    social: '/icons/linkedin.svg',
    pic: '/images/pat.jpg'

}, 
{
    username: ' - @thepatwalls',
    testimony: ' There Homes Are Top Notch Cant See Me Changing Location Anytime Soon, Best Home PLug.',
    social: '/icons/linkedin.svg',
    pic: '/images/pat.jpg'

}, 

]

const whatWeOffer = [
    {
    offer: 'Our AI-driven system understands your needs and delivers property recommendations tailored to your preferences, budget, and lifestyle.',
    icon: '/icons/star.svg',
    header: 'Personalized Property Matching'
    
},
    {
    offer: 'We eliminate the guesswork by ensuring every property on our platform is verified with secure digital records and transparent ownership history.',
    icon: '/icons/leaf.svg',
    header: 'Verified & Secure Transactions'
    
},
    {
    offer: 'Enjoy post-transaction services, including maintenance tracking, legal documentation, and ongoing property insights.',
    icon: '/icons/cirle.svg',
    header: 'Property Management Tools'
    
},
    {
    offer: 'Make informed decisions with real-time property value estimations and AI-powered investment analytics',
    icon: '/icons/icon.svg',
    header: 'Data-Driven Market Insights'
    
},

]


const slideInLeft = {
    hidden: {opacity: 0, x: -200},
    visible: {opacity: 1, x: 0, transition: { duration: 1}}
}

const  fadeIn = {
    hidden: {opacity: 0, scale: 0.6},
    visible: {opacity: 1, scale: 1, transition: {duration: 1}}
}


const slideInRight = {
    hidden: { opacity: 0, x: 200},
    visible: {opacity: 1, x: 0, transition: {duration: 1}}
}

const enterFrame = {
    hidden: {opacity: 0, y: '-100vw'},
    visible: {opacity: 1, y: 0, transition: {type: 'spring', stiffness: 125, staggerChildren: 0.3}}
}

const btn = {
    hover: {scale: 1.1},
    tap: {scale: 0.9}
}


export {
    Testimonial,
    whatWeOffer,
    fadeIn,
    enterFrame,
    slideInLeft,
    slideInRight,
    btn

}