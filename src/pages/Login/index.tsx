import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";
import { CirclePicker } from "react-color";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useStore();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleColorChange = (color: any) => {
    setColorCode(color.hex);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const success = await login(email, password, colorCode);
    setIsLoading(false);
    if (success) navigate("/");
    else
      toast({
        title: "Wrong crendetials.",
        description:
          "Please check that the email, password or color are correct or try again later.",
        status: "error",
        duration: 10000,
        isClosable: true,
      });
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Login</Heading>
        {isLoading ? (
          <Spinner color="teal" />
        ) : (
          <Box>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <CirclePicker onChangeComplete={handleColorChange} />
                <Button
                  borderRadius={0}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  onClick={handleLogin}
                  isDisabled={
                    email === "" || password === "" || colorCode === ""
                  }
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        )}
      </Stack>
      <Box>
        New to us?{" "}
        <Link as={NavLink} to="/register" color="teal.500">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
