import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useBookStore, type Book } from "../../hooks/useBookStore";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { books } = useBookStore();
  const [book, setBook] = useState<Book | null>(null);
  const toast = useToast();

  useEffect(() => {
    const foundBook = books.find((b) => b.id === id);
    // Simulate loading
    setTimeout(() => {
      setBook(foundBook || null);
    }, 500);
  }, [id, books]);

  const handlePurchase = () => {
    toast({
      title: "Purchase Successful!",
      description: `Thank you for purchasing ${book?.name}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!book) {
    return (
      <Flex justify="center" align="center" minHeight="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="center"
      align="center"
    >
      <Box flexShrink={0} mr={{ md: 10 }}>
        <Image
          src={book.image}
          alt={book.name}
          borderRadius="lg"
          boxShadow="lg"
          objectFit="cover"
          width="250px"
          fallbackSrc="https://via.placeholder.com/250/cccccc/FFFFFF?text=No+Image"
        />
      </Box>
      <Box mt={{ base: 6, md: 0 }} maxWidth="500px">
        <Heading as="h1" size="2xl" mb={4}>
          {book.name}
        </Heading>
        <Text fontSize="xl" fontWeight="bold" color="blue.600" mb={4}>
          GH₵{book.price.toFixed(2)}
        </Text>
        <Text fontSize="lg" color="gray.700" mb={2}>
          <strong>Author:</strong> {book.author}
        </Text>
        <Text fontSize="lg" color="gray.500" mb={4}>
          {book.category}
        </Text>
        <Text mb={6}>{book.description}</Text>
        <Button colorScheme="brand" size="lg" onClick={handlePurchase}>
          Purchase
        </Button>
      </Box>
    </Flex>
  );
};

export default BookDetail;
