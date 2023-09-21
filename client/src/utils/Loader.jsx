import { Center, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <div>
      <Center h={"30vh"} __css={{ transform: "scale(1.5)" }}>
        <Spinner size={"xl"} speed="0.3s" color="red.500" />
      </Center>
    </div>
  );
};

export default Loader;
