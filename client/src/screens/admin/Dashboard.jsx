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
  fetchOrders,
  fetchProducts,
  fetchUsers,
} from "../../store/slices/adminSlice";
const Dashboard = () => {
  const { loading, error, products, orders, users } = useSelector(
    (state) => state.admin
  );
  const allUsers = users.length;
  const allProducts = products.length;
  let totalProductsPrice = 0;
  products.forEach((item) => (totalProductsPrice += item.price));

  const allOrders = orders.length || 1;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <Stack p={4} bg={"gray.50"} gap={2} flexDir={"row"}>
        <AdminSideBar />
        <VStack rounded={"md"} border={"1px"} w={"77%"} py={2} bg={"gray.100"}>
          <HStack justifyContent={"space-between"} w={"full"} px={10}>
            <Link
              as={ReactLink}
              to={"/admin/products"}
              _hover={{ textDecor: "none", transform: "scale(1.02)" }}
            >
              <Flex
                bgColor={"#14539a"}
                color={"white"}
                w={"16rem"}
                px={4}
                pb={4}
                rounded={"xl"}
                flexDirection={"column"}
              >
                <HStack w={"full"} justifyContent={"space-between"} my={2}>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    All Products
                  </Text>
                  <Text
                    alignSelf={"end"}
                    fontWeight={"bold"}
                    fontSize={"4xl"}
                    w={"fit-content"}
                  >
                    {allProducts}
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
                    Total worth
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
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                  All Users{" "}k
                </Text>
                <Text
                  alignSelf={"end"}
                  fontWeight={"bold"}
                  fontSize={"4xl"}
                  w={"fit-content"}
                >
                  {allUsers}
                </Text>
              </Flex>
            </Link>
            <Link
              as={ReactLink}
              to={"/admin/orders"}
              _hover={{ textDecor: "none", transform: "scale(1.02)" }}
            >
              <Flex
                bgColor={"#14539a"}
                color={"white"}
                w={"16rem"}
                px={4}
                pb={4}
                rounded={"xl"}
                flexDirection={"column"}
              >
                <HStack w={"full"} justifyContent={"space-between"} my={2}>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    All Orders
                  </Text>
                  <Text
                    alignSelf={"end"}
                    fontWeight={"bold"}
                    fontSize={"4xl"}
                    w={"fit-content"}
                  >
                    {allOrders}
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
                    Total Amount
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
          </HStack>
        </VStack>
      </Stack>
    </div>
  );
};

export default Dashboard;
