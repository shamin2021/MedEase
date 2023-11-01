import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import lottie from 'lottie-web';
import Reminder from '../../assets/lottie/Reminder.json';
import { ArrowForwardIcon } from '@chakra-ui/icons'

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
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'flex-start', md: 'center' }}
            justifyContent="space-between"
            p="8"
        >
            <Box w={{ base: '100%', md: '50%' }} ref={container} />
            <Box w={{ base: '100%', md: '50%' }} pl={{ base: '0', md: '8' }}>
                <Heading as="h2" size="lg" mb="2" fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} color="#023276">
                    Reminders
                </Heading>
                <Text mb="4" fontSize={{ base: '2xl', md: '4xl' }}>
                    Our reminders tool helps you stay on top of your health goals and appointments.
                </Text>
                <Button rightIcon={<ArrowForwardIcon />} colorScheme='blue' variant='outline' mt="4">
                    Learn More
                </Button>
            </Box>
        </Flex>
    );
};

export default Reminders;
