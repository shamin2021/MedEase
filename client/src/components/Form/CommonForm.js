import React from 'react';
import {
    ChakraProvider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    RadioGroup,
    Radio,
    Stack,
    Select,
    Switch,
    chakra,
} from '@chakra-ui/react';

const MyFormControl = chakra(FormControl, {
    baseStyle: {
        margin: '0.8rem',
    },
});

function SimpleForm() {
    return (
        <ChakraProvider>
            <form style={{ width: '40rem' }}>

                <Flex>
                    <MyFormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="Enter your name" />
                    </MyFormControl>

                    <MyFormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email address" />
                    </MyFormControl>
                </Flex>

                <MyFormControl>
                    <FormLabel>Name</FormLabel>
                    <Input type="text" placeholder="Enter your name" />
                </MyFormControl>

                <MyFormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter your email address" />
                </MyFormControl>

                <MyFormControl>
                    <FormLabel>Message</FormLabel>
                    <Input as="textarea" placeholder="Enter your message" />
                </MyFormControl>


                <MyFormControl>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup defaultValue="male">
                        <Stack direction="row">
                            <Radio value="male">Male</Radio>
                            <Radio value="female">Female</Radio>
                            <Radio value="other">Other</Radio>
                        </Stack>
                    </RadioGroup>
                </MyFormControl>

                <MyFormControl>
                    <FormLabel>Country</FormLabel>
                    <Select placeholder="Select your country">
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        <option value="uk">UK</option>
                        <option value="australia">Australia</option>
                        {/* Add more options as needed */}
                    </Select>
                </MyFormControl>

                <FormControl display='flex' alignItems='center'>
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Enable email alerts?
                    </FormLabel>
                    <Switch size='md' id='email-alerts' />
                </FormControl>

                
                <Button type="submit" mt={4} colorScheme="teal">
                    Submit
                </Button>

            </form>
        </ChakraProvider>
    );
}

export default SimpleForm;
