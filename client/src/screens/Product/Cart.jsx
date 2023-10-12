import {
  Button,
  Stack,
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
  Icon,
} from "@chakra-ui/react";
import some from "../../assets/log.jpg";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  DeleteIcon,
  ArrowForwardIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
  SubOneQty,
  addOneQty,
  deleteFromCart,
  addShippingTotal,
} from "../../store/slices/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, subTotal } = useSelector((state) => state.cart);
  const [express, setExpress] = useState(false);
  const dispatch = useDispatch();

  let ship = express ? 350 : subTotal <= 30000 ? 100 : 0;
  let total = ship + subTotal;

  const onCheckOut = () => {
    dispatch(addShippingTotal({ shipping: ship, total }));
    navigate("/shipping");
  };

  return (
    <>
      {cart && cart.length >= 1 ? (
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
                h={{ base: "12rem", md: "7rem" }}
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
                  w={{ md: "18rem" }}
                  my={3}
                >
                  <Img
                    mt={{ base: 3 }}
                    src={item.image}
                    h={{ base: "7rem", md: "6rem" }}
                    w={{ base: "12rem" }}
                    rounded={"md"}
                  />

                  <VStack alignItems={{ base: "start" }} spacing={3}>
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
                    <HStack
                      w={"full"}
                      display={{ base: "flex", md: "none" }}
                      justifyContent={"space-between"}
                    >
                      <HStack>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Qty:
                        </Text>
                        <Button
                          bg={"gray.200"}
                          size={"sm"}
                          fontSize={"xs"}
                          onClick={() => {
                            if (item.qty <= 1) return;
                            dispatch(SubOneQty(item));
                          }}
                        >
                          <Icon as={MinusIcon} />
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button
                          bg={"gray.200"}
                          size={"sm"}
                          fontSize={"xs"}
                          onClick={() => {
                            dispatch(addOneQty(item));
                          }}
                        >
                          <Icon as={AddIcon} />
                        </Button>
                      </HStack>
                      <Icon
                        me={4}
                        fontSize={"xl"}
                        color={"red"}
                        as={DeleteIcon}
                        onClick={() => {
                          dispatch(deleteFromCart(item));
                        }}
                      />
                    </HStack>
                  </VStack>
                </HStack>
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
                <HStack display={{ base: "none", md: "flex" }}>
                  <Button
                    size={{ base: "xs", md: "sm" }}
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
                  <Text fontSize={{ base: "xs", md: "md" }}>
                    {item.quantity}
                  </Text>
                  <Button
                    size={{ base: "xs", md: "sm" }}
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
                  display={{ base: "none", md: "flex" }}
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
          <Right
            subTotal={subTotal}
            express={express}
            setExpress={setExpress}
            onCheckOut={onCheckOut}
            total={total}
          />
        </Flex>
      ) : (
        <Stack h={{ base: "80vh" }}>
          <Alert status="warning">
            <AlertIcon />
            No Products yet,
            <Link ms={1} as={ReactLink} fontSize={"sm"} to={"/"}>
              click here to add products
            </Link>
          </Alert>
        </Stack>
      )}
    </>
  );
};

export default Cart;

const Right = ({ subTotal, express, setExpress, onCheckOut, total }) => (
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
    mb={{ base: 20, md: 16, lg: 20 }}
  >
    <Heading fontSize={{ base: "2xl", md: "3xl" }}>Cart items</Heading>
    <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
      <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>subtotal</Text>
      <Text>{subTotal.toLocaleString("en-IN")}</Text>
    </HStack>
    <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
      <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>shipping</Text>
      <Text>{express ? 0 : subTotal <= 30000 ? 100 : 0}</Text>
    </HStack>
    <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
      <HStack>
        <Text fontSize={{ base: "xl", md: "2xl", lg: "xl" }}>
          express shipping
        </Text>
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
      <Text
        color={"tomato"}
        fontSize={{ base: "sm", md: "md", lg: "sm" }}
        fontWeight={"bold"}
      >
        ( delivered in 24 hours )
      </Text>
    ) : (
      <Text
        color={"tomato"}
        fontSize={{ base: "sm", md: "md", lg: "sm" }}
        fontWeight={"bold"}
      >
        ( shipping is free for orders above 30,000 )
      </Text>
    )}

    <Divider />
    <HStack w={"full"} fontSize={"xl"} justifyContent={"space-between"}>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        Total
      </Text>
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        {total}
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
      onClick={onCheckOut}
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
);
