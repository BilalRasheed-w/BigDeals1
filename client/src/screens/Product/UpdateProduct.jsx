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
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import "../../index.css";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [Category, setCategory] = useState();
  const [Price, setPrice] = useState(1);
  const [Stock, setStock] = useState(1);
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState(false);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return setImageError(true);
    if (!allowedTypes.includes(image.type)) return setImageError(true);
    if (allowedTypes.includes(image.type)) setImageError(false);
    const data = {
      name,
      description,
      Category,
      Price,
      Stock,
      image,
    };
    setName(""),
      setDescription(""),
      setCategory(""),
      setPrice(1),
      setStock(1),
      setImage(""),
      console.log(data);
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
        <ProductCategory setCategory={setCategory} />
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

const ProductName = ({ setName, name }) => (
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

const ProductCategory = ({ setCategory }) => (
  <FormControl>
    <FormLabel>Category</FormLabel>
    <Select
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
      max={"1000"}
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
          setPrice(199);
        }}
      >
        199
      </Button>
      <Button
        fontSize={"xs"}
        bg={"green.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setPrice(499);
        }}
      >
        499
      </Button>
      <Button
        fontSize={"xs"}
        bg={"yellow.500"}
        color={"white"}
        size={"xs"}
        onClick={() => {
          setPrice(999);
        }}
      >
        999
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
