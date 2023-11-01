import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { Image, Flex, } from "@chakra-ui/react";
import Blur from '../../assets/Blur.png';
import logo from '../../assets/logo.svg';

const HeroSection = () => {
  return (
      <Box
          p="6"
          mb="6"
          textAlign="center"
          backgroundImage={`url(${Blur})`}
          backgroundSize="cover"
          backgroundPosition="center"
          height="100vh"
      >
          <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
              <Flex justify="center">
                  <Image src={logo} alt="Section 1" width="50vw" />
              </Flex>
              <Text mb="4" fontSize={{ sm: "2xl", lg: "4xl" }} fontWeight={500}>
                  Embracing Your Well-being with Care and Comfort
              </Text>
          </Flex>
      </Box>
  )
}

export default HeroSection
