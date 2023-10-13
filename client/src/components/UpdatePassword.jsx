import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
  HStack,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

const Schema = {
  oldPassword: Yup.string()
    .min(8, "old password must contain  8 letters")
    .required("pls enter your old password"),
  newPassword: Yup.string()
    .min(8, "password must contain  8 letters")
    .required("pls enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "password must match")
    .required("pls enter confirm password"),
};

export default function UpdatePassword() {
  const toast = useToast({ position: "top", duration: 2000, isClosable: true });
  const [loading, setLoading] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, touched, errors } =
    useFormik({
      initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
      validationSchema: Yup.object(Schema),
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const response = await axios.put(
            "https://big-deals1-server.vercel.app/api/user/password",
            {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
            },
            { withCredentials: true }
          );
          if (response) setLoading(false);
          if (response.status === 200) {
            toast({
              status: "success",
              title: "password updated successfully",
            });
            action.resetForm();
          }
          i;
        } catch (error) {
          setLoading(false);
          if (error.response.status === 400) {
            toast({ status: "error", title: "Incorrect old Password" });
          }
        }
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
        mt={6}
        mb={12}
      >
        <HStack justifyContent={"space-between"}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Update Password
          </Heading>
          {loading ? <Spinner alignItems={"end"} color="red.500" /> : null}
        </HStack>
        <FormControl isRequired>
          <FormLabel>Old Password</FormLabel>
          <Input
            value={values.oldPassword}
            name="oldPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            size={"sm"}
            type="text"
          />
          {touched.oldPassword && errors.oldPassword ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.oldPassword}
            </Text>
          ) : null}
          
        </FormControl>
        <FormControl isRequired>
          <FormLabel>New Password</FormLabel>
          <Input
            size={"sm"}
            type="text"
            value={values.newPassword}
            name="newPassword"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.newPassword && errors.newPassword ? (
            <Text fontSize={"xs"} color={"red.500"}>
              {errors.newPassword}
            </Text>
          ) : null}
        </FormControl>
        <FormControl id="password" isRequired>
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
