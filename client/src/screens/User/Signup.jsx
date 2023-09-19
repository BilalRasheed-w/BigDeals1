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
import "../../index.css";

import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpSchema = {
  name: Yup.string()
    .min(4, "name must be atleast 4 letters ")
    .required("pls enter your name"),
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
  password: Yup.string()
    .min(8, "password must contain  8 letters")
    .required("pls enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), , null], "Passwords must match")
    .required("pls enter confirm password"),
};

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function Signup() {
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { name: "", email: "", password: "", confirmPassword: "" },
      validationSchema: Yup.object(SignUpSchema),
      onSubmit: (values, action) => {
        if (image && !allowedTypes.includes(image.type))
          return setImageError(true);
        if (image && allowedTypes.includes(image.type)) setImageError(false);
        console.log(image);
        console.log(values);
        action.resetForm();
      },
    });

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

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
          <Input
            rounded={"sm"}
            size={{ md: "xs", lg: "sm" }}
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.name && errors.name ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.name}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            rounded={"sm"}
            size={{ md: "xs", lg: "sm" }}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.email}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              rounded={"sm"}
              size={{ md: "xs", lg: "sm" }}
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.password && errors.password ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.password}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="ConfirmPassword">
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              rounded={"sm"}
              size={{ md: "xs", lg: "sm" }}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() =>
                  setshowConfirmPassword(
                    (showConfirmPassword) => !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          {touched.confirmPassword && errors.confirmPassword ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.confirmPassword}
            </Text>
          ) : null}
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
            onChange={handleFileUpload}
          />
          {imageError ? (
            <Text fontSize={"xs"} color={"red.500"}>
              pls upload a valid image( jpeg / jpg / png )
            </Text>
          ) : null}
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
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
