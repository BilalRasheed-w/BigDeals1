import React from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Icon,
  Link,
  useColorMode,
  InputGroup,
  Input,
  InputLeftElement,
  InputRightAddon,
  InputLeftAddon,
  Text,
  Heading,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

import { PiShoppingCartSimple } from "react-icons/pi";
import { Link as ReactLink } from "react-router-dom";


const isloggedin = true;

const NavRight = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <div>
      <HStack display="flex" alignItems="center" spacing={2}>
        <HStack
          spacing={2}
          color="brand.500"
          display={{ base: "none", md: "inline-flex" }}
        >
          {isloggedin ? (
            <>
              <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton
                  fontSize="3xl"
                  size="lg"
                  variant="ghost"
                  aria-label="open menu"
                  icon={<PiShoppingCartSimple />}
                />
                <Flex alignItems={"center"}>
                  <Menu>
                    <MenuButton
                      transition="all 0.3s"
                      _focus={{ boxShadow: "none" }}
                    >
                      <HStack>
                        <Avatar
                          size={"sm"}
                          src={
                            "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                          }
                        />
                        <VStack
                          display={{ base: "none", md: "flex" }}
                          alignItems="flex-start"
                          spacing="1px"
                          ml="2"
                        >
                          <Text fontSize="sm">Justina Clark</Text>
                          <Text fontSize="xs" color="gray.600">
                            Admin
                          </Text>
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                          <FiChevronDown />
                        </Box>
                      </HStack>
                    </MenuButton>
                    <MenuList bg={"white"} borderColor={"gray.200"}>
                      <MenuItem as={ReactLink} to={"/profile"}>
                        Profile
                      </MenuItem>
                      <MenuItem as={ReactLink} to={"/cart"}>
                        Cart
                      </MenuItem>
                      <MenuItem as={ReactLink} to={"/orders"}>
                        Orders
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem as={ReactLink} to={"/signout"}>
                        Sign out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </HStack>
            </>
          ) : (
            <>
              <Button as={ReactLink} to={"/login"} variant="ghost">
                Login
              </Button>
              <Button
                as={ReactLink}
                to={"/signup"}
                _hover={{ transform: "scale(1.1)" }}
                colorScheme="brand"
                size="sm"
              >
                Sign up
              </Button>
            </>
          )}
        </HStack>

        <Box display={{ base: "inline-flex", md: "none" }}>
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            fontSize="20px"
            color="gray.800"
            _dark={{ color: "inherit" }}
            variant="ghost"
            icon={<AiOutlineMenu />}
            onClick={mobileNav.onOpen}
          />

          <VStack
            pos="absolute"
            top={0}
            left={0}
            right={0}
            display={mobileNav.isOpen ? "flex" : "none"}
            flexDirection="column"
            pb={4}
            my={2}
            bg={bg}
            spacing={2}
            rounded="sm"
            shadow="sm"
          >
            <CloseButton
              aria-label="Close menu"
              alignSelf={"flex-end"}
              onClick={mobileNav.onClose}
            />

            {isloggedin ? (
              <>
                <Button w="full" variant="ghost">
                  Profile
                </Button>
                <Button w="full" variant="ghost">
                  Cart
                </Button>
                <Button w="full" variant="ghost">
                  Orders
                </Button>
                <Button w="full" variant="ghost">
                  Logout
                </Button>
                <Button w="full" variant="ghost">
                  Contact us
                </Button>
              </>
            ) : (
              <>
                <Button w="full" variant="ghost">
                  All Products
                </Button>
                <Button w="full" variant="ghost">
                  Electronics
                </Button>
                <Button w="full" variant="ghost">
                  Clothing
                </Button>
                <Button w="full" variant="ghost">
                  Login
                </Button>
                <Button w="full" variant="ghost">
                  Sign up
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </HStack>
    </div>
  );
};

export default NavRight;
