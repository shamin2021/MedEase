import React from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import Card from "../../../components/card/Card";


const AddTasksForm = () => {
    const textColor = useColorModeValue("navy.700", "white");
    const brandStars = useColorModeValue("brand.500", "brand.400");

    return (
        <Card
            direction='column'
            w='100%'
            px='20px'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
            <FormControl>
                <Flex mb={'20px'}>
                    <Flex flexWrap={1} align={'center'}>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            mb='0px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}>
                            User Id<Text color={brandStars}>*</Text>
                        </FormLabel>
                    </Flex>
                    <Flex>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='text'
                            placeholder='Ex: 123456789'
                            fontWeight='500'
                            size='lg'
                        />
                    </Flex>
                </Flex>
                <FormLabel
                    display='flex'
                    ms='4px'
                    mb='12px'
                    fontWeight='500'
                    color={textColor}>
                    Tasks
                </FormLabel>

                {Array.from(Array(10), (e, i) => {
                    return (
                        <Flex mb={'8px'} key={i}>
                            <Input
                                isRequired={true}
                                variant='auth'
                                fontSize='sm'
                                ms={{ base: "0px", md: "0px" }}
                                type='text'
                                placeholder={`Task ${i + 1}`}
                                fontWeight='500'
                                size='lg'
                            />
                        </Flex>
                    )
                })}

                <Flex justify={'center'}>
                    <Button
                        // fontSize='sm'
                        variant='brand'
                        fontWeight='500'
                        w={{ base: '100%', sm: '80%', md: '50%', lg: '30%' }}
                        h='50'
                        my='24px'>
                        Create Plan
                    </Button>
                </Flex>
            </FormControl>
        </Card>
    )
}

export default AddTasksForm