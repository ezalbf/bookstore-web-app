import { useState, useMemo } from "react";
import { SimpleGrid, Box, Input, Flex, Heading } from "@chakra-ui/react";
import BookCard from "../../components/BookCard";
import { useBookStore } from "../../hooks/useBookStore";

const BookList = () => {
  const { books } = useBookStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  return (
    <Box>
      <Flex mb={8} justify="space-between" align="center">
        <Heading as="h2" size="lg">
          Available Books
        </Heading>
        <Input
          placeholder="Search by name or category..."
          w="300px"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default BookList;
