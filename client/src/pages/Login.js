import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Link, Box, ButtonGroup, VisuallyHidden, Button, Checkbox, Container, Divider, FormControl, FormLabel, Heading, HStack, Stack, Text, Image, Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { FcGoogle } from 'react-icons/fc'
import { GrApple } from 'react-icons/gr'

import useAuth from "../hooks/useAuth";
import axios from '../constants/axios';


const Login = () => {

    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post('/auth/authenticate',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);

            if (response.data.message === "Activate Your Account By Setting Up a Password") {
                setErrorMsg(response.data.message);
            }
            else {
                setAuth(response?.data);
                setEmail('');
                setPassword('');

                const from = location.state?.from || { pathname: '/' + response?.data?.role?.toLowerCase() };
                // to sync with the sidebar
                localStorage.setItem('activeItem', 'Dashboard');
                navigate(from, { replace: true });
            }

        } catch (err) {
            if (!err?.response) {
                setErrorMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMsg('Missing Username or Password');
            } else if (err.response?.status === 403) {
                setErrorMsg('Unauthorized');
            } else {
                setErrorMsg('Login Failed');
            }
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (

        <div className='login'>
            <Container maxW="lg" py={{ base: '10', md: '14' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="6">
                    <Stack spacing="6" align="center">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'sm', md: 'lg' }}>Sign in to your account</Heading>
                            <Text size={{ base: 'xs', md: 'md' }}>
                                Don't have an account? <Link color='blue.500' href="/register" style={{ textDecoration: 'none' }}>Sign up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'bg.surface' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing="6">
                                {errorMsg && (
                                    <Box bg="red.100" p="2" mb="4" borderRadius="md">
                                        <Text color="red.600">{errorMsg}</Text>
                                    </Box>
                                )}
                                <Stack spacing="5">
                                    <FormControl isRequired>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input id="email" type="email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={email} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <InputGroup>
                                            <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} />
                                            <InputRightElement h={'full'}>
                                                <Button
                                                    variant={'solid'}
                                                    color="blue.500"
                                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Stack>
                                <HStack justify="space-between">
                                    <Checkbox onChange={togglePersist} isChecked={persist} id='persist'>Remember me</Checkbox>
                                    <Link color='blue.500' href="/register" size='sm' style={{ textDecoration: 'none' }}>Forgot password?</Link>
                                </HStack>
                                <Stack spacing="6">
                                    <Button colorScheme='blue' type='submit'>Sign in</Button>
                                    <HStack>
                                        <Divider />
                                        <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                            or continue with
                                        </Text>
                                        <Divider />
                                    </HStack>
                                    <ButtonGroup variant="outline" spacing="4">
                                        <Button key={'Google'} flexGrow={1}>
                                            <VisuallyHidden>Sign in with {'Google'}</VisuallyHidden>
                                            <FcGoogle />
                                        </Button>
                                        <Button key={'Apple'} flexGrow={1}>
                                            <VisuallyHidden>Sign in with {'Apple'}</VisuallyHidden>
                                            <GrApple />
                                        </Button>
                                    </ButtonGroup>
                                </Stack>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Container>
        </div>
    )
}

export default Login
