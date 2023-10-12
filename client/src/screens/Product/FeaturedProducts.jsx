import {
  Img,
  Text,
  Wrap,
  WrapItem,
  Link,
  Box,
  Divider,
  Flex,
  Icon,
  HStack,
  Button,
  useToast,
} from "@chakra-ui/react";
// hooks
import { useEffect } from "react";
import { Link as ReactLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// styles
import { StarIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";

// others
import Loader from "../../utils/Loader";
import AlertComponent from "../../utils/Alert";
import { addToCart } from "../../store/slices/cartSlice";
import { fetchProducts } from "../../store/slices/productSlice";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const toast = useToast({ position: "top", duration: 2000, isClosable: true });
  const { loading, error, products } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProducts({ keyword: "", currentPage: 1 }));
  }, []);

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
    toast({
      status: "success",
      title: "added to cart",
    });
  };

  return (
    <>
      <Wrap
        id="products"
        justify={"center"}
        spacing={"7"}
        bg={"gray.100"}
        p={5}
        px={{lg:20}}
        pb={16}
      >
        {loading ? (
          <Flex height={"60vh"}>
            <Loader />
          </Flex>
        ) : error ? (
          <Box h={"70vh"} w={"full"}>
            <AlertComponent status={"error"} message={error} />
          </Box>
        ) : products && products.length >= 1 ? (
          products.map((item, index) => (
            <>
              <WrapItem
                key={index}
                _hover={{
                  transform: "scale(1.03)",
                  transition: "transform 0.3s ease",
                }}
                transition="transform 0.4s ease"
                w={"16rem"}
                flexDirection={"column"}
                p={3}
                rounded={"lg"}
                shadow={"2xl"}
                bg={"white"}
              >
                <Box h={"19rem"} p={{ base: 1, md: "none" }}>
                  <Link
                    as={ReactLink}
                    to={`/product/${item._id}`}
                    alignSelf={"center"}
                  >
                    <Img
                      src={item.images[0].imageUrl}
                      w={"16rem"}
                      h={"14rem"}
                    />
                  </Link>
                  <Text fontWeight={"semibold"}>{item.name}</Text>
                  <Text fontWeight={"semibold"}>
                    <Text
                      display={"inline-block"}
                      fontWeight={"medium"}
                      fontSize={"lg"}
                    >
                      ₹
                    </Text>{" "}
                    {item.price.toLocaleString("en-IN")}
                  </Text>
                </Box>
                <Divider />
                <HStack
                  my={2}
                  flexDir={"row"}
                  justifyContent={"space-between"}
                  w={"full"}
                >
                  <RatingsComponent item={item} />
                  <Button
                    me={2}
                    size={"md"}
                    p={0}
                    fontSize={"2xl"}
                    onClick={() => {
                      handleClick(item);
                    }}
                  >
                    <Icon as={FiShoppingCart} />
                  </Button>
                </HStack>
              </WrapItem>
            </>
          ))
        ) : (
          <Text textTransform={"capitalize"} h={"100vh"} fontSize={"3xl"}>
            no products yet...please refresh to fetch products
          </Text>
        )}
      </Wrap>
    </>
  );
};

export default FeaturedProducts;

const RatingsComponent = ({ item }) => (
  <Flex alignItems={"center"} gap={1}>
    <Flex gap={0} fontSize={"xs"}>
      <Icon as={StarIcon} color={item.ratings >= 1 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 2 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 3 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 4 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 5 ? "gold" : "gray.400"} />
    </Flex>

    {item.numOfReviews < 1 && <Text>0 reviews </Text>}
    {item.numOfReviews >= 1 && (
      <Text>
        {item.numOfReviews} {item.numOfReviews === 1 ? "review" : "reviews"}
      </Text>
    )}
  </Flex>
);
