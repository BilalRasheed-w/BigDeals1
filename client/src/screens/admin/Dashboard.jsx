import {
  Badge,
  Flex,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import AdminSideBar from "./SideBar";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchAllProducts,
  fetchOrders,
  fetchUsers,
} from "../../store/slices/adminSlice";

const Dashboard = () => {
  const {
    loading,
    error,
    orders,
    products,
    users,
    totalProducts,
    totalUsers,
    totalOrders,
    totalOrdersPrice,
  } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);

  let totalProductsPrice = 0;
  if (products.length >= 1) {
    products.forEach((item) => {
      totalProductsPrice += item.price;
    });
  }

  return (
    <>
      <Stack
        p={4}
        px={{ base: 8, md: 0 }}
        bg={"gray.50"}
        gap={2}
        flexDir={{ base: "column", md: "row" }}
      >
        <AdminSideBar />
        <VStack
          rounded={"md"}
          border={{ md: "1px" }}
          w={{ base: "full", md: "77%" }}
          py={2}
          bg={"gray.100"}
          mb={{ base: 16 }}
        >
          <HStack
            justifyContent={"space-between"}
            flexDir={{ base: "column", md: "column",lg:"row" }}
            w={"full"}
            px={10}
            spacing={{ base: 2, md: "none" }}
          >
            <DisplayBox
              path={"/admin/products"}
              name={"All Products"}
              allValue={totalProducts}
              totalProductsPrice={totalProductsPrice}
              subName={"Total Worth"}
            />

            <Link
              as={ReactLink}
              to={"/admin/users"}
              _hover={{ textDecor: "none", transform: "scale(1.02)" }}
            >
              <Flex
                bgColor={"#14539a"}
                w={"16rem"}
                color={"white"}
                p={4}
                rounded={"xl"}
                flexDirection={"column"}
              >
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
                  All Users
                </Text>
                <Text
                  alignSelf={"end"}
                  fontWeight={"bold"}
                  fontSize={"4xl"}
                  w={"fit-content"}
                >
                  {totalUsers}
                </Text>
              </Flex>
            </Link>

            <DisplayBox
              path={"/admin/orders"}
              name={"All Orders"}
              allValue={totalOrders}
              totalProductsPrice={totalOrdersPrice}
              subName={"Total Amount"}
            />
          </HStack>
        </VStack>
      </Stack>
    </>
  );
};

export default Dashboard;

const DisplayBox = ({ path, name, allValue, totalProductsPrice, subName }) => (
  <Link
    as={ReactLink}
    to={path}
    _hover={{ textDecor: "none", transform: "scale(1.02)" }}
    
  >
    
    <Flex
      bgColor={"#14539a"}
      color={"white"}
      w={"16rem"}
      px={4}
      pb={5}
      rounded={"xl"}
      flexDirection={"column"}
    >
      <HStack w={"full"} justifyContent={"space-between"} my={2}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"bold"}>
          {name}
        </Text>
        <Text
          alignSelf={"end"}
          fontWeight={"bold"}
          fontSize={{ base: "3xl", md: "4xl" }}
          w={"fit-content"}
        >
          {allValue}
        </Text>
      </HStack>
      <HStack w={"full"} justifyContent={"space-between"}>
        <Text
          fontSize={"md"}
          border={"1px"}
          p={1}
          rounded={"md"}
          fontWeight={"semi-bold"}
        >
          {subName}
        </Text>
        <Text
          alignSelf={"end"}
          color={"yellow"}
          fontSize={"2xl"}
          w={"fit-content"}
        >
          {totalProductsPrice.toLocaleString("en-IN")}
        </Text>
      </HStack>
    </Flex>
  </Link>
);
