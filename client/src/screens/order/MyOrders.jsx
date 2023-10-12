import {
  HStack,
  Heading,
  Img,
  Text,
  VStack,
  Link,
  Button,
  useToast,
  Divider,
  Flex,
  Icon,
  Stack,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../store/slices/orderSlice";
import Loader from "../../utils/Loader";
import AlertComponent from "../../utils/Alert";
import { Link as ReactLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// const link = "http://localhost:5000/api/orders/me";
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.order);
  const toast = useToast({
    duration: "3000",
    position: "top",
    isClosable: true,
  });
  useEffect(() => {
    dispatch(myOrders());
  }, []);

  const addReview = async (status, _id) => {
    if (status !== "delivered") {
      return toast({ status: "error", title: "product is not delivered yet" });
    }
    navigate(`/product/review/${_id}`);
  };

  return (
    <>
      <HStack justifyContent={"center"}>
        {loading ? (
          <Box h={"70vh"}>
            <Loader />
          </Box>
        ) : error ? (
          <AlertComponent status={"error"} message={error.message} />
        ) : orders && orders.length >= 1 ? (
          <VStack
            w={{ base: "full", md: "60vw" }}
            minH={"80vh"}
            // spacing={{base:1,md:7}}
            pb={32}
            pt={{ md: "10" }}
          >
            {orders.map((item, i) => (
              <VStack key={i} w={"full"} px={{ base: "4", md: "none" }}>
                {item.orderItems.map((items, index) => (
                  <>
                    <HStack
                      key={index}
                      border={"1px"}
                      borderColor={"gray.300"}
                      rounded={"2xl"}
                      ml={5}
                      w={"full"}
                      justifyContent={"space-between"}
                      p={2}
                      shadow={"lg"}
                      px={{ base: 2, md: 2, lg: 10 }}
                      py={{ base: 2, md: 2, lg: 5 }}
                      display={{ base: "none", md: "flex" }}
                    >
                      <Link as={ReactLink} to={`/product/${items._id}`}>
                        <Img src={items.image} h={"7rem"} />
                      </Link>
                      <VStack h={"full"}>
                        <Text
                          fontSize={"xl"}
                          color={"green.500"}
                          fontWeight={"bold"}
                        >
                          Price
                        </Text>
                        <Text fontSize={"lg"}>{items.price}</Text>
                      </VStack>
                      <VStack>
                        <Text
                          fontSize={"xl"}
                          color={"red.500"}
                          fontWeight={"bold"}
                        >
                          Quantity
                        </Text>
                        <Text fontSize={"lg"}>{items.quantity}</Text>
                      </VStack>
                      <VStack>
                        <Text
                          fontSize={"xl"}
                          color={"green.500"}
                          fontWeight={"bold"}
                        >
                          Total
                        </Text>
                        <Text fontSize={"lg"}>{item.total}</Text>
                      </VStack>
                      <VStack>
                        <Text
                          fontSize={"xl"}
                          color={"red.500"}
                          fontWeight={"bold"}
                        >
                          {item.orderStatus === "delivered"
                            ? "Shipped @"
                            : "Shipping @"}
                        </Text>
                        <Text fontSize={"lg"}>{item.shippingInfo.address}</Text>
                      </VStack>
                      <VStack>
                        <Text
                          fontSize={"xl"}
                          color={"green.500"}
                          fontWeight={"bold"}
                        >
                          Status
                        </Text>
                        <Text fontSize={"lg"}>{item.orderStatus}</Text>
                      </VStack>
                      <VStack me={4}>
                        <Text
                          fontSize={"xl"}
                          color={"green.500"}
                          fontWeight={"bold"}
                        >
                          Review
                        </Text>
                        <Button
                          bg={"red.400"}
                          color={"white"}
                          fontWeight={"semibold"}
                          rounded={"lg"}
                          size={"sm"}
                          px={4}
                          _hover={{ bg: "red.500", transform: "scale(1.02)" }}
                          onClick={() => {
                            addReview(item.orderStatus, items._id);
                          }}
                          variant={"unstyled"}
                        >
                          add Review
                        </Button>
                      </VStack>
                    </HStack>
                    {/* //! for small screens */}
                    <HStack
                      mt={1}
                      display={{ base: "flex", md: "none" }}
                      key={index}
                      border={"1px"}
                      w={"full"}
                      p={2}
                      rounded={"2xl"}
                      alignItems={"start"}
                      h={"10rem"}
                    >
                      <VStack spacing={1} w={"50%"}>
                        <Link as={ReactLink} to={`/product/${items._id}`}>
                          <Img src={items.image} h={"7rem"} />
                        </Link>
                        <Text fontSize={"md"}>
                          {" "}
                          ₹
                          <Text
                            ms={1}
                            display={"inline-flex"}
                            fontWeight={"bold"}
                          >
                            {" "}
                            {items.price.toLocaleString()}{" "}
                          </Text>
                        </Text>
                      </VStack>
                      <VStack h={"full"} w={"full"}>
                        <HStack w={"full"} justifyContent={"space-around"}>
                          <VStack>
                            <Text fontWeight={"bold"} color={"red.500"}>
                              Qty:
                              <Text display={"inline-flex"}>
                                {items.quantity}
                              </Text>
                            </Text>
                          </VStack>
                          <VStack spacing={0}>
                            <Text fontWeight={"bold"}>
                              {item.orderStatus === "delivered"
                                ? "Shipped @"
                                : "Shipping @"}
                            </Text>
                            <Text noOfLines={1}>
                              {item.shippingInfo.address}
                            </Text>
                          </VStack>
                        </HStack>
                        <Divider />
                        <HStack w={"full"} justifyContent={"space-around"}>
                          <VStack spacing={"0"}>
                            <Text fontWeight={"bold"}>Status</Text>
                            <Text>{item.orderStatus}</Text>
                          </VStack>
                          <VStack>
                            <Text fontWeight={"bold"}>Review</Text>
                            <Button
                              bg={"red.400"}
                              color={"white"}
                              fontWeight={"semibold"}
                              rounded={"lg"}
                              size={"sm"}
                              px={4}
                              _hover={{
                                bg: "red.500",
                                transform: "scale(1.02)",
                              }}
                              onClick={() => {
                                addReview(item.orderStatus, items._id);
                              }}
                              variant={"unstyled"}
                            >
                              add Review
                            </Button>
                          </VStack>
                        </HStack>
                      </VStack>
                    </HStack>
                  </>
                ))}
              </VStack>
            ))}
          </VStack>
        ) : (
          <Stack h={{ base: "80vh" }} w={"full"}>
            <Alert status="warning">
              <AlertIcon />
              No orders yet,
              <Link ms={1} as={ReactLink} fontSize={"sm"} to={"/"}>
                click here to see products
              </Link>
            </Alert>
          </Stack>
        )}
      </HStack>
    </>
  );
};

export default MyOrders;
