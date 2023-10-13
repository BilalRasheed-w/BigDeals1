import {
  Flex,
  Select,
  Text,
  VStack,
  Input,
  Icon,
  Heading,
  Button,
  Box,
  transform,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaMapLocationDot, FaLocationDot } from "react-icons/fa6";
import { MdLocationCity } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { Country, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { addShippingInfo } from "../../store/slices/cartSlice";

import { useNavigate } from "react-router-dom";

const shippingSchema = {
  address: Yup.string()
    .min(3, "Address is too short")
    .required("please enter your address"),
  city: Yup.string()
    .min(3, "city is too short")
    .required("please enter your city"),
  pincode: Yup.string()
    .min(6, "pincode is too short")
    .max(6, "pincode can't be greater than 6 characters")
    .required("please enter your pincode"),
  phone: Yup.string()
    .min(10, "phone no is too short")
    .required("please enter your phone no"),
};

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        address: shippingInfo.address || "",
        city: shippingInfo.city || "",
        pincode: shippingInfo.pincode || "",
        phone: shippingInfo.phone || "",
      },
      validationSchema: Yup.object(shippingSchema),
      onSubmit: (values, action) => {
        const data = {
          phoneNo: values.phone,
          address: values.address,
          city: values.city,
          state,
          country,
          pinCode: values.pincode,
        };
        dispatch(addShippingInfo(data));
        navigate("/order/confirm");
      },
    });
  return (
    <>
      <Flex justifyContent={"center"} pb={"32"} bg={"gray.50"}>
        <VStack
          w={{ base: "80%", md: "70%", lg: "33%" }}
          p={3}
          px={8}
          borderRadius={"xl"}
          pb={10}
          spacing={{base:3,md:5,lg:5}}
          m={5}
          bg={"white"}
          shadow={"xl"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"red.500"}
            mt={2}
          >
            Shipping Info
          </Heading>
          <Divider border={"1px"} borderColor={"red.500"} w={"55%"} mb={3} />
          <VStack w={"full"} alignItems={"start"} spacing={0}>
            <Flex
              alignItems={"center"}
              border={"1px"}
              borderColor={"gray.300"}
              p={2}
              gap={3}
              w={"full"}
              borderRadius={"md"}
            >
              <Icon as={AiFillHome} fontSize={"xl"} />
              <Input
                name="address"
                variant={"unstyled"}
                type="text"
                value={values.address}
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                w={"full"}
                display={"inline-block"}
              />
            </Flex>
            {touched.address && errors.address ? (
              <Text display={"in"} fontSize={"xs"} color={"red.500"}>
                {errors.address}
              </Text>
            ) : null}
          </VStack>
          <VStack w={"full"} alignItems={"start"} spacing={0}>
            <Flex
              w={"full"}
              alignItems={"center"}
              border={"1px"}
              borderColor={"gray.300"}
              p={2}
              gap={3}
              borderRadius={"md"}
            >
              <Icon as={MdLocationCity} fontSize={"xl"} />
              <Input
                name="city"
                variant={"unstyled"}
                type="text"
                value={values.city}
                placeholder="City"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Flex>
            {touched.city && errors.city ? (
              <Text fontSize={"xs"} color={"red.500"}>
                {errors.city}
              </Text>
            ) : null}
          </VStack>
          <VStack w={"full"} alignItems={"start"} spacing={0}>
            <Flex
              w={"full"}
              alignItems={"center"}
              border={"1px"}
              borderColor={"gray.300"}
              p={2}
              gap={3}
              borderRadius={"md"}
            >
              <Icon as={FaMapLocationDot} fontSize={"xl"} />
              <Input
                name="pincode"
                variant={"unstyled"}
                value={values.pincode}
                type="number"
                placeholder="Pincode"
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
            </Flex>
            {touched.pincode && errors.pincode ? (
              <Text fontSize={"xs"} color={"red.500"}>
                {errors.pincode}
              </Text>
            ) : null}
          </VStack>
          <VStack w={"full"} alignItems={"start"} spacing={0}>
            <Flex
              w={"full"}
              alignItems={"center"}
              border={"1px"}
              borderColor={"gray.300"}
              p={2}
              gap={3}
              borderRadius={"md"}
            >
              <Icon as={BsFillTelephoneFill} fontSize={"xl"} />
              <Input
                name="phone"
                variant={"unstyled"}
                type="number"
                value={values.phone}
                placeholder="Phone"
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
            </Flex>
            {touched.phone && errors.phone ? (
              <Text fontSize={"xs"} color={"red.500"}>
                {errors.phone}
              </Text>
            ) : null}
          </VStack>
          <Flex
            w={"full"}
            alignItems={"center"}
            border={"1px"}
            borderColor={"gray.300"}
            p={2}
            gap={3}
            borderRadius={"md"}
          >
            <Icon as={BiWorld} fontSize={"xl"} />
            <Select
              placeholder="Country"
              variant={"unstyled"}
              color={"gray.800"}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {Country.getAllCountries().map((item, i) => (
                <option
                  style={{ padding: "10px 0" }}
                  key={i}
                  value={item.isoCode}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          </Flex>
          {country && (
            <Flex
              w={"full"}
              alignItems={"center"}
              border={"1px"}
              borderColor={"gray.300"}
              p={2}
              gap={3}
              borderRadius={"md"}
            >
              <Icon as={FaLocationDot} fontSize={"xl"} />
              <Select
                placeholder="State"
                variant={"unstyled"}
                color={"gray.800"}
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  console.log(state);
                }}
              >
                {State.getStatesOfCountry(country).map((item, i) => (
                  <option key={i}>{item.name}</option>
                ))}
              </Select>
            </Flex>
          )}

          <Flex justifyContent={"flex-end"} w={"full"}>
            <Button
              bg={"red.400"}
              color={"white"}
              variant={"unstyled"}
              _hover={{ bg: "red.500", transform: "scale(1.05)" }}
              px={10}
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </Flex>
        </VStack>
        {/* <VStack w={"50%"}>
          <Text>this is rigth</Text>
        </VStack> */}
      </Flex>
    </>
  );
};

export default Shipping;
