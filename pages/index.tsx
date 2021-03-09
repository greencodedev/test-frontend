import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "../components/DynamicText";

import { Input, Stack, Text, Box } from "@chakra-ui/react";


const Home = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack spacing={8} align="center">
        <DynamicText />
        <Input placeholder="Please enter" onChange={onChange} />
      </Stack>
    </Box>
  );
};

export default Home;
