import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Schema = {
  password: Yup.string()
    .min(8, "password must contain  8 letters")
    .required("pls enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), , null], "Passwords must match")
    .required("pls enter confirm password"),
};
export default function ResetPassword() {
  const { token } = useParams();
  const toast = useToast({ position: "top", duration: 2000, isClosable: true });
  const [noEmail, setNoEmail] = useState(false);
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate() 

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { password: "", confirmPassword: "" },
      validationSchema: Yup.object(Schema),
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await await axios.put(
            `https://big-deals1.vercel.app/api/user/reset/${token}`,
            {
              newPassword: values.password,
              confirmPassword: values.confirmPassword,
            }
          );
          console.log(response);
          if (response.status === 200) {
            toast({
              status: "success",
              title: "Password updated Successfully",
            });
            setLoading(false);
            navigate('/login')
          }
        } catch (error) {
          setLoading(false);
          toast({
            status: "error",
            title: "Internal server error, pls try again later",
          });
        }

        action.resetForm();
      },
    });
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
        my={12}
        pos={"relative"}
      >
        {loading && (
          <Spinner
            m={"auto"}
            position={"absolute"}
            right={3}
            top={3}
            size={"sm"}
            color="red"
            speed="0.3s"
          />
        )}

        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Reset Password
        </Heading>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            size={"sm"}
            type="email"
          />
          {touched.password && errors.password ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.password}
            </Text>
          ) : null}
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            value={values.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            size={"sm"}
            type="text"
          />
          {touched.confirmPassword && errors.confirmPassword ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.confirmPassword}
            </Text>
          ) : null}
        </FormControl>
        <Stack spacing={6}>
          <Button
            size={"sm"}
            bg={"blue.400"}
            color={"white"}
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
