import React, { useEffect, useState, useRef } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from 'next/router';
import nookies from "nookies";
import Head from "next/head";
import { Image, Text, Box, Flex, Button, Spacer, SimpleGrid, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";

import { firebaseAdmin } from "../config/firebaseAdmin";
import { firebaseClient } from "../config/firebaseClient";
import Blog from "../components/BlogComponent";
import styles from "../styles/Home.module.css";

const Blogs = (props: any) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState(props.blogs);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

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

  const showModal = (index: any) => {
    setIsOpen(true);
    setSelectedBlog(blogs[index]);
  }

  useEffect(() => {
    firebaseClient.firestore()
        .collection('blog')
        .onSnapshot(snap => {
          const blogs = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          console.log(snap.docs[0].data());
          setBlogs(blogs);
        });
  }, []);

  console.log(blogs);

  return (
    <Box className={styles.blogContainer}>
        <Head>
            <title>Coding Test</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex spacing={8}>
            <Box>
              <Button colorScheme="blue" onClick={() => goNextPage('./')}>Go Back</Button>
            </Box>
            <Spacer />
            <Box align="center">
              <Text fontSize="3xl">Blogs</Text>
            </Box>
            <Spacer />
            <Box>
              <Button colorScheme="blue" onClick={() => signOut()}>Sign Out</Button>
            </Box>
        </Flex>
        <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing="20px" style={{ marginTop: 20 }}>
            {
              blogs.map((blog: any, key: any) => {
                return <Blog data={blog} key={key} onClick={() => showModal(key)}></Blog>
              })
            }
        </SimpleGrid>
        {
        selectedBlog &&
        <AlertDialog 
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold" borderWidth="1px">
                Blog Information
              </AlertDialogHeader>
              <AlertDialogBody>
                <Box maxW="sm" borderRadius="lg" overflow="hidden" onClick={() => props.onClick()}>
                  <Image src={selectedBlog.image} alt="blog image" />

                  <Box style={{ marginTop: 20 }}>
                      <Box
                          mt="1"
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          isTruncated
                      >
                        Title: {selectedBlog.blog_title}
                      </Box>
                      <Box as="h4" fontWeight="semibold">
                        Content: {selectedBlog.contents}
                      </Box>
                  </Box>
                </Box>
              </AlertDialogBody>
              <AlertDialogFooter borderWidth="1px">
                <Button ref={cancelRef} onClick={onClose}>Close</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        }
    </Box>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const cookies = nookies.get(ctx);
    return await firebaseAdmin.auth().verifyIdToken(cookies.token)
        .then(async (response) => {
            if (response) {
              const { uid, email } = response;
              
              return {
                props: { 
                  uid,
                  email,
                  blogs: []
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
            props: {} as never,
          };
        })
}

export default Blogs;
