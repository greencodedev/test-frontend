import { Box, Badge, Image, Text } from "@chakra-ui/react";



const Blog = (props: any) => {
    const property = props.data;
    // const property = {
    //     image: "https://bit.ly/2Z4KKcF",
    //     blog_title: "Modern home in city center in the heart of historic Los Angeles",
    //     contents: "$1,900.00",
    // }

    return (
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" onClick={() => props.onClick()}>
            <Image src={property.image} alt="blog image" />

            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                        Blog
                    </Badge>
                </Box>
                <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                >
                    {property.blog_title}
                </Box>
                <Box>
                    <Text>{property.contents}</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Blog;