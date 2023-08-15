import React from "react";
import HeroSection from "../Sections/Landing/HeroSection";
import RiskAnalysis from "../Sections/Landing/RiskAnalysis";
import Tips from "../Sections/Landing/Tips";
import Reminders from "../Sections/Landing/Reminders";
import Appointment from "../Sections/Landing/Appointment";
import LandingNav from "../components/LandingNav";
import Footer from "../components/Footer";
import {
    Box
} from '@chakra-ui/react'

const Landing = () => {
    return (
        <Box bg="#DCECF8">
            <LandingNav />
            <HeroSection />
            <RiskAnalysis />
            <Tips />
            <Appointment />
            <Reminders />
            <Footer />
        </Box>
    )
}

export default Landing