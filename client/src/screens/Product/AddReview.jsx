import React, { useEffect, useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Img,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddReview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const toast = useToast({
    position: "top",
    duration: "3000",
    isClosable: true,
  });
  const link = `https://big-deals1.vercel.app/api/product/${id}`;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(link);

        setProduct(response.data.product);
        console.log(product.images[0].imageUrl);
      } catch (error) {}
    };
    getProduct();
  }, []);

  const handleSubmit = async () => {
    const data = {
      rating,
      comment,
      productId: id,
    };
    console.log(data);

    const reviewLink = "https://big-deals1.vercel.app/api/product/review";

    try {
      const response = await axios.put(reviewLink, data, {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        toast({ title: "review submitted successfully", status: "success" });
      }
    } catch (error) {}
  };

  return (
    <>
      <HStack bg={"gray.100"}>
        <VStack>
          <HStack>
            <Img src={product && product.images[0].imageUrl} />
            <Text>{product && product.name}</Text>
          </HStack>
          <HStack spacing={1}>
            <StarIcon
              color={rating >= 1 ? "gold" : "gray.400"}
              onClick={() => {
                setRating(1);
              }}
            />
            <StarIcon
              color={rating >= 2 ? "gold" : "gray.400"}
              onClick={() => {
                setRating(2);
              }}
            />
            <StarIcon
              color={rating >= 3 ? "gold" : "gray.400"}
              onClick={() => {
                setRating(3);
              }}
            />
            <StarIcon
              color={rating >= 4 ? "gold" : "gray.400"}
              onClick={() => {
                setRating(4);
              }}
            />
            <StarIcon
              color={rating >= 5 ? "gold" : "gray.400"}
              onClick={() => {
                setRating(5);
              }}
            />
          </HStack>
          <Text>Comment</Text>
          <Textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <Button
            bg={"tomato"}
            variant={"unstyled"}
            color={"white"}
            px={4}
            onClick={() => {
              handleSubmit();
            }}
          >
            submit
          </Button>
        </VStack>
      </HStack>
    </>
  );
};

export default AddReview;
