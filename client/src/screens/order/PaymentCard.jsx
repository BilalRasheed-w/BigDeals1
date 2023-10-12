import { useEffect, useState } from "react";
import {
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Input,
  Stack,
  VStack,
  useToast,
  Checkbox,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCreditCard2BackFill, BsKeyFill } from "react-icons/bs";
import { FaCalendarDays } from "react-icons/fa6";
import OrderSuccess from "./OrderSuccess";
import { useNavigate } from "react-router-dom";
// import { newOrder } from "../../store/slices/orderSlice";
import axios from "axios";

let link = "http://localhost:5000/api/order/new";

const PaymentCard = () => {
  const { loading, error, Total, cart, subTotal, shipping, shippingInfo } =
    useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const toast = useToast({
    duration: "3000",
    position: "bottom",
    isClosable: true,
  });
  const navigate = useNavigate();
  const [Card, setCard] = useState();
  const [Expiry, setExpiry] = useState();
  const [cvv, setCvv] = useState();
  const [POD, setPOD] = useState(false);

  useEffect(() => {}, [dispatch]);

  const submitHandler = async () => {
    if (!POD) {
      if (!Card || !Expiry || !cvv)
        return toast({ status: "error", title: "fields can't be empty" });
      if (Card.length < 16)
        toast({ status: "error", title: "invalid card number" });
      if (cvv.length < 3) toast({ status: "error", title: "invalid Cvv" });
    }
    // navigate("/order/success");

    const data = {
      orderItems: cart,
      subTotal,
      shipping,
      total: Total,
      shippingInfo,
      paymentInfo: { id: Date.now(), status: "processing" },
    };
    // console.log(shippingInfo);
    // console.log(data);
    try {
      const response = await axios.post(link, data, { withCredentials: true });
      if (response.status === 200) {
        
        navigate("/order/success");
      }
      console.log(response);
    } catch (error) {}
    console.log(error);
  };

  return (
    <>
     
      <Flex justifyContent={"center"} pb={"32"} bg={"gray.50"}>
        <VStack
          w={{ base: "80%", md: "70%", lg: "33%" }}
          p={3}
          px={{base:2,md:8}}
          borderRadius={"xl"}
          mt={{lg:10}}
          pb={10}
          spacing={{ base: 3, md: 5, lg: 5 }}
          m={5}
          bg={"white"}
          shadow={"xl"}
        >
          <Heading
            fontWeight={"medium"}
            fontSize={"3xl"}
            color={"red.500"}
            mt={2}
          >
            Payment Info
          </Heading>
          <Divider  border={"1px"} borderColor={"red.500"} w={"55%"} mb={3} />
          <VStack w={"full"} alignItems={"start"} spacing={0}>
            <Flex
              alignItems={"center"}
              p={2}
              gap={3}
              w={"full"}
              borderRadius={"md"}
            >
              <Icon as={BsFillCreditCard2BackFill} p={0} fontSize={"xl"} />
              <Input
                // size={"sm"}
                type="number"
                placeholder="Card"
                onChange={(e) => {
                  setCard(e.target.value);
                }}
              />
            </Flex>
            <Flex
              alignItems={"center"}
              p={2}
              gap={3}
              w={"full"}
              borderRadius={"md"}
            >
               <Icon as={FaCalendarDays} p={0} fontSize={"xl"} />
               <Input
              size={"sm"}
              type="number"
              placeholder="Expiry"
              onChange={(e) => {
                setExpiry(e.target.value);
              }}
              />
            </Flex>
            <Flex
              alignItems={"center"}
              p={2}
              gap={3}
              w={"full"}
              borderRadius={"md"}
            >
               <Icon as={BsKeyFill} p={0} fontSize={"xl"} />
               <Input
              size={"sm"}
              type="number"
              placeholder="CVV"
              onChange={(e) => {
                setCvv(e.target.value);
              }}
            />
            </Flex>
              <Divider my={{lg:4}} />
              <Flex
              alignItems={"center"}
              p={2}
              gap={3}
              w={"full"}
              borderRadius={"md"}
            >

          <Checkbox
            isChecked={POD}
            onChange={() => {
              setPOD(!POD);
              console.log(POD);
            }}
            size={"lg"}
            w={"full"}
          >
            Pay on delivery
          </Checkbox>
            </Flex>
            
            
          </VStack>
            <Flex w={"full"} >
            <Button
            w={'full'}
              bg={"red.400"}
              color={"white"}
              variant={"unstyled"}
              _hover={{ bg: "red.500", transform: "scale(1.05)" }}
              px={10}
            onClick={submitHandler}
            >
             Pay- ₹ {Total.toLocaleString("en-IN")}{" "}
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </>
  );
};

export default PaymentCard;
