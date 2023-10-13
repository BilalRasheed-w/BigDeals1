import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import "../../index.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function UpdateProduct() {
  const { id } = useParams();
  const url = `https://big-deals1-server.vercel.app/api/product/${id}`;
  const toast = useToast({
    duration: "3000",
    position: "top",
    isClosable: true,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Category, setCategory] = useState();
  const [Price, setPrice] = useState();
  const [Stock, setStock] = useState();
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        const { name, description, price, category, stock } =
          response.data.product;
        if (response.status === 200) {
          setName(name);
          setPrice(price);
          setCategory(category);
          setDescription(description);
          setStock(stock);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, [id]);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      if (!allowedTypes.includes(image.type)) return setImageError(true);
      if (allowedTypes.includes(image.type)) setImageError(false);
    }
    const data = {
      name,
      description,
      category: Category,
      price: Price,
      stock: Stock,
      image,
    };
    console.log(data);

    try {
      const response = await axios.put(url, data, { withCredentials: true });
      if (response.status === 200) {
        toast({ title: "product updated successfully", status: "success" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      px={{ base: 5 }}
      pb={{ base: 8, md: 4 }}
      justify={"center"}
      rounded={{ base: "lg", md: "none" }}
      shadow={{ base: "md", md: "none" }}
    >
      <Stack
        spacing={{ base: 4, md: 3 }}
        shadow={{ lg: "2xl" }}
        h={{ lg: "fit-content" }}
        rounded={{ lg: "2xl" }}
        px={{ lg: 10 }}
        w={{ base: "full", md: "80%", lg: "full" }}
        maxW={"md"}
        mt={{ lg: 2 }}
        pt={{ base: 2, md: 4 }}
        pb={{ base: 2, md: 0 }}
      >
        <Heading
          mb={{ base: 2, md: 0 }}
          alignSelf={{ base: "center" }}
          fontSize={"2xl"}
          fontWeight={"medium"}
        >
          Update Product
        </Heading>
        <ProductName setName={setName} name={name} />
        <ProductPrice setPrice={setPrice} Price={Price} />
        <ProductDescription
          setDescription={setDescription}
          description={description}
        />
        <ProductCategory setCategory={setCategory} Category={Category} />
        <ProductStock setStock={setStock} Stock={Stock} />
        <ProductImage
          handleFileUpload={handleFileUpload}
          imageError={imageError}
          image={image}
        />
        <AddNowButton handleSubmit={handleSubmit} />
      </Stack>
    </Flex>
  );
}

const AddNowButton = ({ handleSubmit }) => (
  <Button
    mt={{ base: 1, md: 0 }}
    mb={{ lg: 4 }}
    py={{ base: 2, md: 0 }}
    size={{ md: "sm", lg: "md" }}
    colorScheme={"blue"}
    variant={"solid"}
    type="submit"
    onClick={handleSubmit}
  >
    Add now
  </Button>
);

const ProductName = ({ setName, name, product }) => (
  <FormControl isRequired>
    <FormLabel>Product Name</FormLabel>
    <Input
      value={name}
      px={2}
      rounded={"sm"}
      size={{ md: "xs", lg: "sm" }}
      type="text"
      onChange={(e) => {
        setName(e.target.value);
      }}
    />
  </FormControl>
);

const ProductPrice = ({ setPrice, Price }) => (
  <FormControl>
    <FormLabel>Price</FormLabel>
    <PriceInput setPrice={setPrice} Price={Price} />
  </FormControl>
);

const ProductDescription = ({ setDescription, description }) => (
  <FormControl isRequired>
    <FormLabel>description</FormLabel>
    <Textarea
      value={description}
      px={2}
      resize={"none"}
      placeholder="Please enter product description"
      rounded={"sm"}
      size={{ md: "xs", lg: "sm" }}
      type="text"
      onChange={(e) => {
        setDescription(e.target.value);
      }}
    />
    <FormErrorMessage>please enter product description</FormErrorMessage>
  </FormControl>
);

const ProductCategory = ({ setCategory, Category }) => (
  <FormControl>
    <FormLabel>Category</FormLabel>
    <Select
      value={Category}
      placeholder="Select Category"
      rounded={"sm"}
      size={{ md: "xs", lg: "sm" }}
      onChange={(e) => {
        setCategory(e.target.value);
      }}
    >
      <option value="Electronics">Electronics</option>
      <option value="Clothing">Clothing</option>
      <option value="Laptops">Laptops</option>
      <option value="Mobiles">Mobiles</option>
    </Select>
  </FormControl>
);

const ProductStock = ({ setStock, Stock }) => (
  <FormControl>
    <FormLabel>Stock</FormLabel>
    <StockInput setStock={setStock} Stock={Stock} />
  </FormControl>
);

const ProductImage = ({ handleFileUpload, imageError }) => (
  <FormControl>
    <FormLabel>Upload image</FormLabel>
    <Input
      id="upload"
      p={0}
      bg={"gray.100"}
      borderRadius={"10px"}
      size={{ md: "xs", lg: "sm" }}
      type="file"
      fontSize={"xs"}
      onChange={handleFileUpload}
    />
    {imageError ? (
      <Text my={2} fontWeight={"bold"} fontSize={"sm"} color={"red.500"}>
        pls upload a valid image( jpeg / jpg / png )
      </Text>
    ) : null}
  </FormControl>
);

const PriceInput = ({ setPrice, Price }) => (
  <>
    <NumberInput
      value={Price}
      rounded={"sm"}
      size={{ md: "xs", lg: "sm" }}
      type="number"
      min={"1"}
      onChange={(value) => {
        setPrice(Number(value));
      }}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper
          display={{ base: "none", md: "flex" }}
          onChange={() => {
            setPrice(Price + 1);
          }}
        />
        <NumberDecrementStepper
          display={{ base: "none", md: "flex" }}
          onChange={() => {
            setPrice(Price - 1);
          }}
        />
      </NumberInputStepper>
    </NumberInput>
    <HStack fontSize={"xs"} mt={1}>
      <Button
        fontSize={"xs"}
        bg={"red.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setPrice(9999);
        }}
      >
        9999
      </Button>
      <Button
        fontSize={"xs"}
        bg={"green.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setPrice(19999);
        }}
      >
        19999
      </Button>
      <Button
        fontSize={"xs"}
        bg={"yellow.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setPrice(49999);
        }}
      >
        49999
      </Button>
    </HStack>
  </>
);
const StockInput = ({ setStock, Stock }) => (
  <>
    <NumberInput
      value={Stock}
      min={1}
      defaultValue={1}
      max={1000}
      rounded={"sm"}
      onChange={(valueString) => {
        setStock(Number(valueString));
      }}
      size={{ md: "xs", lg: "sm" }}
      type="number"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper
          display={{ base: "none", md: "flex" }}
          onClick={() => {
            if (Stock === 1000) {
              return;
            }
            setStock(Stock + 1);
          }}
        />
        <NumberDecrementStepper
          display={{ base: "none", md: "flex" }}
          onClick={() => {
            if (Stock === 1) {
              return;
            }
            setStock(Stock - 1);
          }}
        />
      </NumberInputStepper>
    </NumberInput>
    <HStack fontSize={"xs"} mt={1}>
      <Button
        fontSize={"xs"}
        bg={"red.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setStock(50);
        }}
      >
        50
      </Button>
      <Button
        fontSize={"xs"}
        bg={"green.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setStock(100);
        }}
      >
        100
      </Button>
      <Button
        fontSize={"xs"}
        bg={"yellow.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setStock(500);
        }}
      >
        500
      </Button>
      <Button
        fontSize={"xs"}
        bg={"blue.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setStock(1000);
        }}
      >
        1000
      </Button>
    </HStack>
  </>
);
