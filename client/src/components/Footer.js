import { Box, Text, Flex } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react';
import logo from '../assets/logo.svg';

const Footer = () => {

    return (
        <Box className="bg-indigo-100 dark:bg-indigo-200 text-gray-700 dark:text-gray-500">
            <Box py={10}>
                <Flex
                    align={'center'}
                    _before={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: 'gray.200',
                        flexGrow: 1,
                        mr: 4,
                    }}
                    _after={{
                        content: '""',
                        borderBottom: '1px solid',
                        borderColor: 'gray.200',
                        flexGrow: 1,
                        ml: 4,
                    }}>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={150}
                    />
                </Flex>
                <Text pt={6} fontSize={'sm'} textAlign={'center'}>
                    © 2023 MedEase. All rights reserved
                </Text>
            </Box>
        </Box>
    )
}

export default Footer