import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex
        as="header"
        bg="brand.800"
        color="white"
        py={4}
        px={8}
        justify="space-between"
        align="center"
      >
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">
            Innorik Books
          </Text>
        </Link>
        {isAuthenticated && (
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
      <Box as="main" flex="1" p={8}>
        <Outlet />
      </Box>
      <Box as="footer" bg="gray.200" py={4} px={8} mt="auto">
        <Text textAlign="center">
          © {new Date().getFullYear()} Innorik Books. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
};

export default Layout;
