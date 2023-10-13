import {
  Flex,
  HStack,
  Heading,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import SideBar from "./SideBar";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrder } from "../../store/slices/adminSlice";
import orderSlice from "../../store/slices/orderSlice";

const AllOrders = () => {
  const { loading, error, orders } = useSelector((state) => state.admin);

  let totalOrders = 0;
  let totalAmount = 0;
  if (orders && orders.length >= 1) {
    orders.forEach((item, i) => {
      totalOrders += item.orderItems.length;
      totalAmount += item.total;
    });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProd = async () => {
      const link = "https://big-deals1-server.vercel.app/api/admin/products";
      const response = await axios.get(link, { withCredentials: true });
    };
    fetchProd();
    dispatch(fetchOrders());
  }, []);

  const handleChange = async (e, item) => {
    const value = e.target.value;
    console.log(value);
    console.log(item);
    let link = `https://big-deals1-server.vercel.app/api/order/${item._id}`;

    alert("Do you want to update this order");

    const data = {
      status: value,
      id: item._id,
      quantity: item.quantity,
    };

    try {
      const response = await axios.put(link, data, { withCredentials: true });
      console.log(response);
      if (response.status === 200)
        dispatch(updateOrder({ _id: item._id, status: value }));
    } catch (error) {}
  };

  return (
    <Flex p={5}>
      <SideBar />
      <Flex
        ml={4}
        p={5}
        border={"1px"}
        bg={"gray.100"}
        w={"full"}
        flexDir={"column"}
      >
        <Heading>All orders</Heading>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity</Th>
                <Th textAlign={"center"}>User</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th>Update</Th>
              </Tr>
            </Thead>

            <Tbody>
              {orders.map((item, index) => (
                <>
                  {item.orderItems.map((orderItems, index) => (
                    <Tr key={index}>
                      <Td>{orderItems.name}</Td>
                      <Td>{orderItems.quantity}</Td>
                      <Td textAlign={"center"}>{item.user}</Td>
                      <Td>{item.total}</Td>
                      <Td>{item.orderStatus}</Td>
                      <Td>
                        <Select
                          color={"white"}
                          fontWeight={"bold"}
                          rounded={"md"}
                          value={item.orderStatus}
                          size={"sm"}
                          bg={
                            item.orderStatus === "processing"
                              ? "red.500"
                              : "green.500"
                          }
                          onChange={(e) => {
                            handleChange(e, item);
                          }}
                        >
                          <option value={"processing"}>processing</option>
                          <option value={"pending"}>pending</option>
                          <option value={"delivered"}>delivered</option>
                        </Select>
                      </Td>
                    </Tr>
                  ))}
                </>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};

export default AllOrders;
