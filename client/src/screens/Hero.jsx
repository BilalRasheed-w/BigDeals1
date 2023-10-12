import {
  Button,
  Divider,
  Flex,
  Link,
  HStack,
  Heading,
  Img,
  VStack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import iphone from "../assets/iphones (1).jpg";
import FeaturedProducts from "./Product/FeaturedProducts";
import { useNavigate } from "react-router-dom";

import "./css/Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeroContainer navigate={navigate} />
      <HeroHeading />
      <FeaturedProducts />
      <GotoProducts navigate={navigate} />
      <Divider />
    </>
  );
};

export default Hero;

const HeroContainer = ({ navigate }) => (
  <HStack
    h={{ base: "55vh", md: "fit-content", lg: "65vh" }}
    spacing={0}
    border={"1px"}
    w={"full"}
    bg={"black"}
    flexDir={{ base: "column", md: "column", lg: "row" }}
  >
    <VStack
      width={{ base: "full", md: "50vh", lg: "35%" }}
      alignItems={{ base: "center", md: "center", lg: "start" }}
      h={{ base: "full", md: "15vh", lg: "full" }}
      bg={"black"}
      // bg={'yellow'}
      justifyContent={"center"}
      pl={{ base: 0, md: 5, lg: 10 }}
      pt={{ base: 8, md: "20", lg: "0" }}
    >
      <Heading
        as={"h2"}
        id="heroHeading"
        textAlign={{ base: "center", md: "unset" }}
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color={"yellow"}
      >
        Buy the latest apple Products
      </Heading>
      <Heading
        id="heroSubHeading"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        color={"white"}
      >
        at the best prices
      </Heading>
      <Button
        mt={{ base: 3, md: 3, lg: 1 }}
        fontFamily={"Dancing Script, cursive"}
        fontSize={{ base: "2xl", md: "2xl" }}
        rounded={"none"}
        _hover={{
          bg: "black",
          color: "yellow",
          border: "1px",
          borderColor: "yellow",
        }}
        variant={"solid"}
        bg={"yellow"}
        w={"fit-content"}
        color={"black"}
        onClick={() => {
          navigate("/products");
        }}
      >
        See Products
      </Button>
    </VStack>
    <VStack
      width={{ base: "full", md: "", lg: "65%" }}
      h={{ base: "full", md: "30vh", lg: "full" }}
      bg={"black"}
    >
      <Img src={iphone} alt="iphones" h={"full"} />
    </VStack>
  </HStack>
);

const HeroHeading = () => (
  <VStack my={10}>
    <Heading textAlign={"center"}>Featured Products</Heading>
    <Divider zIndex={2} border={"1px"} borderColor={"green"} w={"30%"} mt={2} />
  </VStack>
);

const GotoProducts = ({ navigate }) => (
  <Button
    mt={1}
    fontSize={"2xl "}
    rounded={"none"}
    _hover={{
      bg: "yellow",
      color: "black",
      border: "1px",
      borderColor: "yellow",
    }}
    variant={"solid"}
    bg={"black"}
    color={"white"}
    w={"full"}
    py={2}
    onClick={() => {
      navigate("/products");
    }}
  >
    Go to all Products
  </Button>
);
