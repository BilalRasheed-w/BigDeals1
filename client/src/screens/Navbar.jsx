import React, { useState } from "react";
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
import { Link as ReactLink, useNavigate } from "react-router-dom";
import NavRight from "../components/NavRight";

const isloggedin = true;

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <chakra.header bg={bg} w="full" px={{ base: 2, sm: 4, md: 6 }} py={3}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Left />
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
            <InputLeftElement
              cursor={"pointer"}
              onClick={handleSubmit}
              fontSize={"xl"}
            >
              <AiOutlineSearch />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Search..."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
            />
          </InputGroup>

          <NavRight setKeyword={setKeyword} handleSubmit={handleSubmit} />
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

const Middle = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    console.log(keyword);
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
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
        <InputLeftElement
          cursor={"pointer"}
          onClick={handleSubmit}
          fontSize={"xl"}
        >
          <AiOutlineSearch />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Search..."
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </InputGroup>
    </>
  );
};
