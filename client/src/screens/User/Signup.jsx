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
  useToast,
  Spinner,
  useEditable,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import "../../index.css";
import axios from "axios";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { SignedUp } from "../../store/slices/userSlice";
import { useEffect } from "react";

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

const url = "http://localhost:5000/api/user/new";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function Signup() {
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { name: "", email: "", password: "", confirmPassword: "" },
      validationSchema: Yup.object(SignUpSchema),
      onSubmit: async (values, action) => {
        if (image && !allowedTypes.includes(image.type))
          return setImageError(true);
        if (image && allowedTypes.includes(image.type)) setImageError(false);

        setLoading(true);

        const formData = new FormData();
        if (image) {
          formData.append("image", image);
        }
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        try {
          const response = await axios.post(url, formData);
          setLoading(false);
          if ((response.status = 200)) {
            dispatch(SignedUp(response.data.userData));
            navigate("/");
          }
        } catch (error) {
          setLoading(false);
          if (error) {
            return toast({ status: "error", message: error.response.message });
          }
        }

        action.resetForm();
      },
    });

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Flex
      px={{ base: 4, md: 5 }}
      pb={{ base: 20, md: 4 }}
      justify={"center"}
      rounded={{ base: "lg", md: "none" }}
      shadow={{ base: "md", md: "none" }}
      bg={{ base: "gray.50", md: "none" }}
      py={{ base: 4 }}
    >
      <Stack
        spacing={{ base: 4, md: 3 }}
        shadow={{ base: "2xl", lg: "2xl" }}
        h={{ lg: "fit-content" }}
        rounded={{ base: "xl", lg: "2xl" }}
        px={{ base: 4, lg: 10 }}
        w={{ base: "full", md: "80%", lg: "full" }}
        maxW={"md"}
        mt={{ lg: 2 }}
        pt={{ base: 4, md: 4 }}
        pb={{ base: 8, md: 0 }}
        // bg={"yellow"}
        mb={{ base: 20, md: "none" }}
        border={{ base: "1px", md: "none" }}
        borderColor={{ base: "gray.400", md: "none" }}
        bg={{ base: "white", md: "none" }}
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
          fontSize={{ base: "3xl", md: "2xl" }}
          fontWeight={"medium"}
        >
          Sign up
        </Heading>
        <FormControl id="name">
          <FormLabel fontSize={{ base: "xl", md: "md" }}>Name</FormLabel>
          <Input
            // rounded={"sm"}
            // size={{ md: "xs", lg: "sm" }}
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            border={{ base: "1px", md: "none" }}
            borderColor={"gray.500"}
            size={{ base: "sm", md: "xs", lg: "sm" }}
            rounded={{ base: "md", md: "sm" }}
          />
          {touched.name && errors.name ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.name}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="email">
          <FormLabel fontSize={{ base: "xl", md: "md" }}>
            Email address
          </FormLabel>
          <Input
            // rounded={"sm"}
            // size={{ md: "xs", lg: "sm" }}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            border={{ base: "1px", md: "none" }}
            borderColor={"gray.500"}
            size={{ base: "sm", md: "xs", lg: "sm" }}
            rounded={{ base: "md", md: "sm" }}
          />
          {touched.email && errors.email ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.email}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="password">
          <FormLabel fontSize={{ base: "xl", md: "md" }}>Password</FormLabel>
          <InputGroup>
            <Input
              // rounded={"sm"}
              // size={{ md: "xs", lg: "sm" }}
              type={showPassword ? "text" : "password"}
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              border={{ base: "1px", md: "none" }}
              borderColor={"gray.500"}
              size={{ base: "sm", md: "xs", lg: "sm" }}
              rounded={{ base: "md", md: "sm" }}
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
          <FormLabel fontSize={{ base: "xl", md: "md" }}>
            Confirm Password
          </FormLabel>
          <InputGroup>
            <Input
              // rounded={"sm"}
              // size={{ md: "xs", lg: "sm" }}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              border={{ base: "1px", md: "none" }}
              borderColor={"gray.500"}
              size={{ base: "sm", md: "xs", lg: "sm" }}
              rounded={{ base: "md", md: "sm" }}
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
          <FormLabel fontSize={{ base: "xl", md: "md" }}>
            Upload image
          </FormLabel>
          <Input
            id="upload"
            border={{ base: "1px", md: "none" }}
            borderColor={"gray.500"}
            size={{ base: "sm", md: "xs", lg: "sm" }}
            rounded={{ base: "md", md: "sm" }}
            p={0}
            bg={"gray.100"}
            borderRadius={"10px"}
            // size={{ md: "xs", lg: "sm" }}
            type="file"
            fontSize={"xs"}
            name="image"
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
            <Text align={"center"} fontSize={{ base: "xl", md: "md" }}>
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
            size={{ base: "lg", md: "sm", lg: "md" }}
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
