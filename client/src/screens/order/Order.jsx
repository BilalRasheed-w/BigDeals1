import React from "react";
import {
  Button,
  HStack,
  Heading,
  Img,
  Stack,
  Text,
  VStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
// import { newOrder } from "../../store/slices/orderSlice";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { subTotal, shipping, Total, cart } = useSelector(
    (state) => state.cart
  );

  const proceed = () => {
    // dispatch(newOrder({ hello: "google" }));
    navigate("/order/confirm/payment");
  };

  return (
    <>
      {/* <Stack h={"80vh"} bg={"gray.50"} flexDir={"row"}>
        <VStack w={"60vw"}>
          {cart.map((item, i) => (
            <HStack key={i} bg={'yellow'} >
              <Img src={item.image} h={"5rem"} />
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.qty}</Text>
            </HStack>
          ))}
        </VStack>


        <VStack border={"1px"} w={"30vw"}>
          <VStack h={"30vh"}>
            <Heading>shippingInfo</Heading>
            <Text noOfLines={"2"}>address:{shippingInfo.address}</Text>

            <Text>state:{shippingInfo.state}</Text>
            <Text>pincode:{shippingInfo.pincode}</Text>
          </VStack>
          <VStack>
            <Heading>Order Info</Heading>
            <Text>subTotal:{subTotal}</Text>
            <Text>shipping:{shipping}</Text>
            <Text>Total:{Total}</Text>
          </VStack>
          <Button bg={"tomato"} onClick={proceed}>
            Proceed to payment
          </Button>
        </VStack>
      </Stack> */}
      <Flex
        py={5}
        bg={"gray.100"}
        h={{ base: "fit-content", md: "fit-content" }}
        justifyContent={"space-between"}
        px={{ base: 2, md: 10 }}
        flexDir={{ base: "column", md: "column", lg: "row" }}
      >
        <VStack
          w={{ base: "full", md: "full", lg: "70%" }}
          pb={{ base: "10rem", md: "none" }}
          pos={{ base: "relative", md: "unset" }}
          spacing={{ base: 4, md: "none" }}
        >
          {cart.map((item, i) => (
            <HStack
              key={i}
              h={{ base: "12rem", md: "10rem", lg: "9rem" }}
              justifyContent={"space-between"}
              px={{ base: 1, md: 8 }}
              bg={"white"}
              rounded={{ base: "md", md: "2xl" }}
              shadow={"xl"}
              w={"full"}
            >
              <HStack
                spacing={{ base: 2, md: 2 }}
                alignItems={"normal"}
                // w={{ md: "18rem" }}
                // border={'1px'}
                // w={{md:"30%" }}
                my={3}
                px={{ base: 2, md: "none" }}
              >
                <Img
                  mt={{ base: 3 }}
                  src={item.image}
                  h={{ base: "8rem", md: "8rem", lg: "8rem" }}
                  w={{ base: "12rem", md: "10rem", lg: "10rem" }}
                  rounded={"md"}
                />

                <VStack
                  display={{ base: "flex", md: "none" }}
                  alignItems={{ base: "start" }}
                  spacing={3}
                >
                  <Text
                    fontSize={{ base: "lg", md: "md" }}
                    noOfLines={2}
                    w={"full"}
                    mt={5}
                    fontWeight={"bold"}
                  >
                    {item.name}
                  </Text>
                  <Text
                    display={{ base: "block", md: "none" }}
                    fontWeight={"bold"}
                    fontSize={"xl"}
                  >
                    <Text display={"inline-block"} mr={2}>
                      ₹
                    </Text>
                    {item.price.toLocaleString("en-IN")}
                  </Text>
                </VStack>
              </HStack>
              <Text
                display={{ base: "none", md: "flex" }}
                w={{ md: "45%" }}
                fontSize={{ base: "lg", md: "md" }}
                fontWeight={"bold"}
              >
                {item.name}
              </Text>
              <Text
                display={{ base: "none", md: "flex" }}
                fontSize={{ base: "md", md: "lg" }}
                fontWeight={"bold"}
              >
                <Text
                  fontWeight={"medium"}
                  me={1}
                  fontSize={"lg"}
                  display={"inline-block"}
                >
                  ₹
                </Text>
                {item.price.toLocaleString("en-IN")}
              </Text>
            </HStack>
          ))}
        </VStack>
        <VStack
          w={{ md: "full", lg: "27%" }}
          m={{ base: 1, md: "none" }}
          mx={{ base: 3, md: 0 }}
          h={"fit-content"}
          shadow={"2xl"}
          bg={"white"}
          py={{ base: 4, md: 10, lg: 4 }}
          spacing={{ base: "3", lg: "5", md: "3" }}
          rounded={"2xl"}
          px={{ base: 3, md: 5, lg: 8 }}
          mb={{ base: 20, md: 16, lg: 10 }}
        >
          <Heading fontSize={{ base: "2xl", md: "3xl" }}>Shipping Info</Heading>
          <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
            <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>address</Text>
            <Text>{shippingInfo.address}</Text>
          </HStack>
          <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
            <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>State</Text>
            <Text>{shippingInfo.state}</Text>
          </HStack>
          <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
            <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>pinCode</Text>
            <Text>{shippingInfo.pinCode}</Text>
          </HStack>
          <Divider
            border={"1px"}
            borderColor={"gray.400"}
            my={{ base: 4, md: 8 }}
          />
          <VStack w={"full"}>
            <Heading fontSize={{ base: "2xl", md: "3xl" }}>Order Info</Heading>
            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>
                subTotal
              </Text>
              <Text>{subTotal}</Text>
            </HStack>
            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>
                shipping
              </Text>
              <Text>{shipping}</Text>
            </HStack>
            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>Total</Text>
              <Text>{Total}</Text>
            </HStack>
          </VStack>
          <Button
            as={motion.button}
            w={"full"}
            bg={"green.500"}
            color={"white"}
            rightIcon={<FaArrowRight />}
            _hover={{ bg: "green.600" }}
            whileTap={{ scale: 0.9 }}
            onClick={proceed}
            my={{ base: 3 }}
            size={{ base: "lg", md: "lg" }}
          >
            Proceed to Payment
          </Button>
        </VStack>
      </Flex>
    </>
  );
};

export default Order;
