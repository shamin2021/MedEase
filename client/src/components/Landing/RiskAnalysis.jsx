import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import lottie from 'lottie-web';
import Risk from '../../assets/lottie/Risk.json';
import { ArrowForwardIcon } from '@chakra-ui/icons'


const RiskAnalysis = () => {
    const container = React.useRef(null);

    React.useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: Risk,
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
        Risk Analysis
      </Heading>
      <Text mb="4" fontSize={{ sm: '2xl', lg: '4xl' }}>
        Our risk analysis tool provides personalized insights into your health risks.
      </Text>
      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="blue"
        variant="outline"
        mt={{ base: '4', md: '0' }}
        size={{ base: 'md', md: 'lg' }} // Set the button size based on the screen width
      >
        Learn More
      </Button>
    </Box>
    <Box w={{ base: '100%', md: '50%' }} ref={container} />
  </Flex>
);

      
};

export default React.memo(RiskAnalysis);