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
  FormHelperText,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";

import { useState } from "react";

import LoginJpg from "../../assets/log.jpg";
import { Link as ReactLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";

const url = "http://localhost:5000/api/user/login";

export default function Login() {
  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={0} pr={{ md: 8 }}>
      <Left />
      <Right />
    </Stack>
  );
}

const LoginSchema = {
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
  password: Yup.string()
    .min(8, "password must contain  8 letters")
    .required("pls enter your password"),
};

const Left = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: Yup.object(LoginSchema),
      onSubmit: async (values, action) => {
        dispatch(loginUser({ email: values.email, password: values.password }));
        action.resetForm();
      },
    });
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
          <Input
            value={values.email}
            rounded={"sm"}
            size={{ md: "xs", lg: "sm" }}
            type="email"
            name="email"
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
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              name="password"
              rounded={"sm"}
              size={{ md: "xs", lg: "sm" }}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setShowPassword((showPassword) => !showPassword);
                }}
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
            onClick={handleSubmit}
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
