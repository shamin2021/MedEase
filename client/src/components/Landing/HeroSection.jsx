import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import { Image, Flex } from "@chakra-ui/react";
import Blur from '../../assets/Blur.png';
import logo from '../../assets/logo.svg';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const HeroSection = () => {
  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
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
          <Flex justify="center" marginRight={{ base: '0', lg: '40px' }}>
            <Image src={logo} alt="Section 1" width="50vw" />
          </Flex>
          <Text mb="4" fontSize={{ sm: "lg", lg: "2xl" }} fontWeight={500}>
            Embracing Your Well-being with Care and Comfort
          </Text>
        </Flex>
      </Box>
    </motion.div>
  )
}

export default HeroSection

