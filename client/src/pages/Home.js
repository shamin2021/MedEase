import React from 'react'
import { Box } from '@chakra-ui/react'
import HeroSection from '../components/Landing/HeroSection'
import RiskAnalysis from '../components/Landing/RiskAnalysis'
import Tips from '../components/Landing/Tips'
import Appointment from '../components/Landing/Appointment'
import Reminders from '../components/Landing/Reminder'

const Home = () => {
  return (
    <Box bg="#DCECF8">
      <HeroSection />
      <RiskAnalysis />
      <Tips />
      <Appointment />
      <Reminders />
    </Box>
  )
}

export default Home