import {
  Heading,
  Img,
  Text,
  Wrap,
  WrapItem,
  Link,
  Box,
  Divider,
  Flex,
  Icon,
  HStack,
  IconButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import Loader from "../../utils/Loader";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link as ReactLink } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";

const url = "http://localhost:5000/api/products";

const Products = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts(url));
  }, []);
  return (
    <div>
      <Wrap justify={"center"} spacing={"7"} bg={"gray.100"} p={5}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Heading>{error}</Heading>
        ) : products && products.length > 0 ? (
          products.map((item, index) => (
            <WrapItem
              _hover={{
                transform: "scale(1.07)",
                transition: "transform 0.3s ease",
              }}
              transition="transform 0.4s ease"
              w={"16.5rem"}
              flexDirection={"column"}
              key={index}
              p={3}
              rounded={"lg"}
              shadow={"2xl"}
              bg={"white"}
            >
              <Link as={ReactLink} to={`/${item._id}`} alignSelf={"center"}>
                {console.log(item)}
                <Img src={item.images[0].imageUrl} w={"16rem"} h={"16rem"} />
              </Link>
              <Text fontWeight={"semibold"}>{item.name}</Text>
              <Text fontWeight={"semibold"}>
                <Text
                  display={"inline-block"}
                  fontWeight={"medium"}
                  fontSize={"lg"}
                >
                  ₹
                </Text>{" "}
                {item.price.toLocaleString("en-IN")}
              </Text>
              <Divider />
              <HStack
                my={2}
                flexDir={"row"}
                justifyContent={"space-between"}
                w={"full"}
              >
                <Flex alignItems={"center"} gap={1}>
                  <Flex gap={0} fontSize={"xs"}>
                    <Icon as={StarIcon} />
                    <Icon as={StarIcon} />
                    <Icon as={StarIcon} />
                    <Icon as={StarIcon} />
                    <Icon as={StarIcon} />
                  </Flex>
                  <Text>{item.numOfReviews} reviews</Text>
                </Flex>
                <Button
                  me={2}
                  size={"md"}
                  p={0}
                  fontSize={"2xl"}
                  onClick={() => {
                    toast({
                      status: "success",
                      position: "top",
                      duration: 2000,
                      isClosable: true,
                      title: "added to cart",
                    });
                  }}
                >
                  <Icon as={FiShoppingCart} />
                </Button>
              </HStack>
            </WrapItem>
          ))
        ) : (
          <Text>no products yet</Text>
        )}
      </Wrap>

      {/* 
      {loading ? (
        <Loader /> : error ?  <Text>{error.message}</Text> :  products && products.length > 0 ? (
        products.map((item, index) => <Text key={index}>{item.name}</Text>)
      ) : // <Text>no products yet</Text>
      null}}
      <Heading>this is products page</Heading> */}
    </div>
  );
};

export default Products;
