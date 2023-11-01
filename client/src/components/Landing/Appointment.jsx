import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import schedulingAnimation from '../../assets/lottie/Schedulinganimation.json';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'


const Appointment = () => {

    const container = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'canvas',
            loop: true,
            autoplay: true,
            animationData: schedulingAnimation,
        });
    }, []);

    return (
        <Flex
          alignItems={{ base: 'flex-start', md: 'center' }}
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          h="100vh"
        >
          <Box
            w={{ base: '100%', md: '50%' }}
            pl={{ base: '4', md: '8' }}
            pr={{ base: '4', md: '4' }}
            pb={{ base: '4', md: '0' }}
          >
            <Heading
              as="h2"
              size="lg"
              mb="2"
              fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }}
              color="#023276"
            >
              Scheduling Appointments
            </Heading>
            <Text mb="4" fontSize={{ sm: '2xl', lg: '4xl' }}>
              Hassle-free Healthcare Management
            </Text>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              variant="outline"
              size="lg"
              mt={{ base: '4', md: '0' }}
            >
              Learn More
            </Button>
          </Box>
          <Box w={{ base: '100%', md: '50%' }} ref={container} />
        </Flex>
      );
}

export default Appointment
