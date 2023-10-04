import {
  HStack,
  Text,
  VStack,
  Link,
  Icon,
  Divider,
  Button,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { Link as ReactLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <VStack
        w={"22%"}
        alignItems={"start"}
        py={4}
        px={2}
        h={"85vh"}
        bgColor={"#14539a"}
        rounded={"lg"}
      >
        <Link
          w={"full"}
          as={ReactLink}
          to={"/admin"}
          _hover={{ textDecoration: "none" }}
        >
          <Text
            _hover={{ transform: "scale(1.05)" }}
            w={"fit-content"}
            letterSpacing={"widest"}
            fontFamily={"Dancing Script, cursive"}
            fontSize={"3xl"}
            color={"white"}
            as={"h2"}
            mx={"auto"}
          >
            Dashboard
          </Text>
        </Link>
        <VStack w={"full"} spacing={"1"} bg={"transparent"}>
          <Link w={"full"} as={ReactLink} to={"/profile"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              My Profile
            </Button>
          </Link>
          <Link w={"full"} as={ReactLink} to={"/cart"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              Cart
            </Button>
          </Link>
          <Link w={"full"} as={ReactLink} to={"/orders"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              My Orders
            </Button>
          </Link>
          <Link w={"full"} as={ReactLink} to={"/admin/products"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              Products
            </Button>
          </Link>
          <Link w={"full"} as={ReactLink} to={"/admin/users"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              Users
            </Button>
          </Link>
          <Link w={"full"} as={ReactLink} to={"/admin/orders"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              Orders
            </Button>
          </Link>
          <Link w={"full"} as={ReactLink} to={"/admin/product/new"}>
            <Button
              justifyContent={"space-between"}
              bgColor={"#14539a"}
              color={"white"}
              _hover={{ border: "1px", transform: "scale(1.01)" }}
              size={"sm"}
              w={"full"}
              rightIcon={<ChevronRightIcon />}
            >
              Add New Product
            </Button>
          </Link>
        </VStack>

        <Divider />
        <Link w={"full"} as={ReactLink} to={"/orders"}>
          <Button
            size={"sm"}
            variant={"ghost"}
            w={"full"}
            bg={"green.400"}
            _hover={{ transform: "scale(1.05)" }}
            color={"white"}
          >
            sign out
          </Button>
        </Link>
      </VStack>
    </>
  );
};

export default SideBar;
