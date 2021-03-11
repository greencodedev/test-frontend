import React, { useRef } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from 'next/router';
import nookies from "nookies";
import Head from "next/head";
import { Input, Stack, Box, Flex, Button, Spacer } from "@chakra-ui/react";


import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";
import { firebaseAdmin } from "../config/firebaseAdmin";
import { firebaseClient } from "../config/firebaseClient";

const Home = (props: any) => {
  const textRef = useRef(null);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    textRef.current.changeValue(e.target.value);
  };

  const goNextPage = (uri: any) => {
    router.push(uri);
  }

  const signOut = async () => {
    await firebaseClient
      .auth()
      .signOut()
      .then(() => {
          router.push("/login");
      });
  }

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={8}>
        <Box align="center">
          <DynamicText ref={textRef}/>
        </Box>
        <Input placeholder="Please enter" onChange={onChange} width="250px"/>
        <Flex>
          <Box>
            <Button colorScheme="blue" onClick={() => goNextPage('./blogs')}>Go to Blogs</Button>
          </Box>
          <Spacer />
          <Box>
            <Button colorScheme="blue" onClick={() => signOut()}>Sign Out</Button>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = nookies.get(ctx);
    return await firebaseAdmin.auth().verifyIdToken(cookies.token)
        .then((response) => {
            if (response) {
              const { uid, email } = response;
              return {
                props: { 
                  uid,
                  email
                },
              };
            }
        })
        .catch(() => {
          return {
            redirect: {
              permanent: false,
              destination: "/login",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {} as never,
          };
        })
}

export default Home;
