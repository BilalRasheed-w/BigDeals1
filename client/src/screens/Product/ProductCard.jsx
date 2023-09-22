import {
  Avatar,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Img,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../utils/Loader";
import { ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import { LuShieldCheck } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { FaArrowRight } from "react-icons/fa";

const ProductCard = () => {
  const [product, setProduct] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const { cart } = useSelector((state) => state.cart);

  const { id } = useParams();
  const url = `http://localhost:5000/api/product/${id}`;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data.product);
        setProduct(response.data.product);
      } catch (error) {
        p;
        console.log(error);
      }
    };
    fetchProduct();
  }, [url]);
  const toast = useToast({
    isClosable: true,
    duration: "3000",
    position: "top",
  });
  const handleClick = (product) => {
    const itemExist = cart.find((prod) => prod._id === product._id);
    if (itemExist) {
      return toast({ status: "error", title: "item is already added to cart" });
    }
    dispatch(addToCart({ ...product, qty: Quantity || 1 }));
    toast({ status: "success", title: "added to cart" });
  };
  const reviews = false;
  return (
    <div>
      {/* <Loader /> */}
      {product && (
        <>
          <Flex
            direction={{ base: "column", md: "row" }}
            w={{ base: "100vw", md: "container.lg" }}
            m={"auto"}
          >
            <Left
              product={product}
              handleClick={handleClick}
              setQuantity={setQuantity}
              Quantity={Quantity}
            />
            <Right product={product} />
          </Flex>

          {reviews && (
            <>
              <Heading ms={"10"}>Reviews</Heading>
              <Stack
                rounded={"md"}
                flexDir={"row"}
                overflowX={"scroll"}
                bg={"gray.200"}
                py={10}
                my={5}
              >
                <HStack spacing={"4"} px={10}>
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                  <Reviews />
                </HStack>
              </Stack>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductCard;

const Reviews = () => (
  <VStack
    rounded={"md"}
    w={"320px"}
    alignItems={"start"}
    border={"1px"}
    bg={"white"}
    p={3}
    h={"12.5rem"}
  >
    <HStack w={"fit-content"}>
      <Avatar size={"md"} />
      <Text>hello google</Text>
    </HStack>
    <Divider color={"gray.300"} />
    <HStack fontSize={"xs"} spacing={0}>
      <Icon />
      <Icon />
      <Icon />
      <Icon />
      <Icon />
    </HStack>
    <Text noOfLines={4} fontSize={"sm"} letterSpacing={"wide"}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus nisi
      quo asperiores eligendi, ut veniam. Enim aperiam modi quaerat sint.
    </Text>
  </VStack>
);

const Right = ({ product }) => (
  <Stack
    borderLeft={"1px"}
    borderLeftColor={"gray.200"}
    width={{ base: "100vw", md: "50%" }}
    pt={4}
    boxShadow={"lg"}
  >
    <Img src={product.images[0].imageUrl} alt={product.name} h={"30rem"} />
  </Stack>
);

const Left = ({ product, handleClick, setQuantity, Quantity }) => (
  <VStack
    rounded={"lg"}
    shadow={"2xl"}
    spacing={"4"}
    width={{ base: "100vw", md: "50%" }}
    p={5}
    alignItems={"flex-start"}
  >
    <Heading fontSize={"2xl"}>{product.name}</Heading>
    <Text fontWeight={"semi-bold"} fontSize={"xl"}>
      <Text fontWeight={"medium"} fontSize={"md"} display={"inline-block"}>
        $
      </Text>{" "}
      {product.price.toLocaleString("en-IN")}
    </Text>
    <HStack>
      <Flex>
        <Icon as={StarIcon} />
        <Icon as={StarIcon} />
        <Icon as={StarIcon} />
        <Icon as={StarIcon} />
        <Icon as={StarIcon} />
      </Flex>
      <Text>{product.numOfReviews} reviews</Text>
    </HStack>
    <VStack alignItems={"start"}>
      <Heading fontSize={"lg"}>Description...</Heading>
      <HStack h={"6rem"} fontSize={"sm"} letterSpacing={"wider"}>
        <Text noOfLines={"5"}>{product.description}</Text>
      </HStack>
    </VStack>
    <HStack b>
      <Text>Quantity</Text>
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
          if (Quantity <= 1) return;
          setQuantity(Quantity - 1);
        }}
      >
        -
      </Button>
      <Text>{Quantity}</Text>
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
          setQuantity(Quantity + 1);
        }}
      >
        +
      </Button>
    </HStack>

    <Divider />
    <VStack fontSize={"sm"} alignItems={"start"} spacing={1} w={"full"} mb={2}>
      <HStack spacing={2}>
        <Icon fontSize={"lg"} as={FaShippingFast} color={"green.600"} />
        <Text> free shipping if order is above 1000</Text>
      </HStack>
      <HStack spacing={2}>
        <Icon fontSize={"lg"} as={LuShieldCheck} color={"green.600"} />
        <Text>Extended warranty</Text>
      </HStack>
      <HStack spacing={2}>
        <Icon fontSize={"lg"} as={RiCustomerService2Fill} color={"green.600"} />
        <Text> we're here for you 24/7</Text>
      </HStack>
    </VStack>
    <Button
      as={motion.button}
      w={"full"}
      bg={"tomato"}
      color={"white"}
      rightIcon={<FaArrowRight />}
      _hover={{ bg: "tomato" }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        handleClick(product);
      }}
    >
      Add to cart
    </Button>
  </VStack>
);
