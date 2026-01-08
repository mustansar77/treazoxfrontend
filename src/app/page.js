import React from 'react'
import LandingPage from './components/LandingPage'
import AboutUs from './components/AboutUs'
import InvestmentPlans from './components/InvestmentPlans'
import LuckyDraw from './components/LuckyDraw'
import ContactUs from './components/ContactUs'
import DrawsOnWithoutToken from './components/DrawsOnWithoutToken'

const page = () => {
  return (
    <>
    
    <LandingPage/>
    <AboutUs/>
    <InvestmentPlans/>
   <DrawsOnWithoutToken/>
    <ContactUs/>
    </>
  )
}

export default page