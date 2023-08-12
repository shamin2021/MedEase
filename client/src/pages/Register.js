import { useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Box, ButtonGroup, VisuallyHidden, Button, Container, Divider, FormControl, FormLabel, Heading, HStack, Stack, Text, Input } from '@chakra-ui/react'
import { FcGoogle } from 'react-icons/fc'
import { GrApple } from 'react-icons/gr'

import axios from '../constants/axios';

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
const USER_REGEX = /^[A-Za-z ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const [email, setEmail] = useState('');
    const [validEmail, setvalidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setvalidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState(null)
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setvalidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setvalidUsername(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, username, matchPwd])



    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        const v3 = USER_REGEX.test(username);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }


        try {
            const response = await axios.post('/auth/register',
                JSON.stringify({ email, password, username }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            setSuccess(true);
            setErrMsg(response?.data?.message) //these needs to be chnaged later

            setEmail('');
            setUsername('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
        }
    }

    return (
        <div className='Register'>
            <Container maxW="lg" py={{ base: '10', md: '14' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="6">
                    <Stack spacing="6" align="center">
                        <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                            <Heading size={{ base: 'sm', md: 'lg' }}>Register an account</Heading>
                            <Text size={{ base: 'xs', md: 'md' }}>
                                Already have an account? <Link color='blue.500' href="/login" style={{ textDecoration: 'none' }}>Sign in</Link>
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
                                {success && (
                                    <Box bg="green.100" p="2" mb="4" borderRadius="md">
                                        <Text color="green.600">Registration Successful</Text>
                                    </Box>
                                )}
                                {errMsg && (
                                    <Box bg="red.100" p="2" mb="4" borderRadius="md">
                                        <Text color="red.600">{errMsg}</Text>
                                    </Box>
                                )}
                                <Stack spacing="5">
                                    <FormControl isRequired>
                                        <FormControl isRequired>
                                            <FormLabel htmlFor="username">Username</FormLabel>
                                            <Input
                                                id="username"
                                                type="text"
                                                autoComplete='off'
                                                onChange={(e) => setUsername(e.target.value)}
                                                value={username}
                                                onFocus={() => setUsernameFocus(true)}
                                                onBlur={() => setUsernameFocus(false)}
                                                aria-invalid={validUsername ? "false" : "true"}
                                                aria-describedby="usernamenote"
                                            />
                                        </FormControl>
                                    </FormControl>

                                    {usernameFocus && !validUsername && (
                                        <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                                            <p id="usernamenote">
                                                <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                                                Please enter a valid username.
                                            </p>
                                        </Box>
                                    )}

                                    <FormControl isRequired>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            autoComplete='off'
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="emailnote"
                                        />
                                    </FormControl>

                                    {emailFocus && !validEmail && (
                                        <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                                            <p id="emailnote">
                                                <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                                                Please enter a valid email address.
                                            </p>
                                        </Box>
                                    )}

                                    <FormControl isRequired>
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            value={password}
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                        />
                                    </FormControl>

                                    {pwdFocus && !validPwd && (
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
                                        <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
                                        <Input
                                            id="confirm_password"
                                            type="password"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                        />
                                    </FormControl>

                                    {matchFocus && !validMatch && (
                                        <Box bg="blue.100" p="2" mb="4" borderRadius="md">
                                            <p id="confirmnote" className="">
                                                <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                                                Must match the first Password Given.
                                            </p>
                                        </Box>
                                    )}

                                </Stack>

                                <Stack spacing="6">
                                    <Button colorScheme='blue' type='submit' isDisabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign up</Button>
                                    <HStack>
                                        <Divider />
                                        <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                                            or continue with
                                        </Text>
                                        <Divider />
                                    </HStack>
                                    <ButtonGroup variant="outline" spacing="4">
                                        <Button key={'Google'} flexGrow={1}>
                                            <VisuallyHidden>Sign up with {'Google'}</VisuallyHidden>
                                            <FcGoogle />
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

export default Register;