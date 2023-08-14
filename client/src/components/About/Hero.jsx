import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import aboutAnimation from '../../assets/lottie/Aboutanimation.json';
import { Box, Container, Stack, Heading, Text, } from '@chakra-ui/react';

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
    <Container maxW={'3xl'}>
      <Stack
        as={Box}
        textAlign={'center'}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          About Us <br />
        </Heading>
        <Text color={'gray.500'}>
          MedEase is more than an app; it's a caring companion on your journey towards wellness. Dedicated to supporting individuals living with non-communicable diseases (NCDs), MedEase offers a range of essential features designed to simplify and enrich your daily health experience. From seamless communication with doctors and curated healthy living tips to locating specialized Health Lifestyle Centers (HLCs) and managing appointments effortlessly, MedEase is your trusted partner in navigating the world of health with confidence and ease. Our commitment is to empower you with the tools you need to live your best life, every day. Welcome to MedEase - where health meets heart.
        </Text>
        <Box w="100%" h="auto" ref={container} mt="4" mx="auto"/>
      </Stack>
    </Container>
  );
};

export default AboutUs