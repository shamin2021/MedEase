import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import lottie from 'lottie-web';
import Reminder from '../../assests/lottie/Reminder.json';

const Reminders = () => {
  const container = React.useRef(null);

  React.useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: Reminder,
    });
  }, []);
  
  return (
    <Flex alignItems="center" justifyContent="space-between" p="8">
      <Box w={{ base: '100%', md: '50%' }} ref={container} />
      <Box w={{ base: '100%', md: '50%' }} pl={{ base: '0', md: '8' }}>
        <Heading as="h2" size="lg" mb="2" fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} color="#023276">
          Reminders
        </Heading>
        <Text mb="4" fontSize={{ base: '4xl' }}>
          Our reminders tool helps you stay on top of your health goals and appointments.
        </Text>
      </Box>
    </Flex>
  );
};

export default Reminders;