import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  VStack,
} from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex
      minH={"fit-content"}
      justify={"center"}
      bg={"gray.50"}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mt={6}
        mb={12}
      >
        <Heading
          lineHeight={1.1}
          textAlign={"center"}
          fontSize={{ base: "2xl", sm: "3xl" }}
        >
          My Profile
        </Heading>
        <FormControl w={"fit-content"} alignSelf={"center"}>
          <VStack spacing={6} pt={2}>
            <Avatar size="2xl" src=""></Avatar>
          </VStack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Upload image</FormLabel>
          <Input
            id="upload"
            p={0}
            bg={"gray.100"}
            borderRadius={"10px"}
            size={{ md: "xs", lg: "sm" }}
            type="file"
            fontSize={"xs"}
          />
        </FormControl>
        <Stack spacing={6} my={4} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
          >
            Cancel
          </Button>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
