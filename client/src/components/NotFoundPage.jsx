import { Button, Heading, Stack, Text, VStack, Link } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <Stack
        h={{ base: "80vh", md: "60vh" }}
        m={2}
        border={"1px"}
        rounded={"lg"}
        bg={"gray.100"}
        borderColor={"gray.500"}
        shadow={"2xl"}
      >
        <VStack>
          <Text color={"red"} fontSize={{ base: "5xl" }}>
            404
          </Text>
          <Text fontSize={{ base: "3xl" }}>page not found</Text>
          <Text>The requested page can't be found</Text>
          <Text>Please check you url</Text>
          <Text>
            click here to go
            <Link as={ReactLink} ms={1} to={"/"} color={"blue"}>
              home
            </Link>
          </Text>
        </VStack>
      </Stack>
    </div>
  );
};

export default NotFoundPage;
