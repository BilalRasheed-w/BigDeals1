import {
  Flex,
  HStack,
  Heading,
  Icon,
  Select,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
} from "@chakra-ui/react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchUsers, updateUser } from "../../store/slices/adminSlice";
import Loader from "../../utils/Loader";

const AllUsers = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.admin);
  const toast = useToast({
    position: "top",
    duration: "3000",
    isClosable: true,
  });
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const handleChange = async (e, user) => {
    const value = e.target.value;
    if (value === "admin")
      alert("Are you sure you want to make this user as admin.?");

    const url = `http://localhost:5000/api/user/${user._id}`;
    try {
      const response = await axios.put(
        url,
        { role: value },
        { withCredentials: true }
      );

      if (response.status === 200)
        dispatch(updateUser({ _id: user._id, role: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (user) => {
    const url = `http://localhost:5000/api/user/${user._id}`;
    alert("Are you sure you want to delete this user.?");
    try {
      const response = await axios.delete(url, { withCredentials: true });
      if (response.status === 200)
        toast({ status: "success", title: "user deleted successfully" });
      dispatch(fetchUsers());
    } catch (error) {
      console.log(error);
    }
  };
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
        pb={{base:16}}
      >
        <Heading fontWeight={"medium"} textDecor={"underline"}>
          All Users
        </Heading>

        {loading ? (
          <Loader />
        ) : error ? (
          <Text>{error}</Text>
        ) : users ? (
          <TableContainer
            border={"1px"}
            width={"container.lg"}
            rounded={"lg"}
            py={3}
          >
            <Table size="sm" variant={"striped"} colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>sl.no</Th>
                  <Th>Name</Th>
                  <Th>User Id</Th>
                  <Th>Role</Th>
                  <Th textAlign={"center"}>Make Admin</Th>
                  <Th textAlign={"center"}>Delete User</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users && users.length > 0
                  ? users.map((user, i) => (
                      <Tr key={i}>
                        <Td>{i + 1}</Td>
                        <Td textTransform={"capitalize"}>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.role}</Td>
                        <Td textAlign={"center"}>
                          <Select
                            value={user.role}
                            display={"inline-block"}
                            size={"xs"}
                            onChange={(e) => handleChange(e, user)}
                          >
                            <option value={"user"}>User</option>
                            <option value={"admin"}>Admin</option>
                          </Select>
                        </Td>

                        <Td textAlign={"center"}>
                          <Icon
                            _hover={{
                              transform: "scale(1.5)",
                              color: "red.500",
                            }}
                            as={DeleteIcon}
                            ms={2}
                            cursor={"pointer"}
                            onClick={() => {
                              deleteUser(user);
                            }}
                          />
                        </Td>
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Text>no users yet</Text>
        )}
      </VStack>
    </Flex>
  );
};

export default AllUsers;
