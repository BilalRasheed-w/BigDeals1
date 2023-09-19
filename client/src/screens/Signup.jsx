import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";
import "../index.css";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      px={{ base: 5 }}
      pb={{ base: 8, md: 4 }}
      justify={"center"}
      rounded={{ base: "lg", md: "none" }}
      shadow={{ base: "md", md: "none" }}
    >
      <Stack
        spacing={{ base: 4, md: 3 }}
        shadow={{ lg: "2xl" }}
        h={{ lg: "fit-content" }}
        rounded={{ lg: "2xl" }}
        px={{ lg: 10 }}
        w={{ base: "full", md: "80%", lg: "full" }}
        maxW={"md"}
        mt={{ lg: 2 }}
        pt={{ base: 2, md: 4 }}
        pb={{ base: 2, md: 0 }}
      >
        <Heading
          mb={{ base: 2, md: 0 }}
          alignSelf={{ base: "center" }}
          fontSize={"2xl"}
          fontWeight={"medium"}
        >
          Sign up
        </Heading>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input rounded={"sm"} size={{ md: "xs", lg: "sm" }} type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input rounded={"sm"} size={{ md: "xs", lg: "sm" }} type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input rounded={"sm"} size={{ md: "xs", lg: "sm" }} type="password" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Confirm Password</FormLabel>
          <Input rounded={"sm"} size={{ md: "xs", lg: "sm" }} type="password" />
        </FormControl>
        <FormControl id="password">
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
        <Stack spacing={6}>
          <Stack
            mt={{ base: 3, md: 3 }}
            direction={{ base: "column", sm: "row" }}
            alignSelf={"end"}
            justify={"space-between"}
          >
            <Text align={"center"}>
              Already a user?{" "}
              <Link as={ReactLink} to={"/login"} color={"blue.400"}>
                Login
              </Link>
            </Text>
          </Stack>
          <Button
            mt={{ base: 1, md: 0 }}
            mb={{ lg: 4 }}
            py={{ base: 2, md: 0 }}
            size={{ md: "sm", lg: "md" }}
            colorScheme={"blue"}
            variant={"solid"}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
