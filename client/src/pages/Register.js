import { useState, useEffect, useRef } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, Box, Button, Container, FormControl, useBreakpointValue, FormLabel, Flex, Heading, Stack, Text, Input, Select } from '@chakra-ui/react'
import lottie from 'lottie-web';
import registerAnimation from '../assets/lottie/register.json';

import axios from '../constants/axios';

const EMAIL_REGEX = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const container = useRef(null);

    const [email, setEmail] = useState('');
    const [validEmail, setvalidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState(null)
    const [success, setSuccess] = useState(false);

    const chosenHlcName = localStorage.getItem("HLCName")
    const isMobile = useBreakpointValue({ base: true, md: false }); // Detect mobile screen


    useEffect(() => {
        setvalidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, firstName, lastName, matchPwd, dob, gender])



    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Input Given");
            return;
        }

        if (gender === 'SELECT') {
            setErrMsg('Select a Gender');
            return;
        }

        try {
            const response = await axios.post('/auth/register',
                JSON.stringify({ email, password, firstname: firstName, lastname: lastName, dob, gender, chosenHlcName }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            setSuccess(true);
            setErrMsg(response?.data?.message) //these needs to be chnaged later

            setEmail('');
            setFirstName('');
            setLastName('');
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

    useEffect(() => {
        if (!isMobile) {
            // Load the animation only if not in mobile view
            const lottie = require('lottie-web'); // Lazy load Lottie animation
            lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: registerAnimation, // Replace with your animation data
            });
        }
    }, [isMobile]);

    useEffect(() => {
        lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: registerAnimation,
        });
    }, []);

    return (
        <div className='Register mt-[3%]' >
            <Flex alignItems="center"  >
                {!isMobile && (
                    <Box w={{ base: '80%', md: '50%' }} ref={container} />
                )}
                <Container maxW="xl" py={{ base: '2', md: '4' }} px={{ base: '0', sm: '8' }} >
                    <Stack spacing="2">
                        <Stack spacing="2" align="center" marginTop={{ base: "60px", lg: "10px" }}>
                            <Stack spacing={{ base: '2', md: '2' }} textAlign="center">
                                <Heading size={{ base: 'lg', md: 'xl' }}>Register an account</Heading>
                                <Text size={{ base: 'xs', md: 'sm' }} marginBottom={"10px"}>
                                    Already have an account? <Link color='blue.500' href="/login" style={{ textDecoration: 'none' }}>Sign in</Link>
                                </Text>
                            </Stack>
                        </Stack>
                        <Box
                            py={{ base: '4', sm: '8' }}
                            px={{ base: '4', sm: '10' }}
                            bg={{ base: 'blue.50', sm: 'bg.surface' }}
                            boxShadow={{ base: 'none', sm: 'md' }}
                            borderRadius={{ base: '24', sm: 'xl' }}
                            marginBottom={{ base:'10', sm: 'xl'}}
                        >
                            <form onSubmit={handleSubmit}>
                                <Stack spacing="4">
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
                                    <Stack spacing="3">
                                        <Flex direction="row" justifyContent="space-between" gap={3}>
                                            <FormControl isRequired >
                                                <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="firstname">Firstname</FormLabel>
                                                <Input
                                                    id="firstname"
                                                    type="text"
                                                    autoComplete='off'
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    value={firstName}
                                                    size="sm"
                                                />
                                            </FormControl>

                                            <FormControl isRequired>

                                                <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="lastname">Lastname</FormLabel>
                                                <Input
                                                    id="lastname"
                                                    type="text"
                                                    autoComplete='off'
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    value={lastName}
                                                    size="sm"
                                                />
                                            </FormControl>
                                        </Flex>

                                        <Flex direction="row" justifyContent="space-between" gap={3}>
                                            <FormControl isRequired>
                                                <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="gender">Gender</FormLabel>
                                                <Select
                                                    id="gender"
                                                    autoComplete='off'
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    size="sm"
                                                >
                                                    <option value="SELECT">Select</option>
                                                    <option value="MALE">Male</option>
                                                    <option value="FEMALE">Female</option>
                                                </Select>
                                            </FormControl>

                                            <FormControl isRequired>
                                                <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="dob">Date of Birth</FormLabel>
                                                <Input
                                                    id="dob"
                                                    type="date"
                                                    autoComplete='off'
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                    max={new Date().toISOString().split("T")[0]}
                                                    size="sm"
                                                />
                                            </FormControl>
                                        </Flex>

                                        <FormControl isRequired>
                                            <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="email">Email</FormLabel>
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
                                                size="sm"
                                            />
                                        </FormControl>

                                        {emailFocus && !validEmail && (
                                            <Box bg="blue.100" p="2" mb="2" borderRadius="md">
                                                <p id="emailnote">
                                                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                                                    Please enter a valid email address.
                                                </p>
                                            </Box>
                                        )}

                                        <FormControl isRequired>
                                            <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="password">Password</FormLabel>
                                            <Input
                                                id="password"
                                                type="password"
                                                onChange={(e) => setPwd(e.target.value)}
                                                value={password}
                                                onFocus={() => setPwdFocus(true)}
                                                onBlur={() => setPwdFocus(false)}
                                                aria-invalid={validPwd ? "false" : "true"}
                                                aria-describedby="pwdnote"
                                                size="sm"
                                            />
                                        </FormControl>

                                        {pwdFocus && !validPwd && (
                                            <Box bg="blue.100" p="2" mb="2" borderRadius="md">
                                                <p id="pwdnote">
                                                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                                                    8 to 24 characters.<br />
                                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>

                                                </p>
                                            </Box>

                                        )}

                                        <FormControl isRequired>
                                            <FormLabel fontSize={{ base: 'sm', md: 'lg' }} htmlFor="confirm_password">Confirm Password</FormLabel>
                                            <Input
                                                id="confirm_password"
                                                type="password"
                                                onChange={(e) => setMatchPwd(e.target.value)}
                                                value={matchPwd}
                                                onFocus={() => setMatchFocus(true)}
                                                onBlur={() => setMatchFocus(false)}
                                                aria-invalid={validMatch ? "false" : "true"}
                                                aria-describedby="confirmnote"
                                                size="sm"
                                            />
                                        </FormControl>

                                        {matchFocus && !validMatch && (
                                            <Box bg="blue.100" p="2" mb="2" borderRadius="md">
                                                <p id="confirmnote" className="">
                                                    <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '8px' }} />
                                                    Must match the first Password Given.
                                                </p>
                                            </Box>
                                        )}

                                    </Stack>

                                    <Stack spacing="4">
                                        <Button colorScheme='blue' type='submit' size="sm" isDisabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign up</Button>
                                    </Stack>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </Container>
            </Flex>
        </div >
    )
}

export default Register;