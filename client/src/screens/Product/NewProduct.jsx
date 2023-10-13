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
  Progress,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { Link as ReactLink } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import { useEffect } from "react";

const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
const url = "https://big-deals1-server.vercel.app/api/product/new";

export default function NewProduct() {
  const toast = useToast();
  const fileRef = useRef(null);
  const [name, setName] = useState("");
  const [Price, setPrice] = useState(1);
  const [Description, setDescription] = useState("");
  const [Stock, setStock] = useState(1);
  const [Category, setCategory] = useState();
  const [image, setImage] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return setImageError(true);
    if (!allowedTypes.includes(image.type)) return setImageError(true);
    if (allowedTypes.includes(image.type)) setImageError(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", Price);
    formData.append("description", Description);
    formData.append("stock", Stock);
    formData.append("category", Category);
    formData.append("image", image);
    setLoading(true);
    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      if (response) setLoading(false);
      console.log(response);

      if (response.status === 200) {
        toast({
          title: "Product added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setName("");
        setDescription("");
        setCategory("");
        setPrice(1);
        setStock(1);

        if (fileRef.current) {
          fileRef.current.value = "";
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading && <Progress size="xs" isIndeterminate />}
      <Flex
        border={{ base: "1px", md: "none" }}
        mx={{ base: 5, md: "none" }}
        mt={{ base: 4, md: "none" }}
        mb={{ base: 16 }}
        px={{ base: 5 }}
        pb={{ base: 8, md: 4 }}
        borderColor={"gray.400"}
        justify={"center"}
        rounded={{ base: "lg", md: "none" }}
        shadow={{ base: "xl", md: "none" }}
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
            New Product
          </Heading>
          <ProductName setName={setName} name={name} />
          <ProductPrice setPrice={setPrice} Price={Price} />
          <ProductDescription
            setDescription={setDescription}
            description={Description}
          />
          <ProductCategory setCategory={setCategory} Category={Category} />
          <ProductStock setStock={setStock} Stock={Stock} />
          <ProductImage
            handleFileUpload={handleFileUpload}
            imageError={imageError}
            fileRef={fileRef}
          />
          <AddNowButton handleSubmit={handleSubmit} />
        </Stack>
      </Flex>
    </>
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
      <option value="Mobiles">Mobiles</option>
      <option value="Laptops">Laptops</option>
      <option value="smartWatches">SmartWatches</option>
      <option value="buds">Buds</option>
      <option value="monitors">Monitors</option>
      <option value="SmartTv">SmartTv</option>
    </Select>
  </FormControl>
);

const ProductStock = ({ setStock, Stock }) => (
  <FormControl>
    <FormLabel>Stock</FormLabel>
    <StockInput setStock={setStock} Stock={Stock} />
  </FormControl>
);

const ProductImage = ({ handleFileUpload, imageError, fileRef }) => (
  <FormControl>
    <FormLabel>Upload image</FormLabel>
    <Input
      ref={fileRef}
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
