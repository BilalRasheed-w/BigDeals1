import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function UpdatePassword() {
  return (
    <Flex minH={"80vh"} justify={"center"} bg={"gray.50"}>
      <Stack
        h={"fit-content"}
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
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Update Password
        </Heading>
        <FormControl isRequired>
          <FormLabel>Old Password</FormLabel>
          <Input size={"sm"} type="email" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>New Password</FormLabel>
          <Input size={"sm"} type="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input size={"sm"} type="password" />
        </FormControl>
        <Stack spacing={6}>
          <Button
            size={"sm"}
            bg={"blue.400"}
            color={"white"}
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
