import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import aboutAnimation from '../../assets/lottie/Aboutanimation.json';
import { Box, Container, Stack, Heading, Text, Flex} from '@chakra-ui/react';

const AboutUs = () => {

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'canvas',
      loop: true,
      autoplay: true,
      animationData: aboutAnimation,
    });
  }, []);

  return (
    <Container maxW={'5xl'}>
  <Flex
    justifyContent="flex-start"
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems="center"
    spacing={4}
    py={16}
    h="80vh" // Set the vertical height to 100%
  >
    <Stack as={Box} maxW="100%" textAlign="left">
      <Heading
        as="h2"
        size="lg"
        mb="2"
        fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }}
        color="#023276"
      >
        About Us <br />
      </Heading>
      <Text mb="4" fontSize={{ sm: 'lg', lg: 'xl' }}>
        MedEase is more than an app; it's a caring companion on your journey towards wellness. Dedicated to supporting individuals living with non-communicable diseases (NCDs), MedEase offers a range of essential features designed to simplify and enrich your daily health experience. Our commitment is to empower you with the tools you need to live your best life, every day. Welcome to MedEase - where health meets heart.
      </Text>
    </Stack>
    <Box w="100%" ref={container} mx="auto" />
  </Flex>
</Container>

  );
};

export default AboutUs