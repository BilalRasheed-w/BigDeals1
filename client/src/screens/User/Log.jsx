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
  Link,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink, useNavigate } from "react-router-dom";

import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";

const LoginSchema = {
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
  password: Yup.string()
    .min(8, "password must contain  8 letters")
    .required("pls enter your password"),
};

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuth, error } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast({
    position: "top",
    isClosable: true,
    duration: "3000",
  });

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: Yup.object(LoginSchema),
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await axios.post(
            "https://big-deals1.vercel.app/api/user/login",
            { email: values.email, password: values.password }
          );
          if (response.status === 200) {
            setLoading(false);
            dispatch(
              loginUser({ email: values.email, password: values.password })
            );
          }
        } catch (error) {
          setLoading(false);
          if (error.response.status === 500) {
            return toast({ status: "warning", title: "internal server error" });
          }
          if (error) {
            return toast({
              status: "error",
              title: "invalid email or password",
            });
          }
        }
      },
    });
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, error, dispatch]);

  return (
    <Flex
      px={{ base: 4, md: 5 }}
      pb={{ base: 20, md: 10 }}
      justify={"center"}
      rounded={{ base: "lg", md: "none" }}
      shadow={{ base: "md", md: "none" }}
      bg={"gray.100"}
      py={{ base: 4, md: 4 }}
    >
      <Stack
        spacing={{ base: 4, md: 8 }}
        shadow={{ base: "2xl", md: "2xl", lg: "2xl" }}
        h={{ md: "fit-content", lg: "fit-content" }}
        rounded={{ base: "xl", lg: "2xl" }}
        px={{ base: 4, md: 8, lg: 10 }}
        w={{ base: "full", md: "80%", lg: "full" }}
        maxW={"md"}
        mt={{ md: 2, lg: 2 }}
        pt={{ base: 4, md: 8 }}
        pb={{ base: 8, md: 16 }}
        mb={{ base: 20, md: "none" }}
        border={{ base: "1px", md: "none" }}
        borderColor={{ base: "gray.400", md: "none" }}
        // bg={'white'}
        bg={{ base: "gray.50", md: "gray.50", lg: "gray.50" }}
        pos={"relative"}
      >
        {loading && (
          <Spinner
            size={{ base: "xs", md: "sm" }}
            pos={"absolute"}
            right={{ base: 2, md: 3 }}
            top={{ base: 2, md: 3 }}
            speed="0.36s"
          />
        )}

        <Heading
          mb={{ base: 2, md: 0 }}
          alignSelf={{ base: "center" }}
          fontSize={{ base: "2xl", md: "4xl", lg: "3xl" }}
          fontWeight={"medium"}
        >
          Sign in to your Account
        </Heading>
        <FormControl id="email">
          <FormLabel fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>
            Email address
          </FormLabel>
          <Input
            border={{ base: "1px", md: "1px" }}
            rounded={{ base: "md", md: "sm" }}
            value={values.email}
            size={{ base: "sm", md: "sm", lg: "sm" }}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
          />

          {touched.email && errors.email ? (
            <Text fontSize={{ base: "sm", md: "xs" }} color={"red.500"}>
              {errors.email}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="password">
          <FormLabel fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>
            Password
          </FormLabel>
          <InputGroup>
            <Input
              border={{ base: "1px", md: "1px" }}
              borderColor={"gray.500"}
              rounded={{ base: "md", md: "sm" }}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={showPassword ? "text" : "password"}
              name="password"
              size={{ md: "sm", lg: "sm" }}
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
            <Text fontSize={{ base: "sm", md: "xs" }} color={"red.500"}>
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
            {/* <Checkbox>Remember me</Checkbox> */}

            <Link
              as={ReactLink}
              alignSelf={{ base: "end", lg: "start" }}
              to={"/forgot"}
              color={"blue.500"}
            >
              Forgot password?
            </Link>
          </Stack>
          <Button
            mt={{ base: 1, md: 0 }}
            mb={{ lg: 4 }}
            py={{ base: 2, md: 0 }}
            size={{ base: "lg", md: "lg", lg: "md" }}
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
