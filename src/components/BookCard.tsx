import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  name: string;
  author: string;
  category: string;
  price: number;
  description: string;
  image: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
      <Box
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Image
          src={book.image}
          alt={book.name}
          maxHeight="100%"
          maxWidth="100%"
          objectFit="contain"
          fallbackSrc="https://via.placeholder.com/200/cccccc/FFFFFF?text=No+Image"
        />
      </Box>
      <Heading as="h3" size="md" mb={1} noOfLines={1}>
        {book.name}
      </Heading>
      <Text fontSize="md" color="gray.600" mb={2}>
        by {book.author}
      </Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        {book.category}
      </Text>
      <Text fontWeight="bold" mb={4}>
        GH₵{book.price.toFixed(2)}
      </Text>
      <Link to={`/book/${book.id}`}>
        <Button colorScheme="brand" width="full">
          View Details
        </Button>
      </Link>
    </Box>
  );
};

export default BookCard;
