import {
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Img,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Products from "./Product/Products";
import iphones from "../assets/iphones.jpg";
import iphone from "../assets/iphones (1).jpg";

const Hero = () => {
  return (
    <div>
      <HStack h={"65vh"} spacing={0} border={"1px"} w={"full"} bg={"black"}>
        <VStack
          width={"35%"}
          alignItems={"start"}
          h={"full"}
          bg={"black"}
          justifyContent={"center"}
          pl={5}
        >
          <Heading fontSize={"3xl"} color={"yellow"}>
            Buy the latest apple Products
          </Heading>
          <Heading fontSize={"3xl"} color={"white"}>
            at the best prices
          </Heading>
          <Button
            mt={1}
            fontFamily={"Dancing Script, cursive"}
            fontSize={"xl "}
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
          >
            See Products
          </Button>
        </VStack>
        <VStack width={"65%"} h={"full"} bg={"black"}>
          <Img src={iphone} alt="iphones" h={"full"} />
        </VStack>
      </HStack>
      <VStack my={10}>
        <Heading textAlign={"center"}>Featured Products</Heading>
        <Divider border={"1px"} borderColor={"green"} w={"30%"} mt={2} />
      </VStack>
      <Products />
    </div>
  );
};

export default Hero;
