import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

const Schema = {
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
};

export default function ForgotPassword() {
  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
    handleReset,
  } = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object(Schema),
    onSubmit: (values, action) => {
      console.log(values);
      action.resetForm();
    },
  });
  return (
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
      >
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
            onChange={handleChange}
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
