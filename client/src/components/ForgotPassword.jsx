import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const Schema = {
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
};

export default function ForgotPassword() {
  const toast = useToast({ position: "top", duration: 2000, isClosable: true });
  const [noEmail, setNoEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { email: "" },
      validationSchema: Yup.object(Schema),
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await axios.post(
            "https://big-deals1-server.vercel.app/api/user/forgot",
            { email: values.email }
          );
       
          if (response.status === 200) {
            setLoading(false);
            toast({
              status: "success",
              title: "Email has been sent successfully",
            });

            action.resetForm();
          }
        } catch (error) {
          setLoading(false);
          if (error.response.status === 404) {
            setNoEmail(true);
          }
        }
      },
    });
  return (
    <>
      <Flex justify={"center"} bg={"gray.50"} minH={"80vh"}>
        <Stack
          h={"fit-content"}
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"2xl"}
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
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              value={values.email}
              onChange={(e) => {
                handleChange(e);
                setNoEmail(false);
              }}
              onBlur={handleBlur}
              name="email"
              size={"sm"}
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
            />
            {touched.email && errors.email ? (
              <Text fontSize={"xs"} color={"red.500"}>
                {errors.email}
              </Text>
            ) : null}
            {noEmail && (
              <Text fontSize={"xs"} color={"red.500"}>
                no account exists with that email
              </Text>
            )}
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
    </>
  );
}
