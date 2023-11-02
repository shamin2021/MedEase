import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Link, Box, VStack, Button, Checkbox, useBreakpointValue, Flex, Container,  FormControl, FormLabel, Heading, HStack, Stack, Text, Input, InputRightElement, InputGroup } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import lottie from 'lottie-web';
import loginAnimation from '../assets/lottie/login.json';
import { Link as ReactRouterLink } from 'react-router-dom'; // Import Link from react-router-dom



import useAuth from "../hooks/useAuth";
import axios from '../constants/axios';


const Login = () => {

    const { setAuth, persist, setPersist } = useAuth();
    const container = useRef(null);
    // const isMobile = window.innerWidth <= 768; // Check if the screen width is mobile-sized
    const isMobile = useBreakpointValue({ base: true, md: false }); // Detect mobile screen


    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    useEffect(() => {
        if (!isMobile) {
          // Load the animation only if not in mobile view
          const lottie = require('lottie-web'); // Lazy load Lottie animation
          lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loginAnimation, // Replace with your animation data
          });
        }
      }, [isMobile]);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loginAnimation,
        });
    }, []);

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
            else if (response.data.message === "Account Disabled") {
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
          <Flex alignItems="center">
            {!isMobile && (
              <Box w={{ base: '80%', md: '50%' }} ref={container} />
            )}
            <Container maxW="md" py={{ base: '10', md: '14' }} px={{ base: '0', sm: '2' }}>
              <Stack spacing="6">
                <Stack spacing="6" align="center" marginTop={"40px"}>
                  <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={{ base: 'lg', md: 'xl' }}>Sign in to your account</Heading>
                    <Text size={{ base: 'xs', md: 'sm' }}>
                      Don't have an account?{' '}
                      <Link as={ReactRouterLink} to="/register" color='blue.500' style={{ textDecoration: 'none' }}>
                        Sign up
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
                <Box
                  py={{ base: '4', sm: '8' }}
                  px={{ base: '8', sm: '10' }}
                  bg={{ base: 'blue.50', sm: 'bg.surface' }}
                  boxShadow={{ base: 'none', sm: 'md' }}
                  borderRadius={{ base: '24', sm: 'xl' }}
                  marginBottom={{ base:'5', sm: 'xl'}}

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
                          <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="email">Email</FormLabel>
                          <Input id="email" type="email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={email} />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="password">Password</FormLabel>
                          <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} value={password} />
                            <InputRightElement h={'full'}>
                              <Button
                                variant={'solid'}
                                color="blue.500"
                                onClick={() => setShowPassword((showPassword) => !showPassword)}
                              >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      </Stack>
                      {isMobile ? (
                    <VStack spacing="2" align="center">
                      <Checkbox
                        onChange={togglePersist}
                        isChecked={persist}
                        id="persist"
                      >
                        Remember me
                      </Checkbox>
                      <Link
                        as={ReactRouterLink}
                        to="/forgot-password"
                        color="blue.500"
                        size="sm"
                        style={{ textDecoration: 'none' }}
                      >
                        Forgot password?
                      </Link>
                    </VStack>
                  ) : (
                    <HStack justify="space-between">
                      <Checkbox
                        onChange={togglePersist}
                        isChecked={persist}
                        id="persist"
                      >
                        Remember me
                      </Checkbox>
                      <Link
                        as={ReactRouterLink}
                        to="/forgot-password"
                        color="blue.500"
                        size="sm"
                        style={{ textDecoration: 'none' }}
                      >
                        Forgot password?
                      </Link>
                    </HStack>
                    )}
                      <Stack spacing="6">
                        <Button colorScheme='blue' type='submit' id="login">
                          Sign in
                        </Button>
                      </Stack>
                    </Stack>
                  </form>
                </Box>
              </Stack>
            </Container>
          </Flex>
        </div>
      );
    };
    
    export default Login;
