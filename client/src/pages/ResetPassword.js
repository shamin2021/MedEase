import React, { useState, useEffect } from 'react'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Container, FormControl, FormLabel, Heading, Stack, Text, Input } from '@chakra-ui/react'

import { useParams } from 'react-router-dom';
import axios from '../constants/axios';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ResetPassword = () => {

  const { token } = useParams();

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState(null);


  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === matchPassword);
  }, [password, matchPassword])

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!PWD_REGEX.test(password)) {
      setErrMsg("Invalid Email");
      return;
    }

    try {
      const response = await axios.post(`/auth/reset-password/${token}`,
        JSON.stringify({ password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data.message);
      setErrMsg(response?.data?.message);
      setPassword('');
      setMatchPassword('');

    } catch (err) {
      if (!err?.response) {
        console.log(err.response?.data?.message);
        setErrMsg('No Server Response');
      } else {
        setErrMsg(err.response?.data?.message);
      }
    }
  }

  return (
    <div className='resetpw'>
      <Container maxW="lg" py={{ base: '10', md: '14' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="6">
          <Stack spacing="6" align="center">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'sm', md: 'lg' }}>Reset Password</Heading>
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
                {errMsg && (
                  <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                    <Text color="blue.600">{errMsg}</Text>
                  </Box>
                )}
                <Stack spacing="5">
                  <FormControl isRequired>
                    <FormLabel htmlFor="password">New Password</FormLabel>
                    <Input
                      id="password"
                      type="password"
                      autoComplete='off'
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      aria-invalid={validPassword ? "false" : "true"}
                      aria-describedby="pwdnote"
                    />
                  </FormControl>

                  {pwdFocus && !validPassword && (
                    <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                      <p id="pwdnote">
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                      </p>
                    </Box>
                  )}

                  <FormControl isRequired>
                    <FormLabel htmlFor="confirm_pw">Confirm Password</FormLabel>
                    <Input
                      id="confirm_pw"
                      type="password"
                      autoComplete='off'
                      onChange={(e) => setMatchPassword(e.target.value)}
                      value={matchPassword}
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      aria-invalid={validMatch ? "false" : "true"}
                      aria-describedby="confirmnote"
                    />
                  </FormControl>

                  {matchFocus && !validMatch && (
                    <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                      <p id="confirmnote">
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                        Must match the first Password Given.
                      </p>
                    </Box>

                  )}

                </Stack>

                <Stack spacing="6">
                  <Button colorScheme='blue' type='submit' isDisabled={!validPassword || !validMatch ? true : false}>Reset Password</Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>

    </div>
  )
}

export default ResetPassword
