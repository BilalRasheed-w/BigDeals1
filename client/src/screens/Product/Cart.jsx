import React from "react";
import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Img,
  Text,
  Link,
  VStack,
  Alert,
  AlertIcon,
  Switch,
} from "@chakra-ui/react";
import some from "../../assets/log.jpg";
import { motion } from "framer-motion";
import { useState } from "react";
import { DeleteIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import {
  SubOneQty,
  addOneQty,
  deleteFromCart,
} from "../../store/slices/cartSlice";

const Cart = () => {
  const { cart, subTotal } = useSelector((state) => state.cart);
  const [express, setExpress] = useState(false);
  const dispatch = useDispatch();
  let shipping = 0;
  if (subTotal <= 30000) {
    shipping = shipping + 100;
  }
  let fastShipping = 0;
  if (express) {
    fastShipping = fastShipping + 350;
    shipping = 0;
  }
  return (
    <div>
      {cart && cart.length > 0 ? (
        <Flex
          py={5}
          bg={"gray.100"}
          pl={10}
          h={"100vh"}
          justifyContent={"space-between"}
          px={10}
        >
          <VStack w={"70%"}>
            {cart.map((item, i) => (
              <HStack
                h={"7rem"}
                justifyContent={"space-between"}
                px={8}
                bg={"white"}
                rounded={"2xl"}
                shadow={"xl"}
                w={"full"}
              >
                <HStack spacing={2} alignItems={"normal"} w={"18rem"} my={3}>
                  <Img
                    src={item.images[0].imageUrl}
                    h={"6rem"}
                    rounded={"md"}
                  />
                  <Text mt={5} fontWeight={"bold"}>
                    {item.name}
                  </Text>
                </HStack>
                <Text fontSize={"lg"} fontWeight={"bold"}>
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

                <HStack>
                  <Button
                    size={"sm"}
                    as={motion.button}
                    bg={"#4d5499"}
                    variant={"unstyled"}
                    color={"white"}
                    // fontSize={"xl"}
                    paddingX={4}
                    whileTap={{ scale: 0.7 }}
                    onClick={() => {
                      if (item.qty <= 1) return;
                      dispatch(SubOneQty(item));
                    }}
                  >
                    -
                  </Button>
                  <Text>{item.qty}</Text>
                  <Button
                    size={"sm"}
                    as={motion.button}
                    variant={"unstyled"}
                    bg={"#4d5499"}
                    color={"white"}
                    fontSize={"xl"}
                    paddingX={4}
                    whileTap={{ scale: 0.7 }}
                    onClick={() => {
                      dispatch(addOneQty(item));
                    }}
                  >
                    +
                  </Button>
                </HStack>
                <IconButton
                  variant={"unstyled"}
                  bg={"tomato"}
                  color={"white"}
                  size={"sm"}
                  icon={<DeleteIcon />}
                  onClick={() => {
                    dispatch(deleteFromCart(item));
                  }}
                />
              </HStack>
            ))}
          </VStack>

          <VStack
            w={"25%"}
            h={"30rem"}
            shadow={"2xl"}
            bg={"white"}
            py={4}
            spacing={"5"}
            rounded={"2xl"}
            px={10}
          >
            <Heading fontSize={"3xl"}>Cart items</Heading>

            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <Text>subtotal</Text>
              <Text>{subTotal.toLocaleString("en-IN")}</Text>
            </HStack>
            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <Text>shipping</Text>
              <Text>{shipping}</Text>
            </HStack>
            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <HStack>
                <Text fontSize={"md"}>express shipping</Text>
                <Switch
                  isChecked={express}
                  onChange={() => {
                    setExpress(!express);
                  }}
                />
              </HStack>
              <Text>{express ? 350 : 0}</Text>
            </HStack>
            {express ? (
              <Text color={"tomato"} fontSize={"xs"} fontWeight={"bold"}>
                (delivered in 24 hours)
              </Text>
            ) : (
              <Text color={"tomato"} fontSize={"xs"} fontWeight={"bold"}>
                (shipping is free for orders above 30,000)
              </Text>
            )}

            <Divider />
            <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                Total
              </Text>
              <Text fontSize={"2xl"} fontWeight={"bold"}>
                {subTotal + shipping + fastShipping}
              </Text>
            </HStack>
            <Button
              as={motion.button}
              w={"full"}
              bg={"green.500"}
              color={"white"}
              rightIcon={<FaArrowRight />}
              _hover={{ bg: "green.600" }}
              whileTap={{ scale: 0.9 }}
            >
              CheckOut
            </Button>
            <Text fontSize={"lg"}>
              or Continue{" "}
              <Link as={ReactLink} to={"/"} color={"blue.500"}>
                {" "}
                Shopping
              </Link>{" "}
            </Text>
          </VStack>
        </Flex>
      ) : (
        <Alert status="warning">
          <AlertIcon />
          No Products yet,{" "}
          <Link ms={1} as={ReactLink} to={"/"}>
            click here to add products
          </Link>
        </Alert>
      )}
    </div>
  );
};

export default Cart;
