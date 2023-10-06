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
  Text,
  Heading,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  Badge,
  Link,
} from "@chakra-ui/react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown, FiShoppingCart } from "react-icons/fi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { SignOut } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavRight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isAuth } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const handleSigOut = () => {
    dispatch(SignOut());
    navigate('/')
  };

  let cartItems = 0;
  if (cart) {
    cartItems = cart.length;
  }

  return (
    <div>
      <HStack display="flex" alignItems="center" spacing={2}>
        <HStack
          spacing={2}
          color="brand.500"
          display={{ base: "none", md: "inline-flex" }}
        >
          {isAuth ? (
            <>
              <HStack spacing={{ base: "0", md: "6" }}>
                <HStack spacing={0} pos={"relative"}>
                  <Link as={ReactLink} to="/cart">
                    <Button variant="ghost" p={0}>
                      <Icon fontSize={"3xl"} as={FiShoppingCart} />
                    </Button>
                    <Badge
                      colorScheme="red"
                      px={2}
                      py={0}
                      rounded={"lg"}
                      fontSize={"xs"}
                      pos={"absolute"}
                      color={"white"}
                      top={0}
                      left={6}
                      bg={"red.500"}
                    >
                      {cartItems}
                    </Badge>
                  </Link>
                </HStack>
                <Flex alignItems={"center"}>
                  <Menu>
                    <MenuButton
                      transition="all 0.3s"
                      _focus={{ boxShadow: "none" }}
                    >
                      <HStack>
                        <Avatar size={"sm"} src={user.image.imageUrl} />
                        <VStack
                          display={{ base: "none", md: "flex" }}
                          alignItems="flex-start"
                          spacing="1px"
                          ml="2"
                        >
                          <Text
                            fontSize="sm"
                            textTransform={"capitalize"}
                            fontWeight={"bold"}
                            letterSpacing={"wider"}
                          >
                            {user.name}
                          </Text>
                          {user.role === "admin" ? (
                            <Text fontSize="xs" color="gray.600">
                              Admin
                            </Text>
                          ) : null}
                        </VStack>
                        <Box display={{ base: "none", md: "flex" }}>
                          <FiChevronDown />
                        </Box>
                      </HStack>
                    </MenuButton>
                    <MenuList bg={"white"} borderColor={"gray.200"}>
                      {user.role === "admin" ? (
                        <MenuItem as={ReactLink} to={"/admin"}>
                          Dashboard
                        </MenuItem>
                      ) : null}
                      <MenuItem as={ReactLink} to={"/profile"}>
                        Profile
                      </MenuItem>
                      <MenuItem as={ReactLink} to={"/cart"}>
                        Cart
                      </MenuItem>
                      <MenuItem as={ReactLink} to={"/orders"}>
                        Orders
                      </MenuItem>
                      {user.role === "admin" ? (
                        <MenuItem as={ReactLink} to={"/admin/products"}>
                          All Products
                        </MenuItem>
                      ) : null}

                      {user.role === "admin" ? (
                        <MenuItem as={ReactLink} to={"/admin/product/new"}>
                          Add New Product
                        </MenuItem>
                      ) : null}
                      {user.role === "admin" ? (
                        <MenuItem as={ReactLink} to={"/admin/users"}>
                          All users
                        </MenuItem>
                      ) : null}

                      <MenuDivider />
                      <MenuItem
                      onClick={handleSigOut}
                      >
                        Sign out
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Flex>
              </HStack>
            </>
          ) : (
            <>
              <HStack spacing={"1"}>
                <HStack spacing={0} pos={"relative"}>
                  <Link as={ReactLink} to="/cart">
                    <Button variant="ghost" p={0}>
                      <Icon fontSize={"3xl"} as={FiShoppingCart} />
                    </Button>
                    <Badge
                      colorScheme="red"
                      px={2}
                      py={0}
                      rounded={"lg"}
                      fontSize={"xs"}
                      pos={"absolute"}
                      color={"white"}
                      top={0}
                      left={6}
                      bg={"red.500"}
                    >
                      {cartItems}
                    </Badge>
                  </Link>
                </HStack>
                <Button as={ReactLink} to={"/login"} variant="ghost">
                  Login
                </Button>
                <Button
                  as={ReactLink}
                  to={"/signup"}
                  _hover={{ transform: "scale(1.1)" }}
                  colorScheme="brand"
                  size="sm"
                  ms={1}
                >
                  Sign up
                </Button>
              </HStack>
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

            {isAuth ? (
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
