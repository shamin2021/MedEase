import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import Tipsanimation from '../../assets/lottie/Tipsanimation.json';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Tips = () => {
    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'canvas',
            loop: true,
            autoplay: true,
            animationData: Tipsanimation,
        });
    }, []);

    return (
        <Flex alignItems="center" justifyContent="space-between" p="8">
            <Box w={{ base: '100%', md: '50%' }} ref={container} />
            <Box w={{ base: '100%', md: '50%' }} pl={{ base: '0', md: '8' }}>
                <Heading as="h2" size="lg" mb="2" fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} color="#023276">
                    Health Lifestyle Tips
                </Heading>
                <Text mb="4" fontSize={{ base: '4xl' }}>
                    Discover practical guidance on nutrition, exercise, stress management, sleep hygiene, and more.
                </Text>
            </Box>
        </Flex>
    );
};

export default Tips;