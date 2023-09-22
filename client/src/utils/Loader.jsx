import { Box, Center, Flex, Spinner, Stack } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <>
      <Flex
        w={"fit-content"}
        m={"auto"}
        __css={{ transform: "scale(1.5)" }}
        mt={"20vh"}
      >
        <Spinner size={"xl"} speed="0.3s" color="red.500" />
      </Flex>
    </>
  );
};

export default Loader;
