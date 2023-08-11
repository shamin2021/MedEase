import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Image, Flex } from "@chakra-ui/react";

const HeroSection = () => {
  return (
    <Box p="6" mb="6" textAlign="center" bgImage ="url('./Blur.png')" bgSize="cover" bgPosition="center" h="100vh">
      <Flex direction="column" justifyContent="center" alignItems="center" h="100%">
        <Text mb="4" fontSize={{ base: '4xl' }}>
          Introducing  
        </Text>
        <Flex justify="center">
          <Image src="../../12.png" alt="Section 1" width="50vw"/>
        </Flex>
        <Text mb="4" fontSize={{ base: '4xl' }}>
          Embracing Your Well-being with Care and Comfort 
        </Text>
      </Flex>
    </Box>
  );
};

export default HeroSection;