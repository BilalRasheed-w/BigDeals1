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
  Text,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

import {useState} from 'react'


const Schema = {
  name: Yup.string()
    .min(4, "name must be atleast 4 letters ")
    .required("pls enter your name"),
  email: Yup.string()
    .email("pls enter valid email")
    .required("pls enter your email"),
};

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function Profile() {
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState(false);

  const { values, handleChange, handleSubmit, handleBlur, touched, errors,handleReset } =
    useFormik({
      initialValues: { name: "", email: "" },
      validationSchema: Yup.object(Schema),
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
            <Avatar size="2xl" src=""></Avatar>
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
