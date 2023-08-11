import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import schedulingAnimation from './Scheduling.json';
import { Box, Heading, Text } from '@chakra-ui/react';

const Scheduling = () => {
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
    <>
      <Box p="6" mb="6">
        <Heading as="h2" size="lg" mb="2">
          Scheduling Appointments
        </Heading>
        <Text fontSize="md" mb="4">
          Hassle-free Healthcare Management
        </Text>
      </Box>
      <div ref={container} style={{ width: 200, height: 200 }} />
    </>
  );
};

export default Scheduling;