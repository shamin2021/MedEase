import React, { useState, useEffect, useRef } from 'react'
import { Link, Box, Button, Container, FormControl, Flex, FormLabel, Heading, Stack, Text, Input } from '@chakra-ui/react'
import lottie from 'lottie-web';
import forgetpwAnimation from '../assets/lottie/forgetpw.json';

import axios from '../constants/axios';

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false)
  const [state, setState] = useState(null);
  const container = useRef(null);


  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])


  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: forgetpwAnimation,
    });
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!validEmail) {
      setState("Invalid Email");
      return;
    }

    try {
      const response = await axios.post('/auth/forgot-password',
        JSON.stringify({ email }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data.message);
      setState(response.data.message);
      setEmail('')
      setValidEmail(false);

    } catch (err) {
      if (!err?.response) {
        setState('No Server Response');
      } else if (err.response?.status === 403) {
        setState("User Not Found");
      }
      else {
        setState(err.response?.data?.message);
      }
    }
  }

  return (
    <div className='forgotpw h-screen py-5 px-5' >
      <Flex alignItems="center" >
        <Box w={{ base: '80%', md: '40%' }} ref={container} />
        <Container maxW="md" py={{ base: '50', md: '150' }} px={{ base: '0', sm: '8' }} height="90vh" >
          <Stack spacing="6">
            <Stack spacing="6" align="center">
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={{ base: 'sm', md: 'lg' }}>Forgot your password</Heading>
                <Text size={{ base: 'xs', md: 'sm' }}>
                  No need right now? <Link color='blue.500' href="/login" style={{ textDecoration: 'none' }}>Sign in</Link>
                </Text>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', sm: '8' }}
              px={{ base: '4', sm: '10' }}
              bg={{ base: 'blue.50', sm: 'bg.surface' }}
              boxShadow={{ base: 'none', sm: 'md' }}
              borderRadius={{ base: 'none', sm: 'xl' }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing="6">
                  {state && (
                    <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                      <Text color="blue.600">{state}</Text>
                    </Box>
                  )}
                  <Stack spacing="5">
                    <FormControl isRequired>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input id="email" type="email" autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={email} />
                    </FormControl>

                  </Stack>
                  <Stack spacing="6">
                    <Button colorScheme='blue' type='submit'>Submit</Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Container>
      </Flex>
    </div>
  )
}

export default ForgotPassword
