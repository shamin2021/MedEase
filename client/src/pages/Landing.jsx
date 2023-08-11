import React from "react";
import HeroSection from "../Sections/Landing/HeroSection";
import RiskAnalysis from "../Sections/Landing/RiskAnalysis";
import Tips from "../Sections/Landing/Tips";
import Reminders from "../Sections/Landing/Reminders";
// import Scheduling from "../Sections/Landing/Scheduling";
import LandingNav from "../components/LandingNav";
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
            <Reminders />
            {/* <Scheduling /> */}
        </Box>
    )
}

export default Landing