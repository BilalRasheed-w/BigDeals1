import { Text, VStack, Link, Divider, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";
import { Link as ReactLink } from "react-router-dom";

const DashboardLinkArray = [
  { name: "My Profile", path: "/profile" },
  { name: "Cart", path: "/cart" },
  { name: "My Orders", path: "/orders" },
  { name: "Products", path: "/admin/products" },
  { name: "Users", path: "/admin/users" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Add New Product", path: "/admin/product/new" },
];

const SideBar = () => {
  return (
    <>
      <VStack
        w={{ base: "full", md: "22%" }}
        alignItems={"start"}
        py={4}
        px={{ base: 4, md: 2 }}
        h={{ base: "fit-content", md: "85vh" }}
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
            my={{ base: 2, md: 0 }}
          >
            Dashboard
          </Text>
        </Link>
        <VStack w={"full"} spacing={{ base: "2", md: "1" }} bg={"transparent"}>
          {DashboardLinkArray.map((item, i) => (
            <DashboardLinks key={i} name={item.name} path={item.path} />
          ))}
        </VStack>
        <Divider />
        <Link w={"full"} as={ReactLink} to={"/orders"} my={{ base: 4, md: 0 }}>
          <Button
            size={{ base: "md", md: "sm" }}
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

const DashboardLinks = ({ name, path }) => (
  <Link w={"full"} as={ReactLink} to={path}>
    <Button
      justifyContent={"space-between"}
      bgColor={"#14539a"}
      color={"white"}
      _hover={{ border: "1px", transform: "scale(1.01)" }}
      size={"sm"}
      w={"full"}
      rightIcon={<ChevronRightIcon />}
    >
      {name}
    </Button>
  </Link>
);
