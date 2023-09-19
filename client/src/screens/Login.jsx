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
  VStack,
  Divider,
} from "@chakra-ui/react";

import LoginJpg from "../assets/log.jpg";
import { Link as ReactLink } from "react-router-dom";

export default function Login() {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={0} pr={{ md: 8 }}>
      <Left />
      <Right />
    </Stack>
  );
}

const Left = () => {
  return (
    <Flex
      px={{ base: 5 }}
      pb={{ base: 8, md: 4 }}
      pt={4}
      flex={2}
      justify={"center"}
      rounded={{ base: "lg", md: "none" }}
      shadow={{ base: "md", md: "none" }}
    >
      <Stack
        shadow={{ lg: "lg" }}
        h={{ lg: "fit-content" }}
        // border={{ lg: "1px" }}
        rounded={{ lg: "2xl" }}
        borderColor={"red.200"}
        py={{ lg: 8 }}
        px={{ lg: 10 }}
        spacing={{ base: 4, md: 6 }}
        w={{ base: "full", md: "80%", lg: "full" }}
        maxW={"md"}
        pt={{ base: 2, md: 4 }}
        pb={{ base: 2, md: 0 }}
      >
        <Heading
          mb={{ base: 2, md: 0 }}
          alignSelf={{ base: "center" }}
          fontSize={"2xl"}
          fontWeight={"medium"}
        >
          Sign in to your Account{" "}
        </Heading>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input rounded={"sm"} size={{ md: "xs", lg: "sm" }} type="email" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input rounded={"sm"} size={{ md: "xs", lg: "sm" }} type="password" />
        </FormControl>
        <Stack spacing={6}>
          <Stack
            mt={{ base: 3, md: 0 }}
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>Remember me</Checkbox>
            <Link as={ReactLink} to={"/forgot"} color={"blue.500"}>
              Forgot password?
            </Link>
          </Stack>
          <Button
            mb={{ lg: 4 }}
            py={{ base: 2, md: 0 }}
            size={{ md: "sm", lg: "md" }}
            mt={{ base: 3, md: 0 }}
            colorScheme={"blue"}
            variant={"solid"}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

const Right = () => (
  <Flex flex={2}>
    <Image alt={"Login Image"} objectFit={"contain"} src={LoginJpg} />
  </Flex>
);
