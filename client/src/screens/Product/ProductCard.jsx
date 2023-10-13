import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Img,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
// hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// styles
import { StarIcon } from "@chakra-ui/icons";
import { LuShieldCheck } from "react-icons/lu";
import { FaShippingFast } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

// others
import axios from "axios";
import Loader from "../../utils/Loader";
import { motion } from "framer-motion";
import { addToCart } from "../../store/slices/cartSlice";
import AlertComponent from "../../utils/Alert";

const ProductCard = () => {
  const [product, setProduct] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const { cart } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [error, seterror] = useState();

  const { id } = useParams();
  const url = `https://big-deals1-server.vercel.app/api/product/${id}`;
  const dispatch = useDispatch();
  const toast = useToast({
    isClosable: true,
    duration: "3000",
    position: "top",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setLoading(false);
        setProduct(response.data.product);

        setReviews(response.data.product.reviews);
      } catch (error) {
        setLoading(false);
        seterror(error.message);
      }
    };
    fetchProduct();
  }, [url]);

  const handleClick = (product) => {
    const itemExist = cart.find((prod) => prod._id === product._id);
    if (itemExist) {
      return toast({ status: "error", title: "item is already added to cart" });
    }
    const filteredProduct = {
      name: product.name,
      price: product.price,
      image: product.images[0].imageUrl,
      product: product._id,
    };
    dispatch(addToCart({ ...filteredProduct, quantity: 1, _id: product._id }));
    toast({ status: "success", title: "added to cart" });
  };
  return (
    <div>
      {loading ? (
        <Box h={"70vh"}>
          <Loader />
        </Box>
      ) : error ? (
        <Box h={"70vh"} w={"full"}>
          <AlertComponent status={"error"} message={error} />
        </Box>
      ) : (
        product && (
          <>
            <Flex
              direction={{ base: "column", md: "row" }}
              w={{ base: "100vw", md: "100vw", lg: "90vw" }}
              m={"auto"}
              my={{ lg: 2 }}
              pb={{ base: 10, md: 20 }}
              pt={{ base: 0, md: 5 }}
            >
              <Box
                shadow={"lg"}
                display={{ base: "Flex", md: "none" }}
                flexDir={"column"}
              >
                <Divider bg={"red"} />
                <Box height={"50vh"} w={"fit-content"} m={"auto"} p={5}>
                  <Img src={product.images[0].imageUrl} h={"full"} />
                </Box>
              </Box>
              <Left
                product={product}
                handleClick={handleClick}
                setQuantity={setQuantity}
                Quantity={Quantity}
              />
              <Right product={product} />
            </Flex>
            {reviews.length >= 1 ? (
              <>
                <Heading ms={"10"}>Reviews</Heading>
                <Stack
                  rounded={"md"}
                  flexDir={"row"}
                  overflowX={"scroll"}
                  bg={"gray.200"}
                  py={10}
                  my={5}
                  mb={{ base: 16, md: 16, lg: 10 }}
                >
                  <HStack spacing={"4"} px={10}>
                    {reviews.map((rev, i) => (
                      <Reviews
                        key={i}
                        name={rev.name}
                        rating={rev.rating}
                        comment={rev.comment}
                      />
                    ))}
                  </HStack>
                </Stack>
              </>
            ) : (
              <Flex
                mx={{ lg: 20 }}
                justifyContent={"center"}
                mb={{ base: 10, lg: 32 }}
              >
                <Heading w={"fit-content"}>No reviews yet</Heading>
              </Flex>
            )}
          </>
        )
      )}
    </div>
  );
};

export default ProductCard;

const Reviews = ({ name, rating, comment }) => (
  <VStack
    rounded={"md"}
    w={"320px"}
    alignItems={"start"}
    border={"1px"}
    bg={"white"}
    p={3}
    h={"12.5rem"}
  >
    <HStack w={"fit-content"}>
      <Avatar size={"md"} />
      <Text>{name}</Text>
    </HStack>
    <Divider color={"gray.300"} />
    <ReviewsRating rating={rating} />
    <Text noOfLines={4} fontSize={"sm"} letterSpacing={"wide"}>
      {comment}
    </Text>
  </VStack>
);

const Right = ({ product }) => (
  <Stack
    bg={"white"}
    width={{ base: "100vw", md: "50%" }}
    pt={{ lg: 10 }}
    alignItems={"center"}
    display={{ base: "none", md: "flex" }}
  >
    <Img
      w={{ md: "full", lg: "60%" }}
      src={product.images[0].imageUrl}
      alt={product.name}
      h={"30rem"}
    />
  </Stack>
);

const Left = ({ product, handleClick, setQuantity, Quantity }) => (
  <VStack
    rounded={"lg"}
    shadow={"2xl"}
    spacing={{ base: "2", md: "2", lg: 4 }}
    width={{ base: "100vw", md: "50%" }}
    p={5}
    px={{ base: 5, md: 5, lg: 10 }}
    alignItems={"flex-start"}
  >
    <ProductNameAndPrice product={product} />
    <RatingsComponent
      rating={product.ratings}
      numOfReviews={product.numOfReviews}
    />
    <ProductDescription product={product} />
    <QuantityButtons Quantity={Quantity} setQuantity={setQuantity} />
    <Divider />
    <ProductShipping />
    <Button
      as={motion.button}
      w={"full"}
      bg={"tomato"}
      color={"white"}
      rightIcon={<FaArrowRight />}
      _hover={{ bg: "tomato" }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        handleClick(product);
      }}
    >
      Add to cart
    </Button>
  </VStack>
);

const ProductNameAndPrice = ({ product }) => (
  <>
    <Heading fontSize={{ base: "2xl", md: "2xl", lg: "3xl" }}>
      {product.name}
    </Heading>
    <Text fontWeight={"semi-bold"} fontSize={"xl"}>
      <Text
        fontWeight={"semi-bold"}
        fontSize={"xl"}
        me={1}
        display={"inline-block"}
      >
        ₹
      </Text>
      {product.price.toLocaleString("en-IN")}
    </Text>
  </>
);

const QuantityButtons = ({ Quantity, setQuantity }) => (
  <HStack my={3}>
    <Text>Quantity</Text>
    <Button
      size={"sm"}
      as={motion.button}
      bg={"#4d5499"}
      variant={"unstyled"}
      color={"white"}
      paddingX={4}
      whileTap={{ scale: 0.7 }}
      onClick={() => {
        if (Quantity <= 1) return;
        setQuantity(Quantity - 1);
      }}
    >
      -
    </Button>
    <Text>{Quantity}</Text>
    <Button
      size={"sm"}
      as={motion.button}
      variant={"unstyled"}
      bg={"#4d5499"}
      color={"white"}
      fontSize={"xl"}
      paddingX={4}
      whileTap={{ scale: 0.7 }}
      onClick={() => {
        setQuantity(Quantity + 1);
      }}
    >
      +
    </Button>
  </HStack>
);

const ProductDescription = ({ product }) => (
  <VStack alignItems={"start"}>
    <Heading my={4} fontSize={{ base: "sm", md: "xl" }}>
      Description...
    </Heading>
    <HStack h={"6rem"} fontSize={"md"} letterSpacing={"wide"}>
      <Text noOfLines={"5"}>{product.description}</Text>
    </HStack>
  </VStack>
);

const ProductShipping = () => (
  <VStack fontSize={"sm"} alignItems={"start"} spacing={1} w={"full"} mb={2}>
    <HStack spacing={2}>
      <Icon fontSize={"lg"} as={FaShippingFast} color={"green.600"} />
      <Text> free shipping if order is above 1000</Text>
    </HStack>
    <HStack spacing={2}>
      <Icon fontSize={"lg"} as={LuShieldCheck} color={"green.600"} />
      <Text>Extended warranty</Text>
    </HStack>
    <HStack spacing={2}>
      <Icon fontSize={"lg"} as={RiCustomerService2Fill} color={"green.600"} />
      <Text> we're here for you 24/7</Text>
    </HStack>
  </VStack>
);
const RatingsComponent = ({ rating, numOfReviews }) => (
  <HStack fontSize={"xs"} spacing={0}>
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 1 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 2 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 3 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 4 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 5 ? "gold" : "gray.400"}
    />
    {numOfReviews <= 1 && (
      <Text fontSize={"lg"} ms={2}>
        {numOfReviews} {numOfReviews === 1 ? "review" : "reviews"}{" "}
      </Text>
    )}
  </HStack>
);

const ReviewsRating = ({ rating }) => (
  <HStack fontSize={"xs"} spacing={0}>
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 1 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 2 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 3 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 4 ? "gold" : "gray.400"}
    />
    <Icon
      fontSize={"lg"}
      as={StarIcon}
      color={rating >= 5 ? "gold" : "gray.400"}
    />
  </HStack>
);
