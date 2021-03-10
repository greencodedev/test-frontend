import React, {useRef, useImperativeHandle} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";

import { Input, Stack, Text, Box } from "@chakra-ui/react";


const Home = () => {
  const textRef = useRef(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(myRef);
    textRef.current.changeValue(e.target.value);
  };

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={8} align="center">
        <DynamicText ref={textRef}/>
        <Input placeholder="Please enter" onChange={onChange} />
      </Stack>
    </Box>
  );
};

export default Home;
