import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useBookStore, type Book } from "../../hooks/useBookStore";
import AddBookModal from "../../components/AddBookModal";
import UpdateBookModal from "../../components/UpdateBookModal";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const Dashboard = () => {
  const { books, addBook, updateBook, deleteBook } = useBookStore();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleUpdateClick = (book: Book) => {
    setSelectedBook(book);
    onUpdateOpen();
  };

  const handleDeleteClick = (book: Book) => {
    setSelectedBook(book);
    onDeleteOpen();
  };

  const handleDeleteConfirm = () => {
    if (selectedBook) {
      deleteBook(selectedBook.id);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [books, searchTerm]);

  return (
    <Box bg="white" p={6} borderRadius="lg" shadow="md">
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h2" size="lg">
          Manage Books
        </Heading>
        <Flex align="center">
          <Input
            placeholder="Search by name or category..."
            mr={4}
            width="300px"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button colorScheme="blue" onClick={onAddOpen} mr={4}>
            Add New Book
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Flex>
      <TableContainer
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Book Name</Th>
              <Th>Author</Th>
              <Th>Category</Th>
              <Th isNumeric>Price</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBooks.map((book) => (
              <Tr key={book.id} _hover={{ bg: "gray.50" }}>
                <Td>{book.name}</Td>
                <Td>{book.author}</Td>
                <Td>{book.category}</Td>
                <Td isNumeric>GH₵{book.price.toFixed(2)}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    mr={2}
                    onClick={() => handleUpdateClick(book)}
                  >
                    Update
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDeleteClick(book)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <AddBookModal
        isOpen={isAddOpen}
        onClose={onAddClose}
        onAddBook={addBook}
      />
      <UpdateBookModal
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        onUpdateBook={updateBook}
        book={selectedBook}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onDelete={handleDeleteConfirm}
        book={selectedBook}
      />
    </Box>
  );
};

export default Dashboard;
