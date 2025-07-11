import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "password") {
      const token = "fake-auth-token";
      login(token);
      toast({
        title: "Login successful.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/admin/dashboard");
    } else {
      toast({
        title: "Login failed.",
        description: "Invalid username or password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minHeight="100vh">
      <Flex
        flex={1}
        bg="brand.800"
        color="white"
        align="center"
        justify="center"
        direction="column"
        p={8}
        display={{ base: "none", md: "flex" }}
      >
        <Heading as="h1" size="2xl" mb={4}>
          Innorik Books
        </Heading>
        <Text fontSize="lg">Admin Dashboard</Text>
      </Flex>

      <Flex flex={1} align="center" justify="center">
        <Stack
          as="form"
          onSubmit={handleSubmit}
          spacing={6}
          p={8}
          width="100%"
          maxWidth="400px"
        >
          <Heading as="h2" size="xl" textAlign="center">
            Welcome, Admin
          </Heading>

          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              variant="flushed"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              variant="flushed"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="gray"
            bg="gray.800"
            color="white"
            _hover={{ bg: "gray.700" }}
            size="lg"
            fontSize="md"
          >
            Login Now
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;
