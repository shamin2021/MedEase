import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import lottie from 'lottie-web';
import Risk from './Risk.json';

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
    <Flex alignItems="center" justifyContent="space-between" h="100vh">
      <Box w="50%" pl="8" pr="4" borderLeft="80px solid transparent">
        <Heading as="h2" size="lg" mb="2" fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} color="#023276">
          Risk Analysis
        </Heading>
        <Text mb="4" fontSize={{ base: '4xl' }}>
          Our risk analysis tool provides personalized insights into your health risks.
        </Text>
      </Box>
      <Box w="50%" ref={container} />
    </Flex>
  );
};

export default React.memo(RiskAnalysis);