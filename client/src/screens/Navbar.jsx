import React from "react";
import {
  chakra,
  Flex,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  Input,
  InputLeftElement,
  Heading,
} from "@chakra-ui/react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";

import { Link as ReactLink } from "react-router-dom";
import NavRight from "../components/NavRight";

const isloggedin = true;

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <>
      <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4, md: 6 }} py={3}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Left />
          <Middle />
          <NavRight />
        </Flex>
      </chakra.header>
    </>
  );
};

export default Navbar;

const Left = () => (
  <Heading
    as={ReactLink}
    fontFamily={"Dancing Script, cursive"}
    to={"/"}
    fontSize="4xl"
    fontWeight="semibold"
  >
    BigDeals
  </Heading>
);

const Middle = () => (
  <>
    <InputGroup
      border={"0.1px solid"}
      borderRadius={"5px"}
      borderColor={"gray.400"}
      mr={2}
      size={"sm"}
      display={{ base: "none", sm: "block" }}
      w={"35%"}
      ml={"auto"}
    >
      <InputLeftElement pointerEvents="none">
        <AiOutlineSearch />
      </InputLeftElement>
      <Input type="tel" placeholder="Search..." />
    </InputGroup>
  </>
);
