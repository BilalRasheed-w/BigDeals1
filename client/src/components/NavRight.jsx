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
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { AiFillBell, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown, FiShoppingCart } from "react-icons/fi";
import { PiShoppingCartSimple } from "react-icons/pi";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { SignOut } from "../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavRight = ({ setKeyword, handleSubmit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isAuth } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const handleSignOut = () => {
    dispatch(SignOut());
    navigate("/");
  };

  let cartItems = 0;
  if (cart) {
    cartItems = cart.length;
  }
  let isAdmin = false;
  if (user) {
    isAdmin = user.role === "admin";
  }

  return (
    <>
      <HStack display="flex" alignItems="center" spacing={2}>
        <HStack
          spacing={2}
          color="brand.500"
          display={{ base: "none", md: "inline-flex" }}
        >
          {isAuth ? (
            <UserLogged
              user={user}
              isAdmin={isAdmin}
              cartItems={cartItems}
              handleSignOut={handleSignOut}
            />
          ) : (
            <NotLogged cartItems={cartItems} />
          )}
        </HStack>

        <Box display={{ base: "inline-flex", md: "none" }}>
          <IconButton
            display={{ base: "flex", md: "none" }}
            aria-label="Open menu"
            fontSize={"lg"}
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
            h={{ base: "full" }}
            zIndex={9}
            bg={"gray.50"}
            spacing={2}
            rounded="sm"
            shadow="sm"
            pt={2}
          >
            <CloseButton
              aria-label="Close menu"
              alignSelf={"flex-end"}
              onClick={mobileNav.onClose}
              me={2}
            />

            {isAuth ? (
              // ! user logged mobile
              <>
                <SearchBox
                  handleSubmit={handleSubmit}
                  mobileNav={mobileNav}
                  setKeyword={setKeyword}
                />

                {isAdmin && (
                  <IsAuthLinks
                    name={"Dashboard"}
                    path={"/admin"}
                    mobileNav={mobileNav}
                  />
                )}

                <IsAuthLinks
                  name={"Profile"}
                  path={"/profile"}
                  mobileNav={mobileNav}
                />
                <IsAuthLinks
                  name={"Cart"}
                  path={"/cart"}
                  mobileNav={mobileNav}
                />
                <IsAuthLinks
                  name={"Orders"}
                  path={"/orders/me"}
                  mobileNav={mobileNav}
                />

                {isAdmin && (
                  <IsAuthLinks
                    name={"all Products"}
                    path={"/admin/products"}
                    mobileNav={mobileNav}
                  />
                )}

                {isAdmin && (
                  <IsAuthLinks
                    name={"Add New Product"}
                    path={"/admin/product/new"}
                    mobileNav={mobileNav}
                  />
                )}

                {isAdmin && (
                  <IsAuthLinks
                    name={"All Users"}
                    path={"/admin/users"}
                    mobileNav={mobileNav}
                  />
                )}
                <Button
                  fontSize={"xl"}
                  w="full"
                  variant="ghost"
                  onClick={() => {
                    handleSignOut();
                    mobileNav.onClose();
                  }}
                >
                  Logout
                </Button>
                <IsAuthLinks
                  name={"  Contact us"}
                  path={"/contact"}
                  mobileNav={mobileNav}
                />
              </>
            ) : (
              <>
                <SearchBox
                  handleSubmit={handleSubmit}
                  mobileNav={mobileNav}
                  setKeyword={setKeyword}
                />
                {IsAuthLinksArray.map((item, i) => (
                  <IsAuthLinks
                    key={i}
                    name={item.name}
                    path={item.path}
                    mobileNav={mobileNav}
                  />
                ))}
              </>
            )}
          </VStack>
        </Box>
      </HStack>
    </>
  );
};

export default NavRight;

const IsAuthLinksArray = [
  { name: "All Products ", path: "/products" },
  { name: "Home ", path: "/" },
  { name: "My Cart", path: "/cart" },
  { name: "Login ", path: "/login" },
  { name: "Sign up ", path: "/signup" },
];

const IsAuthLinks = ({ name, path, mobileNav }) => (
  <Link as={ReactLink} to={path} onClick={mobileNav.onClose}>
    <Button fontSize={"xl"} w="full" variant="ghost">
      {name}
    </Button>
  </Link>
);

const SearchBox = ({ handleSubmit, mobileNav, setKeyword }) => (
  <InputGroup
    border={"1px"}
    borderRadius={"10px"}
    borderColor={"black"}
    mr={2}
    size={"sm"}
    w={"80%"}
  >
    <InputLeftElement
      cursor={"pointer"}
      onClick={() => {
        handleSubmit();
        mobileNav.onClose();
      }}
      fontSize={"xl"}
    >
      <AiOutlineSearch />
    </InputLeftElement>
    <Input
      bg={"white"}
      type="tel"
      placeholder="Search products."
      onChange={(e) => {
        setKeyword(e.target.value);
      }}
    />
  </InputGroup>
);

const UserLogged = ({ user, isAdmin, handleSignOut, cartItems }) => (
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
        <MenuButton transition="all 0.3s" _focus={{ boxShadow: "none" }}>
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
              {isAdmin ? (
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
          {isAdmin ? (
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
          <MenuItem as={ReactLink} to={"/orders/me"}>
            Orders
          </MenuItem>
          {isAdmin ? (
            <MenuItem as={ReactLink} to={"/admin/products"}>
              All Products
            </MenuItem>
          ) : null}
          {isAdmin ? (
            <MenuItem as={ReactLink} to={"/admin/product/new"}>
              Add New Product
            </MenuItem>
          ) : null}
          {isAdmin ? (
            <MenuItem as={ReactLink} to={"/admin/users"}>
              All users
            </MenuItem>
          ) : null}
          {isAdmin ? (
            <MenuItem as={ReactLink} to={"/admin/orders"}>
              All Orders
            </MenuItem>
          ) : null}

          <MenuDivider />
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  </HStack>
);

const NotLogged = ({ cartItems }) => (
  <HStack spacing={"3"}>
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
);
