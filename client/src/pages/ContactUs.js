import React from 'react';
import Hero from '../components/Contact/Hero';
import { Box } from '@chakra-ui/react';

const AboutUs = () => {
  localStorage.setItem('activeItem', 'Dashboard');
  return (
    <Box bg="#DCECF8">
      <Hero />
    </Box>
  );
};

export default AboutUs;