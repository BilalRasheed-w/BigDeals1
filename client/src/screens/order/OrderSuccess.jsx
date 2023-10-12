import { Box, Button, Center, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import success from "../../assets/success.mp4";
import { useNavigate } from 'react-router-dom';
   
const OrderSuccess = () => {
  const videoRef = useRef(null);
   const navigate = useNavigate() 

  useEffect(() => {
    videoRef.current.play();
  }, []);
  return (
    <>
      <Stack w={"full"} h={"fit-content"} pb={40}>
        <Center>
          <VStack w={{md:"60vw",lg:"45vw"}} mx={{base:4}} >
            <video
              ref={videoRef}
              width={"250px"}
              src={success}
              muted
              autoPlay
              playsInline
            />
            <VStack w={"full"} bg={"#47d795"} rounded={"xl"} p={5}>
              <Text  textAlign={{base:'center',md:"none"}} color={"white"} fontWeight={"bold"} fontSize={"2xl"}>
                Your order has been placed successfully..!
              </Text>
              <Text textAlign={{base:'center',md:"none"}}  color={"white"} fontSize={"xl"}>
                You'll receive a confirmation email very shortly
              </Text>
              <Button
                bg={"transparent"}
                color={"white"}
                variant={"unstyled"}
                rounded={"lg"}
                border={"1px"}
                borderColor={"white"}
                size={{base:"lg",md:""}}
                px={4}
                py={2}
                   onClick={()=>{
                    navigate('/orders/me')
                   } }  
              >
                Go to Orders
              </Button>
            </VStack>
          </VStack>
        </Center>
      </Stack>
    </>
  );
};

export default OrderSuccess;
