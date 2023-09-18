import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";

import LoginJpg from "../assets/Login.jpg";
import { Link as ReactLink } from "react-router-dom";

export default function Login() {
  return (
    <Stack
      minH={{ base: "90vh", md: "50vh" }}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        px={{ base: 8 }}
        py={{ base: 8, md: 20 }}
        flex={1}
        justify={"center"}
      >
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link as={ReactLink} to={"/forgot"} color={"blue.500"}>
                Forgot password?
              </Link>
            </Stack>
            <Button colorScheme={"blue"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} shadow={{ base: "none", lg: "lg" }}>
        <Image
          flex={1}
          alt={"Login Image"}
          h={{ base: "40vh", md: "50vh", lg: "90vh" }}
          objectFit={"contain"}
          src={LoginJpg}
        />
      </Flex>
    </Stack>
  );
}
