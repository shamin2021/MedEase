import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import schedulingAnimation from '../../assests/lottie/Schedulinganimation.json';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

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
    <Flex alignItems="center" justifyContent="space-between" h="100vh">
      <Box w="50%" pl="8" pr="4" borderLeft="80px solid transparent">
        <Heading as="h2" size="lg" mb="2" fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} color="#023276">
          Scheduling Appointments
        </Heading>
        <Text mb="4" fontSize={{ base: '4xl' }}>
          Hassle-free Healthcare Management
        </Text>
      </Box>
      <Box w="50%" ref={container} />
    </Flex>
  );
};

export default Appointment;