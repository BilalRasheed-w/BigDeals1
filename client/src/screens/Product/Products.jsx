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

// file imports
import { fetchProducts } from "../../store/slices/productSlice";
import { addToCart } from "../../store/slices/cartSlice";
import AlertComponent from "../../utils/Alert";
import Loader from "../../utils/Loader";
import "./pagination.css";

// hooks imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink, useParams, useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import { StarIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";

const Products = () => {
  // hooks
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, products, productsCount, resultsPerPage } =
    useSelector((state) => state.product);
  const { cart } = useSelector((state) => state.cart);
  const toast = useToast({ position: "top", duration: 2000, isClosable: true });
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchProducts({ keyword, currentPage }));
  }, [keyword, currentPage]);

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

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const isLastPage = currentPage === Math.ceil(productsCount / resultsPerPage);

  return (
    <>
      <Wrap
        id="products"
        justify={"center"}
        spacing={"7"}
        bg={"gray.100"}
        px={{ base: 5, lg: "20" }}
        py={8}
      >
        {loading ? (
          <Box h={"70vh"}>
            <Loader />
          </Box>
        ) : error ? (
          <Box h={"70vh"} w={"full"}>
            <AlertComponent status={"error"} message={error} />
          </Box>
        ) : products && products.length > 0 ? (
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
                <Link
                  as={ReactLink}
                  to={`/product/${item._id}`}
                  alignSelf={"center"}
                >
                  <Img src={item.images[0].imageUrl} w={"16rem"} h={"14rem"} />
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
          <Box h={"70vh"} w={"full"}>
            <AlertComponent
              status={"error"}
              message={"Please refresh to see products"}
            />
          </Box>
        )}
      </Wrap>
      <Box className="paginationBox" py={10}>
        {products.length >= resultsPerPage && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            prevPageText={"<"}
            nextPageText={">"}
            firstPageText={"1st"}
            lastPageText={"last"}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
        {isLastPage && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultsPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            prevPageText={"<"}
            nextPageText={">"}
            firstPageText={"1st"}
            lastPageText={"last"}
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        )}
      </Box>
    </>
  );
};

export default Products;

const RatingsComponent = ({ item }) => (
  <Flex alignItems={"center"} gap={1}>
    <Flex gap={0} fontSize={"xs"}>
      <Icon as={StarIcon} color={item.ratings >= 1 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 2 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 3 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 4 ? "gold" : "gray.400"} />
      <Icon as={StarIcon} color={item.ratings >= 5 ? "gold" : "gray.400"} />
    </Flex>
    {item.numOfReviews < 1 && <Text>0 reviews</Text>}
    {item.numOfReviews >= 1 && (
      <Text>
        {item.numOfReviews} {item.numOfReviews === 1 ? "review" : "reviews"}
      </Text>
    )}
  </Flex>
);
