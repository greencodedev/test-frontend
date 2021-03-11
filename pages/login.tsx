import React, { useState } from "react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { Input, Stack, Box, Text, HStack, Button, Spacer, Flex, InputGroup, InputRightElement } from "@chakra-ui/react";

import { firebaseClient } from "../config/firebaseClient";
import { firebaseAdmin } from "../config/firebaseAdmin";
import styles from "../styles/Home.module.css";

const Login = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [flag, setFlag] = useState(true);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errorEmail, setErrorEmailFlag] = useState(false);
    const [errorPwd, setErrorPwdFlag] = useState(false);
    const [errorConfirm, setErrorConfirmFlag] = useState(false);

    const login = async () => {
        if (email == "") {
            setErrorEmailFlag(true);
        }
        if (password == "") {
            setErrorPwdFlag(true);
        }
        if (email != "" && password != "") {
            await firebaseClient.auth().signInWithEmailAndPassword(email, password);
            window.location.href = '/';
        }
    }

    const register = async () => {
        if (email == "") {
            setErrorEmailFlag(true);
        }
        if (password == "") {
            setErrorPwdFlag(true);
        }
        if (confirm == "" || confirm != password) {
            setErrorConfirmFlag(true);
        }
        if (email != "" && password != "" && password == confirm) {
            await firebaseClient
                .auth()
                .createUserWithEmailAndPassword(email, password);
            window.location.href = '/';
        }
    }

    const switchPage = () => {
        setFlag(!flag);
        setShow(false);
        setErrorEmailFlag(false);
        setErrorPwdFlag(false);
        setErrorConfirmFlag(false);
        setShowConfirm(false);
    }

    return (
        <Box className={styles.container}>
            <Head>
                <title>Coding Test</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            { flag 
                ? <Stack spacing={8}>
                    <Box align="center">
                        <Text fontSize="3xl">Sign In</Text>
                    </Box>
                    <HStack>
                        <Text w="100px">Email: </Text>
                        <Input 
                            placeholder="User Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={errorEmail}
                            errorBorderColor="red.300"
                        />
                    </HStack>   
                    <HStack>
                        <Text w="100px">Password: </Text>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                isInvalid={errorPwd}
                                errorBorderColor="red.300"
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </HStack>
                    <Flex>
                        <Button colorScheme="blue" onClick={() => login()}>Sign In</Button>
                        <Spacer />
                        <Button colorScheme="blue" onClick={() => switchPage()}>Sign Up</Button>
                    </Flex>
                </Stack>
                : <Stack spacing={8}>
                    <Box align="center">
                        <Text fontSize="3xl">Register</Text>
                    </Box>
                    <HStack>
                        <Text w="100px">Email: </Text>
                        <Input 
                            placeholder="User Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={errorEmail}
                            errorBorderColor="red.300"
                        />
                    </HStack>
                    <HStack>
                        <Text w="100px">Password: </Text>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                isInvalid={errorPwd}
                                errorBorderColor="red.300"
                                type={show ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </HStack>
                    <HStack>
                        <Text w="100px">Confirm: </Text>
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                isInvalid={errorConfirm}
                                errorBorderColor="red.300"
                                type={showConfirm ? "text" : "password"}
                                placeholder="Confirm"
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShowConfirm(!showConfirm)}>
                                    {showConfirm ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </HStack>
                    <Flex>
                        <Box>
                            <Button colorScheme="blue" onClick={() => switchPage()}>Sign In</Button>
                        </Box>
                        <Spacer />
                        <Box>
                            <Button colorScheme="blue" onClick={() => register()}>Sign Up</Button>
                        </Box>
                    </Flex>
                </Stack>
            }
        </Box>
    );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = nookies.get(ctx);
    return await firebaseAdmin.auth().verifyIdToken(cookies.token)
        .then((token) => {
            if (token) {
                return {
                    redirect: {
                        permanent: false,
                        destination: "/",
                    },
                    props: {} as never,
                };
            }
        })
        .catch((error) => {
            return {
                props: {} as never,
            };
        })
}

export default Login;
