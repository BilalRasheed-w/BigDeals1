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
  Link,
  Text,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link as ReactLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../../store/slices/userSlice";
const Schema = {
  name: Yup.string()
    .min(4, "name must be atleast 4 letters ")
    .required("pls enter your name"),
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
};

export default function Profile() {
  const dispatch = useDispatch();
  const {user } = useSelector((state) => state.user);

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    handleReset,
  } = useFormik({
    initialValues: {
      name: user && user.name ? user.name : "",
      email: user && user.email ? user.email : "",
    },
    validationSchema: Yup.object(Schema),
    onSubmit: async (values, action) => {
      console.log(values);
      try {
        const response = await axios.put(
          "http://localhost:5000/api/user/me",
          {
            email: values.email,
            name: values.name,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          dispatch(updateProfile({ email: values.email, name: values.name }));
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <Flex minH={"fit-content"} justify={"center"} bg={"gray.50"}>
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
            <Avatar size="2xl" src={user.image.imageUrl}></Avatar>
          </VStack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            name="name"
            placeholder="UserName"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
          {touched.name && errors.name ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.name}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
          {touched.email && errors.email ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.email}
            </Text>
          ) : null}
        </FormControl>
        <Text fontSize={"sm"}>
          <Link as={ReactLink} color={"blue.500"} to={"/password"}>
            Click here
          </Link>{" "}
          to update password{" "}
        </Text>
        <Stack spacing={6} my={4} direction={["column", "row"]}>
          <Button
            bg={"red.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "red.500",
            }}
            onClick={handleReset}
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
