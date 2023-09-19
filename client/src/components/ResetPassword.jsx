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
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

const Schema = {
  password: Yup.string()
    .min(8, "password must contain  8 letters")
    .required("pls enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), , null], "Passwords must match")
    .required("pls enter confirm password"),
};
export default function ResetPassword() {
  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { password: "", confirmPassword: "" },
      validationSchema: Yup.object(Schema),
      onSubmit: (values, action) => {
        console.log(values);
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
      >
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
