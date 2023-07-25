import { Container } from "@chakra-ui/react";
import React from "react";
import { extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";


    
const HeroSection = () => {
    return (
        
        <>
            <Container maxW="container.xl" centerContent>
                <h1>Introducing</h1>
                <ColorModeSwitcher justifySelf="flex-end" />
                <h1>Embracing Your Well-being with Care and Comfort </h1>
            </Container>
        </>
    )
}

export default HeroSection