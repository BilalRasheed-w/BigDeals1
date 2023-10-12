import {
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Link,
} from "@chakra-ui/react";
import React from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { fetchAllProducts } from "../../store/slices/adminSlice";
import { Link as ReactLink } from "react-router-dom";

const AdminProducts = () => {
  const { loading, error, products } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const EditProduct = (product) => {
    navigate(`/admin/product/${product._id}`);
  };

  const deleteProduct = async (product) => {
    const url = `https://big-deals1.vercel.app/api/product/${product._id}`;
    alert("Are you sure you want to delete this product.?");
    try {
      const response = await axios.delete(url, { withCredentials: true });
      console.log(response);
      if (response.status === 200) {
        fetchProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  return (
    <Flex
      p={4}
      gap={2}
      flexDir={{ base: "column", md: "row" }}
      px={{ base: 5, md: 0 }}
    >
      <SideBar />
      <VStack
        spacing={"5"}
        alignItems={"start"}
        px={{ base: 4, md: 10 }}
        rounded={"md"}
        border={{ base: "none", md: "1px" }}
        w={{ base: "full", md: "77%" }}
        py={2}
        bg={{ base: "white", md: "gray.100" }}
        pb={{ base: 16 }}
      >
        <Heading fontWeight={"medium"} textDecor={"underline"}>
          All Products
        </Heading>
        <TableContainer
          border={"1px"}
          width={"container.lg"}
          rounded={"lg"}
          py={3}
          overflow={"auto"}
        >
          <Table size="sm" variant={"striped"} colorScheme="teal">
            <Thead>
              <Tr>
                <Th>sl.no</Th>
                <Th>Name</Th>
                <Th>Price</Th>
                <Th>stock</Th>
                <Th>Category</Th>
                <Th textAlign={"center"}>Update/Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products && products.length > 0
                ? products.map((prod, i) => (
                    <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>
                        <Link as={ReactLink} to={`/product/${prod._id}`}>
                          {prod.name}
                        </Link>
                      </Td>
                      <Td>{prod.price}</Td>
                      <Td>{prod.stock}</Td>
                      <Td>{prod.category}</Td>
                      <Td textAlign={"center"}>
                        <Text>
                          <Icon
                            as={EditIcon}
                            me={2}
                            cursor={"pointer"}
                            onClick={() => {
                              EditProduct(prod);
                            }}
                            _hover={{
                              transform: "scale(1.5)",
                              color: "green.500",
                            }}
                          />
                          /
                          <Icon
                            as={DeleteIcon}
                            ms={2}
                            cursor={"pointer"}
                            onClick={() => {
                              deleteProduct(prod);
                            }}
                            _hover={{
                              transform: "scale(1.5)",
                              color: "red.500",
                            }}
                          />
                        </Text>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Flex>
  );
};

export default AdminProducts;
